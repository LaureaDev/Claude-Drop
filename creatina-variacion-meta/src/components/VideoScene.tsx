import React from 'react';
import {AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Placeholder} from './Placeholder';

export const VideoScene: React.FC<{src: string | null; startAt: number; zoom?: boolean; index: number}> = ({
  src,
  startAt,
  zoom,
  index,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  // zoom lento (Ken Burns) + "punch-in" al entrar: da dinamismo a tomas estáticas
  const scale = interpolate(frame, [0, 4, durationInFrames], zoom ? [1.25, 1.12, 1.2] : [1.1, 1.04, 1.1], {
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{backgroundColor: 'black', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        {src ? (
          <OffthreadVideo
            src={staticFile(src)}
            startFrom={Math.round(startAt * fps)}
            muted
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <Placeholder label={`Toma ${index + 1}\n(agrega clip en config.ts)`} hue={300 + index * 12} />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
