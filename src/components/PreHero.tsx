export const PreHero = () => {
  return (
    <section id="prehero" className="min-h-screen bg-dark-bg text-light-text grid place-content-center">
      <div className="space-y-4 max-w-[68ch] px-6">
        <p className="font-sans text-lg text-light-text/80 italic">(slang)</p>
        <p className="font-sans text-lg text-light-text/80">/ˈjō-lō/</p>
        <p className="font-sans text-base leading-relaxed text-light-text/80">
          A phrase from the early 2010s, meaning <span className="text-light-text">"You Only Live Once."</span>
        </p>
        <p className="font-sans text-lg text-light-text/70">
          Status:{" "}
          <span className="inline-block relative w-[10ch] h-[1.4em] align-baseline">
            <span className="absolute inset-0 origin-bottom flip-out text-light-text/40 line-through">deceased</span>
            <span className="absolute inset-0 origin-top flip-in text-coral">resurrected</span>
          </span>
        </p>
      </div>
    </section>
  );
};
