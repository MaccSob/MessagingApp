/// <reference types="vite/client" />

const API = import.meta.env.VITE_API_URL; 

export interface AuthResponse {
  token: string;
  user: { id: string; nickname: string };
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function register(data: {
  firstName: string; lastName: string; nickname: string;
  email: string; password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}