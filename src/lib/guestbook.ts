import { getSupabase } from "./supabase";

export interface GuestbookEntry {
  id: number;
  username: string;
  message: string;
  created_at: string;
}

// ponytail: Supabase handles auth + DB + email. No server needed.
// Schema: run supabase/schema.sql in Supabase SQL Editor.

export async function fetchGuestbook(): Promise<GuestbookEntry[]> {
  try {
    const { data } = await getSupabase()
      .from("guestbook_entries")
      .select("id, username, message, created_at")
      .eq("verified", true)
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function submitEntry(
  username: string,
  email: string,
  message: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();

  const { error: insertErr } = await sb.from("guestbook_entries").insert({
    username: username.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim().slice(0, 1000),
    verified: false,
  });

  if (insertErr) return { ok: false, error: insertErr.message };

  // Send OTP code to email via Supabase Auth
  const { error: otpErr } = await sb.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      // ponytail: Supabase sends a 6-digit code by default, no custom template needed
    },
  });

  if (otpErr) return { ok: false, error: otpErr.message };
  return { ok: true };
}

export async function verifyEntry(
  email: string,
  code: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();

  // Verify the OTP code
  const { error: verifyErr } = await sb.auth.verifyOtp({
    email: email.trim().toLowerCase(),
    token: code.trim(),
    type: "email",
  });

  if (verifyErr) return { ok: false, error: verifyErr.message };

  // Mark the entry as verified
  const { error: updateErr } = await sb
    .from("guestbook_entries")
    .update({ verified: true })
    .eq("email", email.trim().toLowerCase())
    .eq("verified", false);

  if (updateErr) return { ok: false, error: updateErr.message };

  // Sign out — we only used auth for OTP verification
  await sb.auth.signOut();

  return { ok: true };
}
