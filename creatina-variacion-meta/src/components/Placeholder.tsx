import React from 'react';
import {AbsoluteFill} from 'remotion';

export const Placeholder: React.FC<{label: string; hue?: number}> = ({label, hue = 330}) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(160deg, hsl(${hue},70%,45%), hsl(${hue + 40},60%,20%))`,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'rgba(255,255,255,0.6)',
      fontSize: 48,
      fontFamily: 'Montserrat, sans-serif',
      textAlign: 'center',
      padding: 60,
      whiteSpace: 'pre-line',
    }}
  >
    {label}
  </AbsoluteFill>
);
