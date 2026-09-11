import React from 'react';

export const Logo: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-8 h-8',
  size = 32
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Michael Liu Logo"
    >
      <defs>
        {/* CMU Crimson to Rose Gradient */}
        <linearGradient id="mlLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C41230" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        {/* Subtle glow filter */}
        <filter id="mlGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#C41230" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Rounded squircle background container */}
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="9"
        className="fill-slate-100 dark:fill-slate-800/90 stroke-slate-200 dark:stroke-slate-700/80 transition-colors"
        strokeWidth="1.5"
      />

      {/* Stylized M and L Geometric Neural Monogram */}
      <g filter="url(#mlGlow)">
        {/* 'M' path with vertex nodes */}
        <path
          d="M8.5 24V11.5L14 18L19.5 11.5V24"
          stroke="url(#mlLogoGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'L' path extending from the M's base */}
        <path
          d="M22.5 11.5V24H27.5"
          stroke="url(#mlLogoGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neural Synapse Nodes at key vertices */}
        <circle cx="8.5" cy="11.5" r="1.8" fill="#C41230" />
        <circle cx="14" cy="18" r="1.8" fill="#E11D48" />
        <circle cx="19.5" cy="11.5" r="1.8" fill="#C41230" />
        <circle cx="27.5" cy="24" r="1.8" fill="#E11D48" />
      </g>
    </svg>
  );
};
