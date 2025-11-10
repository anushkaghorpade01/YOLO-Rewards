import { useState, useEffect, FormEvent, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { AnimatedRoute } from "./AnimatedRoute";
import { ShareModal } from "./ShareModal";

const VIEWERS = [15, 27, 46, 53, 65, 76, 84, 98, 102, 112, 124, 133, 148, 152];

const SOCIAL_LINKS = [
  {
    name: "Website",
    href: "https://www.flent.in/",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3C9.6 5.4 8.25 8.4 8.25 12C8.25 15.6 9.6 18.6 12 21C14.4 18.6 15.75 15.6 15.75 12C15.75 8.4 14.4 5.4 12 3Z" stroke="currentColor" strokeWidth="1.6" />
        <line x1="4.5" y1="12" x2="19.5" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/flent.in/?hl=en",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=918904695925&text=Hi+there%2C+I+am+interested+in+Flent-ing.+Tell+me+more+%3A%29&type=phone_number&app_absent=0",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g fill="currentColor">
          <path d="M128 24C70.3 24 24 70.3 24 128c0 18.7 4.9 37 14.1 53.3L24 232l52.9-14C93.5 225.4 110.6 232 128 232c57.7 0 104-46.3 104-104S185.7 24 128 24Zm0 192c-15.1 0-29.9-4.4-42.5-12.7l-3.4-2.2-30.6 8.1 8.2-29.7-2.2-3.5C50.7 164 48 146.2 48 128c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80Z" />
          <path d="M186 146.7c-2.5-1.2-14.7-7.2-17-8-2.3-.8-4-1.2-5.7 1.2s-6.5 8-8 9.6-3 1.8-5.5.6-10.8-4-20.5-12.5c-7.6-6.8-12.7-15.1-14.1-17.6s-.1-3.9 1.1-5.2c1.2-1.2 2.3-3 3.4-4.5 1.1-1.5 1.5-2.6 2.3-4.3a4.7 4.7 0 0 0-.2-4.5c-.6-1.2-5.7-13.7-7.8-18.9-2-4.8-4-4-5.7-4h-4.8a9.3 9.3 0 0 0-6.7 3.1 27.9 27.9 0 0 0-8.8 20.7c0 12 8.9 23.6 10.2 25.3 1.2 1.7 17.5 26.8 42.4 37.4 5.9 2.6 10.5 4.1 14.1 5.3 5.9 1.9 11.3 1.7 15.5 1 4.7-.7 14.7-6 16.8-11.8 2.1-5.8 2.1-10.7 1.5-11.8-.5-1.1-2.1-1.7-4.6-2.9Z" />
        </g>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://x.com/flenthomes",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4.5 4.5L10.85 13.1L4.9 19.5H7.65L12.15 14.75L15.8 19.5H19.5L13.05 10.85L18.6 4.5H15.85L11.65 9.05L8.25 4.5H4.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@FlentHomes",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M21.2 8.05C21.4 8.8 21.5 9.75 21.5 11V13C21.5 14.25 21.4 15.2 21.2 15.95C21 16.75 20.45 17.35 19.7 17.6C18.75 17.9 12 17.9 12 17.9C12 17.9 5.25 17.9 4.3 17.6C3.55 17.35 3 16.75 2.8 15.95C2.6 15.2 2.5 14.25 2.5 13V11C2.5 9.75 2.6 8.8 2.8 8.05C3 7.25 3.55 6.65 4.3 6.4C5.25 6.1 12 6.1 12 6.1C12 6.1 18.75 6.1 19.7 6.4C20.45 6.65 21 7.25 21.2 8.05Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M10.5 9L15 12L10.5 15V9Z" fill="currentColor" />
      </svg>
    ),
  },
];

const pickViewerSequence = () => {
  const first = VIEWERS[Math.floor(Math.random() * VIEWERS.length)];
  let delta = 0;
  while (delta === 0) {
    delta = Math.floor(Math.random() * 21) - 10; // -10 to +10 excluding 0
  }
  const second = Math.max(0, first + delta);
  return [first, second];
};

export const FinalWhite = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [viewerSequence] = useState(() => pickViewerSequence());
  const [viewerIndex, setViewerIndex] = useState(0);

  const { toast } = useToast();
  const finalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: finalRef,
    offset: ["start end", "end start"]
  });
  // Enhanced parallax effects for Final section
  const routeY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [120, 0, 0, -60]);
  const routeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const formY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -40]);
  const formOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const formScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  useEffect(() => {
    // Dec 3, 2025 23:59:00 IST = UTC+5:30
    const endDate = new Date("2025-12-05T18:29:00Z");

    const updateCountdown = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isExpired) return;

    // TODO: Insert to Supabase referrers table
    // await supabase.from('referrers').insert({ full_name: fullName, phone });

    setShowShareModal(true);
  };

  useEffect(() => {
    if (viewerIndex >= viewerSequence.length - 1) return;
    const timeout = setTimeout(() => {
      setViewerIndex((prev) => Math.min(prev + 1, viewerSequence.length - 1));
    }, 4500);
    return () => clearTimeout(timeout);
  }, [viewerIndex, viewerSequence.length]);

  return (
    <>
      <section ref={finalRef} id="final" className="relative min-h-screen bg-light-bg grid-background py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 relative">
            <h2 className="text-6xl md:text-7xl lg:text-8xl heading-display text-dark-text">
              What are you waiting for?
            </h2>
            <img
              src="/black%20grainy.png"
              alt="Excited character illustration"
              className="block md:hidden absolute pointer-events-none select-none z-20"
              style={{ top: "-272px", right: "-120px", width: "304px", height: "auto", filter: "invert(1)", opacity: 0.95 }}
              loading="lazy"
            />
          </div>
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Left: Animated Route */}
            <motion.div
              data-depth="0.15"
              style={{ y: routeY, opacity: routeOpacity }}
              className="md:col-span-2"
            >
              <AnimatedRoute />
            </motion.div>

            {/* Right: Form */}
            <motion.div
              data-depth="0.3"
              style={{ y: formY, opacity: formOpacity, scale: formScale }}
              className="md:col-span-3"
            >
              <div className="max-w-md mx-auto bg-white/90 rounded-3xl border border-border shadow-xl backdrop-blur overflow-hidden">
                <div className="px-8 py-3 bg-gradient-to-r from-dark-bg via-dark-bg/80 to-dark-bg text-light-text flex items-center justify-center text-sm font-sans tracking-wide">
                  <span>{viewerSequence[viewerIndex]} people viewing right now</span>
                </div>
                <div className="p-8 space-y-6">
                  <div className="text-center">
                    <h2 className="text-5xl font-display text-dark-text">Refer Now</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="font-sans text-sm font-medium text-dark-text/80" htmlFor="full-name">
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Fernandes"
                      required
                      disabled={isExpired}
                      className="w-full px-4 py-3 bg-secondary border border-border/80 rounded-xl font-sans text-dark-text placeholder:text-dark-text/40 focus:outline-none focus:ring-2 focus:ring-coral disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-sm font-medium text-dark-text/80" htmlFor="phone-number">
                      Phone Number
                    </label>
                    <input
                      id="phone-number"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      pattern="[0-9]{10}"
                      required
                      disabled={isExpired}
                      className="w-full px-4 py-3 bg-secondary border border-border/80 rounded-xl font-sans text-dark-text placeholder:text-dark-text/40 focus:outline-none focus:ring-2 focus:ring-coral disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                    <p className="text-xs text-dark-text/50 font-sans">We’ll only use this to tag referrals back to you.</p>
                  </div>

                  <button
                    id="refer-now"
                    type="submit"
                    disabled={isExpired}
                    className="w-full px-6 py-4 bg-coral text-light-text rounded-xl font-sans font-semibold hover:bg-coral-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isExpired ? "Offer Ended" : "Refer Now"}
                  </button>
                </form>

                <div className="text-center space-y-3">
                  <a
                    href="https://wry-chef-6d0.notion.site/Flent-x-Messi-India-Tour-Giveaway-29d0c38bc238805da355d55be8e0b431?source=copy_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-coral hover:text-coral-hover underline transition-colors"
                  >
                    View Terms & Conditions
                  </a>

                  <div className="rounded-2xl bg-secondary/70 border border-border/60 px-4 py-3">
                    {isExpired ? (
                      <p className="font-sans text-sm text-dark-text/60">This experience has ended — next one drops soon.</p>
                    ) : (
                      <p className="font-sans text-sm text-dark-text/70">
                        Offer ends in {" "}
                        <span className="font-semibold text-dark-text">
                          {String(timeLeft.days).padStart(2, "0")} days {String(timeLeft.hours).padStart(2, "0")} hrs {String(timeLeft.minutes).padStart(2, "0")} min {String(timeLeft.seconds).padStart(2, "0")} sec
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          </div>
          <div className="mt-16 flex justify-center gap-8 text-dark-text">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105 hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <img
          src="/black%20grainy.png"
          alt="Excited character illustration"
          className="hidden md:block absolute pointer-events-none select-none z-20"
          style={{ bottom: "-188px", right: "-140px", width: "520px", height: "auto", filter: "invert(1)", opacity: 0.95 }}
          loading="lazy"
        />
      </section>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
          setFullName("");
          setPhone("");
        }}
        fullName={fullName}
        phone={phone}
      />
    </>
  );
};
