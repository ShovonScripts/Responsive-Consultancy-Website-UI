import { useEffect, useState } from 'react';

interface AnalogClockProps {
  size?: number;
}

export function AnalogClock({ size = 120 }: AnalogClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotations
  const secondRotation = seconds * 6; // 360/60 = 6 degrees per second
  const minuteRotation = minutes * 6 + seconds * 0.1; // 6 degrees per minute + smooth movement
  const hourRotation = (hours % 12) * 30 + minutes * 0.5; // 30 degrees per hour + smooth movement

  // Generate tick marks
  const majorTicks = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30 - 90; // Start from top (12 o'clock)
    const radians = (angle * Math.PI) / 180;
    const innerRadius = size * 0.4;
    const outerRadius = size * 0.45;
    const x1 = size / 2 + Math.cos(radians) * innerRadius;
    const y1 = size / 2 + Math.sin(radians) * innerRadius;
    const x2 = size / 2 + Math.cos(radians) * outerRadius;
    const y2 = size / 2 + Math.sin(radians) * outerRadius;
    return { x1, y1, x2, y2, is12: i === 0 };
  });

  const minorTicks = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null; // Skip major tick positions
    const angle = i * 6 - 90;
    const radians = (angle * Math.PI) / 180;
    const innerRadius = size * 0.42;
    const outerRadius = size * 0.45;
    const x1 = size / 2 + Math.cos(radians) * innerRadius;
    const y1 = size / 2 + Math.sin(radians) * innerRadius;
    const x2 = size / 2 + Math.cos(radians) * outerRadius;
    const y2 = size / 2 + Math.sin(radians) * outerRadius;
    return { x1, y1, x2, y2 };
  }).filter(Boolean);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-sm">
        {/* Clock face circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill="var(--panel)"
          stroke="var(--border)"
          strokeWidth="2"
        />
        
        {/* Inner circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.38}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Major tick marks */}
        {majorTicks.map((tick, i) => (
          <line
            key={`major-${i}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.is12 ? 'var(--accent)' : 'var(--ink)'}
            strokeWidth={tick.is12 ? '3' : '2'}
            strokeLinecap="round"
            opacity={tick.is12 ? '1' : '0.8'}
          />
        ))}

        {/* Minor tick marks */}
        {minorTicks.map((tick, i) => (
          <line
            key={`minor-${i}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="var(--muted)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
          />
        ))}

        {/* Hour hand */}
        <g transform={`rotate(${hourRotation} ${size / 2} ${size / 2})`}>
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={size / 2 - 28}
            stroke="var(--ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Minute hand */}
        <g transform={`rotate(${minuteRotation} ${size / 2} ${size / 2})`}>
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={size / 2 - 40}
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Second hand with tail */}
        <g transform={`rotate(${secondRotation} ${size / 2} ${size / 2})`}>
          {/* Tail circle */}
          <circle
            cx={size / 2}
            cy={size / 2 + 8}
            r="4"
            fill="var(--accent)"
          />
          {/* Hand line */}
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={size / 2 - 46}
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Center dot */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="5"
          fill="var(--accent)"
          stroke="var(--panel)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
