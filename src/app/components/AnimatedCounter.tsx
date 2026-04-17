import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedCounter({ value, className, style }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse numeric part and suffix
  const match = value.match(/^([\d,.]+)(.*)$/);
  const numericPart = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
  const suffix = match ? match[2] : value;
  const hasDecimals = match ? match[1].includes(".") : false;
  const isNumeric = match !== null;

  useEffect(() => {
    if (!ref.current || !isNumeric) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericPart * eased;

            if (hasDecimals) {
              setDisplay(current.toFixed(1));
            } else if (numericPart >= 1000) {
              setDisplay(Math.floor(current).toLocaleString());
            } else {
              setDisplay(Math.floor(current).toString());
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Set final value exactly as provided
              setDisplay(match![1]);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericPart, hasDecimals, hasAnimated, isNumeric, match]);

  if (!isNumeric) {
    return <span ref={ref} className={className} style={style}>{value}</span>;
  }

  return (
    <span ref={ref} className={className} style={style}>
      {display}{suffix}
    </span>
  );
}
