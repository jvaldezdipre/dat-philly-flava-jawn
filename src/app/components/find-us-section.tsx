import { useRef } from "react";
import { motion } from "motion/react";
import { useScrollParallax } from "../hooks/use-scroll-parallax";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SOCIALS = [
  {
    name: "Instagram",
    url: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.18a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.56a8.23 8.23 0 0 0 4.76 1.51V6.69h-1z" />
      </svg>
    ),
  },
];

export function FindUsSection({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxY = useScrollParallax(sectionRef, scrollContainerRef);

  return (
    <section
      ref={sectionRef}
      id="find-us"
      className="sticky top-0 z-[4] overflow-hidden py-20 md:py-16 md:min-h-screen md:snap-start md:flex md:items-center bg-brand-pink shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
    >
      <motion.div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute top-[-5%] left-[20%] w-[450px] h-[450px] rounded-full bg-white/[0.05]" />
        <div className="absolute bottom-[10%] right-[-8%] w-[550px] h-[550px] rounded-full bg-white/[0.04]" />
      </motion.div>

      <div className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-10 md:mb-14">
            <h2
              className="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-4 text-white"
              style={{ fontFamily: "'Boogaloo', cursive" }}
            >
              Track The Truck.
            </h2>
            <p
              className="text-[15px] md:text-[17px] font-medium tracking-wide uppercase text-white/80"
              style={{ fontFamily: "'Neue Montreal', sans-serif" }}
            >
              Follow us to find out where we're pulling up next.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-14">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
              >
                {social.icon}
                <span
                  className="text-[15px] font-medium tracking-wide"
                  style={{ fontFamily: "'Neue Montreal', sans-serif" }}
                >
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          <div className="mb-10 md:mb-14">
            <h3
              className="text-white text-[22px] md:text-[26px] text-center mb-6"
              style={{ fontFamily: "'Boogaloo', cursive" }}
            >
              Weekly Schedule
            </h3>
            <div className="rounded-2xl overflow-hidden border border-white/20">
              {DAYS.map((day, i) => (
                <div
                  key={day}
                  className={`flex items-center justify-between px-5 md:px-8 py-3 md:py-4 ${
                    i !== DAYS.length - 1 ? "border-b border-white/10" : ""
                  } ${i % 2 === 0 ? "bg-white/[0.06]" : "bg-white/[0.02]"}`}
                >
                  <span
                    className="text-white font-medium text-[15px] md:text-[16px] min-w-[100px]"
                    style={{ fontFamily: "'Neue Montreal', sans-serif" }}
                  >
                    {day}
                  </span>
                  <span
                    className="text-white/60 text-[13px] md:text-[15px] text-right"
                    style={{ fontFamily: "'Neue Montreal', sans-serif" }}
                  >
                    Check socials for daily location
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-2">
            <p
              className="text-white/80 text-[15px] md:text-[16px]"
              style={{ fontFamily: "'Neue Montreal', sans-serif" }}
            >
              <a
                href="tel:+15551234567"
                className="hover:text-white transition-colors"
              >
                (555) 123-4567
              </a>
            </p>
            <p
              className="text-white/80 text-[15px] md:text-[16px]"
              style={{ fontFamily: "'Neue Montreal', sans-serif" }}
            >
              <a
                href="mailto:hello@daphillyflavajawn.com"
                className="hover:text-white transition-colors"
              >
                hello@daphillyflavajawn.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
