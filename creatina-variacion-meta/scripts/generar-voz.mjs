// Genera la voz en off con ElevenLabs y los tiempos exactos de cada palabra
// para sincronizar los subtítulos.
//
// Uso:  ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... npm run voz
// Salida: public/audio/voz.mp3  y  src/voz-timings.json
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;
if (!apiKey || !voiceId) {
  console.error('Faltan ELEVENLABS_API_KEY y/o ELEVENLABS_VOICE_ID');
  process.exit(1);
}

// Lee el GUION de src/config.ts (texto sin *asteriscos* ni emojis)
const config = fs.readFileSync(path.join(root, 'src/config.ts'), 'utf8');
const guion = config.slice(config.indexOf('export const GUION'));
const lines = [...guion.matchAll(/text:\s*'([^']*)'/g)].map((m) => m[1]);
const clean = (s) => s.replace(/\*/g, '').replace(/\p{Extended_Pictographic}/gu, '').replace(/\s+/g, ' ').trim();
const text = lines.map(clean).map((l) => (/[.!?…]$/.test(l) ? l : l + ',')).join(' ').replace(/,$/, '.');
console.log('Texto:', text);

const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`, {
  method: 'POST',
  headers: {'xi-api-key': apiKey, 'Content-Type': 'application/json'},
  body: JSON.stringify({
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {stability: 0.4, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true},
  }),
});
if (!res.ok) {
  console.error('Error de ElevenLabs:', res.status, await res.text());
  process.exit(1);
}
const data = await res.json();
fs.mkdirSync(path.join(root, 'public/audio'), {recursive: true});
fs.writeFileSync(path.join(root, 'public/audio/voz.mp3'), Buffer.from(data.audio_base64, 'base64'));

// Caracteres -> palabras
const {characters, character_start_times_seconds: st, character_end_times_seconds: et} = data.alignment;
const words = [];
let cur = null;
characters.forEach((ch, i) => {
  if (/\s/.test(ch)) {
    if (cur) words.push(cur);
    cur = null;
    return;
  }
  if (!cur) cur = {text: '', startMs: st[i] * 1000, endMs: et[i] * 1000};
  cur.text += ch;
  cur.endMs = et[i] * 1000;
});
if (cur) words.push(cur);
fs.writeFileSync(path.join(root, 'src/voz-timings.json'), JSON.stringify(words, null, 1));

const dur = words.at(-1).endMs / 1000;
console.log(`OK: ${words.length} palabras, ${dur.toFixed(1)} s de voz`);
if (dur > 24.8) console.warn('⚠️  La voz dura más de 25 s: acorta el GUION o sube DURATION_SEC en config.ts');
