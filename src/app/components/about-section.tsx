import { useRef } from "react";
import { motion } from "motion/react";
import { useScrollParallax } from "../hooks/use-scroll-parallax";

export function AboutSection({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxY = useScrollParallax(sectionRef, scrollContainerRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="sticky top-0 z-[2] overflow-hidden py-20 md:py-16 md:min-h-screen md:snap-start md:flex md:items-center bg-brand-pink shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
    >
      <motion.div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-white/[0.06]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-white/[0.04]" />
      </motion.div>

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-white">
            <h2
              className="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "'Boogaloo', cursive" }}
            >
              Straight Outta Philly. Served In Columbia.
            </h2>
            <p
              className="text-[16px] md:text-[18px] font-medium tracking-wide uppercase mb-8 text-white/80"
              style={{ fontFamily: "'Neue Montreal', sans-serif" }}
            >
              Real Water Ice. Real Fruit Flavor. No Cap.
            </p>
            <div
              className="space-y-5 text-[16px] md:text-[17px] leading-relaxed text-white/90"
              style={{ fontFamily: "'Neue Montreal', sans-serif" }}
            >
              <p>
                This ain't no corner store slushie, and it definitely ain't a
                snow cone. DaPhillyFlavaJawn is the real deal — authentic Philly
                water ice made fresh with real fruit and that smooth, icy texture
                that hits different on a hot day.
              </p>
              <p>
                We've been doing it the way it's been done on Philly block
                corners for decades — slow churned, packed tight, and bursting
                with flavor. Every cup is a vibe.
              </p>
              <p>
                Now we're bringing that same Philly energy down to Columbia, SC.
                Same recipes. Same hustle. Same jawn — just with a little
                Southern heat to go with it.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full aspect-[4/5] max-w-[400px] rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
              <span
                className="text-white/40 text-[18px] tracking-widest uppercase"
                style={{ fontFamily: "'Neue Montreal', sans-serif" }}
              >
                Photo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
