import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Activity, RefreshCw } from 'lucide-react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  energy: number; // 0 to 1
  head: number;   // Attention head index (0 to 3)
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

  const [activeNodesCount, setActiveNodesCount] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);
  const [attentionHeadMode, setAttentionHeadMode] = useState<'multi' | 'unified'>('multi');
  const [isHovered, setIsHovered] = useState(false);

  // Physics and node state
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<PulseWave[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean; active: boolean }>({
    x: -1000,
    y: -1000,
    isInside: false,
    active: false,
  });
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Determine current dark mode from DOM class
  const getIsDark = () => document.documentElement.classList.contains('dark');

  const initNodes = useCallback((width: number, height: number) => {
    // Density based on screen area
    const count = Math.min(Math.floor((width * height) / 14000), 75);
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        baseRadius: Math.random() * 2 + 2,
        radius: 2.5,
        energy: 0,
        head: Math.floor(Math.random() * 4),
      });
    }

    nodesRef.current = nodes;
    setActiveNodesCount(nodes.length);
  }, []);

  const triggerActivationPulse = (x?: number, y?: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const spawnX = x !== undefined ? x : rect.width / 2;
    const spawnY = y !== undefined ? y : rect.height / 2;

    pulsesRef.current.push({
      x: spawnX,
      y: spawnY,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height) * 0.8,
      speed: 6.5,
      alpha: 1,
    });
    setPulseCount((prev) => prev + 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handler with DPR scaling
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

    // Pause rendering when offscreen to conserve CPU/battery
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Mouse movement
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.active = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      triggerActivationPulse(clickX, clickY);
    };

    // Touch support
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          isInside: true,
          active: true,
        };
      }
    };

    const onTouchEnd = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Render loop
    const headColorsDark = [
      'rgba(196, 18, 48, ',   // CMU Crimson
      'rgba(129, 140, 248, ', // Indigo
      'rgba(56, 189, 248, ',  // Cyan
      'rgba(244, 114, 182, ', // Pink / Rose
    ];

    const headColorsLight = [
      'rgba(196, 18, 48, ',   // CMU Crimson
      'rgba(79, 70, 229, ',   // Indigo
      'rgba(2, 132, 199, ',   // Sky
      'rgba(219, 39, 119, ',  // Rose
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

        // 1. Update and draw pulses (Activation Waves)
        for (let p = pulses.length - 1; p >= 0; p--) {
          const pulse = pulses[p];
          pulse.radius += pulse.speed;
          pulse.alpha = Math.max(0, 1 - pulse.radius / pulse.maxRadius);

          if (pulse.alpha <= 0.01) {
            pulses.splice(p, 1);
            continue;
          }

          // Draw ripple ring
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(196, 18, 48, ${pulse.alpha * 0.45})`
            : `rgba(196, 18, 48, ${pulse.alpha * 0.35})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Second subtle inner wave
          if (pulse.radius > 20) {
            ctx.beginPath();
            ctx.arc(pulse.x, pulse.y, pulse.radius * 0.75, 0, Math.PI * 2);
            ctx.strokeStyle = isDark
              ? `rgba(129, 140, 248, ${pulse.alpha * 0.25})`
              : `rgba(79, 70, 229, ${pulse.alpha * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Check collision with nodes to excite them
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const dx = node.x - pulse.x;
            const dy = node.y - pulse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (Math.abs(dist - pulse.radius) < 25) {
              node.energy = Math.min(1, node.energy + 0.35);
            }
          }
        }

        // 2. Update nodes position and energy decay
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          node.x += node.vx;
          node.y += node.vy;

          // Bounce off walls
          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;

          // Mouse query vector interaction
          if (mouse.isInside) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
              // Attention excitation based on proximity
              const proximityFactor = (1 - dist / 180);
              node.energy = Math.max(node.energy, proximityFactor * 0.85);

              // Gentle gravitatonal pull towards query cursor
              node.x += (dx / dist) * 0.35 * proximityFactor;
              node.y += (dy / dist) * 0.35 * proximityFactor;
            }
          }

          // Decay energy gradually
          node.energy = Math.max(0, node.energy - 0.015);
          node.radius = node.baseRadius + node.energy * 2.5;
        }

        // 3. Draw Synaptic Attention Filaments (Self-Attention pairs)
        const maxDist = 145;
        for (let i = 0; i < nodes.length; i++) {
          const nodeA = nodes[i];

          // Draw connection to mouse (Query to Key)
          if (mouse.isInside) {
            const dx = mouse.x - nodeA.x;
            const dy = mouse.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 160) {
              const queryAttention = (1 - dist / 160);
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(196, 18, 48, ${queryAttention * 0.5})`;
              ctx.lineWidth = 1 + queryAttention * 1.5;
              ctx.stroke();
            }
          }

          // Inter-node attention connections
          for (let j = i + 1; j < nodes.length; j++) {
            const nodeB = nodes[j];

            // In multi-head mode, prefer nodes with shared or complementary heads
            const headMatch = attentionHeadMode === 'unified' || nodeA.head === nodeB.head || (nodeA.head + nodeB.head) % 2 === 0;
            if (!headMatch) continue;

            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              // Softmax-like attention weight: exp(-dist^2 / (2 * sigma^2))
              const sigma = maxDist * 0.55;
              const weight = Math.exp(-(dist * dist) / (2 * sigma * sigma));
              const combinedEnergy = (nodeA.energy + nodeB.energy) * 0.5;
              const opacity = (weight * 0.32 + combinedEnergy * 0.45);

              const colorBase = headColors[nodeA.head % headColors.length];

              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.strokeStyle = `${colorBase}${Math.min(0.8, opacity)})`;
              ctx.lineWidth = 0.75 + weight * 1.2 + combinedEnergy * 1.2;
              ctx.stroke();
            }
          }
        }

        // 4. Draw Nodes (Embedding Tokens / Neurons)
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const colorBase = headColors[node.head % headColors.length];

          // Outer glowing halo on excited nodes
          if (node.energy > 0.1) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = `${colorBase}${node.energy * 0.25})`;
            ctx.fill();
          }

          // Core node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `${colorBase}${0.6 + node.energy * 0.4})`
            : `${colorBase}${0.7 + node.energy * 0.3})`;
          ctx.fill();

          // Small white pupil center
          if (isDark && node.energy > 0.3) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 0.45, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${node.energy * 0.9})`;
            ctx.fill();
          }
        }

        // 5. Draw Query Cursor Target reticle when mouse inside
        if (mouse.isInside) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(196, 18, 48, 0.7)' : 'rgba(196, 18, 48, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#ffffff' : '#C41230';
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
  }, [initNodes, attentionHeadMode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
      />

      {/* Subtle overlay gradient to smoothly blend canvas into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-950 pointer-events-none opacity-80" />

      {/* Interactive HUD pill in bottom corner of Hero */}
      <div className="absolute bottom-3 right-4 sm:right-8 z-20 flex items-center gap-2">
        <div className={`transition-all duration-300 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-mono shadow-sm select-none ${
          isHovered
            ? 'bg-white/90 dark:bg-slate-900/90 border-red-300 dark:border-red-900/60 text-slate-800 dark:text-slate-200 shadow-md'
            : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-400'
        }`}>
          <span className="flex items-center gap-1 font-semibold text-red-600 dark:text-red-400">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>Self-Attention Field</span>
          </span>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          <span className="hidden sm:inline">
            {activeNodesCount} Tokens
          </span>

          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setAttentionHeadMode((prev) => (prev === 'multi' ? 'unified' : 'multi'));
            }}
            className="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1 font-medium"
            title="Toggle Attention Head Clustering"
          >
            <span>Heads: {attentionHeadMode === 'multi' ? '4-Split' : 'Unified'}</span>
            <RefreshCw className="w-2.5 h-2.5" />
          </button>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerActivationPulse();
            }}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 hover:bg-red-200 dark:hover:bg-red-900 text-red-700 dark:text-red-300 transition-colors text-[10px] font-semibold"
            title="Fire an activation ripple wave across the network"
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Pulse ({pulseCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
