"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/navbar";
import { HeroText } from "./components/hero-text";
import { BottomSection } from "./components/bottom-section";
import { AboutSection } from "./components/about-section";
import { BookUsSection } from "./components/book-us-section";
import { FindUsSection } from "./components/find-us-section";
import { products } from "./products";
import bgVideo from "@/assets/Truck_drive_from_left_middle_delpmaspu_.mp4";

const BACKGROUND_VIDEO_STOP_AT = 5;
const SLIDE_OFFSET = 120;

function getImageSrc(img: string | { src: string }): string {
  return typeof img === "string" ? img : img.src;
}

// Direction: 0 = initial load, 1 = next (out left / in from right), -1 = prev (out right / in from left)
const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? SLIDE_OFFSET : -SLIDE_OFFSET,
    opacity: 0,
    ...(direction === 0 && { scale: 0.3, y: 80 }),
  }),
  exit: (direction: number) => ({
    x: direction > 0 ? -SLIDE_OFFSET : SLIDE_OFFSET,
    opacity: 0,
    transition: { duration: 0.35, ease: "easeInOut" as const },
  }),
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoPaused, setVideoPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const currentProduct = products[currentIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredAnimations = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const vh = container.clientHeight;
      const index = Math.min(
        Math.round(scrollTop / vh),
        3,
      );
      setActiveNavIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= BACKGROUND_VIDEO_STOP_AT) {
      video.pause();
      video.currentTime = BACKGROUND_VIDEO_STOP_AT;
      if (!hasTriggeredAnimations.current) {
        hasTriggeredAnimations.current = true;
        setVideoPaused(true);
      }
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-5"
      initial={{ y: -60, opacity: 0 }}
      animate={videoPaused ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navbar activeIndex={activeNavIndex} onNavigate={setActiveNavIndex} scrollContainerRef={scrollContainerRef} />
    </motion.div>

    <div
      ref={scrollContainerRef}
      className="md:h-screen md:overflow-y-auto md:snap-y md:snap-mandatory"
    >
    <motion.div
      id="flavors"
      className="sticky top-0 z-[1] min-h-screen overflow-x-hidden md:snap-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background video - plays then pauses at 5 seconds */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={bgVideo}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          autoPlay
          playsInline
          onTimeUpdate={handleVideoTimeUpdate}
          aria-hidden
        />
      </div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Background glow - soft circular gradient, no hard edges */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-visible">
        <motion.div
          className="absolute inset-0 opacity-80 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${currentProduct.glowColor}, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={videoPaused ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Center product image overlay - starts when video pauses at 5s */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {currentProduct.centerImage && (
            <motion.div
              key={currentProduct.name}
              className="pointer-events-auto cursor-pointer"
              initial={{ opacity: 0, scale: 0.3, y: 80 }}
              animate={
                videoPaused
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.3, y: 80 }
              }
              exit={{ opacity: 0, scale: 0.8, y: -40, transition: { duration: 0.3 } }}
              transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.08,
                rotate: 3,
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              <motion.img
                src={getImageSrc(currentProduct.centerImage)}
                alt={currentProduct.name}
                className="w-[400px] h-[55vh] object-contain drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating accent image (top-right) - starts when video pauses at 5s, hidden on mobile */}
      <AnimatePresence mode="wait">
        {currentProduct.floatingImage && (
          <motion.img
            key={`float-${currentProduct.name}`}
            src={getImageSrc(currentProduct.floatingImage)}
            alt={`${currentProduct.name} accent`}
            className="absolute top-[10%] right-[8%] w-[180px] md:w-[220px] object-contain z-15 pointer-events-none drop-shadow-xl hidden md:block"
            initial={{ opacity: 0, x: 60, rotate: 15 }}
            animate={
              videoPaused
                ? { opacity: 1, x: 0, rotate: -8, y: [0, -12, 0] }
                : { opacity: 0, x: 60, rotate: 15 }
            }
            exit={{ opacity: 0, x: 60, rotate: 15, transition: { duration: 0.3 } }}
            transition={{
              opacity: { duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating accent image 2 (bottom-center-right) - starts when video pauses at 5s, hidden on mobile */}
      <AnimatePresence mode="wait">
        {currentProduct.floatingImage2 && (
          <motion.img
            key={`float2-${currentProduct.name}`}
            src={getImageSrc(currentProduct.floatingImage2)}
            alt={`${currentProduct.name} accent 2`}
            className="absolute bottom-[6%] left-[55%] w-[160px] md:w-[200px] object-contain z-15 pointer-events-none drop-shadow-xl hidden md:block"
            initial={{ opacity: 0, y: 50, rotate: -10 }}
            animate={
              videoPaused
                ? { opacity: 1, y: [0, -10, 0], rotate: 5 }
                : { opacity: 0, y: 50, rotate: -10 }
            }
            exit={{ opacity: 0, y: 50, rotate: -10, transition: { duration: 0.3 } }}
            transition={{
              opacity: { duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.8 },
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating accent image 3 (top-left) - starts when video pauses at 5s, hidden on mobile */}
      <AnimatePresence mode="wait">
        {currentProduct.floatingImage3 && (
          <motion.img
            key={`float3-${currentProduct.name}`}
            src={getImageSrc(currentProduct.floatingImage3)}
            alt={`${currentProduct.name} accent 3`}
            className="absolute top-[10%] left-[4%] w-[150px] md:w-[190px] object-contain z-15 pointer-events-none drop-shadow-xl hidden md:block"
            initial={{ opacity: 0, y: -50, rotate: 10 }}
            animate={
              videoPaused
                ? { opacity: 1, y: [0, -14, 0], rotate: -5 }
                : { opacity: 0, y: -50, rotate: 10 }
            }
            exit={{ opacity: 0, y: -50, rotate: 10, transition: { duration: 0.3 } }}
            transition={{
              opacity: { duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3.0 },
            }}
          />
        )}
      </AnimatePresence>

      {/* Content - hero text and bottom section start when video pauses at 5s */}
      <div className="relative z-10 flex flex-col min-h-screen px-8 md:px-14 pt-24 pb-7">
        {/* Container 1: Hero Text - starts when video pauses at 5s, slides with flavor change */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProduct.name}
            className="flex-1 flex"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate={
              videoPaused
                ? { x: 0, scale: 1, opacity: 1 }
                : { x: 0, scale: 0.7, opacity: 0 }
            }
            exit="exit"
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroText text={currentProduct.heroText} />
          </motion.div>
        </AnimatePresence>

        {/* Container 3: Bottom Section */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={videoPaused ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <BottomSection
            currentIndex={currentIndex}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </motion.div>
      </div>
    </motion.div>

    <AboutSection scrollContainerRef={scrollContainerRef} />
    <BookUsSection scrollContainerRef={scrollContainerRef} />
    <FindUsSection scrollContainerRef={scrollContainerRef} />
    </div>
    </>
  );
}