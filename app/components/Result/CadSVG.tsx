'use client';

import React, { useEffect, useRef } from 'react';

export interface CadSVGProps {
  bit: number;
  bush: number;
  offset: number;
}

export const CadSVG: React.FC<CadSVGProps> = ({ bit, bush, offset }) => {
  const bushRef = useRef<SVGCircleElement>(null);
  const bitRef = useRef<SVGCircleElement>(null);
  const dimGroupRef = useRef<SVGGElement>(null);
  const dimLineRef = useRef<SVGLineElement>(null);
  const dimTick1Ref = useRef<SVGLineElement>(null);
  const dimTick2Ref = useRef<SVGLineElement>(null);
  const dimTextRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (
      !bushRef.current ||
      !bitRef.current ||
      !dimGroupRef.current ||
      !dimLineRef.current ||
      !dimTick1Ref.current ||
      !dimTick2Ref.current ||
      !dimTextRef.current
    )
      return;

    const MAX_R = 75; // px — bushing always fills to this radius

    // Scale so rBush always hits MAX_R, rBit follows proportionally
    const scale = bush > 0 ? MAX_R / (bush / 2) : 1;
    const rBush = bush > 0 ? MAX_R : 0;
    let rBit = (bit / 2) * scale;

    if (rBit < 4 && bit > 0) rBit = 4;

    bushRef.current.setAttribute('r', `${rBush}`);
    bitRef.current.setAttribute('r', `${rBit}`);

    const startX = 120 + rBit;
    const endX = 120 + rBush;
    const width = endX - startX;
    const midX = startX + width / 2;

    dimLineRef.current.setAttribute('x1', `${startX}`);
    dimLineRef.current.setAttribute('x2', `${endX}`);
    dimTick1Ref.current.setAttribute('x1', `${startX}`);
    dimTick1Ref.current.setAttribute('x2', `${startX}`);
    dimTick2Ref.current.setAttribute('x1', `${endX}`);
    dimTick2Ref.current.setAttribute('x2', `${endX}`);
    dimTextRef.current.setAttribute('x', `${midX}`);
    dimTextRef.current.textContent = offset.toFixed(1);

    dimGroupRef.current.style.opacity = offset <= 0 ? '0' : '1';
  }, [bit, bush, offset]);

  return (
    <div className="visualizer">
      <svg id="drawing" viewBox="0 0 240 200">
        <defs>
          <pattern
            id="diagonalHatch"
            width="6"
            height="6"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="10" className="cad-dim" style={{ opacity: '0.3' }} />
          </pattern>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L1,3 z" fill="#fbbf24" />
          </marker>
          <marker id="arrow-start" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
            <path d="M6,0 L0,3 L6,6 L5,3 z" fill="#fbbf24" />
          </marker>
        </defs>

        {/* Crosshair / Center Lines */}
        <line x1="120" y1="20" x2="120" y2="180" className="cad-center" />
        <line x1="40" y1="100" x2="200" y2="100" className="cad-center" />

        {/*  Bushing (Outer) */}
        <circle ref={bushRef} cx="120" cy="100" r="70" className="cad-line cad-fill" />

        {/*  Bit (Inner) */}
        <circle ref={bitRef} cx="120" cy="100" r="30" className="cad-line cad-hatch" />

        {/*  Dimension Line (Visualizing the Offset) */}
        {/*  Positioned dynamically via refs */}
        <g ref={dimGroupRef} style={{ opacity: 1 }}>
          <line
            ref={dimLineRef}
            x1="150"
            y1="100"
            x2="190"
            y2="100"
            stroke="var(--accent)"
            strokeWidth="1"
            markerEnd="url(#arrow)"
            markerStart="url(#arrow-start)"
          />
          <line
            ref={dimTick1Ref}
            x1="150"
            y1="95"
            x2="150"
            y2="105"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <line
            ref={dimTick2Ref}
            x1="190"
            y1="95"
            x2="190"
            y2="105"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text ref={dimTextRef} x="170" y="88" className="cad-text">
            4.5
          </text>
        </g>
      </svg>
    </div>
  );
};
