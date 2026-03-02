"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { RefObject } from "react";

const NAV_ITEMS = [
  { label: "Flavors", paddingX: "px-[38px]", target: "flavors" },
  { label: "About", paddingX: "px-[25px]", target: "about" },
  { label: "Book Us", paddingX: "px-[26px]", target: "book-us" },
  { label: "Find Us", paddingX: "px-[26px]", target: "find-us" },
];

export function Navbar({
  activeIndex,
  onNavigate,
  scrollContainerRef,
}: {
  activeIndex: number;
  onNavigate: (index: number) => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (i: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ top: i * container.clientHeight, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative flex items-center justify-between w-full">
      <div className="shrink-0">
        <span className="text-white text-[22px] tracking-[2px]" style={{ fontFamily: "'Boogaloo', cursive", fontWeight: 400 }}>
          DAPHILLYFLAVAJAWN
        </span>
      </div>

      {/* Desktop: pill nav */}
      <div className="absolute left-1/2 -translate-x-1/2 bg-white/17 rounded-full items-center p-[2.5px] gap-[7px] hidden md:flex">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleClick(i)}
            className={`relative rounded-full py-[10px] font-['Neue_Montreal',sans-serif] text-[15px] cursor-pointer transition-colors ${item.paddingX} ${
              activeIndex === i ? "text-black" : "text-white hover:bg-white/10"
            }`}
          >
            {activeIndex === i && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile: hamburger button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            mobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            mobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile: slide-out menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] max-w-[85vw] bg-[#1a1a1a] z-[60] md:hidden shadow-2xl"
            >
              <div className="flex flex-col pt-20 px-6 gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleClick(i)}
                    className={`text-left py-4 px-4 rounded-lg font-['Neue_Montreal',sans-serif] text-[18px] transition-colors ${
                      activeIndex === i ? "text-[#FFD200] bg-white/10" : "text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
