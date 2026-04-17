import { useRef, useEffect, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  layer: number;
}

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initNodes = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 14000), 100);
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      const layer = Math.floor(Math.random() * 3);
      const speed = [0.1, 0.18, 0.25][layer];
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: [0.5, 1, 1.5][layer] + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        layer,
      });
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      timeRef.current += 0.002;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const connectionDist = Math.min(w * 0.12, 130);
      const mouseDist = 200;

      for (const node of nodes) {
        const drift = [0.06, 0.1, 0.14][node.layer];
        node.x += node.vx + Math.sin(t * 0.8 + node.phase) * drift;
        node.y += node.vy + Math.cos(t * 0.6 + node.phase * 1.3) * drift;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist && dist > 0) {
          const force = (mouseDist - dist) / mouseDist;
          const strength = [0.006, 0.01, 0.016][node.layer];
          node.x -= dx * force * strength;
          node.y -= dy * force * strength;
        }

        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;
      }

      // Draw connections & nodes with blue tones
      for (let layer = 0; layer < 3; layer++) {
        const layerNodes = nodes.filter((n) => n.layer === layer);
        const nodeAlpha = [0.04, 0.07, 0.12][layer];
        const lineAlpha = [0.02, 0.04, 0.08][layer];

        for (let i = 0; i < layerNodes.length; i++) {
          for (let j = i + 1; j < layerNodes.length; j++) {
            const dx = layerNodes[i].x - layerNodes[j].x;
            const dy = layerNodes[i].y - layerNodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDist) {
              const fade = (1 - dist / connectionDist);
              const midX = (layerNodes[i].x + layerNodes[j].x) / 2;
              const midY = (layerNodes[i].y + layerNodes[j].y) / 2;
              const mDx = mouse.x - midX;
              const mDy = mouse.y - midY;
              const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
              const nearMouse = mDist < mouseDist;

              if (nearMouse) {
                const glow = (1 - mDist / mouseDist);
                ctx.strokeStyle = `rgba(37, 99, 235, ${fade * lineAlpha + glow * 0.2})`;
                ctx.lineWidth = 0.5 + glow * 0.5;
              } else {
                ctx.strokeStyle = `rgba(37, 99, 235, ${fade * lineAlpha})`;
                ctx.lineWidth = [0.2, 0.3, 0.4][layer];
              }
              ctx.beginPath();
              ctx.moveTo(layerNodes[i].x, layerNodes[i].y);
              ctx.lineTo(layerNodes[j].x, layerNodes[j].y);
              ctx.stroke();
            }
          }
        }

        for (const node of layerNodes) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const nearMouse = dist < mouseDist;
          const pulse = Math.sin(t * 1.5 + node.phase) * 0.3 + 0.7;

          if (nearMouse) {
            const glow = 1 - dist / mouseDist;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 4 * glow, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${glow * 0.06})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * (1 + glow * 0.8), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${0.3 + glow * 0.4})`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${nodeAlpha * pulse})`;
            ctx.fill();
          }
        }
      }

      // Mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        g.addColorStop(0, "rgba(37, 99, 235, 0.04)");
        g.addColorStop(0.5, "rgba(37, 99, 235, 0.02)");
        g.addColorStop(1, "rgba(37, 99, 235, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
