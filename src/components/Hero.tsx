import { useEffect, useRef, useState } from "react";
import { ParachuteSVG } from "./ParachuteSVG";

export const Hero = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const chuteRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const navTimer = setTimeout(() => setShowNavigation(true), 2000);
    
    // Parachute animation
    if (chuteRef.current && dotRef.current) {
      const chute = chuteRef.current;
      const dot = dotRef.current;
      
      const animation = chute.animate(
        [
          { transform: "translate(-50%, -40vh) rotate(0deg)", opacity: "1" },
          { transform: "translate(-48%, -20vh) rotate(3deg)", opacity: "1" },
          { transform: "translate(-52%, -8vh) rotate(-2deg)", opacity: "1" },
          { transform: "translate(-50%, 0) rotate(0deg)", opacity: "1" }
        ],
        { duration: 1200, easing: "cubic-bezier(.22,.84,.36,1)", fill: "forwards" }
      );
      
      animation.finished.then(() => {
        chute.style.opacity = "0";
        dot.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 220, fill: "forwards", easing: "ease-out" }
        );
      });
    }
    
    return () => {
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
    <section id="hero" className="relative min-h-screen bg-dark-bg text-light-text grid place-items-center overflow-hidden">
      <div className="text-center leading-[1.05] px-6">
        <h1 className="font-display text-[clamp(40px,8vw,112px)] text-light-text leading-none mb-2">
          You only live once.
        </h1>
        <p className="font-display italic text-[clamp(24px,4.5vw,56px)] text-light-text/90 leading-none relative inline-block">
          <span className="ml-4 md:ml-8">Do it with Flent</span>
          <span 
            ref={dotRef}
            id="hero-dot" 
            className="inline-block translate-y-[-0.15em] text-[1em] text-coral opacity-0 ml-1"
          >
            •
          </span>
          <div 
            ref={chuteRef}
            id="chute" 
            className="absolute -top-[40vh] left-1/2 -translate-x-1/2 w-[84px] opacity-0"
          >
            <ParachuteSVG />
          </div>
        </p>
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="absolute bottom-12 right-12 flex gap-4 text-sm font-sans animate-fade-in">
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
        </div>
      )}
    </section>
  );
};
