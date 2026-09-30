import React, {useMemo} from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
import {buildPages} from '../captions';

// Fuente local (no depende de internet al renderizar)
const fontFamily = 'Montserrat';
loadFont({family: fontFamily, url: staticFile('fonts/Montserrat-Black.woff2'), weight: '900'});

const ACTIVE = '#FFE600'; // palabra que se está diciendo
const EMPHASIS = '#FF3E9A'; // palabras clave (*asteriscos*)

export const Captions: React.FC<{bottomPct?: number}> = ({bottomPct = 30}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pages = useMemo(buildPages, []);
  const ms = (frame / fps) * 1000;
  const page = pages.find((p) => ms >= p.startMs && ms < p.endMs + 120);
  if (!page) return null;

  const pageFrame = Math.round((page.startMs / 1000) * fps);
  const enter = spring({frame: frame - pageFrame, fps, config: {damping: 14, stiffness: 220}, durationInFrames: 8});

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: `${bottomPct}%`}}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          columnGap: 30,
          maxWidth: '86%',
          transform: `scale(${0.8 + 0.2 * enter})`,
        }}
      >
        {page.words.map((w, i) => {
          const active = ms >= w.startMs && ms < w.endMs;
          const wordFrame = Math.round((w.startMs / 1000) * fps);
          const pop = active ? spring({frame: frame - wordFrame, fps, config: {damping: 10, stiffness: 300}, durationInFrames: 6}) : 0;
          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontWeight: 900,
                fontSize: 86,
                lineHeight: 1.1,
                textTransform: 'uppercase',
                color: w.highlight ? EMPHASIS : active ? ACTIVE : 'white',
                WebkitTextStroke: '12px black',
                paintOrder: 'stroke fill',
                textShadow: '0 8px 24px rgba(0,0,0,0.55)',
                transform: `scale(${1 + 0.12 * pop}) translateY(${-6 * pop}px)`,
                display: 'inline-block',
                margin: '0 10px',
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
