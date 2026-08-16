import emailjs from "@emailjs/browser";
import { GoTriangleDown } from "@react-icons/all-files/go/GoTriangleDown";
import { GrLinkedinOption } from "@react-icons/all-files/gr/GrLinkedinOption";
import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { motion } from "framer-motion";
import { BsYoutube } from "react-icons/bs";
import { SiWakatime } from "react-icons/si";
import { useRef, useState } from "react";

const LINKS = [
  {
    label: "Arfy Slowy",
    href: "https://www.linkedin.com/in/arfy-slowy-151776218/",
    icon: <GrLinkedinOption />,
  },
  {
    label: "slowy.arfy@proton.me",
    href: "mailto:slowy.arfy@proton.me",
    icon: <MdEmail />,
  },
  {
    label: "@arfyslowy",
    href: "https://youtube.com/@arfyslowy",
    icon: <BsYoutube />,
  },
  {
    label: "@slowy07",
    href: "https://wakatime.com/@slowy07",
    icon: <SiWakatime />,
  },
];

export default function ContactMe() {
  const d = new Date();
  const month = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const formRef = useRef<HTMLFormElement>(null);
  const [loader, setLoader] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [formData, setFormData] = useState({
    form_name: "",
    message: "",
    email: "",
  });

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    emailjs
      .send(
        process.env.REACT_APP_EMAIL_SERVICE!,
        process.env.REACT_APP_EMAIL_TEMPLATE!,
        {
          from_name: formData.form_name,
          message: formData.message,
          email: formData.email,
        },
        process.env.REACT_APP_EMAIL_JS_USER_ID!
      )
      .then(() => {
        setLoader(false);
        setShowNotif(true);
        setTimeout(() => setShowNotif(false), 3000);
        formRef.current?.reset();
      });
  };

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="lg:grid grid-cols-12 h-full flex flex-col gap-3 lg:gap-0 p-3 lg:p-4">
        <div className="lg:col-span-3 lg:pr-4">
          <Directory />
        </div>
        <div className="lg:col-span-9 h-full min-h-0">
          <div className="sys-panel h-full flex flex-col">
            <div className="sys-head px-3 py-1.5 flex items-center justify-between">
              <span className="text-net-ink">MESSAGE TERMINAL</span>
              <span>CHANNEL: 04</span>
            </div>

            <div className="well flex-1 overflow-y-auto scrollbar-thin min-h-0 p-4 md:p-6">
              <div className="lg:grid grid-cols-2 gap-6 h-full">
                <form
                  onSubmit={sendEmail}
                  ref={formRef}
                  className="flex flex-col gap-4 text-xs md:text-sm"
                >
                  <p className="text-net-gray">
                    RECIPIENT: <span className="text-net-ink glow">SLOWY</span>
                  </p>
                  <label className="flex flex-col gap-1.5 text-net-gray">
                    _name:
                    <input
                      name="user_name"
                      type="text"
                      placeholder="JOHN DOE"
                      className="field"
                      autoComplete="off"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, form_name: e.target.value })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-net-gray">
                    _email:
                    <input
                      name="user_email"
                      type="email"
                      placeholder="JOHNDOE@EXAMPLE.COM"
                      className="field"
                      autoComplete="off"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-net-gray">
                    _message:
                    <textarea
                      name="message"
                      rows={6}
                      className="field resize-none"
                      placeholder="HEY! JUST CHECKED YOUR WEBSITE..."
                      autoComplete="off"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </label>
                  <button className="btn-retro px-3 py-1.5 text-[10px] w-max flex items-center gap-2" type="submit">
                    {loader ? (
                      <span>[SENDING...]</span>
                    ) : (
                      <span>[SEND MESSAGE] &gt;</span>
                    )}
                  </button>
                  <p className="text-net-gray">
                    CONNECTION STATUS:{" "}
                    <span className="text-net-ink glow">
                      {showNotif ? "MESSAGE DELIVERED" : "READY"}
                      <span className="cursor-blink">█</span>
                    </span>
                  </p>
                  {showNotif && (
                    <p className="text-net-ink glow animate-pulse">
                      &gt; YOUR MESSAGE HAS BEEN SENT.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Directory() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="sys-panel h-full">
      <div className="sys-head px-3 py-1.5">
        <span>DIRECTORY / FIND ME</span>
      </div>
      <div className="p-3 text-xs">
        <button
          className={`flex items-center gap-2 w-full ${isOpen ? "text-net-ink" : "text-net-gray"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <GoTriangleDown
            className={`${isOpen ? "" : "-rotate-90"} transition-all`}
          />
          contacts
        </button>

        {isOpen && (
          <div className="pt-2 pl-4 space-y-2">
            {LINKS.map((c, i) => (
              <a
                key={c.href}
                href={c.href}
                className="flex items-center gap-2.5 text-net-gray hover:text-net-ink transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-[10px] text-net-gray/60">
                  [{String(i + 1)}]
                </span>
                {c.icon}
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        )}

        <div className="border-t border-net-line pt-2 mt-3 text-net-gray space-y-1">
          <p>PORT: 3000</p>
          <p>DATA STREAM: OK</p>
          <p>NET_STATUS: ONLINE</p>
        </div>
      </div>
    </div>
  );
}
