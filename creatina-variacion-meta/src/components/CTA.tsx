import React from 'react';
import {AbsoluteFill, Img, interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Placeholder} from './Placeholder';
import {PRODUCTO_IMG} from '../config';

export const CTA: React.FC<{fondo: string | null; fondoStartAt: number}> = ({fondo, fondoStartAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inProd = spring({frame, fps, config: {damping: 11, stiffness: 120}});
  const inBtn = spring({frame: frame - 12, fps, config: {damping: 10}});
  const pulse = 1 + 0.06 * Math.sin((frame / fps) * Math.PI * 3);
  const float = Math.sin((frame / fps) * Math.PI) * 10;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{filter: 'blur(6px) brightness(0.55)', transform: 'scale(1.1)'}}>
        {fondo ? (
          <OffthreadVideo src={staticFile(fondo)} startFrom={Math.round(fondoStartAt * fps)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        ) : (
          <Placeholder label="" hue={320} />
        )}
      </AbsoluteFill>

      {/* Producto */}
      <AbsoluteFill style={{alignItems: 'center', top: 360}}>
        <div style={{transform: `scale(${inProd}) translateY(${float}px)`, width: 620, height: 620, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {PRODUCTO_IMG ? (
            <Img src={staticFile(PRODUCTO_IMG)} style={{maxWidth: '100%', maxHeight: '100%', filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))'}} />
          ) : (
            <div style={{width: 360, height: 520, borderRadius: 40, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 44, color: '#FF3E9A', textAlign: 'center'}}>
              CREATINA<br />FOR WOMAN
            </div>
          )}
        </div>
      </AbsoluteFill>

      {/* Botón */}
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260}}>
        <div
          style={{
            opacity: interpolate(inBtn, [0, 1], [0, 1]),
            transform: `scale(${inBtn * pulse})`,
            background: 'linear-gradient(90deg,#FF3E9A,#FF7A00)',
            color: 'white',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: 58,
            padding: '26px 64px',
            borderRadius: 999,
            boxShadow: '0 14px 40px rgba(255,62,154,0.55)',
          }}
        >
          👉 COMPRAR AHORA
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
