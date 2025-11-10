import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PARAGRAPHS } from "@/data/storyCopy";

const StoryStepper = () => {
  return (
    <div className="space-y-6">
      {PARAGRAPHS.map((p, idx) => (
        <div
          key={idx}
          className="text-dark-text leading-[1.6] md:leading-[1.55]"
          style={{ fontSize: "clamp(18px, 2.4vw, 36px)", letterSpacing: "0.005em" }}
          dangerouslySetInnerHTML={{ __html: p.html }}
        />
      ))}
    </div>
  );
};

export const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const ruleY = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const contentScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.98, 1, 1, 0.98]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative pt-0 md:pt-3 lg:pt-3 pb-2 md:pb-7 lg:pb-7 bg-light-bg grid-background"
    >
      <motion.div
        style={{ scale: contentScale }}
        className="container mx-auto px-6 grid md:grid-cols-7 gap-8 items-start"
      >
        <motion.div
          data-depth="0.3"
          style={{ y: titleY, opacity: titleOpacity }}
          className="md:col-span-2 flex flex-col items-center md:items-start gap-8 relative pb-44 md:pb-56"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl heading-display text-dark-text leading-none text-center md:text-left">
            YOLO by Flent
          </h2>

          <img
            src="/future-you-will-thank-you-2.svg"
            alt="Hands illustration"
            className="absolute bottom-0 left-1/2 -translate-x-[58%] w-full max-w-[320px] sm:max-w-[380px] md:max-w-[560px] md:-ml-6 pointer-events-none select-none"
            loading="lazy"
          />
        </motion.div>

        <div className="md:col-span-5 relative">
          <motion.div
            data-depth="0.15"
            style={{ y: ruleY }}
            className="absolute -left-8 top-0 bottom-0 w-px bg-dark-text/6"
          />

          <StoryStepper />

        </div>
      </motion.div>

    </section>
  );
};
