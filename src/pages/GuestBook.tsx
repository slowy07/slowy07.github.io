import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  User,
  GuestbookEntry,
  fetchMe,
  fetchGuestbook,
  postGuestbook,
  loginGitHub,
  loginGoogle,
  logout,
  getProfilePicUrl,
} from "../lib/guestbook";

export default function GuestBook() {
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    Promise.all([fetchMe(), fetchGuestbook()]).then(([u, e]) => {
      setUser(u);
      setEntries(e);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    setError("");
    try {
      const entry = await postGuestbook(message);
      setEntries((prev) => [entry, ...prev]);
      setMessage("");
      formRef.current?.reset();
    } catch {
      setError("FAILED TO SEND. TRY AGAIN.");
    } finally {
      setSending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="lg:grid grid-cols-12 h-full flex flex-col gap-3 lg:gap-0 p-3 lg:p-4">
        {/* Sidebar */}
        <div className="lg:col-span-3 lg:pr-4">
          <div className="sys-panel h-full">
            <div className="sys-head px-3 py-1.5">
              <span>DIRECTORY / GUESTBOOK</span>
            </div>
            <div className="p-3 text-xs space-y-3">
              <div className="border-t border-net-line pt-2 text-net-gray space-y-1">
                <p>ENTRIES: {entries.length}</p>
                <p>STATUS: {user ? "AUTHENTICATED" : "ANONYMOUS"}</p>
                <p>PROTOCOL: OAUTH 2.0</p>
              </div>
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={getProfilePicUrl(user.profilePicId)}
                      alt="avatar"
                      className="w-8 h-8 border border-net-line"
                    />
                    <div>
                      <p className="text-net-ink">{user.displayName}</p>
                      <p className="text-net-gray text-[10px]">@{user.username}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="btn-retro px-3 py-1 text-[10px] w-full">
                    [LOGOUT]
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-net-gray">SIGN IN TO POST:</p>
                  <button onClick={loginGitHub} className="btn-retro px-3 py-1.5 text-[10px] w-full">
                    [SIGN IN WITH GITHUB]
                  </button>
                  <button onClick={loginGoogle} className="btn-retro px-3 py-1.5 text-[10px] w-full">
                    [SIGN IN WITH GOOGLE]
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="lg:col-span-9 h-full min-h-0">
          <div className="sys-panel h-full flex flex-col">
            <div className="sys-head px-3 py-1.5 flex items-center justify-between">
              <span className="text-net-ink">GUESTBOOK TERMINAL</span>
              <span>CHANNEL: 04</span>
            </div>

            <div className="well flex-1 overflow-y-auto scrollbar-thin min-h-0 p-4 md:p-6">
              {loading ? (
                <p className="text-net-gray text-xs animate-pulse">LOADING ENTRIES...</p>
              ) : (
                <div className="space-y-4">
                  {/* Post form */}
                  {user ? (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 border-b border-net-line pb-4">
                      <p className="text-net-gray text-xs">
                        POSTING AS: <span className="text-net-ink glow">{user.displayName}</span>
                      </p>
                      <textarea
                        rows={3}
                        className="field resize-none text-xs"
                        placeholder="LEAVE A MESSAGE..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={1000}
                        required
                      />
                      <div className="flex items-center gap-3">
                        <button className="btn-retro px-3 py-1.5 text-[10px]" type="submit" disabled={sending}>
                          {sending ? "[SENDING...]" : "[POST MESSAGE] >"}
                        </button>
                        {error && <span className="text-net-gray text-[10px]">{error}</span>}
                      </div>
                    </form>
                  ) : (
                    <div className="border-b border-net-line pb-4 text-xs text-net-gray">
                      <p>SIGN IN TO POST A MESSAGE.</p>
                    </div>
                  )}

                  {/* Entries list */}
                  {entries.length === 0 ? (
                    <p className="text-net-gray text-xs">NO ENTRIES YET. BE THE FIRST.</p>
                  ) : (
                    entries.map((entry) => (
                      <div key={entry.id} className="flex gap-3 text-xs">
                        <img
                          src={getProfilePicUrl(entry.profilePicId)}
                          alt=""
                          className="w-10 h-10 border border-net-line flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-net-ink glow">{entry.displayName}</span>
                            <span className="text-net-gray text-[10px]">@{entry.username}</span>
                            <span className="text-net-gray text-[10px] ml-auto">
                              {new Date(entry.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-net-gray mt-1 break-words">{entry.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
