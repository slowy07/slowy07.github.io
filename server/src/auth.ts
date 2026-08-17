import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "./db.js";
import { users } from "./schema.js";
import { eq, and } from "drizzle-orm";

const TOTAL_PROFILE_PICS = 11;

// ponytail: inline user find-or-create, extract when a third provider appears
async function findOrCreateUser(
  provider: string,
  providerId: string,
  profile: { username?: string; displayName?: string; avatarUrl?: string }
) {
  const existing = db
    .select()
    .from(users)
    .where(and(eq(users.provider, provider), eq(users.providerId, providerId)))
    .get();

  if (existing) return existing;

  const profilePicId = Math.floor(Math.random() * TOTAL_PROFILE_PICS) + 1;

  const result = db
    .insert(users)
    .values({
      provider,
      providerId,
      username: profile.username || "unknown",
      displayName: profile.displayName || profile.username || "Anonymous",
      avatarUrl: profile.avatarUrl || null,
      profilePicId,
    })
    .returning()
    .get();

  return result;
}

export function configurePassport() {
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    const user = db.select().from(users).where(eq(users.id, id)).get();
    done(null, user || null);
  });

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: `${process.env.API_URL || "http://localhost:3001"}/auth/github/callback`,
        },
        async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
          try {
            const user = await findOrCreateUser("github", profile.id, {
              username: profile.username,
              displayName: profile.displayName,
              avatarUrl: profile.photos?.[0]?.value,
            });
            done(null, user);
          } catch (err) {
            done(err);
          }
        }
      )
    );
  }

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${process.env.API_URL || "http://localhost:3001"}/auth/google/callback`,
        },
        async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
          try {
            const user = await findOrCreateUser("google", profile.id, {
              username: profile.emails?.[0]?.value?.split("@")[0],
              displayName: profile.displayName,
              avatarUrl: profile.photos?.[0]?.value,
            });
            done(null, user);
          } catch (err) {
            done(err);
          }
        }
      )
    );
  }

  return passport;
}
