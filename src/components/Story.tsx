import { useRef, useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const COPY = [
  '"Refer and earn up to this"',
  '"Refer and earn up to that"',
  "You and I both know all the ifs and buts that come with 'up to' offers. And for some reason, you always sniff that there's something wrong.",
  "Same story when you move homes.",
  "There are none when you do it with Flent. Because experience has always been at the center of what Flent does, and I'm carrying that same energy into the world of our referral program.",
  "YOLO by Flent is that corner of the internet where referral rewards feel less transactional, more experiential (hint: rewards that don't fit in a cart)",
  "If I design the way you should live with intention, so should the way I thank you for referring to it.",
  "- (not so genZ) marketer, Flent",
  "Also, yes, some slang dies and should stay dead – this one included. But I couldn't find a better word for that split-second energy of the \"f-it, let's do it\" moment – the one I want you to have too."
];

const StoryTeleprompter = () => {
  const winRef = useRef<HTMLDivElement>(null);

  // Tokenize once: array of {text, isPBreak}
  const tokens = useMemo(() => {
    const out: { text: string; br?: boolean }[] = [];
    COPY.forEach((para, i) => {
      para.split(/\s+/).forEach((w, j, arr) => {
        out.push({ text: w + (j === arr.length - 1 ? "" : " ") });
      });
      if (i < COPY.length - 1) out.push({ text: "", br: true });
    });
    return out;
  }, []);

  // How many tokens are "filled"
  const [filled, setFilled] = useState(0);
  const max = tokens.length;

  // Stop page scroll until finished
  useEffect(() => {
    const el = winRef.current;
    if (!el) return;

    const STEP = 6; // How many words per tick
    const advance = (dir: number) =>
      setFilled(v => Math.max(0, Math.min(max, v + dir * STEP)));

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY;
      if (filled < max || (filled === max && Math.sign(dy) < 0)) {
        e.stopPropagation();
        e.preventDefault();
        advance(Math.sign(dy));
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => (touchStartY = e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) < 4) return;
      if (filled < max || (filled === max && dy < 0)) {
        e.stopPropagation();
        e.preventDefault();
        advance(Math.sign(dy));
      }
      touchStartY = e.touches[0].clientY;
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        if (filled < max) {
          e.preventDefault();
          advance(1);
        }
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        if (filled > 0) {
          e.preventDefault();
          advance(-1);
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [filled, max]);

  return (
    <div className="relative">
      {/* Top gradient mask */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[18vh] bg-gradient-to-b from-light-bg to-transparent z-10" />
      
      {/* Bottom gradient mask */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-light-bg to-transparent z-10" />

      {/* Teleprompter window */}
      <div
        ref={winRef}
        className="max-h-[64vh] overflow-hidden pr-4"
        aria-label="Story"
        role="region"
      >
        <div className="whitespace-pre-wrap text-xl md:text-2xl leading-relaxed tracking-wide font-sans">
          {tokens.map((t, i) =>
            t.br ? (
              <span key={i} className="block h-6" />
            ) : (
              <span
                key={i}
                data-token
                className={i < filled ? "token-on" : "token-off"}
              >
                {t.text}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Enhanced parallax effects
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const ruleY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -40]);
  const contentScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative min-h-[200vh] bg-light-bg"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <motion.div 
          style={{ scale: contentScale }}
          className="container mx-auto px-6 grid md:grid-cols-5 gap-12 items-center"
        >
          {/* Left: Title (static) */}
          <motion.div
            data-depth="0.3"
            style={{ y: titleY, opacity: titleOpacity }}
            className="md:col-span-2"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-display text-dark-text leading-none">
              YOLO by Flent
            </h2>
          </motion.div>

          {/* Right: Teleprompter */}
          <div className="md:col-span-3 relative">
            {/* L1: Vertical hairline */}
            <motion.div
              data-depth="0.15"
              style={{ y: ruleY }}
              className="absolute -left-8 top-0 bottom-0 w-px bg-dark-text/6"
            />

            <StoryTeleprompter />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
