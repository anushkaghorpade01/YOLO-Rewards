import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BookmarkModal } from "./BookmarkModal";

export const Experience = () => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();

  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 0.12]);
  const frameY = useTransform(scrollYProgress, [0.45, 0.55], [-40, 16]);
  const iconsY = useTransform(scrollYProgress, [0.45, 0.55], [0, 28]);

  const handleLike = async () => {
    setLiked(!liked);
    // In real app: increment Supabase likes table
    if (!liked) {
      toast({
        description: "Liked!",
      });
    }
  };

  const handleShare = () => {
    const url = "https://www.flent.in/?utm_source=YOLO%20Site&utm_medium=website&utm_campaign=YOLO";
    
    if (navigator.share) {
      navigator.share({
        title: "YOLO by Flent",
        text: "Check out YOLO by Flent - Refer and win!",
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        description: "Link copied to clipboard!",
      });
    }
  };

  const slides = [
    {
      type: "video",
      content: (
        <div className="w-full h-full bg-dark-bg flex items-center justify-center">
          <p className="text-light-text text-xl">📹 Reel placeholder</p>
        </div>
      ),
    },
    {
      type: "card",
      content: (
        <div className="w-full h-full bg-light-bg p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-3xl font-display text-dark-text mb-8">How to Refer</h3>
          <div className="space-y-6 text-left max-w-md">
            <p className="text-lg font-sans text-dark-text">
              <span className="font-bold">1️⃣</span> Share Flent Homes with your friends.
            </p>
            <p className="text-lg font-sans text-dark-text">
              <span className="font-bold">2️⃣</span> They book with your name + number.
            </p>
            <p className="text-lg font-sans text-dark-text">
              <span className="font-bold">3️⃣</span> You win the GOAT Tour India trip.
            </p>
          </div>
          <a
            href="https://flent.notion.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 text-sm text-coral hover:text-coral-hover underline transition-colors"
          >
            View Terms & Conditions
          </a>
        </div>
      ),
    },
    {
      type: "cta",
      content: (
        <div className="w-full h-full bg-coral flex flex-col items-center justify-center text-center p-8">
          <h3 className="text-4xl font-display text-light-text mb-4">Ready to win?</h3>
          <p className="text-xl font-sans text-light-text/90 mb-8">Start referring now</p>
          <button
            onClick={() => {
              const finalSection = document.getElementById("final");
              finalSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-dark-bg text-light-text rounded-lg font-sans font-semibold hover:scale-105 transition-transform"
          >
            Get Started
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <section id="experience" className="relative min-h-screen bg-dark-bg flex items-center justify-center py-20">
        {/* L1: Overlay */}
        <motion.div
          data-depth="0.15"
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-dark-bg pointer-events-none"
        />

        {/* L2: IG Frame */}
        <motion.div
          data-depth="0.3"
          style={{ y: frameY }}
          className="relative w-full max-w-md mx-auto px-6"
        >
          <div className="bg-dark-bg border border-light-text/20 rounded-card overflow-hidden shadow-elegant">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-light-text/10">
              <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center">
                <span className="text-light-text font-bold text-sm">F</span>
              </div>
              <div>
                <p className="font-sans font-semibold text-light-text text-sm">flent.homes</p>
                <p className="font-sans text-light-text/60 text-xs">YOLO Experience</p>
              </div>
            </div>

            {/* Slides */}
            <div className="relative aspect-square bg-dark-bg">
              {slides[currentSlide].content}
              
              {/* Slide indicators */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-light-text w-6" : "bg-light-text/40"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              {currentSlide > 0 && (
                <button
                  onClick={() => setCurrentSlide(currentSlide - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-dark-bg/80 text-light-text flex items-center justify-center hover:scale-110 transition-transform"
                >
                  ‹
                </button>
              )}
              {currentSlide < slides.length - 1 && (
                <button
                  onClick={() => setCurrentSlide(currentSlide + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-dark-bg/80 text-light-text flex items-center justify-center hover:scale-110 transition-transform"
                >
                  ›
                </button>
              )}
            </div>

            {/* L3: Icons row */}
            <motion.div
              data-depth="0.5"
              style={{ y: iconsY }}
              className="flex items-center gap-4 p-4 border-t border-light-text/10"
            >
              <button
                onClick={handleLike}
                className="hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-7 h-7 ${liked ? "fill-coral text-coral" : "text-light-text"}`}
                />
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
                className="hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-7 h-7 text-light-text" />
              </button>
              <button
                onClick={handleShare}
                className="hover:scale-110 transition-transform"
              >
                <Send className="w-7 h-7 text-light-text" />
              </button>
              <button
                onClick={() => setShowBookmark(true)}
                className="ml-auto hover:scale-110 transition-transform"
              >
                <Bookmark className="w-7 h-7 text-light-text" />
              </button>
            </motion.div>

            {/* Comments */}
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="border-t border-light-text/10 p-4 space-y-3"
              >
                <button className="w-full text-left px-4 py-2 bg-light-text/5 rounded-lg text-light-text/80 hover:bg-light-text/10 transition-colors font-sans">
                  Here to win 🏆
                </button>
                <button className="w-full text-left px-4 py-2 bg-light-text/5 rounded-lg text-light-text/80 hover:bg-light-text/10 transition-colors font-sans">
                  🐐
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      <BookmarkModal isOpen={showBookmark} onClose={() => setShowBookmark(false)} />
    </>
  );
};
