# Creatina For Woman: variación para Meta Ads (25 s)

Proyecto de Remotion con subtítulos palabra por palabra al estilo Reels/TikTok, en dos formatos: 9:16 (Reels/Stories) y 4:5 (Feed).

## Cómo usarlo en tu PC

1. Copia tus archivos a `public/`:
   - `D:\001- DROPI\03- PRODUCTO\Creatina For Woman\VIDEOS\PINTERES\03, 04, 05` → `public/clips/03.mp4`, `04.mp4`, `05.mp4`
   - Las imágenes de antes/después → `public/img/antes-despues-1.jpg`, `antes-despues-2.jpg`
   - El frasco sin fondo → `public/img/producto.png`
   - La voz en off y la música (opcional) → `public/audio/voz.mp3`, `musica.mp3`
2. En `src/config.ts`, cambia cada `null` por la ruta del archivo (ya están escritas como comentario al lado) y ajusta `startAt` a la toma que quieras de cada clip.
3. `npm install` y luego `npm run dev` para previsualizarlo.
4. `npm run render` (9:16) y `npm run render:4x5` (Feed). Los videos quedan en `out/`.

Los tiempos de los subtítulos están en `GUION` dentro de `src/config.ts`. Las palabras entre `*asteriscos*` salen en rosado.

## Copy

### Guion hablado y subtítulos (≈25 s)
| Tiempo | Bloque | Texto |
|---|---|---|
| 0–3 s | Gancho | Esto es lo que nadie le dice a las mujeres que entrenan |
| 3–8 s | Romper la objeción | La creatina NO es solo para hombres… y NO te va a poner inflada |
| 8–15 s | Beneficio + prueba | Creatina For Woman te da más energía y más fuerza en cada rutina, para un cuerpo más firme y tonificado |
| 15–20 s | Facilidad | Una cucharada en tu agua o batido, sin complicarte y todos los días |
| 20–25 s | CTA | Pídela hoy y pagas al recibir. Toca el botón antes de que se agote |

### Texto principal del anuncio (primary text)
> ¿Creías que la creatina era solo para hombres? 🤫
> Creatina For Woman está pensada para nosotras: más energía en cada entrenamiento, más fuerza y un cuerpo que se ve más firme, sin sentirte inflada.
> ✅ Fácil de tomar: una cucharada en tu agua o batido
> 🚚 Envío a todo el país
> 💵 Pagas cuando la recibes
> 👉 Pídela hoy, que las unidades vuelan.

**Títulos:** "La creatina que sí es para ti 💪" · "Paga al recibir. Envío gratis" (usa este solo si el envío es gratis de verdad)

## Normas de Meta para este anuncio (léelas antes de publicar)
- **Antes/después:** Meta restringe las imágenes de antes y después en anuncios de salud y cuerpo, y es una de las causas más comunes de rechazo. Por eso las escenas de antes/después están aisladas en `config.ts`: si te rechazan el anuncio, cámbialas por tomas de video y vuelve a subirlo.
- No le atribuyas características personales a quien ve el anuncio ("¿Tienes flacidez?"). El gancho actual habla de "las mujeres que entrenan" y no de la persona.
- No prometas resultados medibles ni plazos ("baja 5 kg en 2 semanas").
