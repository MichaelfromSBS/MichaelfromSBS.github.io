import React from 'react';

export const Logo: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-8 h-8',
  size = 32
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Michael Liu Logo"
      >
        {/* Sleek, Minimalist Geometric Tile */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          className="fill-slate-900 dark:fill-slate-100 transition-colors"
        />

        {/* Sharp, Architectonic M & L Monogram */}
        {/* Modern angular geometric lines with clean 45° cuts */}
        <path
          d="M7.5 22.5V9.5L13.5 15.5L19.5 9.5V22.5"
          className="stroke-white dark:stroke-slate-950"
          strokeWidth="2.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* Distinctive CMU Crimson Accent for the L */}
        <path
          d="M21 9.5V22.5H26.5"
          stroke="#C41230"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
};
