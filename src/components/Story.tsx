import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const storyLines = [
  '"Refer and earn up to this"',
  '"Refer and earn up to that"',
  "You and I both know all the ifs and buts that come with 'up to' offers. And for some reason, you always sniff that there's something wrong.",
  "",
  "Same story when you move homes.",
  "There are none when you do it with Flent. Because experience has always been at the center of what Flent does, and I'm carrying that same energy into the world of our referral program.",
  "",
  "YOLO by Flent is that corner of the internet where referral rewards feel less transactional, more experiential (hint: rewards that don't fit in a cart)",
  "",
  "If I design the way you should live with intention, so should the way I thank you for referring to it.",
  "",
  "- (not so genZ) marketer, Flent",
  "",
  "Also, yes, some slang dies and should stay dead – this one included. But I couldn't find a better word for that split-second energy of the 'f-it, let's do it' moment – the one I want you to have too.",
];

export const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeLine, setActiveLine] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const ruleY = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const coralRuleY = useTransform(scrollYProgress, [0.3, 0.7], [0, 24]);

  const smoothScrollY = useSpring(0, { stiffness: 120, damping: 22 });

  useEffect(() => {
    if (!scrollRef.current) return;

    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollTop = window.scrollY;
      const container = containerRef.current;
      if (!container) return;

      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const relativeScroll = scrollTop - containerTop + viewportHeight / 2;
      smoothScrollY.set(relativeScroll);

      // Calculate active line
      const lineElements = scrollRef.current.querySelectorAll("[data-line]");
      lineElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const center = viewportHeight / 2;
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        
        if (distance < viewportHeight * 0.14) {
          setActiveLine(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [smoothScrollY]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative min-h-[200vh] bg-light-bg"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          {/* Left: Title with parallax */}
          <motion.div
            data-depth="0.3"
            style={{ y: titleY }}
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

            {/* Reading window with masks */}
            <div className="relative h-[60vh] overflow-hidden">
              {/* Top gradient mask */}
              <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-light-bg to-transparent z-10 pointer-events-none" />
              
              {/* Bottom gradient mask */}
              <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-light-bg to-transparent z-10 pointer-events-none" />

              {/* Text content */}
              <div
                ref={scrollRef}
                className="absolute inset-0 flex flex-col justify-center items-start space-y-8 px-4"
              >
                {storyLines.map((line, index) => {
                  const isActive = index === activeLine;
                  const isNearby = Math.abs(index - activeLine) <= 1;
                  
                  return (
                    <motion.p
                      key={index}
                      data-line={index}
                      className="text-xl md:text-2xl font-sans leading-relaxed transition-all duration-220"
                      style={{
                        color: isActive 
                          ? "hsl(var(--dark-text))"
                          : isNearby
                          ? "rgba(10, 10, 10, 0.5)"
                          : "rgba(10, 10, 10, 0.18)",
                        transform: isActive ? "translateY(0)" : "translateY(8px)",
                        textShadow: !isActive ? "0 0 0.5px rgba(10, 10, 10, 0.3)" : "none",
                      }}
                    >
                      {line || "\u00A0"}
                    </motion.p>
                  );
                })}
              </div>

              {/* L3: Coral accent rule */}
              <motion.div
                data-depth="0.5"
                style={{ y: coralRuleY }}
                className="absolute right-0 top-[45%] w-6 md:w-12 h-px bg-coral opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
