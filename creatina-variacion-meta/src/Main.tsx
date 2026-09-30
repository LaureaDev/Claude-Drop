import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {AUDIO, FPS, OVERLAYS, SCENES} from './config';
import {VideoScene} from './components/VideoScene';
import {BeforeAfter} from './components/BeforeAfter';
import {CTA} from './components/CTA';
import {Overlay} from './components/Overlay';
import {Captions} from './components/Captions';

export const Main: React.FC<{captionBottomPct: number}> = ({captionBottomPct}) => {
  let cursor = 0;
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      {SCENES.map((scene, i) => {
        const from = cursor;
        const dur = Math.round(scene.durationSec * FPS);
        cursor += dur;
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            {scene.type === 'video' && <VideoScene src={scene.src} startAt={scene.startAt} zoom={scene.zoom} index={i} />}
            {scene.type === 'beforeAfter' && <BeforeAfter antes={scene.antes} despues={scene.despues} combinada={scene.combinada} />}
            {scene.type === 'cta' && <CTA fondo={scene.fondo} fondoStartAt={scene.fondoStartAt} />}
          </Sequence>
        );
      })}

      {OVERLAYS.map((o, i) => (
        <Sequence key={`o${i}`} from={Math.round(o.fromSec * FPS)} durationInFrames={Math.round((o.toSec - o.fromSec) * FPS)}>
          <Overlay text={o.text} />
        </Sequence>
      ))}

      <Captions bottomPct={captionBottomPct} />

      {AUDIO.voz && <Audio src={staticFile(AUDIO.voz)} />}
      {AUDIO.musica && <Audio src={staticFile(AUDIO.musica)} volume={AUDIO.volumenMusica} />}
    </AbsoluteFill>
  );
};
