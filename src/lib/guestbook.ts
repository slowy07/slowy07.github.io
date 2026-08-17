const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface GuestbookEntry {
  id: number;
  username: string;
  message: string;
  created_at: string;
}

export async function fetchGuestbook(): Promise<GuestbookEntry[]> {
  const res = await fetch(`${API_URL}/api/guestbook`);
  return res.json();
}

export async function submitEntry(
  username: string,
  email: string,
  message: string
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${API_URL}/api/guestbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, message }),
  });
  return res.json();
}

export async function verifyEntry(
  email: string,
  code: string
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${API_URL}/api/guestbook/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  return res.json();
}
