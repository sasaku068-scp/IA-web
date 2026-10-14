import { useEffect, useRef } from "react";

/**
 * Fond de petites cases qui s'illuminent en orange au passage de la souris.
 * Performant : un seul canvas, pas de milliers de divs.
 */
export function InteractiveGrid({
  cellSize = 28,
  gap = 1,
  className = "",
}: {
  cellSize?: number;
  gap?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / (cellSize + gap)) + 1;
      rows = Math.ceil(height / (cellSize + gap)) + 1;
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const radius = 140; // zone d'illumination

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * (cellSize + gap);
          const y = r * (cellSize + gap);
          const cx = x + cellSize / 2;
          const cy = y + cellSize / 2;

          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // intensité 0 → 1 selon la distance
          let intensity = 0;
          if (dist < radius) {
            intensity = 1 - dist / radius;
            intensity = intensity * intensity; // courbe douce
          }

          // case de base très discrète
          ctx.fillStyle = `rgba(255, 120, 40, ${0.03 + intensity * 0.55})`;
          ctx.fillRect(x, y, cellSize, cellSize);

          // léger contour quand illuminée
          if (intensity > 0.15) {
            ctx.strokeStyle = `rgba(255, 140, 50, ${intensity * 0.6})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [cellSize, gap]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      aria-hidden
    />
  );
}
