import { useEffect, useRef, useState } from "react";

/**
 * Swiss Pixel Reveal — animation de lancement.
 * Grille de cases noires qui se dissolvent (scale + fade) depuis le centre
 * pour révéler le site. Une seule fois au mount.
 */
export function PixelReveal({
  cols = 24,
  rows = 16,
  duration = 1.1,
  onComplete,
}: {
  cols?: number;
  rows?: number;
  duration?: number;
  onComplete?: () => void;
}) {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      onComplete?.();
      return;
    }

    const total = cols * rows;
    const cells = containerRef.current?.querySelectorAll<HTMLDivElement>("[data-cell]");
    if (!cells || cells.length === 0) return;

    const centerX = (cols - 1) / 2;
    const centerY = (rows - 1) / 2;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

    cells.forEach((cell, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const dist = Math.sqrt((c - centerX) ** 2 + (r - centerY) ** 2);
      const delay = (dist / maxDist) * (duration * 0.65);

      cell.style.transition = `opacity ${duration * 0.45}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration * 0.45}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;
      // force reflow
      void cell.offsetWidth;
      cell.style.opacity = "0";
      cell.style.transform = "scale(0.15)";
    });

    const timer = window.setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, (duration + 0.15) * 1000);

    return () => clearTimeout(timer);
  }, [cols, rows, duration, done, onComplete]);

  if (done) return null;

  const cells = Array.from({ length: cols * rows }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] grid pointer-events-none"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        background: "#0a0a0b",
      }}
      aria-hidden
    >
      {cells.map((i) => (
        <div
          key={i}
          data-cell
          className="origin-center"
          style={{
            background: i % 7 === 0 ? "#1a120e" : "#0a0a0b",
            opacity: 1,
            transform: "scale(1)",
            border: "0.5px solid rgba(249,115,22,0.04)",
          }}
        />
      ))}
    </div>
  );
}
