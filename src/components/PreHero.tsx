import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const PreHero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const vignetteY = useTransform(scrollYProgress, [0, 0.1], [0, 12]);
  const ruleY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center bg-dark-bg"
      style={{ opacity }}
    >
      {/* L1: Vignette overlay */}
      <motion.div
        data-depth="0.15"
        style={{ y: vignetteY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark-bg/30" />
      </motion.div>

      {/* L2: Decorative rule */}
      <motion.div
        data-depth="0.3"
        style={{ y: ruleY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-px bg-light-text/10"
      />

      {/* L0: Content */}
      <div className="relative z-10 px-6 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-display text-light-text mb-4 tracking-tight">
            YOLO
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-light-text/60 space-y-2 mb-8"
        >
          <p className="text-lg font-sans italic">(slang)</p>
          <p className="text-xl font-sans">/ˈjō-lō/</p>
          <p className="text-base font-sans leading-relaxed">
            A phrase from the early 2010s, meaning <span className="text-light-text/80">"You Only Live Once."</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="text-light-text/70 text-sm font-sans"
        >
          Status:{" "}
          <span className="inline-block min-w-[120px] text-left">
            {isFlipped ? (
              <motion.span
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-coral"
              >
                resurrected
              </motion.span>
            ) : (
              <span className="text-light-text/40 line-through">deceased</span>
            )}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};
