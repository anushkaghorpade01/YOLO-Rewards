import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedRoute } from "./AnimatedRoute";

export const FinalWhite = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const { toast } = useToast();

  const { scrollYProgress } = useScroll();
  const routeY = useTransform(scrollYProgress, [0.7, 0.9], [0, 24]);
  const formY = useTransform(scrollYProgress, [0.7, 0.9], [0, 12]);

  useEffect(() => {
    const endDate = new Date("2025-12-03T23:59:00+05:30"); // Dec 3, 2025 23:59 IST

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isExpired) return;

    // In real app: save to Supabase referrers table
    toast({
      description: "You're in! Make 5 assists and secure your goal to meet the GOAT.",
    });

    // Open share modal (simplified for now)
    const url = "https://www.flent.in/?utm_source=YOLO%20Site&utm_medium=website&utm_campaign=YOLO";
    if (navigator.share) {
      navigator.share({
        title: "YOLO by Flent",
        text: "I just joined YOLO by Flent! Refer Flent Homes and win a trip to meet Messi in India 🐐⚽",
        url: url,
      });
    }

    setFullName("");
    setPhone("");
  };

  return (
    <section id="final" className="relative min-h-screen bg-light-bg py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Left: Animated Route */}
          <motion.div
            data-depth="0.15"
            style={{ y: routeY }}
            className="md:col-span-2"
          >
            <AnimatedRoute />
          </motion.div>

          {/* Right: Form */}
          <motion.div
            data-depth="0.3"
            style={{ y: formY }}
            className="md:col-span-3"
          >
            <div className="max-w-md mx-auto">
              <h2 className="text-5xl font-display text-dark-text mb-8">Start Referring</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                    disabled={isExpired}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-dark-text placeholder:text-dark-text/40 focus:outline-none focus:ring-2 focus:ring-coral disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    pattern="[0-9]{10}"
                    required
                    disabled={isExpired}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-dark-text placeholder:text-dark-text/40 focus:outline-none focus:ring-2 focus:ring-coral disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                  <p className="mt-2 text-sm text-dark-text/60 font-sans">10 digits required</p>
                </div>

                <button
                  type="submit"
                  disabled={isExpired}
                  className="w-full px-6 py-4 bg-coral text-light-text rounded-lg font-sans font-semibold hover:bg-coral-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isExpired ? "Offer Ended" : "Refer Now"}
                </button>
              </form>

              {/* Countdown */}
              <div className="mt-8 text-center">
                {isExpired ? (
                  <p className="font-sans text-muted-grey text-base tracking-wide">
                    This experience has ended — next one drops soon.
                  </p>
                ) : (
                  <p className="font-sans text-muted-grey text-base tracking-wide">
                    Offer ends in{" "}
                    <span className="font-medium">
                      {String(timeLeft.days).padStart(2, "0")} days{" "}
                      {String(timeLeft.hours).padStart(2, "0")} hrs{" "}
                      {String(timeLeft.minutes).padStart(2, "0")} min{" "}
                      {String(timeLeft.seconds).padStart(2, "0")} sec
                    </span>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
