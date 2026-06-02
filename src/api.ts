/// <reference types="vite/client" />

const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
console.log("API base:", API); // check what this prints in the browser console
export interface AuthUser {
  id: string;
  nickname: string;
}

export interface AuthError {
  field?: string;
  message: string;
}

async function request<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw data as AuthError;
  return data as T;
}

export const loginUser = (email: string, password: string) =>
  request<{ user: AuthUser }>("/auth/login", { email, password });

export const registerUser = (payload: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}) => request<{ user: AuthUser }>("/auth/register", payload);

export const logoutUser = () =>
  fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });