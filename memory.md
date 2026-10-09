# Memoria del Proyecto: Ecosistema Digital Iglesia Iviluz

## 1. Identidad Institucional y Visión
- **Congregación:** Iglesia Iviluz (Red G12, Barquisimeto, Lara, Venezuela).
- **Pastores Fundadores y Principales:** Orlando e Ivilien.
- **Visión Oficial:** *"Ganar almas y formarlos como discípulos de Cristo, que vayan y sean luz en las naciones."*
- **Contacto de Producción:** Isis (proporciona fotos de templos, pastores y cronograma de eventos del año).
- **Datos Legales y de Contacto:**
  - Correo: iviluzchurch@gmail.com
  - RIF: J294021948
  - Dirección: Calle 47 entre avenidas 19 y 20 local s/n sector oeste, Barquisimeto, Lara. Zona postal 3001.

---

## 2. Paradigma de Diseño y UX (Life.Church + MCI Bogotá)
- **Cero Scroll Infinito (Directiva del Pastor Principal):** Se descarta la página kilométrica única. Se implementa una Home cinematográfica, concisa e impactante tipo *Life.Church*, que actúa como un portal de bienvenida con accesos directos a sub-páginas dedicadas.
- **G12 / MCI Style:** Implementación del módulo *"Soy Nuevo"*, embudo interactivo para búsqueda de células y el recorrido *"El Camino del Discípulo"*.
- **Tecnología UI:** Next.js (App Router), Tailwind CSS v4, Framer Motion (animaciones y funnels por pasos nativos open source, sin pagar plataformas externas tipo Typeform), Lucide React.
- **Paleta y Tipografía:** Tema perla luminoso (`#F7F7F5`), acentos crema/dorado (`--color-accent-cream`), negros profundos y tipografía Montserrat vía `next/font/google`.

---

## 3. Arquitectura de Rutas del Ecosistema
/ (Home)                   -> Portal cinematográfico compacto con Video Hero, Visión y 4 Accesos Directos
/soy-nuevo                 -> "Esta es tu casa", Verdades de Jesús, Funnel Células y Camino del Discípulo
/sedes                     -> Directorio de Sedes con fotos de auditorios, horarios y links a Google Maps
/ministerios               -> Estructura oficial (Kids, Teens, Somos Luz, Adultos) + Módulo "Quiero Servir"
/oracion                   -> Muro de peticiones detallado para el equipo de intercesión + Chatbot Pastoral
/agendar                   -> Formulario oficial de Consejería Pastoral confidencial
/dar                       -> Pasarelas de ofrendas transparentes (Bancos nacionales, Zelle, Binance/USDT)
/buena-voluntad            -> Brazo benéfico y acción social con logo propio y donaciones
/predicas                  -> Mediateca de series y prédicas embebidas de YouTube
/eventos                   -> Calendario de congresos, UDB, vigilias y actividades anuales
## 4. Estructura Oficial de Ministerios y Procesos Eclesiásticos
- **Ministerios Oficiales:**
  1. *Iviluz Kids* (Niños)
  2. *Iviluz Teens* (Adolescentes)
  3. *Somos Luz* (Jóvenes)
  4. *Ministerio de Adultos*
- **Voluntariado ("Quiero Servir"):** *"Tus talentos al servicio de Dios"*. Formulario interactivo para que los creyentes se postulen a servir en áreas técnicas, alabanza, ujieres, etc.
- **El Camino del Discípulo (Nomenclatura Oficial):**  
  *Queda expresamente prohibido usar los términos "Escalera del Éxito" o "Capacitación Destino".*  
  Las 4 etapas oficiales son:
  1. **Ganar:** Confesión de fe, entrega personal a Cristo y abandono de la vieja vida.
  2. **Consolidar:** Universidad de la Vida (UDB), Encuentro con Dios, transformación del corazón y bautismos.
  3. **Discipular:** Ingreso a la Escuela de Líderes y conformación del Equipo de 12.
  4. **Enviar:** Liderazgo activo, apertura y multiplicación de células para ganar a otros.

---

## 5. Especificaciones Técnicas y Motor de Inteligencia Artificial

### A. Motor Pastoral (Anthropic)
- **Modelo:** `claude-haiku-4-5` configurable mediante variable de entorno:
  `process.env.ANTHROPIC_MODEL || "claude-haiku-4-5"`
- **Streaming:** Server-Sent Events (SSE) nativos para escritura fluida en tiempo real (milisegundos).
- **Biblia Obligatoria:** Citas bíblicas estrictamente en la versión **Traducción en Lenguaje Actual (TLA)**.
- **Corrección Crítica de Payload:** El saludo de bienvenida inicial del asistente se maneja exclusivamente en el estado visual del cliente. El array enviado al backend siempre comienza con el primer turno de rol `"user"` (evitando el error 400 de la API).
- **Mecanismo Anti-Spam y Control de Tokens:**
  - Contador estricto en el estado del cliente: máximo **4 respuestas del asistente**.
  - En la 4ta respuesta, la IA brinda su contención final, explica con amor que hasta allí llegan sus funciones automatizadas y bloquea definitivamente el input de texto.
  - La interfaz resalta un botón fijo hacia el agendamiento presencial (`/agendar`).
- **Navegación Móvil:** Al hacer clic en enlaces internos (`/agendar`), el modal de chat se cierra automáticamente para no bloquear la pantalla.

### B. Preparación de Datos (Backend / API)
- **`/api/schedule` y `/api/prayer`:** Diseñados con tipado TypeScript estricto y desacoplados mediante handlers listos para conectar vía webhook (Google Sheets / Google Calendar / CRM) una vez que la iglesia suministre las credenciales oficiales.
- **WhatsApp:** Variable `NEXT_PUBLIC_WHATSAPP_NUMBER` configurada para admitir el número real cuando sea provisto; mientras tanto, despliega un modal elegante de canales de atención.

---

## 6. Estado de Tareas y Hoja de Ruta

### Fase 1: Motor IA Pastoral y Chatbot (EN CURSO)
- [ ] Refactorizar `app/api/chat/route.ts` con streaming nativo y modelo `claude-haiku-4-5`.
- [ ] Aplicar corrección de payload (primer mensaje rol `user`).
- [ ] Inyectar el system prompt con Visión Oficial y citas TLA.
- [ ] Actualizar `components/PastoralChat.tsx`: contador de 4 turnos, bloqueo de input y cierre al navegar.

### Fase 2: Navegación y Shell Global
- [ ] Actualizar `Header.tsx` con navegación multipágina: Inicio, Soy Nuevo, Sedes, Prédicas, Dar y menú desplegable.
- [ ] Arreglar anclas rotas hacia rutas absolutas (`/#...` y subrutas dedicadas).
- [ ] Actualizar `Footer.tsx` con enlaces a Buena Voluntad, Dar y redes.

### Fase 3: Home Cinematográfica Compacta (Life.Church Style)
- [ ] Reestructurar `components/Hero.tsx` con la Visión Oficial de Iviluz.
- [ ] Construir la tarjeta de accesos rápidos (*Soy Nuevo*, *Sedes*, *Prédicas*, *Oración*).
- [ ] Compactar la sección de Horarios y remover el scroll infinito vertical.

### Fase 4: Experiencia "Soy Nuevo" (MCI G12 Style)
- [ ] Crear la página `/soy-nuevo`.
- [ ] Implementar la sección *"Esta es tu casa"* con las 4 verdades ilustradas de Jesús.
- [ ] Construir el Funnel Multi-Step interactivo *"Caminemos Juntos"* (Buscador de Células por temas e intereses).
- [ ] Diseñar el componente interactivo de los 4 peldaños de *"El Camino del Discípulo"*.

### Fase 5: Sedes, Donaciones, Muro de Oración y Acción Social
- [ ] Crear `/sedes`: Grid de sedes con fotos de auditorios, horarios y botón directo a Google Maps.
- [ ] Crear `/ministerios`: Kids, Teens, Somos Luz, Adultos y el módulo interactivo *"Quiero Servir"*.
- [ ] Crear `/dar`: Módulo de ofrendas con copiado en un clic para cuentas locales, Zelle y Binance (USDT).
- [ ] Crear `/buena-voluntad`: Landing del brazo social con su logo y canales de ayuda.
- [ ] Crear `/oracion`: Muro de peticiones con formulario completo para el equipo de intercesión.
- [ ] Crear `/predicas`: Catálogo moderno de enseñanzas enlazadas a YouTube.