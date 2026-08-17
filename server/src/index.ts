import express, { Request, Response } from "express";
import cors from "cors";
import Database from "better-sqlite3";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// --- Database (raw SQL, no ORM) ---

const db = new Database("guestbook.db");
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS guestbook_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    verification_code TEXT NOT NULL,
    verified INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// --- Email transport ---

// ponytail: SMTP config from env, works with any provider (proton, gmail, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// --- Routes ---

// Submit a guestbook entry → sends verification code to email
app.post("/api/guestbook", async (req: Request, res: Response) => {
  const { username, email, message } = req.body;

  if (!username?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const code = generateCode();

  db.prepare(
    "INSERT INTO guestbook_entries (username, email, message, verification_code) VALUES (?, ?, ?, ?)"
  ).run(username.trim(), email.trim().toLowerCase(), message.trim(), code);

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email.trim(),
      subject: "Guestbook Verification Code",
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is: <b>${code}</b></p>`,
    });
    res.json({ ok: true, message: "Verification code sent to your email" });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send verification email" });
  }
});

// Verify code → marks entry as verified
app.post("/api/guestbook/verify", (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email?.trim() || !code?.trim()) {
    res.status(400).json({ error: "Email and code are required" });
    return;
  }

  const entry = db
    .prepare("SELECT * FROM guestbook_entries WHERE email = ? AND verification_code = ? AND verified = 0")
    .get(email.trim().toLowerCase(), code.trim()) as any;

  if (!entry) {
    res.status(400).json({ error: "Invalid code or email" });
    return;
  }

  db.prepare("UPDATE guestbook_entries SET verified = 1 WHERE id = ?").run(entry.id);
  res.json({ ok: true });
});

// Get verified entries
app.get("/api/guestbook", (_req: Request, res: Response) => {
  const entries = db
    .prepare("SELECT id, username, message, created_at FROM guestbook_entries WHERE verified = 1 ORDER BY created_at DESC")
    .all();
  res.json(entries);
});

app.listen(PORT, () => {
  console.log(`Guestbook server running on :${PORT}`);
});
