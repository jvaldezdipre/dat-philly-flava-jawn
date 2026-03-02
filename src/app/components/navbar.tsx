import { motion } from "motion/react";
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
  const handleClick = (i: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ top: i * container.clientHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center justify-between w-full">
      <div className="shrink-0">
        <span className="text-white text-[22px] tracking-[2px]" style={{ fontFamily: "'Boogaloo', cursive", fontWeight: 400 }}>
          DAPHILLYFLAVAJAWN
        </span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bg-white/17 rounded-full flex items-center p-[2.5px] gap-[7px]">
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
    </div>
  );
}
