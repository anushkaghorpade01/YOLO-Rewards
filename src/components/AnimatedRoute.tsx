import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type StepConfig = {
  id: number;
  copy: JSX.Element;
  desktopPosition: { left: string; top: string };
  mobilePosition: { left: string; top: string };
  desktopTextOffset: number;
  mobileTextOffset: number;
  mobileMaxWidth?: string;
  align?: "left" | "center" | "right";
};

const STEPS: StepConfig[] = [
  {
    id: 1,
    copy: (
      <>
        Fill in your details and share with <span className="font-semibold">4 friends</span>.
      </>
    ),
    desktopPosition: { left: "16%", top: "66px" },
    mobilePosition: { left: "16%", top: "64px" },
    desktopTextOffset: 12,
    mobileTextOffset: 20,
    mobileMaxWidth: "110px",
    align: "center",
  },
  {
    id: 2,
    copy: (
      <>
        When they book, they&apos;ll include your <span className="font-semibold">name</span> and{" "}
        <span className="font-semibold">number</span> in the onboarding form.
      </>
    ),
    desktopPosition: { left: "52%", top: "50px" },
    mobilePosition: { left: "52%", top: "48px" },
    desktopTextOffset: 32,
    mobileTextOffset: 20,
    mobileMaxWidth: "150px",
    align: "center",
  },
  {
    id: 3,
    copy: (
      <>
        You win an all-expenses-paid trip to the <span className="font-semibold">GOAT Tour India, Mumbai.</span>
      </>
    ),
    desktopPosition: { left: "94%", top: "66px" },
    mobilePosition: { left: "86%", top: "64px" },
    desktopTextOffset: 12,
    mobileTextOffset: 20,
    mobileMaxWidth: "130px",
    align: "center",
  },
];

const circleBaseClasses =
  "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border-2 font-semibold text-sm sm:text-lg will-change-transform";

const STEP_SEQUENCE = [1, 2, 3];

export const AnimatedRoute = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % STEP_SEQUENCE.length;
      setActiveStep(STEP_SEQUENCE[index]);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = (event: MediaQueryList | MediaQueryListEvent) => {
      const matches = "matches" in event ? event.matches : event.currentTarget?.matches;
      if (typeof matches === "boolean") {
        setIsMobile(matches);
      }
    };

    update(mq);
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
    } else {
      mq.addListener(update);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", update);
      } else {
        mq.removeListener(update);
      }
    };
  }, []);

  const pathDefinition = isMobile
    ? "M60 68 C124 44 188 44 236 58 C282 72 332 74 360 66"
    : "M102 72 C220 28 280 28 332 60 C384 92 500 92 602 72";

  const containerWidthClass = isMobile ? "max-w-[360px]" : "max-w-4xl";

  return (
    <div className={`relative mx-auto w-full ${containerWidthClass}`}>
      <div className="relative h-[240px]">
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox={isMobile ? "0 0 400 200" : "0 0 640 240"}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={pathDefinition}
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="12 12"
            className="text-dark-text/70"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {STEPS.map((step) => {
          const isActive = activeStep === step.id;
          const inactiveColor = "hsl(var(--dark-text))";
          const position = isMobile ? step.mobilePosition : step.desktopPosition;
          const textOffset = (isMobile ? step.mobileTextOffset : step.desktopTextOffset) ?? 12;
          const mobileWidthClass = isMobile && step.mobileMaxWidth ? step.mobileMaxWidth : undefined;

          return (
            <div
              key={step.id}
                className="absolute flex -translate-x-1/2 flex-col items-center text-center"
              style={position}
            >
              <motion.div
                className={circleBaseClasses}
                animate={{
                  backgroundColor: isActive ? "hsl(var(--coral))" : "hsl(var(--light-bg))",
                  borderColor: isActive ? "hsl(var(--coral))" : inactiveColor,
                  color: isActive ? "hsl(var(--light-text))" : inactiveColor,
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {step.id}
              </motion.div>

              <motion.p
                className="max-w-[120px] sm:max-w-[200px] text-[9px] leading-[1.25] text-dark-text/90 sm:text-sm"
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : 0.78,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ marginTop: textOffset, maxWidth: mobileWidthClass }}
              >
                {step.copy}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
