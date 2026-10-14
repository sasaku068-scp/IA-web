import { useEffect, useRef } from "react";

/**
 * Fond élégant : grille fine + halo orange qui suit la souris.
 * Pas de cubes bizarres — lignes discrètes + glow doux et fluide.
 */
export function InteractiveGrid({
  cellSize = 48,
  className = "",
}: {
  cellSize?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
    };

    const onLeave = () => {
      mouse.current.tx = -9999;
      mouse.current.ty = -9999;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      // smooth follow
      mouse.current.x = lerp(mouse.current.x, mouse.current.tx, 0.12);
      mouse.current.y = lerp(mouse.current.y, mouse.current.ty, 0.12);

      ctx.clearRect(0, 0, width, height);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const hasMouse = mx > -100 && my > -100;

      // subtle ambient vignette
      const ambient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.3,
        Math.max(width, height) * 0.7,
      );
      ambient.addColorStop(0, "rgba(249, 115, 22, 0.03)");
      ambient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      // grid lines
      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;

      for (let c = 0; c <= cols; c++) {
        const x = c * cellSize;
        let alpha = 0.04;
        if (hasMouse) {
          const d = Math.abs(x - mx);
          if (d < 180) alpha = 0.04 + (1 - d / 180) * 0.22;
        }
        ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let r = 0; r <= rows; r++) {
        const y = r * cellSize;
        let alpha = 0.04;
        if (hasMouse) {
          const d = Math.abs(y - my);
          if (d < 180) alpha = 0.04 + (1 - d / 180) * 0.22;
        }
        ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // soft orange spotlight following cursor
      if (hasMouse) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
        glow.addColorStop(0, "rgba(249, 115, 22, 0.14)");
        glow.addColorStop(0.4, "rgba(249, 115, 22, 0.05)");
        glow.addColorStop(1, "rgba(249, 115, 22, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        // tiny bright core
        const core = ctx.createRadialGradient(mx, my, 0, mx, my, 40);
        core.addColorStop(0, "rgba(251, 146, 60, 0.18)");
        core.addColorStop(1, "rgba(251, 146, 60, 0)");
        ctx.fillStyle = core;
        ctx.fillRect(mx - 50, my - 50, 100, 100);
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
  }, [cellSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      aria-hidden
    />
  );
}
