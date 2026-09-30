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

## Copy: ángulo "Aumenta glúteos y tonifica piernas de forma natural"

### Guion hablado y subtítulos (≈25 s)
| Tiempo | Bloque | Texto | Toma sugerida |
|---|---|---|---|
| 0–3 s | Gancho | El secreto de las que tienen glúteos firmes 🍑 | Tomas de glúteos o sentadilla, las más llamativas |
| 3–8 s | Romper la objeción | No es magia ni cirugía… es creatina hecha para mujeres | Chica entrenando o mostrando el frasco |
| 8–15 s | Beneficio + prueba | Potencia cada sentadilla para aumentar glúteos y tonificar piernas de forma natural | Antes/después + tomas de pierna |
| 15–20 s | Natural / fácil | Sin hormonas ni inyecciones, solo una cucharada en tu batido | Preparando el batido |
| 20–25 s | CTA | Pídela hoy y pagas al recibir. Toca el botón antes de que se agote | Cierre con el producto |

### Texto principal del anuncio (primary text)
> 🍑 El secreto de las que tienen glúteos firmes y piernas tonificadas no es magia ni cirugía.
> Es Creatina For Woman: la creatina pensada para mujeres que potencia cada sentadilla para aumentar glúteos y tonificar piernas de forma natural.
> 🌿 Sin hormonas ni inyecciones
> 🥤 Una cucharada en tu agua o batido
> 🚚 Envío a todo el país
> 💵 Pagas cuando la recibes
> 👉 Pídela hoy, que las unidades vuelan.

**Títulos para probar (A/B):**
- "Glúteos firmes de forma natural 🍑"
- "Tonifica piernas y glúteos 💪"
- "Paga al recibir: Creatina For Woman"

## Normas de Meta para este anuncio (léelas antes de publicar)
- **Antes/después:** Meta restringe las imágenes de antes y después en anuncios de salud y cuerpo, y es una de las causas más comunes de rechazo. Por eso las escenas de antes/después están aisladas en `config.ts`: si te rechazan el anuncio, cámbialas por tomas de video y vuelve a subirlo.
- No le atribuyas características personales a quien ve el anuncio ("¿Tienes flacidez?"). El gancho actual habla de "las mujeres que entrenan" y no de la persona.
- No prometas resultados medibles ni plazos ("+3 cm de glúteo en 15 días"). El copy ata el resultado al entrenamiento ("potencia cada sentadilla"), que es como funciona la creatina y además reduce el riesgo de rechazo.
- "Sin hormonas" y "100% natural": confirma en la etiqueta que el producto no trae otros ingredientes que lo contradigan antes de publicar.
- Evita tomas con zoom a glúteos en ropa muy ajustada o en poses sugestivas: Meta las rechaza por contenido sexualizado. Prefiere tomas entrenando.
