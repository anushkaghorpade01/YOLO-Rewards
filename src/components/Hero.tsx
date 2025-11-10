import React from "react";

export const Hero = () => {
  const scrollToStory = () => {
    const storySection = document.getElementById("story");
    storySection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExperience = () => {
    const experienceSection = document.getElementById("experience");
    experienceSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black text-light-text"
      style={{ overflow: "hidden" }}
    >
      <div className="absolute inset-0">
        <video
          className="hidden md:block w-full h-full object-cover"
          src="/hero-desktop.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <video
          className="block md:hidden w-full h-full object-cover"
          src="/hero%20mobile%20final.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-6 pb-16">
        <button
          onClick={scrollToExperience}
          className="px-7 py-3 rounded-full border border-light-text/70 text-light-text font-sans font-medium backdrop-blur hover:border-white transition"
        >
          Show me how
        </button>
      </div>
    </section>
  );
};
