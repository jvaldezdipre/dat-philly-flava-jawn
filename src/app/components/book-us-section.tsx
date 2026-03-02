import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useScrollParallax } from "../hooks/use-scroll-parallax";

const EVENT_TYPES = [
  "Birthday Party",
  "Block Party",
  "Wedding",
  "Corporate Event",
  "Festival",
  "Other",
];

const inputBase =
  "w-full px-4 py-3 rounded-xl bg-white border-2 border-[#1a1a1a]/10 text-[#1a1a1a] placeholder-[#1a1a1a]/40 focus:border-brand-pink focus:outline-none transition-colors font-['Neue_Montreal',sans-serif] text-[15px]";

export function BookUsSection({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxY = useScrollParallax(sectionRef, scrollContainerRef);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="book-us"
      className="sticky top-0 z-[3] overflow-hidden py-20 md:py-12 md:min-h-screen md:snap-start md:flex md:items-center bg-brand-yellow shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
    >
      <motion.div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute top-[-10%] left-[50%] w-[600px] h-[600px] rounded-full bg-[#1a1a1a]/[0.03]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#1a1a1a]/[0.04]" />
      </motion.div>

      <div className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-10 md:mb-12">
            <h2
              className="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] tracking-tight mb-4 text-[#1a1a1a]"
              style={{ fontFamily: "'Boogaloo', cursive" }}
            >
              Bring The Jawn To Your Event.
            </h2>
            <p
              className="text-[15px] md:text-[17px] font-medium tracking-wide uppercase text-[#1a1a1a]/70"
              style={{ fontFamily: "'Neue Montreal', sans-serif" }}
            >
              Birthdays. Block Parties. Weddings. Corporate Events. We Pull Up.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16">
              <h3
                className="text-[28px] md:text-[36px] text-[#1a1a1a] mb-4"
                style={{ fontFamily: "'Boogaloo', cursive" }}
              >
                We Got You.
              </h3>
              <p
                className="text-[#1a1a1a]/70 text-[17px]"
                style={{ fontFamily: "'Neue Montreal', sans-serif" }}
              >
                We'll hit you back real soon. Get ready for that Philly flavor.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className={inputBase}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className={inputBase}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className={inputBase}
                />
                <select
                  name="eventType"
                  required
                  defaultValue=""
                  className={`${inputBase} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Event Type
                  </option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="eventDate"
                  required
                  className={inputBase}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  required
                  className={inputBase}
                />
              </div>
              <input
                type="number"
                name="estimatedGuests"
                placeholder="Estimated Guests"
                min="1"
                className={inputBase}
              />
              <textarea
                name="message"
                placeholder="Message / Details"
                rows={3}
                className={`${inputBase} resize-none`}
              />
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-4 rounded-full bg-brand-pink text-white text-[16px] font-medium tracking-wide uppercase cursor-pointer hover:brightness-110 transition-all"
                style={{ fontFamily: "'Neue Montreal', sans-serif" }}
              >
                Book The Jawn
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
