// ============================================================
//  CONFIGURACIÓN DEL VIDEO — edita solo este archivo
// ============================================================
// Copia tus archivos a /public:
//   public/clips/03.mp4, 04.mp4, 05.mp4  (videos de Pinterest)
//   public/img/antes-despues-1.jpg ...   (imágenes antes/después)
//   public/img/producto.png              (frasco con fondo transparente)
//   public/audio/voz.mp3                 (voz en off, opcional)
//   public/audio/musica.mp3              (música de fondo, opcional)
// Si un archivo es null, se muestra un fondo de relleno para previsualizar.

export const FPS = 30;
export const DURATION_SEC = 25;

export const AUDIO = {
  voz: null as string | null, // 'audio/voz.mp3'
  musica: null as string | null, // 'audio/musica.mp3'
  volumenMusica: 0.18,
};

export const PRODUCTO_IMG: string | null = null; // 'img/producto.png'

export type Scene =
  | {
      type: 'video';
      src: string | null;
      /** segundo del clip original donde empieza la toma */
      startAt: number;
      durationSec: number;
      zoom?: boolean;
      label?: string;
    }
  | {
      type: 'beforeAfter';
      antes: string | null;
      despues: string | null;
      /** si tienes una sola imagen ya combinada antes/después, ponla en `combinada` */
      combinada?: string | null;
      durationSec: number;
    }
  | {type: 'cta'; durationSec: number; fondo: string | null; fondoStartAt: number};

// Cortes rápidos (1.5–3 s) = mejor retención en Reels/Stories.
// Ajusta `startAt` a las tomas que más te gusten de cada clip.
export const SCENES: Scene[] = [
  // 0–3 s  HOOK
  {type: 'video', src: null /* 'clips/03.mp4' */, startAt: 0, durationSec: 1.5, zoom: true},
  {type: 'video', src: null /* 'clips/04.mp4' */, startAt: 0, durationSec: 1.5, zoom: true},
  // 3–8 s  Problema / creencia
  {type: 'video', src: null /* 'clips/05.mp4' */, startAt: 0, durationSec: 2.5},
  {type: 'video', src: null /* 'clips/03.mp4' */, startAt: 4, durationSec: 2.5},
  // 8–15 s Beneficios + prueba
  {type: 'beforeAfter', antes: null, despues: null, combinada: null /* 'img/antes-despues-1.jpg' */, durationSec: 3.5},
  {type: 'video', src: null /* 'clips/04.mp4' */, startAt: 5, durationSec: 2},
  {type: 'beforeAfter', antes: null, despues: null, combinada: null /* 'img/antes-despues-2.jpg' */, durationSec: 2.5},
  // 15–20 s Facilidad de uso
  {type: 'video', src: null /* 'clips/05.mp4' */, startAt: 4, durationSec: 2.5},
  {type: 'video', src: null /* 'clips/03.mp4' */, startAt: 8, durationSec: 2.5},
  // 20–25 s CTA
  {type: 'cta', durationSec: 5, fondo: null /* 'clips/04.mp4' */, fondoStartAt: 9},
];

// Textos grandes en pantalla (además del subtítulo) — refuerzan sin sonido.
export const OVERLAYS: {fromSec: number; toSec: number; text: string}[] = [
  {fromSec: 0, toSec: 3, text: 'LO QUE NADIE TE DICE 🤫'},
  {fromSec: 8, toSec: 11.5, text: 'MUJERES REALES 💪'},
  {fromSec: 20, toSec: 25, text: 'PAGO CONTRA ENTREGA'},
];

// ============================================================
//  GUION / SUBTÍTULOS
//  Cada frase con su inicio y fin en segundos. Las palabras se
//  reparten dentro de ese rango. Si grabas voz, ajusta los tiempos
//  a tu audio (o reemplaza por un captions.json de Whisper).
//  Palabras entre *asteriscos* se resaltan en otro color.
// ============================================================
export const GUION: {start: number; end: number; text: string}[] = [
  {start: 0.0, end: 2.9, text: 'Esto es lo que nadie le dice a las mujeres que entrenan'},
  {start: 3.0, end: 5.4, text: 'La *creatina* NO es solo para hombres'},
  {start: 5.5, end: 7.9, text: 'Y NO te va a poner inflada'},
  {start: 8.0, end: 11.4, text: 'Creatina For Woman te da *más energía* y *más fuerza* en cada rutina'},
  {start: 11.5, end: 14.9, text: 'para un cuerpo más *firme* y tonificado'},
  {start: 15.0, end: 17.4, text: 'Una cucharada en tu agua o batido'},
  {start: 17.5, end: 19.9, text: 'sin complicarte y *todos los días*'},
  {start: 20.0, end: 22.4, text: 'Pídela hoy y *pagas al recibir*'},
  {start: 22.5, end: 24.8, text: 'Toca el botón *antes de que se agote*'},
];
