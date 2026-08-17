import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  GuestbookEntry,
  fetchGuestbook,
  submitEntry,
  verifyEntry,
} from "../lib/guestbook";

type Step = "form" | "verify" | "done";

export default function GuestBook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState("");

  // form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const verifyRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchGuestbook().then((e) => {
      setEntries(e);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await submitEntry(username, email, message);
    setSending(false);
    if (res.ok) {
      setStep("verify");
    } else {
      setError(res.error || "FAILED TO SUBMIT");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await verifyEntry(email, code);
    setSending(false);
    if (res.ok) {
      setStep("done");
      // refresh entries
      const updated = await fetchGuestbook();
      setEntries(updated);
    } else {
      setError(res.error || "INVALID CODE");
    }
  };

  const reset = () => {
    setStep("form");
    setUsername("");
    setEmail("");
    setMessage("");
    setCode("");
    setError("");
    formRef.current?.reset();
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
                <p>STATUS: ONLINE</p>
                <p>PROTOCOL: EMAIL VERIFY</p>
              </div>
              <div className="border-t border-net-line pt-2 text-net-gray text-[10px] space-y-1">
                <p>HOW IT WORKS:</p>
                <p>1. FILL THE FORM</p>
                <p>2. CHECK YOUR EMAIL</p>
                <p>3. ENTER THE CODE</p>
                <p>4. MESSAGE GOES LIVE</p>
              </div>
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
                  {/* Form / Verify / Done */}
                  {step === "form" && (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 border-b border-net-line pb-4">
                      <p className="text-net-gray text-xs">SUBMIT A MESSAGE:</p>
                      <label className="flex flex-col gap-1.5 text-net-gray text-xs">
                        _username:
                        <input
                          className="field"
                          placeholder="YOUR NAME"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 text-net-gray text-xs">
                        _email:
                        <input
                          className="field"
                          type="email"
                          placeholder="YOU@PROTON.ME"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 text-net-gray text-xs">
                        _message:
                        <textarea
                          className="field resize-none text-xs"
                          rows={3}
                          placeholder="LEAVE A MESSAGE..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          maxLength={1000}
                          required
                        />
                      </label>
                      <div className="flex items-center gap-3">
                        <button className="btn-retro px-3 py-1.5 text-[10px]" type="submit" disabled={sending}>
                          {sending ? "[SENDING...]" : "[SUBMIT] >"}
                        </button>
                        {error && <span className="text-net-gray text-[10px]">{error}</span>}
                      </div>
                    </form>
                  )}

                  {step === "verify" && (
                    <form ref={verifyRef} onSubmit={handleVerify} className="space-y-3 border-b border-net-line pb-4">
                      <p className="text-net-gray text-xs">
                        CODE SENT TO: <span className="text-net-ink glow">{email}</span>
                      </p>
                      <label className="flex flex-col gap-1.5 text-net-gray text-xs">
                        _verification_code:
                        <input
                          className="field"
                          placeholder="123456"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          maxLength={6}
                          required
                        />
                      </label>
                      <div className="flex items-center gap-3">
                        <button className="btn-retro px-3 py-1.5 text-[10px]" type="submit" disabled={sending}>
                          {sending ? "[VERIFYING...]" : "[VERIFY CODE] >"}
                        </button>
                        <button className="btn-retro px-3 py-1.5 text-[10px]" type="button" onClick={reset}>
                          [BACK]
                        </button>
                        {error && <span className="text-net-gray text-[10px]">{error}</span>}
                      </div>
                    </form>
                  )}

                  {step === "done" && (
                    <div className="border-b border-net-line pb-4 space-y-2">
                      <p className="text-net-ink glow text-xs">&gt; MESSAGE VERIFIED AND LIVE.</p>
                      <button className="btn-retro px-3 py-1.5 text-[10px]" onClick={reset}>
                        [POST ANOTHER]
                      </button>
                    </div>
                  )}

                  {/* Entries list */}
                  {entries.length === 0 ? (
                    <p className="text-net-gray text-xs">NO ENTRIES YET. BE THE FIRST.</p>
                  ) : (
                    entries.map((entry) => (
                      <div key={entry.id} className="text-xs">
                        <div className="flex items-baseline gap-2">
                          <span className="text-net-ink glow">{entry.username}</span>
                          <span className="text-net-gray text-[10px]">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-net-gray mt-1 break-words">{entry.message}</p>
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
