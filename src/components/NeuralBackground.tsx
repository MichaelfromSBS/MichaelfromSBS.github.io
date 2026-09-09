import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Sparkles, Sliders } from 'lucide-react';

interface Neuron {
  id: string;
  layer: number;
  index: number;
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  activation: number; // 0.0 to 1.0
  targetActivation: number;
  bias: number;
  label?: string;
}

interface Synapse {
  from: Neuron;
  to: Neuron;
  weight: number; // -1 to 1
}

interface SignalPacket {
  synapse: Synapse;
  progress: number; // 0.0 to 1.0
  speed: number;
  intensity: number;
}

interface BurstWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [outputScores, setOutputScores] = useState<number[]>([0.92, 0.08, 0.85]);
  const [pulseCount, setPulseCount] = useState(0);
  const [modelMode, setModelMode] = useState<'inference' | 'burst'>('inference');
  const [hoveredNeuronInfo, setHoveredNeuronInfo] = useState<string | null>(null);

  const neuronsRef = useRef<Neuron[]>([]);
  const synapsesRef = useRef<Synapse[]>([]);
  const signalsRef = useRef<SignalPacket[]>([]);
  const burstWavesRef = useRef<BurstWave[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean; active: boolean }>({
    x: -1000,
    y: -1000,
    isInside: false,
    active: false,
  });
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const lastSignalTimeRef = useRef<number>(0);

  const getIsDark = () => document.documentElement.classList.contains('dark');

  // Architecture configuration: [Inputs, Hidden1, Hidden2, Outputs]
  const layerCounts = [4, 5, 5, 3];
  const inputLabels = ['Audio (Viditas)', 'Video (Viditas)', 'Context (MCP)', 'Sensors (PID)'];
  const outputLabels = ['Authentic (94%)', 'Deepfake (6%)', 'Opt. Path (88%)'];

  // Initialize network topology based on container dimensions
  const buildNetwork = useCallback((width: number, height: number) => {
    const neurons: Neuron[] = [];
    const synapses: Synapse[] = [];

    // Margins and layer spacing
    const paddingX = Math.max(width * 0.08, 40);
    const paddingY = Math.max(height * 0.15, 60);
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - paddingY * 2;
    const layerCount = layerCounts.length;
    const layerSpacing = usableWidth / (layerCount - 1);

    // 1. Create Neurons
    for (let l = 0; l < layerCount; l++) {
      const count = layerCounts[l];
      const stepY = usableHeight / (count + 1);

      for (let i = 0; i < count; i++) {
        const x = paddingX + l * layerSpacing;
        const y = paddingY + (i + 1) * stepY;

        let label: string | undefined = undefined;
        if (l === 0) label = inputLabels[i];
        if (l === layerCount - 1) label = outputLabels[i];

        neurons.push({
          id: `L${l}_N${i}`,
          layer: l,
          index: i,
          x,
          y,
          radius: l === 0 || l === layerCount - 1 ? 9 : 7,
          baseRadius: l === 0 || l === layerCount - 1 ? 9 : 7,
          activation: Math.random() * 0.5 + 0.2,
          targetActivation: 0.5,
          bias: (Math.random() - 0.5) * 0.6,
          label,
        });
      }
    }

    // 2. Create Synapses between adjacent layers
    for (let l = 0; l < layerCount - 1; l++) {
      const currentLayerNeurons = neurons.filter((n) => n.layer === l);
      const nextLayerNeurons = neurons.filter((n) => n.layer === l + 1);

      for (const fromNeuron of currentLayerNeurons) {
        for (const toNeuron of nextLayerNeurons) {
          // Weight with realistic Gaussian distribution
          const weight = (Math.random() - 0.45) * 1.8;
          synapses.push({
            from: fromNeuron,
            to: toNeuron,
            weight,
          });
        }
      }
    }

    neuronsRef.current = neurons;
    synapsesRef.current = synapses;
  }, []);

  // Fire forward-pass signals across synapses
  const emitSignalsFromLayer = useCallback((fromLayer: number, multiplier = 1.0) => {
    const candidateSynapses = synapsesRef.current.filter(
      (s) => s.from.layer === fromLayer
    );

    // Emit signals from active neurons
    for (const syn of candidateSynapses) {
      if (syn.from.activation > 0.25 && Math.random() < 0.65 * multiplier) {
        signalsRef.current.push({
          synapse: syn,
          progress: 0,
          speed: 0.022 + Math.random() * 0.018,
          intensity: syn.from.activation * Math.abs(syn.weight),
        });
      }
    }
  }, []);

  // Trigger high-energy surge wave across all layers
  const triggerForwardPassSurge = useCallback((x?: number, y?: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const spawnX = x ?? rect.width * 0.15;
    const spawnY = y ?? rect.height * 0.5;

    burstWavesRef.current.push({
      x: spawnX,
      y: spawnY,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height) * 0.9,
      alpha: 1,
    });

    // Saturate inputs
    for (const n of neuronsRef.current) {
      if (n.layer === 0) {
        n.activation = 1.0;
      }
    }

    // Unleash multiple waves of signal packets
    emitSignalsFromLayer(0, 2.0);
    setTimeout(() => emitSignalsFromLayer(1, 2.0), 200);
    setTimeout(() => emitSignalsFromLayer(2, 2.0), 400);

    setPulseCount((c) => c + 1);
  }, [emitSignalsFromLayer]);

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

      buildNetwork(width, height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my, isInside: true, active: true };

      // Check neuron hover tooltip
      let found: string | null = null;
      for (const n of neuronsRef.current) {
        const dx = n.x - mx;
        const dy = n.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < n.radius + 10) {
          const act = (n.activation * 100).toFixed(0);
          found = `Layer ${n.layer} [Neuron ${n.index + 1}] • a = ${act}% • σ(Wᵀx + b)`;
          break;
        }
      }
      setHoveredNeuronInfo(found);
    };

    const onMouseLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.active = false;
      setHoveredNeuronInfo(null);
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      triggerForwardPassSurge(e.clientX - rect.left, e.clientY - rect.top);
    };

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

    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    // Render loop
    const render = (timestamp: number) => {
      if (isVisibleRef.current) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const isDark = getIsDark();

        ctx.clearRect(0, 0, width, height);

        const neurons = neuronsRef.current;
        const synapses = synapsesRef.current;
        const signals = signalsRef.current;
        const bursts = burstWavesRef.current;
        const mouse = mouseRef.current;

        // Auto-emit forward-pass signals periodically
        if (timestamp - lastSignalTimeRef.current > 420) {
          emitSignalsFromLayer(0, 1.0);
          lastSignalTimeRef.current = timestamp;
        }

        // 1. Draw Burst Waves
        for (let b = bursts.length - 1; b >= 0; b--) {
          const burst = bursts[b];
          burst.radius += 8;
          burst.alpha = Math.max(0, 1 - burst.radius / burst.maxRadius);

          if (burst.alpha <= 0.01) {
            bursts.splice(b, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(196, 18, 48, ${burst.alpha * 0.4})`
            : `rgba(196, 18, 48, ${burst.alpha * 0.3})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // 2. Update Input Neurons based on mouse proximity / position
        for (const n of neurons) {
          if (n.layer === 0) {
            if (mouse.isInside) {
              const dy = Math.abs(mouse.y - n.y);
              const excitation = Math.max(0.15, 1 - dy / 160);
              n.targetActivation = excitation;
            } else {
              n.targetActivation = 0.4 + 0.3 * Math.sin(timestamp * 0.002 + n.index);
            }
          }

          // Smooth activation convergence
          n.activation += (n.targetActivation - n.activation) * 0.1;
          n.radius = n.baseRadius + n.activation * 3.5;
        }

        // 3. Draw Synaptic Edges
        for (const syn of synapses) {
          const { from, to, weight } = syn;
          const isPositive = weight >= 0;

          // Opacity depends on weight magnitude and source activation
          const baseAlpha = 0.08 + Math.abs(weight) * 0.25 * from.activation;
          const strokeColor = isPositive
            ? isDark
              ? `rgba(196, 18, 48, ${baseAlpha})`   // Crimson positive weight
              : `rgba(196, 18, 48, ${baseAlpha * 1.1})`
            : isDark
              ? `rgba(56, 189, 248, ${baseAlpha * 0.85})` // Cyan negative weight
              : `rgba(2, 132, 199, ${baseAlpha * 0.9})`;

          ctx.beginPath();
          ctx.moveTo(from.x, from.y);

          // Subtle bezier curvature for organic neural aesthetics
          const cpX = (from.x + to.x) / 2;
          ctx.bezierCurveTo(cpX, from.y, cpX, to.y, to.x, to.y);

          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = Math.max(0.8, Math.abs(weight) * 1.8);
          ctx.stroke();
        }

        // 4. Update and Draw Moving Signal Pulses (Action Potentials)
        for (let s = signals.length - 1; s >= 0; s--) {
          const sig = signals[s];
          sig.progress += sig.speed;

          if (sig.progress >= 1.0) {
            // Signal reached destination neuron: activate and propagate!
            const destNeuron = sig.synapse.to;
            destNeuron.targetActivation = Math.min(
              1.0,
              destNeuron.activation + sig.intensity * 0.55
            );

            // Forward-propagate to subsequent layer
            if (destNeuron.layer < layerCounts.length - 1) {
              const nextSynapses = synapses.filter((syn) => syn.from === destNeuron);
              for (const nextSyn of nextSynapses) {
                if (Math.random() < 0.7) {
                  signals.push({
                    synapse: nextSyn,
                    progress: 0,
                    speed: 0.024 + Math.random() * 0.016,
                    intensity: destNeuron.targetActivation * Math.abs(nextSyn.weight),
                  });
                }
              }
            } else {
              // Output neuron reached! Update live predictions
              setOutputScores((prev) => {
                const updated = [...prev];
                const idx = destNeuron.index;
                if (idx !== undefined && idx < updated.length) {
                  updated[idx] = Math.min(0.99, Math.max(0.01, updated[idx] + (Math.random() - 0.48) * 0.04));
                }
                return updated;
              });
            }

            signals.splice(s, 1);
            continue;
          }

          // Calculate point along bezier curve
          const { from, to } = sig.synapse;
          const cpX = (from.x + to.x) / 2;
          const t = sig.progress;
          // Cubic bezier formula for 1D dimension
          const invT = 1 - t;
          const px = invT * invT * invT * from.x + 3 * invT * invT * t * cpX + 3 * invT * t * t * cpX + t * t * t * to.x;
          const py = invT * invT * invT * from.y + 3 * invT * invT * t * from.y + 3 * invT * t * t * to.y + t * t * t * to.y;

          // Draw glowing packet bead
          const glowRadius = 3.5 + sig.intensity * 2.5;
          const isPos = sig.synapse.weight >= 0;

          // Outer halo
          ctx.beginPath();
          ctx.arc(px, py, glowRadius * 2, 0, Math.PI * 2);
          ctx.fillStyle = isPos
            ? isDark
              ? 'rgba(196, 18, 48, 0.25)'
              : 'rgba(196, 18, 48, 0.2)'
            : isDark
              ? 'rgba(56, 189, 248, 0.25)'
              : 'rgba(2, 132, 199, 0.2)';
          ctx.fill();

          // Core spark
          ctx.beginPath();
          ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = isPos
            ? isDark ? '#ff4d6d' : '#C41230'
            : isDark ? '#38bdf8' : '#0284c7';
          ctx.fill();

          // White highlight center
          ctx.beginPath();
          ctx.arc(px, py, glowRadius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }

        // 5. Draw Neurons and Layer Column Headers
        // Layer labels along the top
        const layerTitles = ['INPUT LAYER', 'HIDDEN 1', 'HIDDEN 2', 'OUTPUT'];
        const paddingX = Math.max(width * 0.08, 40);
        const usableWidth = width - paddingX * 2;
        const layerSpacing = usableWidth / (layerCounts.length - 1);

        for (let l = 0; l < layerCounts.length; l++) {
          const lx = paddingX + l * layerSpacing;
          ctx.font = '600 10px "Fira Code", monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.45)' : 'rgba(100, 116, 139, 0.6)';
          ctx.fillText(layerTitles[l], lx, 32);

          // Subtle dashed vertical layer axis guide line
          ctx.beginPath();
          ctx.setLineDash([3, 6]);
          ctx.moveTo(lx, 42);
          ctx.lineTo(lx, height - 30);
          ctx.strokeStyle = isDark ? 'rgba(51, 65, 85, 0.25)' : 'rgba(226, 232, 240, 0.7)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw neuron circles and activation halos
        for (const n of neurons) {
          // Natural decay for non-input neurons
          if (n.layer > 0) {
            n.targetActivation = Math.max(0.12, n.targetActivation * 0.96);
          }

          const isHighActive = n.activation > 0.45;

          // Outer glowing activation halo
          if (isHighActive) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius * 2.6, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(196, 18, 48, ${n.activation * 0.22})`
              : `rgba(196, 18, 48, ${n.activation * 0.16})`;
            ctx.fill();
          }

          // Main neuron body
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? isHighActive ? '#C41230' : '#1e293b'
            : isHighActive ? '#C41230' : '#e2e8f0';
          ctx.fill();

          // Border ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isHighActive
            ? isDark ? '#fda4af' : '#991b1b'
            : isDark ? '#475569' : '#94a3b8';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // White center pupil when firing
          if (isHighActive) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }

          // Draw neuron labels for inputs and outputs if width permits
          if (width > 640 && n.label) {
            ctx.font = '500 11px Inter, sans-serif';
            ctx.textAlign = n.layer === 0 ? 'right' : 'left';
            ctx.fillStyle = isDark
              ? isHighActive ? '#f8fafc' : '#94a3b8'
              : isHighActive ? '#0f172a' : '#64748b';

            const textX = n.layer === 0 ? n.x - n.radius - 8 : n.x + n.radius + 8;
            ctx.fillText(n.label, textX, n.y + 4);
          }
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
    };
  }, [buildNetwork, emitSignalsFromLayer, triggerForwardPassSurge]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto select-none"
    >
      {/* Interactive Deep Neural Net Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
      />

      {/* Gradient vignette backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-950 pointer-events-none opacity-85" />

      {/* Top/Corner Hover Tooltip displaying live activation formula */}
      {hoveredNeuronInfo && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-black/90 text-white text-xs font-mono shadow-lg border border-red-500/40 pointer-events-none animate-fadeIn">
          {hoveredNeuronInfo}
        </div>
      )}

      {/* Live Model HUD Controller (Bottom-Right) */}
      <div className="absolute bottom-3 right-4 sm:right-8 z-20 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-[11px] font-mono shadow-sm">
          <span className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
            <Play className="w-3 h-3 fill-current animate-pulse" />
            <span>Deep Neural Net</span>
          </span>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          <span className="hidden sm:inline text-slate-700 dark:text-slate-300 font-semibold">
            Pred: {(outputScores[0] * 100).toFixed(0)}% Authentic
          </span>

          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>

          {/* Model Mode toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModelMode((prev) => (prev === 'inference' ? 'burst' : 'inference'));
              triggerForwardPassSurge();
            }}
            className="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1 font-medium"
            title="Toggle Continuous Inference vs Burst Mode"
          >
            <Sliders className="w-2.5 h-2.5" />
            <span>{modelMode === 'inference' ? 'Live Forward Pass' : 'Surge Mode'}</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          {/* Surge trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerForwardPassSurge();
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/60 hover:bg-red-200 dark:hover:bg-red-900 text-red-700 dark:text-red-300 transition-colors text-[10px] font-bold"
            title="Click to pulse a forward pass across all layers"
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Surge ({pulseCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
