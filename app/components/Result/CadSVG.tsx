import { useEffect } from 'react';

export interface CadSVGProps {
  bit: number;
  bush: number;
  offset: number;
}

export const CadSVG: React.FC<CadSVGProps> = ({ bit, bush, offset }) => {
  useEffect(() => {
    const svgBush = document.getElementById('svgBush');
    const svgBit = document.getElementById('svgBit');
    const dimGroup = document.getElementById('dimGroup') as HTMLElement | null;
    const dimLine = document.getElementById('dimLine');
    const dimTick1 = document.getElementById('dimTick1');
    const dimTick2 = document.getElementById('dimTick2');
    const dimText = document.getElementById('dimText');

    if (!svgBush || !svgBit || !dimGroup || !dimLine || !dimTick1 || !dimTick2 || !dimText) return;

    const scale = 3.5;
    let rBush = (bush / 2) * scale;
    let rBit = (bit / 2) * scale;

    if (rBush > 80) {
      const ratio = 80 / rBush;
      rBush = 80;
      rBit = rBit * ratio;
    }
    if (rBit < 4 && bit > 0) rBit = 4;

    svgBush.setAttribute('r', `${rBush}`);
    svgBit.setAttribute('r', `${rBit}`);

    const startX = 120 + rBit;
    const endX = 120 + rBush;
    const width = endX - startX;
    const midX = startX + width / 2;

    dimLine.setAttribute('x1', `${startX}`);
    dimLine.setAttribute('x2', `${endX}`);
    dimTick1.setAttribute('x1', `${startX}`);
    dimTick1.setAttribute('x2', `${startX}`);
    dimTick2.setAttribute('x1', `${endX}`);
    dimTick2.setAttribute('x2', `${endX}`);
    dimText.setAttribute('x', `${midX}`);
    dimText.textContent = offset.toFixed(1);

    dimGroup.style.opacity = offset <= 0 ? '0' : '1';
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
        <circle id="svgBush" cx="120" cy="100" r="70" className="cad-line cad-fill" />

        {/*  Bit (Inner) */}
        <circle id="svgBit" cx="120" cy="100" r="30" className="cad-line cad-hatch" />

        {/*  Dimension Line (Visualizing the Offset) */}
        {/*  Positioned dynamically via JS */}
        <g id="dimGroup" style={{ opacity: 1 }}>
          <line
            id="dimLine"
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
            id="dimTick1"
            x1="150"
            y1="95"
            x2="150"
            y2="105"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <line
            id="dimTick2"
            x1="190"
            y1="95"
            x2="190"
            y2="105"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text id="dimText" x="170" y="90" className="cad-text">
            4.5
          </text>
        </g>
      </svg>
    </div>
  );
};
