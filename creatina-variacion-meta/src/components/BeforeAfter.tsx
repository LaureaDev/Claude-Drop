import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Placeholder} from './Placeholder';

const Label: React.FC<{text: string; color: string; side: 'left' | 'right'; show: number}> = ({text, color, side, show}) => (
  <div
    style={{
      position: 'absolute',
      top: 450,
      [side]: 40,
      padding: '12px 28px',
      borderRadius: 14,
      background: color,
      color: 'white',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 900,
      fontSize: 46,
      letterSpacing: 2,
      opacity: show,
      transform: `translateY(${(1 - show) * -30}px)`,
      boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
    }}
  >
    {text}
  </div>
);

const Pic: React.FC<{src: string | null; label: string}> = ({src, label}) =>
  src ? (
    <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  ) : (
    <Placeholder label={label} hue={label === 'ANTES' ? 220 : 330} />
  );

export const BeforeAfter: React.FC<{antes: string | null; despues: string | null; combinada?: string | null}> = ({
  antes,
  despues,
  combinada,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const zoom = interpolate(frame, [0, durationInFrames], [1.05, 1.15]);
  const labelIn = spring({frame: frame - 3, fps, config: {damping: 12}});

  if (combinada) {
    return (
      <AbsoluteFill style={{backgroundColor: 'black'}}>
        <AbsoluteFill style={{transform: `scale(${zoom})`}}>
          <Img src={staticFile(combinada)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Barra deslizante que revela el "después"
  const wipe = interpolate(frame, [durationInFrames * 0.25, durationInFrames * 0.65], [100, 50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <Pic src={despues} label="DESPUÉS" />
      </AbsoluteFill>
      <AbsoluteFill style={{clipPath: `inset(0 ${100 - wipe}% 0 0)`}}>
        <AbsoluteFill style={{transform: `scale(${zoom})`}}>
          <Pic src={antes} label="ANTES" />
        </AbsoluteFill>
      </AbsoluteFill>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: `${wipe}%`, width: 8, marginLeft: -4, background: 'white', boxShadow: '0 0 20px rgba(0,0,0,0.6)'}} />
      <Label text="ANTES" color="#555" side="left" show={labelIn} />
      <Label text="DESPUÉS" color="#FF3E9A" side="right" show={interpolate(wipe, [60, 100], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
    </AbsoluteFill>
  );
};
