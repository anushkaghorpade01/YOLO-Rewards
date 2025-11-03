import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// The exact copy, split into visual "lines". Keep each string short-ish (~40–65 chars).
const LINES = [
  `"Refer and earn up to this"`,
  `"Refer and earn up to that"`,
  `You and I both know all the ifs and buts that come`,
  `with 'up to' offers. And for some reason, you always`,
  `sniff that there's something wrong.`,
  ``,
  `Same story when you move homes.`,
  ``,
  `There are none when you do it with Flent. Because`,
  `experience has always been at the center of what Flent`,
  `does, and I'm carrying that same energy into the world`,
  `of our referral program.`,
  ``,
  `YOLO by Flent is that corner of the internet where`,
  `referral rewards feel less transactional, more`,
  `experiential (hint: rewards that don't fit in a cart)`,
  ``,
  `If I design the way you should live with intention,`,
  `so should the way I thank you for referring to it.`,
  ``,
  `- (not so genZ) marketer, Flent`,
  ``,
  `Also, yes, some slang dies and should stay dead –`,
  `this one included. But I couldn't find a better word`,
  `for that split-second energy of the "f-it, let's do it"`,
  `moment – the one I want you to have too.`
];

// Pattern of how many "blocks" fill per line.
const CHUNK_PATTERN = [3, 2, 1, 2, 3];

const StoryTeleprompter = () => {
  const winRef = useRef<HTMLDivElement>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [filled, setFilled] = useState<boolean[]>(() => Array(LINES.length).fill(false));

  useEffect(() => {
    const el = winRef.current;
    if (!el) return;

    const fillCurrentLine = () => {
      if (lineIndex >= LINES.length) return;
      if (LINES[lineIndex].trim() === "") {
        markLineFilled(lineIndex);
        return;
      }
      playFill(lineIndex, () => markLineFilled(lineIndex));
    };

    const unfillPreviousLine = () => {
      let idx = Math.max(0, lineIndex - 1);
      while (idx > 0 && LINES[idx].trim() === "" && filled[idx]) idx--;
      if (!filled[idx]) return;
      unfill(idx, () => {
        const copy = filled.slice();
        copy[idx] = false;
        setFilled(copy);
        setLineIndex(idx);
        scrollIntoView(idx, "up");
      });
    };

    const markLineFilled = (idx: number) => {
      const copy = filled.slice();
      copy[idx] = true;
      setFilled(copy);
      const next = Math.min(LINES.length, idx + 1);
      setLineIndex(next);
      scrollIntoView(next, "down");
    };

    const playFill = (idx: number, done: () => void) => {
      const row = document.querySelector(`[data-line="${idx}"]`) as HTMLElement | null;
      if (!row) { done(); return; }
      const solid = row.querySelector(".solid") as HTMLElement;
      const chunks = CHUNK_PATTERN[idx % CHUNK_PATTERN.length];

      solid.style.setProperty("--chunks", String(chunks));
      solid.style.transition = "clip-path .28s steps(var(--chunks), end), transform .18s ease-out";
      solid.style.clipPath = "inset(0 0% 0 0)";
      row.style.transform = "translateY(0)";

      solid.addEventListener("transitionend", onEnd, { once: true });
      function onEnd(ev: TransitionEvent) {
        if (ev.propertyName !== "clip-path") return;
        done();
      }
    };

    const unfill = (idx: number, done: () => void) => {
      const row = document.querySelector(`[data-line="${idx}"]`) as HTMLElement | null;
      if (!row) { done(); return; }
      const solid = row.querySelector(".solid") as HTMLElement;
      solid.style.transition = "clip-path .22s steps(var(--chunks), end)";
      solid.style.clipPath = "inset(0 100% 0 0)";
      row.style.transform = "translateY(2px)";
      solid.addEventListener("transitionend", onEnd, { once: true });
      function onEnd(ev: TransitionEvent) {
        if (ev.propertyName !== "clip-path") return;
        done();
      }
    };

    const scrollIntoView = (idx: number, dir: "down" | "up") => {
      const target = document.querySelector(`[data-line="${Math.min(idx, LINES.length - 1)}"]`) as HTMLElement | null;
      if (!target) return;
      const targetBox = target.getBoundingClientRect();
      const winBox = el.getBoundingClientRect();
      const delta = (targetBox.top - (winBox.top + winBox.height * 0.38));
      el.scrollBy({ top: delta, behavior: "smooth" });
    };

    const onWheel = (e: WheelEvent) => {
      const down = e.deltaY > 0;
      const allDone = filled.every(Boolean);

      if (!allDone || (!down && lineIndex > 0)) {
        e.preventDefault();
        e.stopPropagation();
        if (down) fillCurrentLine();
        else unfillPreviousLine();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => (touchStartY = e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) < 4) return;
      const down = dy > 0;
      const allDone = filled.every(Boolean);
      if (!allDone || (!down && lineIndex > 0)) {
        e.preventDefault();
        e.stopPropagation();
        if (down) fillCurrentLine();
        else unfillPreviousLine();
      }
      touchStartY = e.touches[0].clientY;
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        const allDone = filled.every(Boolean);
        if (!allDone) { e.preventDefault(); fillCurrentLine(); }
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        if (lineIndex > 0) { e.preventDefault(); unfillPreviousLine(); }
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
  }, [filled, lineIndex]);

  return (
    <div className="relative">
      {/* masks for top/bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[18vh] bg-gradient-to-b from-light-bg to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-light-bg to-transparent z-10" />

      <div
        ref={winRef}
        className="max-h-[66vh] overflow-y-auto pr-6"
        aria-label="Story"
        role="region"
      >
        <div className="space-y-4">
          {LINES.map((t, i) => {
            const isBlank = t.trim() === "";
            const isOn = filled[i];
            const chunks = CHUNK_PATTERN[i % CHUNK_PATTERN.length];
            return (
              <div
                key={i}
                data-line={i}
                className="relative leading-[1.5] text-[clamp(16px,1.6vw,20px)]"
                style={{ transform: isOn ? "translateY(0)" : "translateY(2px)" }}
              >
                {/* ghost layer */}
                <span
                  className="ghost"
                  style={{ opacity: isBlank ? 0 : 1 }}
                >
                  {t}
                </span>

                {/* solid fill layer (clipped in blocks) */}
                {!isBlank && (
                  <span
                    className="solid"
                    style={{
                      clipPath: isOn ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                      ["--chunks" as any]: String(chunks),
                    }}
                    aria-hidden="true"
                  >
                    {t}
                  </span>
                )}
              </div>
            );
          })}
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
