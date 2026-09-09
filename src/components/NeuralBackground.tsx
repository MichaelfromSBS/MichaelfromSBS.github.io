import React, { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  energy: number;
  head: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<PulseWave[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -1000,
    y: -1000,
    isInside: false,
  });
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const getIsDark = () => document.documentElement.classList.contains('dark');

  const initNodes = useCallback((width: number, height: number) => {
    // Subtle density: fewer nodes so the background remains spacious and elegant
    const count = Math.min(Math.floor((width * height) / 18000), 50);
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseRadius: Math.random() * 1.2 + 1.6,
        radius: 2.0,
        energy: 0,
        head: Math.floor(Math.random() * 3),
      });
    }

    nodesRef.current = nodes;
  }, []);

  const triggerActivationPulse = useCallback((x?: number, y?: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const spawnX = x !== undefined ? x : rect.width / 2;
    const spawnY = y !== undefined ? y : rect.height / 2;

    pulsesRef.current.push({
      x: spawnX,
      y: spawnY,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height) * 0.7,
      speed: 4.5,
      alpha: 0.5,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      initNodes(width, height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause when offscreen to ensure 0% CPU consumption
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      triggerActivationPulse(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          isInside: true,
        };
      }
    };

    const onTouchEnd = () => {
      mouseRef.current.isInside = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Color palettes: Muted, low-contrast, ambient
    // Dark mode: very soft slate with hints of crimson and indigo
    const headColorsDark = [
      'rgba(244, 63, 94, ',   // Soft Crimson
      'rgba(165, 180, 252, ', // Soft Indigo
      'rgba(148, 163, 184, ', // Soft Slate
    ];

    // Light mode: very faint slate with subtle CMU red tint
    const headColorsLight = [
      'rgba(196, 18, 48, ',   // CMU Red
      'rgba(99, 102, 241, ',  // Indigo
      'rgba(100, 116, 139, ', // Slate
    ];

    const render = () => {
      if (isVisibleRef.current) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const isDark = getIsDark();
        const headColors = isDark ? headColorsDark : headColorsLight;

        ctx.clearRect(0, 0, width, height);

        const nodes = nodesRef.current;
        const mouse = mouseRef.current;
        const pulses = pulsesRef.current;

        // 1. Subtle Pulses
        for (let p = pulses.length - 1; p >= 0; p--) {
          const pulse = pulses[p];
          pulse.radius += pulse.speed;
          pulse.alpha = Math.max(0, 0.45 * (1 - pulse.radius / pulse.maxRadius));

          if (pulse.alpha <= 0.005) {
            pulses.splice(p, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(244, 63, 94, ${pulse.alpha * 0.25})`
            : `rgba(196, 18, 48, ${pulse.alpha * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Excite nodes slightly as pulse passes
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const dx = node.x - pulse.x;
            const dy = node.y - pulse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (Math.abs(dist - pulse.radius) < 20) {
              node.energy = Math.min(0.8, node.energy + 0.2);
            }
          }
        }

        // 2. Update Nodes
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          node.x += node.vx;
          node.y += node.vy;

          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;

          // Gentle Query attraction when mouse moves nearby
          if (mouse.isInside) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              const proximity = 1 - dist / 150;
              node.energy = Math.max(node.energy, proximity * 0.6);
              node.x += (dx / dist) * 0.2 * proximity;
              node.y += (dy / dist) * 0.2 * proximity;
            }
          }

          node.energy = Math.max(0, node.energy - 0.012);
          node.radius = node.baseRadius + node.energy * 1.5;
        }

        // 3. Draw Self-Attention Filaments (Pairs)
        const maxDist = 135;
        for (let i = 0; i < nodes.length; i++) {
          const nodeA = nodes[i];

          // Soft filament to cursor Query
          if (mouse.isInside) {
            const dx = mouse.x - nodeA.x;
            const dy = mouse.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const weight = 1 - dist / 140;
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = isDark
                ? `rgba(244, 63, 94, ${weight * 0.16})`
                : `rgba(196, 18, 48, ${weight * 0.12})`;
              ctx.lineWidth = 0.75 + weight * 0.5;
              ctx.stroke();
            }
          }

          // Inter-node attention connections
          for (let j = i + 1; j < nodes.length; j++) {
            const nodeB = nodes[j];

            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              // Soft Gaussian attention weight
              const sigma = maxDist * 0.6;
              const weight = Math.exp(-(dist * dist) / (2 * sigma * sigma));
              const combinedEnergy = (nodeA.energy + nodeB.energy) * 0.5;

              // Very muted, translucent opacity
              const alpha = isDark
                ? (weight * 0.08 + combinedEnergy * 0.12)
                : (weight * 0.05 + combinedEnergy * 0.08);

              const colorBase = headColors[nodeA.head % headColors.length];

              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.strokeStyle = `${colorBase}${alpha})`;
              ctx.lineWidth = 0.6 + weight * 0.6;
              ctx.stroke();
            }
          }
        }

        // 4. Draw Nodes
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const colorBase = headColors[node.head % headColors.length];

          const nodeAlpha = isDark
            ? (0.18 + node.energy * 0.35)
            : (0.14 + node.energy * 0.25);

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${colorBase}${nodeAlpha})`;
          ctx.fill();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [initNodes, triggerActivationPulse]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto select-none"
    >
      {/* Ambient Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-default"
      />

      {/* Smooth gradient fade into the page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-950 pointer-events-none opacity-90" />
    </div>
  );
};
