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

  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<PulseWave[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -1000,
    y: -1000,
    isInside: false,
  });
  const animFrameId = useRef<number | null>(null);

  const getIsDark = () => document.documentElement.classList.contains('dark');

  const initNodes = useCallback((width: number, height: number) => {
    // Subtle, ambient density that doesn't distract from foreground content
    const count = Math.min(Math.floor((width * height) / 22000), 48);
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        baseRadius: Math.random() * 0.8 + 1.2, // Delicate 1.2 - 2.0px points
        radius: 1.6,
        energy: 0,
        head: Math.floor(Math.random() * 3),
      });
    }

    nodesRef.current = nodes;
  }, []);

  const triggerActivationPulse = useCallback((x?: number, y?: number) => {
    const spawnX = x !== undefined ? x : window.innerWidth / 2;
    const spawnY = y !== undefined ? y : window.innerHeight / 2;

    pulsesRef.current.push({
      x: spawnX,
      y: spawnY,
      radius: 0,
      maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.7,
      speed: 3.8,
      alpha: 0.35,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      initNodes(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Global mouse and click listeners across the whole webpage
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isInside: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    const onClick = (e: MouseEvent) => {
      triggerActivationPulse(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          isInside: true,
        };
      }
    };

    const onTouchEnd = () => {
      mouseRef.current.isInside = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('click', onClick);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Well-balanced colors: clearly noticeable, vibrant yet non-distracting
    // Dark Mode: Crimson, Indigo, Cyan
    const headColorsDark = [
      'rgba(225, 29, 72, ',   // CMU Crimson
      'rgba(129, 140, 248, ', // Indigo
      'rgba(56, 189, 248, ',  // Cyan
    ];

    // Light Mode: CMU Red, Indigo, Slate
    const headColorsLight = [
      'rgba(196, 18, 48, ',   // CMU Red
      'rgba(79, 70, 229, ',   // Deep Indigo
      'rgba(71, 85, 105, ',   // Deep Slate
    ];

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isDark = getIsDark();
      const headColors = isDark ? headColorsDark : headColorsLight;

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const pulses = pulsesRef.current;

      // 1. Activation Pulses (Ripples)
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.radius += pulse.speed;
        pulse.alpha = Math.max(0, 0.65 * (1 - pulse.radius / pulse.maxRadius));

        if (pulse.alpha <= 0.01) {
          pulses.splice(p, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(225, 29, 72, ${pulse.alpha * 0.16})`
          : `rgba(196, 18, 48, ${pulse.alpha * 0.12})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Excite nodes as the ripple sweeps over them
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dx = node.x - pulse.x;
          const dy = node.y - pulse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (Math.abs(dist - pulse.radius) < 25) {
            node.energy = Math.min(1.0, node.energy + 0.35);
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

        // Mouse Query attraction
        if (mouse.isInside) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const proximity = 1 - dist / 180;
            node.energy = Math.max(node.energy, proximity * 0.85);
            node.x += (dx / dist) * 0.3 * proximity;
            node.y += (dy / dist) * 0.3 * proximity;
          }
        }

        node.energy = Math.max(0, node.energy - 0.015);
        node.radius = node.baseRadius + node.energy * 2.0;
      }

      // 3. Draw Self-Attention Filaments
      const maxDist = 145;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Connection to Mouse Query Reticle
        if (mouse.isInside) {
          const dx = mouse.x - nodeA.x;
          const dy = mouse.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const weight = 1 - dist / 160;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark
              ? `rgba(225, 29, 72, ${weight * 0.16})`
              : `rgba(196, 18, 48, ${weight * 0.12})`;
            ctx.lineWidth = 0.6 + weight * 0.4;
            ctx.stroke();
          }
        }

        // Inter-node connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];

          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const sigma = maxDist * 0.55;
            const weight = Math.exp(-(dist * dist) / (2 * sigma * sigma));
            const combinedEnergy = (nodeA.energy + nodeB.energy) * 0.5;

            // Soft, ambient opacity that stays gracefully in the background
            const alpha = isDark
              ? (weight * 0.08 + combinedEnergy * 0.14)
              : (weight * 0.06 + combinedEnergy * 0.10);

            const colorBase = headColors[nodeA.head % headColors.length];

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `${colorBase}${Math.min(0.32, alpha)})`;
            ctx.lineWidth = 0.6 + weight * 0.4;
            ctx.stroke();
          }
        }
      }

      // 4. Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const colorBase = headColors[node.head % headColors.length];

        const nodeAlpha = isDark
          ? (0.22 + node.energy * 0.25)
          : (0.18 + node.energy * 0.20);

        // Subtle glow halo
        if (node.energy > 0.25) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `${colorBase}${node.energy * 0.10})`;
          ctx.fill();
        }

        // Main node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${colorBase}${nodeAlpha})`;
        ctx.fill();

        // White center spark on active nodes
        if (node.energy > 0.45) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [initNodes, triggerActivationPulse]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-80 dark:opacity-75">
      {/* Universal Fullscreen Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};
