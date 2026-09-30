import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

// Titular grande arriba (zona segura: debajo de los primeros ~250px que tapa la UI de Reels)
export const Overlay: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 12, stiffness: 200}});
  return (
    <AbsoluteFill style={{alignItems: 'center', paddingTop: 260}}>
      <div
        style={{
          transform: `scale(${s}) rotate(-2deg)`,
          background: 'white',
          color: 'black',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: 60,
          padding: '14px 34px',
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
