import { useRef, useEffect, useState, useCallback } from "react";

export function HeroText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(100);
  const [displayText, setDisplayText] = useState(text);
  const [opacity, setOpacity] = useState(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const fitText = useCallback((t?: string) => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const containerWidth = container.clientWidth;

    // Temporarily measure at 100px to get natural width
    const measure = document.createElement("span");
    measure.style.fontFamily = "'Anton', sans-serif";
    measure.style.fontSize = "100px";
    measure.style.fontWeight = "400";
    measure.style.letterSpacing = "4px";
    measure.style.whiteSpace = "nowrap";
    measure.style.position = "absolute";
    measure.style.visibility = "hidden";
    measure.textContent = t || textEl.textContent;
    document.body.appendChild(measure);
    const naturalWidth = measure.offsetWidth;
    document.body.removeChild(measure);

    if (naturalWidth <= 0) return;

    const newSize = Math.floor((containerWidth / naturalWidth) * 100);
    setFontSize(newSize);
  }, []);

  // Handle text changes with fade
  useEffect(() => {
    if (text === displayText) return;

    // Fade out
    setOpacity(0);

    timeoutRef.current = setTimeout(() => {
      // Pre-calculate font size for the new text before showing it
      fitText(text);
      setDisplayText(text);
      // Small delay to let font size apply, then fade in
      requestAnimationFrame(() => {
        setOpacity(1);
      });
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [text, displayText, fitText]);

  // Resize observer for screen size changes (no animation, instant)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      fitText(displayText);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [fitText, displayText]);

  // Initial fit
  useEffect(() => {
    fitText(displayText);
  }, [fitText, displayText]);

  return (
    <div ref={containerRef} className="flex-1 flex items-center justify-center overflow-hidden py-4 w-full">
      <h1
        ref={textRef}
        className="text-white text-center whitespace-nowrap tracking-[4px]"
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: `${fontSize}px`,
          lineHeight: 1.1,
          fontWeight: 400,
          fontStyle: "normal",
          opacity,
          transition: "opacity 0.3s ease",
        }}
      >
        {displayText}
      </h1>
    </div>
  );
}
