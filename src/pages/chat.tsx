import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../chat.css";

interface OtherUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

interface LastMessage {
  content: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  otherUser: OtherUser;
  lastMessage: LastMessage | null;
  createdAt: string;
}

interface Message {
  id: number;
  content: string;
  createdAt: string;
  author: { id: number; username: string };
}

const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function initials(user: OtherUser) {
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
}

const AVATAR_COLORS = [
  "#E8000D", "#185FA5", "#3B6D11", "#854F0B",
  "#534AB7", "#993556", "#0F6E56", "#993C1D",
];
function avatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

export default function Home() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [myId, setMyId] = useState<number | null>(null);
  const [myUsername, setMyUsername] = useState("");
  const [newDm, setNewDm] = useState(false);
  const [dmTarget, setDmTarget] = useState("");
  const [dmError, setDmError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
    fetchMe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchMe() {
    try {
      const res = await fetch(`${API}/auth/me`, { credentials: "include" });
      if (res.status === 401) { navigate("/login"); return; }
      const data = await res.json();
      setMyId(data.id);
      setMyUsername(data.username);
    } catch (err) {
      console.error("fetchMe failed:", err);
    }
  }

  async function fetchConversations() {
    try {
      const res = await fetch(`${API}/conversations`, { credentials: "include" });
      if (res.status === 401) { navigate("/login"); return; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setConversations(data);
    } catch (err) {
      console.error("fetchConversations failed:", err);
    }
  }

  async function openConversation(id: number) {
    setActiveId(id);
    try {
      const res = await fetch(`${API}/conversations/${id}/messages`, { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("openConversation failed:", err);
    }
  }

  async function sendMessage() {
    if (!input.trim() || !activeId) return;
    const content = input.trim();
    setInput("");
    try {
      const res = await fetch(`${API}/conversations/${activeId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? { ...c, lastMessage: { content, createdAt: msg.createdAt } }
            : c
        )
      );
    } catch (err) {
      console.error("sendMessage failed:", err);
      setInput(content); // restore so the user doesn't lose their message
    }
  }

  async function startDm() {
    setDmError("");
    try {
      const res = await fetch(`${API}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ targetUsername: dmTarget.replace("@", "") }),
      });
      const data = await res.json();
      if (!res.ok) { setDmError(data.message); return; }
      setNewDm(false);
      setDmTarget("");
      await fetchConversations();
      openConversation(data.id);
    } catch (err) {
      console.error("startDm failed:", err);
      setDmError("Something went wrong. Try again.");
    }
  }

  const active = conversations.find((c) => c.id === activeId);
  const filtered = conversations.filter((c) =>
    `${c.otherUser.firstName} ${c.otherUser.lastName} ${c.otherUser.username}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="joffy-header">
            <div className="joffy-brand">
              <div className="joffy-dot">J</div>
              <span className="joffy-name">JOFFY</span>
            </div>
            <button className="icon-btn" onClick={() => setNewDm(true)} aria-label="New message">
              <i className="ti ti-edit" aria-hidden="true" />
            </button>
          </div>
          <div className="search-wrap">
            <i className="ti ti-search" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="convo-list">
          {filtered.length === 0 && (
            <p className="empty-list">No conversations yet. Start one!</p>
          )}
          {filtered.map((c) => (
            <div
              key={c.id}
              className={`convo${activeId === c.id ? " active" : ""}`}
              onClick={() => openConversation(c.id)}
            >
              <div className="avatar" style={{ background: avatarColor(c.otherUser.id) }}>
                {initials(c.otherUser)}
              </div>
              <div className="convo-info">
                <div className="convo-row">
                  <span className="convo-name">
                    {c.otherUser.firstName} {c.otherUser.lastName}
                  </span>
                  {c.lastMessage && (
                    <span className="convo-time">{timeAgo(c.lastMessage.createdAt)}</span>
                  )}
                </div>
                <div className="convo-preview">
                  {c.lastMessage?.content ?? "Start the conversation"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="user-row" onClick={() => navigate("/profile")}>
            <div className="user-avatar">{myUsername ? myUsername[0].toUpperCase() : "?"}</div>
            <div className="user-info">
              <div className="user-name">@{myUsername}</div>
              <div className="user-status">View profile</div>
            </div>
            <i className="ti ti-settings user-settings" aria-hidden="true" />
          </div>
        </div>
      </aside>

      <main className="chat-area">
        {!active ? (
          <div className="no-chat">
            <div className="no-chat-icon">💬</div>
            <h2>Your messages</h2>
            <p>Start a conversation by clicking the edit icon.</p>
          </div>
        ) : (
          <>
            <div className="chat-header">
              <div
                className="chat-header-avatar"
                style={{ background: avatarColor(active.otherUser.id) }}
              >
                {initials(active.otherUser)}
              </div>
              <div className="chat-header-info">
                <div className="chat-header-name">
                  {active.otherUser.firstName} {active.otherUser.lastName}
                </div>
                <div className="chat-header-sub">@{active.otherUser.username}</div>
              </div>
            </div>

            <div className="messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`msg${msg.author.id === myId ? " mine" : ""}`}>
                  {msg.author.id !== myId && (
                    <div
                      className="msg-avatar"
                      style={{ background: avatarColor(msg.author.id) }}
                    >
                      {msg.author.username[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="bubble">{msg.content}</div>
                    <div className="msg-time">{timeAgo(msg.createdAt)}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-wrap">
              <input
                className="chat-input"
                type="text"
                placeholder={`Message ${active.otherUser.firstName}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="send-btn" onClick={sendMessage} aria-label="Send">
                <i className="ti ti-send" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </main>

      {newDm && (
        <div className="modal-backdrop" onClick={() => setNewDm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>New message</h2>
            <p>Enter the username of the person you want to message.</p>
            <div className="modal-input-wrap">
              <span className="prefix">@</span>
              <input
                type="text"
                placeholder="username"
                value={dmTarget}
                onChange={(e) => setDmTarget(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startDm()}
                autoFocus
              />
            </div>
            {dmError && <span className="dm-error">{dmError}</span>}
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setNewDm(false)}>Cancel</button>
              <button className="modal-confirm" onClick={startDm}>Start chat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}