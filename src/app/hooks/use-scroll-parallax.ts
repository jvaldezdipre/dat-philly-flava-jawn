import { useScroll, useTransform, type MotionValue } from "motion/react";
import type { RefObject } from "react";

export function useScrollParallax(
  target: RefObject<HTMLElement | null>,
  container?: RefObject<HTMLElement | null>,
  range = 80,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target,
    container,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, [0, 1], [range, -range]);
}
