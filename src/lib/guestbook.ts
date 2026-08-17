const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface User {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  profilePicId: number;
  provider: string;
}

export interface GuestbookEntry {
  id: number;
  message: string;
  createdAt: string;
  username: string;
  displayName: string;
  profilePicId: number;
}

export async function fetchMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
  return res.json();
}

export async function fetchGuestbook(): Promise<GuestbookEntry[]> {
  const res = await fetch(`${API_URL}/api/guestbook`);
  return res.json();
}

export async function postGuestbook(message: string): Promise<GuestbookEntry> {
  const res = await fetch(`${API_URL}/api/guestbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message }),
  });
  return res.json();
}

export function loginGitHub() {
  window.location.href = `${API_URL}/auth/github`;
}

export function loginGoogle() {
  window.location.href = `${API_URL}/auth/google`;
}

export async function logout() {
  await fetch(`${API_URL}/auth/logout`, { credentials: "include" });
}

// ponytail: 11 SVGs, index by id. add more char*.svg to src/assets/profile_pic/ to expand.
const TOTAL_PROFILE_PICS = 11;

export function getProfilePicUrl(id: number): string {
  const safeId = ((id - 1) % TOTAL_PROFILE_PICS) + 1;
  return new URL(`../assets/profile_pic/char${safeId}.svg`, import.meta.url).href;
}
