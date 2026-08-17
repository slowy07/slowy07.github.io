import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./auth.js";
import { db } from "./db.js";
import { guestbookEntries, users } from "./schema.js";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// --- Auth routes ---

app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: CLIENT_URL }),
  (_req: Request, res: Response) => {
    res.redirect(CLIENT_URL);
  }
);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: CLIENT_URL }),
  (_req: Request, res: Response) => {
    res.redirect(CLIENT_URL);
  }
);

app.get("/auth/me", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const user = req.user as any;
    res.json({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      profilePicId: user.profilePicId,
      provider: user.provider,
    });
  } else {
    res.json(null);
  }
});

app.get("/auth/logout", (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ ok: true });
  });
});

// --- Guestbook routes ---

app.get("/api/guestbook", (_req: Request, res: Response) => {
  const entries = db
    .select({
      id: guestbookEntries.id,
      message: guestbookEntries.message,
      createdAt: guestbookEntries.createdAt,
      username: users.username,
      displayName: users.displayName,
      profilePicId: users.profilePicId,
    })
    .from(guestbookEntries)
    .innerJoin(users, eq(guestbookEntries.userId, users.id))
    .orderBy(desc(guestbookEntries.createdAt))
    .all();
  res.json(entries);
});

app.post("/api/guestbook", (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const { message } = req.body;
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const user = req.user as any;
  const entry = db
    .insert(guestbookEntries)
    .values({ userId: user.id, message: message.trim().slice(0, 1000) })
    .returning()
    .get();

  res.json({
    ...entry,
    username: user.username,
    displayName: user.displayName,
    profilePicId: user.profilePicId,
  });
});

// ponytail: inline schema creation, drizzle-kit push for real migrations
db.run(sql`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  username TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  profile_pic_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
)`);
db.run(sql`CREATE TABLE IF NOT EXISTS guestbook_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
)`);

app.listen(PORT, () => {
  console.log(`Guestbook server running on :${PORT}`);
});
