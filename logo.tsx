'use client';

import Link from 'next/link';

/**
 * InnovateK12 logo — recreated from brand style guide (Dec 2025).
 *
 * Full logo:  INN ◎ VATE | K12
 *   - "INNOVATE"  Deep Teal  #176E82  (or white on dark backgrounds)
 *   - Atom mark   Sydney Teal #219EBB (or white)
 *   - "K12"       Orange     #ea730b  (or white)
 *
 * Usage:
 *   <InnovateLogo />                     full color, medium
 *   <InnovateLogo variant="white" />     all-white for dark backgrounds
 *   <InnovateLogo size="lg" />           lg / md / sm
 *   <InnovateAtom />                     standalone atom icon only
 */

type LogoVariant = 'color' | 'white';
type LogoSize   = 'sm' | 'md' | 'lg';

const sizes: Record<LogoSize, { fontSize: number; atomSize: number }> = {
  sm: { fontSize: 14, atomSize: 15 },
  md: { fontSize: 19, atomSize: 20 },
  lg: { fontSize: 26, atomSize: 28 },
};

/** Atom / orbital mark — three ellipses + nucleus */
function AtomMark({ size, color }: { size: number; color: string }) {
  const cx = size / 2;
  const cy = size / 2;
  const rx = size * 0.44;   // half the longer axis of each orbit
  const ry = size * 0.14;   // half the shorter axis
  const r  = size * 0.09;   // nucleus radius
  const sw = size * 0.07;   // stroke width

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      {/* Three orbital ellipses at 0°, 60°, 120° */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={color} strokeWidth={sw} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={color} strokeWidth={sw}
        transform={`rotate(60 ${cx} ${cy})`} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={color} strokeWidth={sw}
        transform={`rotate(120 ${cx} ${cy})`} />
      {/* Nucleus */}
      <circle cx={cx} cy={cy} r={r} fill={color} />
    </svg>
  );
}

/** Full horizontal wordmark: INN◎VATE | K12 */
export function InnovateLogo({
  variant = 'color',
  size    = 'md',
  className,
}: {
  variant?  : LogoVariant;
  size?     : LogoSize;
  className?: string;
}) {
  const { fontSize, atomSize } = sizes[size];

  const wordColor = variant === 'white' ? '#ffffff' : '#176E82';
  const atomColor = variant === 'white' ? '#ffffff' : '#219EBB';
  const k12Color  = variant === 'white' ? '#ffffff' : '#ea730b';

  const gap       = Math.round(fontSize * 0.06); // tight gap between letters and atom
  const pipeGap   = Math.round(fontSize * 0.35); // space around the | divider

  const textStyle: React.CSSProperties = {
    fontFamily  : 'var(--font-open-sans), Arial, sans-serif',
    fontWeight  : 700,
    fontSize    : `${fontSize}px`,
    lineHeight  : 1,
    letterSpacing: '0.03em',
    color       : wordColor,
  };

  return (
    <Link
      href="/"
      className={className}
      style={{
        display    : 'inline-flex',
        alignItems : 'center',
        gap        : `${gap}px`,
        userSelect : 'none',
        whiteSpace : 'nowrap',
        textDecoration: 'none',
      }}
      aria-label="Go to homepage"
    >
      <span style={textStyle}>INN</span>
      <AtomMark size={atomSize} color={atomColor} />
      <span style={textStyle}>VATE</span>

      {/* Divider */}
      <span
        style={{
          ...textStyle,
          fontWeight : 300,
          marginInline: `${pipeGap}px`,
          opacity    : 0.7,
        }}
      >
        |
      </span>

      {/* K12 */}
      <span
        style={{
          ...textStyle,
          color      : k12Color,
          fontWeight : 800,
          letterSpacing: '0.02em',
        }}
      >
        K12
      </span>
    </Link>
  );
}

/** Standalone atom icon — useful for compact / icon-only spots */
export function InnovateAtom({
  size  = 24,
  color = '#219EBB',
}: {
  size? : number;
  color?: string;
}) {
  return <AtomMark size={size} color={color} />;
}
