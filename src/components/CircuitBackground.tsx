import { motion } from 'motion/react';
import { CircuitLayout } from '../types';

interface CircuitBackgroundProps {
  layout: CircuitLayout;
  flip?: boolean;
  opacity?: number;
  className?: string;
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
}: CircuitBackgroundProps) {
  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{
        opacity,
        transform: flip ? 'scaleX(-1)' : undefined,
        transformOrigin: 'center',
      }}
      aria-hidden="true"
    >
      {/* Trazas animadas con ángulos rectos y de 45° */}
      {layout.traces.map((trace, i) => {
        const strokeColor = COLOR_MAP[trace.color];
        const pointsString = trace.points.map(([x, y]) => `${x},${y}`).join(' ');

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
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.85,
              delay: i * 0.07,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Nodos con escalado escalonado */}
      {layout.nodes.map((node, i) => {
        const fillColor = COLOR_MAP[node.color];

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
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
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
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
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
  );
}
