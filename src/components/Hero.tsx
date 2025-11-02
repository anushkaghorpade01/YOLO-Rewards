import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParachuteSVG } from "./ParachuteSVG";

export const Hero = () => {
  const [showPeriod, setShowPeriod] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const bgY = useTransform(scrollYProgress, [0, 0.2], [0, 12]);
  const parachuteY = useTransform(scrollYProgress, [0, 0.2], [0, 30]);
  const dustY = useTransform(scrollYProgress, [0, 0.2], [0, 60]);

  useEffect(() => {
    const periodTimer = setTimeout(() => setShowPeriod(true), 1200);
    const navTimer = setTimeout(() => setShowNavigation(true), 2000);
    return () => {
      clearTimeout(periodTimer);
      clearTimeout(navTimer);
    };
  }, []);

  const scrollToStory = () => {
    const storySection = document.getElementById("story");
    storySection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExperience = () => {
    const experienceSection = document.getElementById("experience");
    experienceSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark-bg overflow-hidden">
      {/* L1: Background grain */}
      <motion.div
        data-depth="0.15"
        style={{ 
          y: bgY,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
      />

      {/* L3: Ambient dust */}
      <motion.div
        data-depth="0.5"
        style={{ y: dustY }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/3 w-1 h-1 bg-light-text/20 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -15, 20, 0],
            y: [0, 20, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-2/3 right-1/4 w-1 h-1 bg-light-text/20 rounded-full"
        />
      </motion.div>

      {/* L2: Parachute with sway */}
      <motion.div
        data-depth="0.3"
        style={{ y: parachuteY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {!showPeriod && (
            <motion.div
              initial={{ y: -200, x: 20, rotate: 5, opacity: 0 }}
              animate={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <ParachuteSVG />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* L0: Content */}
      <div className="relative z-10 px-6 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display text-light-text leading-none mb-4"
        >
          You only live once.
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display text-light-text/90 leading-none italic flex items-center justify-center gap-2 md:gap-3"
        >
          <span className="ml-8 md:ml-16">Do it with Flent</span>
          {showPeriod && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-coral"
            />
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      {showNavigation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-12 right-12 flex gap-4 text-sm font-sans"
        >
          <button
            onClick={scrollToStory}
            className="text-light-text/60 hover:text-coral transition-colors duration-300"
          >
            Scroll for the story
          </button>
          <span className="text-light-text/40">•</span>
          <button
            onClick={scrollToExperience}
            className="text-light-text/60 hover:text-coral transition-colors duration-300 flex items-center gap-2"
          >
            Skip to the experience <span className="text-xs">↓</span>
          </button>
        </motion.div>
      )}
    </section>
  );
};
