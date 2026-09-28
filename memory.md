# Memoria del Proyecto: Iglesia Iviluz (Clon VOUS Church y ChMS)

## Estado General
- [x] Fase 1: Setup e Inicialización
- [x] Fase 2: Hero Section & Header (Clon VOUS)
- [x] Fase 3: Sección de Horarios y Ubicación
- [x] Fase 4: Bloques de Ministerios (Bautizos, Comunidad, Adoración, Niños)
- [ ] Fase 5: Agente IA de Ayuda y Agendamiento Público
- [ ] Fase 6: Dashboard Admin (Líderes, Estadísticas y Seguimiento IA)
- [ ] Fase 7: Revisión Final y Build

## Fase 2: Hero Section & Header (REESCRITURA Mobile-First)
- [x] `components/Header.tsx` reescrito al 100%: logo `logocrema.png` con `next/image` (ancho/alto fijos, ya no `fill`), ícono hamburguesa (`Menu`/`X` de lucide-react) con overlay de menú full-screen (`useState`, `"use client"`), enlaces ancla a `#inicio`, `#horarios`, `#ministerios`, `#visita`.
- [x] `components/Hero.tsx` reescrito al 100%: contenedor `h-[100dvh]`, video con `opacity-80`, overlay `bg-black/40`, iconos sociales laterales (Instagram y TikTok en SVG inline, ya que `lucide-react` 1.48 no incluye iconos de marcas), texto vertical "SÍGUENOS" (`-rotate-90`) y "DESCUBRE" (`rotate-90`) con flechas `ChevronDown`, título central "ILUMINANDO LAS NACIONES", tarjeta flotante inferior de contención (`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl`).
- [x] Corregido warning de Next/Image: se agregó `sizes="(max-width: 768px) 100vw, 50vw"` a la imagen `fill` en `components/Ministries.tsx`.
- [x] Se agregaron anchors `id="horarios"` (Schedules) e `id="ministerios"` (Ministries) para que la navegación del nuevo menú del Header funcione correctamente.
- Nota: la ruta del logo se mantiene en `.png` (`logocrema.png`), ya que no existe un `.jpg` con ese nombre en `public/media/`.
- `npm run lint`, `npm run build` y una verificación en `npm run dev` (petición `GET /` → `200`, sin warnings de hidratación ni de `sizes` en consola) confirmados sin errores.

## Fase 3: Horarios y Ubicación
- [x] Grid oscuro y elegante con horarios (`components/Schedules.tsx`).
- [x] Domingos: Familiar (8am/10am) y Jóvenes (2:30pm).
- [x] Miércoles: Oración (6pm).
- [x] Lunes a Viernes: Matutino (5am) con botón de enlace "Acceder al Matutino".
- [x] Tarjeta de ubicación (Barquisimeto) con icono `MapPin` (lucide-react).
- Detalles técnicos:
  - Sección `bg-black`, `py-24 px-6 md:px-12`, título "ACOMPÁÑANOS" centrado en `font-black uppercase tracking-tighter`.
  - Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` con 4 tarjetas `bg-zinc-900/50 border border-zinc-800 rounded-2xl`.
  - Botón "Acceder al Matutino" con `bg-accent-cream` y `hover:scale-105`, consistente con el estilo del CTA del Header.
  - `app/page.tsx` ahora renderiza `<Header /> <Hero /> <Schedules />` en ese orden.
  - `npm run lint` y `npm run build` verificados sin errores.

## Fase 4: Ministerios
- [x] Secciones alternas de imagen/texto para Bautizos, Comunidad, Adoración y Niños (`components/Ministries.tsx`).
- Detalles técnicos:
  - Array `ministries` con 4 entradas (Comunidad, Adoración, Iviluz Kids, Bautizos), cada una con `title`, `description`, `image` y `cta`.
  - Layout zig-zag: `flex flex-col md:flex-row`, con `md:flex-row-reverse` en índices impares (1 y 3).
  - Bloque de imagen `w-full md:w-1/2 min-h-[50vh] md:min-h-[60vh]` usando `next/image` con `fill object-cover`.
  - Bloque de texto `w-full md:w-1/2 bg-black p-12 lg:p-24`, titular `text-4xl md:text-6xl font-black tracking-tighter`, descripción `text-zinc-400 text-lg`, botón outline `border border-white hover:bg-white hover:text-black`.
  - **Nota de corrección**: la ruta solicitada `/media/bautizos/bautizo1.webp` no existe en `public/media/`; el archivo real disponible es `public/media/bautizos.webp` (sin subcarpeta), por lo que se usó esa ruta para evitar un error 404 de imagen.
  - `app/page.tsx` ahora renderiza `<Header /> <Hero /> <Schedules /> <Ministries />` en ese orden.
  - `npm run lint` y `npm run build` verificados sin errores.

## Fase 5: Agente IA Público
- [x] Fase 5 - Parte A: Chatbot con tono pastoral para ayuda (COMPLETADA).
- [x] Fase 5 - Parte B: Formulario de agendamiento nativo (COMPLETADA — pendiente integración real con Google Calendar/Sheets, por ahora simulado con `console.log`).
- Detalles técnicos Parte B:
  - **System prompt actualizado** en `app/api/chat/route.ts`: ahora define al agente como "pastor cristiano evangélico y psicólogo experto", exige citas bíblicas SIEMPRE en versión **TLA (Traducción en Lenguaje Actual)**, prohíbe alucinaciones/respuestas fuera de contexto, y al detectar que el usuario necesita atención personalizada le entrega el enlace Markdown exacto `[Agendar Cita Pastoral](/agendar)`. Modelo `claude-sonnet-5` mantenido sin cambios.
  - Validado en runtime: petición real a `/api/chat` devolvió `200` citando Mateo 6:34 (TLA) y Filipenses 4:6-7 (TLA), y generó el enlace Markdown solicitado.
  - `app/api/schedule/route.ts`: Route Handler `POST`, `runtime = "nodejs"`, valida que todos los campos obligatorios estén presentes (retorna `400` con el detalle de campos faltantes si no), simula inserción en base de datos con `console.log` (incluye timestamp `receivedAt`), responde `{ success: true, message: "Cita agendada" }`. Validado con petición real → `200 OK` y log visible en servidor.
  - `app/agendar/page.tsx`: página cliente (`"use client"`) `bg-black min-h-screen pt-32 pb-12 px-6`, título "Agenda tu Cita Pastoral", formulario con campos Nombre, Apellido, Dirección, Edad (`type="number"`), Teléfono, Correo, Usuario de Instagram — todos con estilo `bg-zinc-900 border-zinc-800 text-white`. Radio buttons Sí/No para tratamiento psicológico/psiquiátrico; si "Sí", renderiza condicionalmente el `<textarea>` de contexto. Botón de envío con estado "Enviando..." (ícono `LoaderCircle` animado). Al recibir `success: true`, oculta el formulario y muestra pantalla de éxito con el mensaje exacto solicitado y botón "Volver al inicio" (`Link` a `/`).
  - `components/PastoralChat.tsx`: se agregó un parser de enlaces Markdown (`renderMessageContent`) para que el enlace `[Agendar Cita Pastoral](/agendar)` devuelto por el agente se renderice como un `next/link` clicable real dentro de la burbuja del chat, en vez de texto plano con corchetes. También se agregó `whitespace-pre-line` para respetar saltos de línea del modelo.
  - `npm run lint`, `npm run build` (5 rutas generadas: `/`, `/_not-found`, `/agendar` estática, `/api/chat` y `/api/schedule` dinámicas) y pruebas funcionales reales de ambos endpoints vía `npm run dev` verificados sin errores.
- Detalles técnicos Parte A:
  - Instalado `@anthropic-ai/sdk` como dependencia.
  - `app/api/chat/route.ts`: Route Handler `POST`, `runtime = "nodejs"`, inicializa `Anthropic` con `process.env.ANTHROPIC_API_KEY`, valida que `messages` sea un arreglo no vacío, maneja errores con try/catch devolviendo JSON con status 400/500 según el caso.
  - **Nota de corrección de modelo**: el modelo solicitado `claude-3-5-sonnet-20241022` ya no existe (fue descontinuado por Anthropic, la API responde 404 `model not_found`). Se verificó y usó el modelo Sonnet vigente `claude-sonnet-5`, validado con una llamada real que devolvió `200` y una respuesta coherente con el system prompt (incluyendo cita bíblica de contención).
  - System prompt configurado literalmente como fue solicitado (consejero pastoral empático, contención emocional, versículos de aliento, sugerencia de agendar cita).
  - `components/PastoralChat.tsx`: componente cliente (`"use client"`), panel `fixed z-[100] inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-96 md:h-[600px]`, header negro con título "Consejería Iviluz" y botón cerrar (`X`), burbujas de usuario (`bg-zinc-800`, alineadas a la derecha) y del agente (`bg-accent-cream`, alineadas a la izquierda), indicador "Escribiendo..." con ícono `LoaderCircle` animado, input + botón enviar (`Send`) con `fetch` a `/api/chat`, auto-scroll al último mensaje.
  - `components/Hero.tsx`: convertido a `"use client"` para manejar el estado `isChatOpen`; el botón "Hablar ahora" (antes un `<a>`) ahora es un `<button>` que monta condicionalmente `<PastoralChat onClose={...} />`.
  - Se creó `.env.example` documentando la variable `ANTHROPIC_API_KEY` requerida (sin exponer la clave real, que ya existe en `.env.local`, ignorado por git).
  - `npm run lint`, `npm run build` y una prueba funcional real vía `npm run dev` + petición `POST /api/chat` (`200 OK` con respuesta pastoral válida) verificados sin errores.

## Refactorización Visual Extrema (Tema Premium Luminoso)
- [x] Instalado `framer-motion` (`^13.4.4`) para animaciones de entrada y scroll-reveal.
- [x] **Tema global cambiado** en `app/globals.css` y `app/layout.tsx`: fondo base ahora es `#F9F9F7` (off-white perla) con texto `text-zinc-900`, reemplazando el fondo negro absoluto anterior. Se agregó `scroll-behavior: smooth`.
- [x] `app/page.tsx` actualizado a `bg-[#F9F9F7]` e integra el nuevo `<FloatingChatButton />`.
- [x] **`components/Hero.tsx` reescrito al 100%**: video con `object-cover object-[center_30%]` (ya no corta la cabeza del pastor), overlay cambiado a un degradado sutil (`bg-gradient-to-b from-black/50 via-black/10 to-black/60`), título "ILUMINANDO LAS NACIONES" animado palabra por palabra con Framer Motion (`wordVariants`, entrada deslizante con easing personalizado), contenedores laterales "SÍGUENOS"/"DESCUBRE" con efecto de cristal (`bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-3 py-6 gap-8`) para que no se pisen con los iconos, y se **eliminó la tarjeta flotante de contención** (ahora vive en el nuevo botón flotante global).
- [x] **`components/FloatingChatButton.tsx` (nuevo)**: botón circular `fixed bottom-8 right-8 z-[60]` con cristal esmerilado profundo (`backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)]`), pulso sutil continuo (`animate` con `scale` en loop `Infinity`) y efecto de expansión al hover (`whileHover scale: 1.15`). Al hacer clic monta `<PastoralChat />` envuelto en `AnimatePresence`.
- [x] **`components/Header.tsx` reescrito al 100%**: transparente al inicio, adquiere `bg-white/50 backdrop-blur-md border-b border-black/5` al hacer scroll (`useEffect` + `window.scrollY`), logo `logocrema.png` invertido con CSS (`invert`) cuando el header tiene fondo claro para que se vea negro y nítido. El menú hamburguesa ya no es una pantalla negra: ahora es un panel lateral (`w-full md:w-96`) que se desliza desde la derecha con Framer Motion (`menuVariants`), enlaces gigantes en cascada (`staggerChildren`) y overlay oscuro difuminado (`bg-zinc-900/40 backdrop-blur-sm`) sobre el resto de la página.
- [x] **`components/Schedules.tsx` reescrito al 100%**: fondo `#F9F9F7`, tarjetas `bg-white` puro con `border-zinc-100`, `rounded-3xl`, y sombra de lujo al hover (`hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500`). Cada tarjeta se revela con Framer Motion (`whileInView`, `viewport={{ once: true }}`) con stagger por índice.
- [x] **`components/Ministries.tsx` reescrito al 100%**: fondo `#F9F9F7`, texto oscuro (`text-zinc-900` / `text-zinc-500`), botones outline invertidos (`border-zinc-900 hover:bg-zinc-900 hover:text-white`), cada bloque zig-zag envuelto en `motion.div` con `whileInView` para revelado al scroll.
- [x] **`app/agendar/page.tsx` actualizado** al mismo tema premium claro (`bg-[#F9F9F7]`, tarjetas `bg-white rounded-3xl border-zinc-100`, inputs `bg-white border-zinc-200`) para mantener coherencia visual en todo el sitio, ya que el formulario había quedado inconsistente (oscuro) tras el cambio de tema global.
- **Nota de decisión de diseño**: `components/PastoralChat.tsx` se mantuvo con su estética oscura tipo "vidrio esmerilado" (`bg-zinc-900`) intencionalmente, ya que como panel de chat superpuesto con alto contraste se integra mejor como overlay flotante sobre el nuevo fondo claro (patrón común en apps premium: overlays oscuros sobre fondos claros). Se le agregó animación de entrada/salida con `motion.div` + `AnimatePresence`.
- `npm run lint`, `npm run build` (5 rutas generadas sin errores) y verificación funcional real vía `npm run dev` (`GET /` → `200`, `GET /agendar` → `200`, sin errores de hidratación) confirmados sin errores.

## Ronda de Pulido Visual (Precisión Milimétrica Awwwards)
- [x] **Logo corregido** en `components/Header.tsx`: ahora usa `h-10 md:h-14 w-auto object-contain` dentro de un contenedor `flex h-10 md:h-14 items-center`, con `width={240} height={72}` en `next/image` para máxima nitidez (antes era `160x48`, demasiado pequeño).
- [x] **Menú hamburguesa corregido**: el panel lateral ahora es `w-full sm:w-96` (antes `md:w-96` dejaba un rango intermedio desorganizado), fondo blanco puro (`bg-white`, ya no `bg-[#F9F9F7]` semi-transparente), con un botón de cierre **X grande** (`h-8 w-8` dentro de un botón `h-12 w-12`) fijo en la esquina superior derecha del panel. El menú se cierra automáticamente al hacer clic en cualquier enlace (`onClick={closeMenu}` ya existente en cada `motion.a`) y también se bloqueó el scroll del `body` mientras el menú está abierto (`useEffect` con `document.body.style.overflow`).
- [x] **Hero corregido**: video cambiado a `object-cover object-top` para garantizar que el rostro y la cabeza del pastor siempre estén en pantalla. **Se eliminó por completo el icono y enlace de TikTok** (incluyendo la función `TikTokIcon`), dejando solo Instagram. Las píldoras laterales "SÍGUENOS" y "DESCUBRE" ahora tienen diseño de cristal de alta gama unificado (`bg-white/15 backdrop-blur-md border border-white/30 px-3 py-4 rounded-full shadow-lg`), con `gap-3` entre ícono y texto vertical para evitar solapamientos.
- [x] **Botón flotante mejorado** (`components/FloatingChatButton.tsx`): se añadió un tooltip elegante con `AnimatePresence` que aparece al hacer hover sobre el botón, mostrando "¿Necesitas ayuda o contención?" / "Habla con nosotros de forma confidencial" con la misma estética de cristal esmerilado, antes de que el usuario haga clic para abrir el chat — haciendo la llamada a la acción más fluida y evidente sin sacrificar el diseño minimalista del botón.
- `npm run lint`, `npm run build` (5 rutas sin errores) y prueba funcional real vía `npm run dev` (`GET /` → `200`, sin errores de hidratación) confirmados sin errores.

## Refactorización Final de Despliegue a Producción (Clon VOUS Luminoso)
- [x] **Tema global final**: `app/globals.css` y `app/layout.tsx` actualizados a `#F7F7F5` (gris perla, reemplazando `#F9F9F7`), texto `text-zinc-900`, tipografía Montserrat.
- [x] **`components/Header.tsx`**: logo reemplazado a etiqueta `<img>` HTML pura (`style={{ height: '48px', width: 'auto', display: 'block' }}`) tal como se solicitó explícitamente, para garantizar tamaño real sin recortes de `next/image`. Panel lateral del menú confirmado: `w-full sm:w-96`, fondo blanco puro, enlaces grandes en negrita, botón "X" grande en la esquina superior derecha, y cierre automático al hacer clic en cualquier enlace (ya implementado, verificado de nuevo).
- [x] **`components/Hero.tsx` reescrito con nueva arquitectura de estado**: ahora recibe `onOpenChat` como prop (elevando el estado del chat a `app/page.tsx` para compartirlo con el botón flotante y evitar dos instancias de `PastoralChat`). Video confirmado en `object-cover object-top`. Barra "SÍGUENOS" ahora incluye **Instagram + WhatsApp** (ícono SVG inline nuevo, enlace `https://wa.me/` genérico pendiente de número real). Barra "DESCUBRE" con doble `ChevronDown`. Se restauró la **tarjeta flotante "Connect with Us"** en la esquina inferior derecha (`bg-white/15 backdrop-blur-xl border-white/30 rounded-2xl shadow-2xl max-w-sm w-[90%]`) con título, subtítulo, botón "Hablar ahora" que invoca `onOpenChat`, y una "X" sutil para cerrarla — posicionada en `bottom-28` para no colisionar con el botón flotante global.
- [x] **`components/FloatingChatButton.tsx` refactorizado**: ya no gestiona su propio estado de chat ni monta `PastoralChat` internamente; ahora recibe `onOpenChat` como prop, compartiendo la misma instancia de chat que el Hero. Mantiene el tooltip de cristal al hover.
- [x] **`components/Schedules.tsx`**: fondo actualizado a `bg-white` puro (antes `#F9F9F7`).
- [x] **`components/Ministries.tsx`**: fondo actualizado a `#F7F7F5` en sección y bloques de texto.
- [x] **`components/Footer.tsx` (nuevo)**: footer institucional completo con logo (`logonegro.png` vía `<img>` nativo), enlaces rápidos de navegación (Inicio, Horarios, Ministerios, Visítanos), correo `iviluzchurch@gmail.com` (mailto), RIF `J294021948`, dirección física completa, e íconos de acceso directo a Instagram y WhatsApp. Integrado en `app/page.tsx` justo antes del botón flotante.
- [x] **`app/page.tsx` reestructurado**: se convirtió en Client Component (`"use client"`) para alojar el estado compartido `isChatOpen`, que se pasa a `<Hero onOpenChat>` y `<FloatingChatButton onOpenChat>`, renderizando una única instancia de `<PastoralChat>` envuelta en `AnimatePresence` a nivel de página.
- **Nota pendiente del cliente**: el enlace de WhatsApp (`https://wa.me/`) se dejó genérico sin número telefónico por decisión explícita del cliente, quien indicó que lo actualizará más adelante. Debe reemplazarse por `https://wa.me/<código país><número>` en cuanto se disponga del dato real, tanto en `Hero.tsx` como en `Footer.tsx`.
- `npm run lint` (sin errores ni warnings) y `npm run build` (5 rutas generadas correctamente: `/`, `/_not-found`, `/agendar` estáticas, `/api/chat` y `/api/schedule` dinámicas) verificados impecables. Prueba funcional real vía `npm run dev` confirmó `GET / → 200` con el Footer renderizando correctamente el correo y el RIF, sin errores de hidratación.

## Fase 6: Dashboard Admin (ChMS Iviluz)
- [ ] UI Privada para Líderes (Carga de datos de nuevos creyentes: Células, Jóvenes, Domingos).
- [ ] Panel de Estadísticas (Jóvenes vs Adultos ganados).
- [ ] Pipeline de Seguimiento IA (Universidad de la Vida -> Encuentro -> Bautismo).

## Notas de Contenido
- Correos: iviluzchurch@gmail.com
- Instagram: @iglesiaiviluz
- RIF: J294021948
- Dirección: Calle 47 entre avenidas 19 y 20 local s/n sector oeste Barquisimeto Lara Zona postal 3001.