import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { CircuitLayout } from '../types';

interface CircuitBackgroundProps {
  layout: CircuitLayout;
  flip?: boolean;
  opacity?: number;
  className?: string;
  priority?: boolean;
}

const COLOR_MAP: Record<'steel' | 'navy' | 'copper', string> = {
  steel: '#A9B7C4',
  navy: '#2B3242',
  copper: '#C77B4B',
};

export function CircuitBackground({
  layout,
  flip = false,
  opacity = 0.18,
  className = '',
  priority = false,
}: CircuitBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Si es prioridad (Hero en primer pantallazo) o el usuario prefiere movimiento reducido,
  // pintamos los elementos SVG instantáneamente sin animaciones de Motion en JS
  const renderStatic = priority || shouldReduceMotion;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{
          opacity,
          transform: flip ? 'scaleX(-1)' : undefined,
          transformOrigin: 'center',
        }}
      >
        {/* Trazas con ángulos rectos y de 45° */}
        {layout.traces.map((trace, i) => {
          const strokeColor = COLOR_MAP[trace.color];
          const pointsString = trace.points.map(([x, y]) => `${x},${y}`).join(' ');

          if (renderStatic) {
            return (
              <polyline
                key={trace.id}
                points={pointsString}
                fill="none"
                stroke={strokeColor}
                strokeWidth={trace.width ?? 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          }

          return (
            <motion.polyline
              key={trace.id}
              points={pointsString}
              fill="none"
              stroke={strokeColor}
              strokeWidth={trace.width ?? 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                duration: 0.85,
                delay: i * 0.07,
                ease: 'easeInOut',
              }}
            />
          );
        })}

        {/* Nodos */}
        {layout.nodes.map((node, i) => {
          const fillColor = COLOR_MAP[node.color];

          if (renderStatic) {
            return (
              <g key={node.id}>
                {node.ring && (
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r + 4}
                    fill="none"
                    stroke={COLOR_MAP.navy}
                    strokeWidth={1.5}
                    strokeDasharray="2 2"
                  />
                )}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill={fillColor}
                />
              </g>
            );
          }

          return (
            <g key={node.id}>
              {/* Anillo doble para el nodo central dominante */}
              {node.ring && (
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r + 4}
                  fill="none"
                  stroke={COLOR_MAP.navy}
                  strokeWidth={1.5}
                  strokeDasharray="2 2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: 0.55 + i * 0.05,
                    ease: 'easeOut',
                  }}
                />
              )}

              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={fillColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.3,
                  delay: 0.6 + i * 0.05,
                  ease: 'easeOut',
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
