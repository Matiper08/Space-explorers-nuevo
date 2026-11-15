<!-- Created with AI assistance (Claude, GitHub Copilot) -->
# SPACE EXPLORERS — INSTRUCCIONES DEL PROYECTO
Leé este archivo completo antes de cada tarea. No hay espacio para la ambigüedad: si algo no está definido acá, elegí lo más simple y avisame en una línea. Respondé en español, en 5 líneas máximo por tarea.

## 1. QUÉ ES Y PARA QUÉ
Videojuego web 2D de plataformas, 100% HTML + CSS + JavaScript, para el NASA Space Apps Challenge 2026, desafío "NASA's Discarded Equipment Storytelling" (https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/). Objetivo del desafío: contar a chicos de primaria (6 a 12 años) la historia del equipo que la NASA dejó en la Luna, en Marte y en el espacio profundo: qué era, por qué se mandó, cómo funcionaba, qué descubrió y cómo está hoy, conectando la ingeniería con la ciencia, mostrando cómo operaban las misiones (no listando datos), con conexión emocional con estos "exploradores robóticos olvidados" y con PRECISIÓN. Se evalúa: Impacto, Creatividad, Validez, Relevancia y Presentación. El tiempo es muy limitado (el hackatón es el 14 y 15 de noviembre de 2026).

## 2. REFERENCIA: LITTLEBIGPLANET (SOLO COMO MODELO, NO REPLICAR NADA)
Tomar de LittleBigPlanet únicamente el espíritu: mundos temáticos únicos y llamativos que invitan a admirar, narrador cálido, interacción juguetona con el entorno, personajes expresivos y una fuerte conexión emocional. Prohibido copiar personajes, diseños, música, nombres o assets de ese juego.

## 3. HISTORIA
Maia, exploradora espacial de 10 años, viaja con Tuerca, un robot armado con piezas sueltas. Su abuela Elena (voz de radio y narradora cálida) le regaló el Ecoscopio, una radio que capta el "eco" de objetos olvidados. Maia los encuentra, escucha su historia, les cumple un deseo pequeño y les agradece. Idea central: "olvidado" no es lo mismo que "dejado atrás" (algunos siguen funcionando). Enemigos: los Grises (bolitas de polvo gris, tristes): no se las lastima; al saltarles encima se iluminan y se vuelven chispas de colores. Tono tierno, sin violencia. Final emotivo con las Voyager: Maia les envía un mensaje de gracias.

## 4. LOS OBJETOS DEL JUEGO (SOLO ESTOS, SON LOS RECURSOS OFICIALES DEL DESAFÍO)
Usar únicamente estos equipos y sus fuentes. Los datos de cada ficha salen SOLO de estas páginas; lo que no esté ahí, marcalo con // VERIFY y no inventes.
LUNA (4 encuentros):
- Apollo Lunar Modules (etapas de descenso, como el Eagle del Apollo 11, quedaron como plataformas de despegue): https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C
- Lunar Roving Vehicles (3 "buggies lunares" eléctricos, estacionados para siempre): https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C
- ALSEP (paquetes científicos Apollo: sismómetros, retrorreflectores, etc.): https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C
- Surveyor (sondas robóticas de los años 60 que probaron el aterrizaje suave; usar Surveyor 3): https://science.nasa.gov/mission/surveyor-3/
MARTE (5 encuentros):
- Mars Pathfinder: https://science.nasa.gov/mission/mars-pathfinder/
- Spirit y Opportunity: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/
- Viking 1: https://science.nasa.gov/mission/viking-1/
- InSight: https://science.nasa.gov/mission/insight/
- Ingenuity: https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/
ESPACIO PROFUNDO Y OTROS CUERPOS (5 encuentros). OJO: Dawn, NEAR Shoemaker, Pioneer 10 y Kepler vienen en el listado de recursos pero NO son misiones a Marte; van en este mundo:
- Dawn: https://science.nasa.gov/mission/dawn/
- NEAR Shoemaker: https://science.nasa.gov/mission/near-shoemaker/
- Pioneer 10: https://science.nasa.gov/mission/pioneer-10/
- Kepler: https://science.nasa.gov/mission/kepler/
- Voyager 1 y 2 (final del juego): https://science.nasa.gov/mission/voyager/

## 4b. COMPROMISOS DE DISEÑO PARA QUE SEA POSIBLE
3 mundos grandes, cada uno UN escenario continuo y único, y los objetos aparecen como "estaciones" de encuentro a lo largo del recorrido (no un nivel por objeto). Cada encuentro tiene un reto corto propio que muestre CÓMO operaba el equipo:
- Lunar Module: escalar sus patas y escaleras y leer su placa. LRV: tramo conduciendo el buggy con baja gravedad. ALSEP: sismógrafo de ritmo/ondas. Surveyor: prueba de aterrizaje suave y noche lunar (luz/sombra).
- Pathfinder: aterrizaje con airbags (rebotes en trampolines). Spirit/Opportunity: panel solar, polvo y tormenta que oscurece. Viking 1: brazo recolector de muestras de suelo. InSight: escuchar un sismo marciano. Ingenuity: planeo con hélice (primer vuelo en otro planeta).
- Dawn: propulsión iónica (aceleración lenta y continua). NEAR Shoemaker: descenso a un asteroide. Pioneer 10: placa y cruce del cinturón de asteroides. Kepler: contar tránsitos de luz de una estrella. Voyager: honda gravitacional con planetas-trampolín y final emotivo.

## 5. ARTE (EL PUNTO MÁS IMPORTANTE)
El juego actual anterior fue rechazado por básico. Exigencias concretas:
- Aspecto 2.5D: lo más parecido a 3D sin serlo. Cada personaje y máquina con volumen: degradés, luz de borde (rim light), sombras propias, sombra proyectada en el piso, brillos, oclusión ambiental y contorno suave.
- Todo dibujado por código al iniciar (sin imágenes de IA), con Canvas 2D (createLinearGradient, createRadialGradient, shadowBlur) registrado como textura de Phaser (this.textures.createCanvas). Cada imagen definida por clave en arte.js, con archivo opcional en assets/ para reemplazarla después.
- Resolución interna 1280x720, Phaser.Scale.FIT, centrada, llenando la ventana sin franjas.
- Máquinas con PERSONALIDAD: siluetas fieles a las reales (sin logos ni insignias de la NASA), pero con "ojos" hechos con cámaras o sensores, posturas expresivas y animaciones propias (parpadeo, respiración, cabeceo). Maia y Tuerca: animaciones de quieta, caminar, saltar, caer y celebrar, con squash and stretch.
- Cada mundo es ÚNICO y deslumbrante, nada genérico:
  * Luna: valle plateado y silencioso, la Tierra enorme en el cielo, sombras largas azules, regolito que brilla, bordes de cráteres, huellas y marcas de ruedas.
  * Marte: cielo color caramelo, dunas óxido, paredes de cañón y silueta de un volcán gigante; cada zona con su paleta y su clima (tormenta de polvo).
  * Espacio profundo: nebulosas, cinturón de asteroides, planetas gigantes con anillos, campo de estrellas, aurora de cintas luminosas, y la Tierra como "punto azul pálido" al final.
- Mínimo 5 capas de parallax por mundo, viñeta, partículas ambientales (polvo, destellos), brillo pulsante en el objeto olvidado. Cada objeto con muchos detalles (tornillos, paneles, cables, desgaste).

## 6. PARKOUR / JUGABILIDAD (NADA DE "JUEGO FLASH")
Movimiento con aceleración y frenado, salto variable, doble salto (mochila), coyote time, jump buffer, control aéreo, gravedad menor en el ápice, salto en pared (wall slide y wall jump), aterrizaje con rebote visual. Elementos: plataformas móviles y que se caen, trampolines, zonas de baja gravedad (Luna), viento (Marte), corrientes (espacio). Parámetros editables en CONFIG. Cámara que se adelanta. Todo debe sentirse preciso, generoso y "jugoso" (partículas, temblor suave de cámara, sonido listo para enchufar). Sin game over: Tuerca rescata a Maia. HUD: estrellas de eco, 3 baterías.

## 7. DIDÁCTICA Y NARRATIVA
Cada encuentro termina con una FICHA DE MISIÓN (qué era, por qué se mandó, cómo funcionaba, qué descubrió, cómo está hoy, fuente con el enlace oficial de la sección 4) y se guarda en el "Diario del Ecoscopio" (álbum abrible desde el menú). Diálogos con caja que escribe letra por letra, cálidos, cortos (2 o 3 renglones). Cada objeto habla en primera persona con carácter propio.

## 8. IDIOMA Y ACCESIBILIDAD
Inglés por defecto (el jurado lee inglés) y español; botón y tecla L. TODO el texto sale de datos.js. Texto de al menos 18 px, subtítulos, nada que dependa solo del color, jugable con teclado y con controles táctiles en pantalla. Opción de reducir efectos.

## 9. ESTRUCTURA Y TECNOLOGÍA
index.html, style.css, datos.js (config, textos EN/ES, diálogos, fichas, niveles), arte.js (dibujo procedural y claves de imagen) y game.js (lógica), carpeta assets/. Única librería: Phaser 3 por CDN con versión fija (phaser@3.80.1). Sin Node, npm ni compilación. Comentarios en español.

## 10. REGLAS DEL HACKATÓN
Interfaz y entregables en inglés. Sin logos, banderas ni insignias de la NASA. Sin imágenes ni audio de IA. Sin menores identificables. Usar datos de la NASA y declararlos. Declarar que se usaron Claude y GitHub Copilot para código y textos.

## 11. HITOS (se piden de a uno; dejar siempre el juego FUNCIONANDO)
H1 Estructura y base técnica (pantalla 1280x720, escenas, carga).
H2 Parkour completo con un escenario de prueba.
H3 Motor de arte 2.5D, y Maia, Tuerca y los Grises con animaciones.
H4 Mundo Luna completo (5 capas, 4 encuentros con 
retos y fichas).
H5 Narrativa, diálogos, Diario, idioma EN/ES.
H6 Mundo Marte (5 encuentros).
H7 Mundo espacio profundo (5 encuentros y final Voyager).
H8 Menú, mapa del sistema solar, pausa, HUD y controles táctiles.
H9 Entregables: README.md, CREDITS.md, AI_DISCLOSURE.md, SUBMISSION.md y DEMO_SCRIPT.md en inglés, y publicación en GitHub Pages.
Si falta tiempo, la prioridad es H1 a H5 y un tramo de H7 con las Voyager.
## 12. MEJORAS V2 (si hay conflicto con secciones anteriores, esta sección manda)

### 12.1 Gancho y motivación (el jugador tiene que estar jugando en menos de 15 segundos)
- Apertura de 20 segundos como máximo, salteable con cualquier tecla o toque: pantalla negra, el Ecoscopio hace "pi… pi…" y aparece el texto "…is anyone… still out there?". Maia responde "Who's there?". Corte directo al juego.
- Misterio central: cada eco recuperado revela UNA palabra de un mensaje oculto de 14 palabras (una por encuentro). Inglés: "We were never forgotten. Thank you for listening. Tell Earth we are still here." Español: "Nunca nos olvidaron. Gracias por escucharnos. Díganle a la Tierra que todavía seguimos aquí." Se muestra en el HUD como una fila de palabras ocultas ("We were ___ ___ ...") que se completa con cada eco. El mensaje entero se ve en la escena final con las Voyager.
- Progreso global visible: "Ecos recuperados X/14".

### 12.2 Dificultad y emoción (estilo Geometry Dash, adaptado a chicos de 6 a 12 años)
- Muchos pozos y saltos de precisión en cada mundo (al menos uno cada 8 segundos de juego), plataformas que se caen y tramos con ritmo.
- Reinicio instantáneo (menos de 1 segundo) en el último checkpoint. Checkpoints cada 15 segundos de juego aproximadamente (banderines que se encienden). Las estrellas recogidas hasta el checkpoint se conservan. Sin game over.
- Barra de progreso del nivel (porcentaje) y contador de intentos.
- Casi-fallo: destello y sonido cuando Maia esquiva por poco. Mensaje de ánimo al caer: "¡Casi! ¡Otra vez!". Celebración al superar un tramo difícil.
- Modo ayuda opcional desde la pausa: más checkpoints.
- Medallas por nivel: sin caídas, todas las estrellas, todos los ecos.

### 12.3 Colores
Paleta mucho más vívida y saturada: acentos cian, magenta y dorado sobre fondos profundos, brillo (glow) en objetos importantes, luz de borde en plataformas, alto contraste y un color dominante distinto por mundo. Nada apagado.

### 12.4 Cinemáticas (procedurales, cortas, salteables con cualquier tecla o toque)
- Al elegir un mundo en el mapa: escena de 4 a 6 segundos con la nave "La Cometa" volando desde la Tierra hacia el destino sobre un fondo con parallax, Maia y Tuerca visibles en la cabina, una línea de diálogo y la llegada. Una distinta por mundo (Luna, Marte y espacio profundo).
- Apertura (12.1) y escena final, con el mensaje completo y las Voyager.

### 12.5 Interfaz discreta
Botones táctiles, HUD y menús semitransparentes (opacidad entre 0.25 y 0.4), pequeños, sin colores chillones y sin tapar el juego. Se hacen un poco más visibles solo mientras se tocan.

### 12.6 Mejoras (se piden de a una; dejar siempre el juego FUNCIONANDO)
Mejora 1: colores e interfaz discreta (12.3 y 12.5).
Mejora 2: dificultad y emoción (12.2).
Mejora 3: gancho, mensaje oculto y apertura (12.1).
Mejora 4: cinemáticas (12.4).
Mejora 5: prueba completa y corrección de errores.
Mejora 6: fichas de misión cortas y responsivas (12.7).
### 12.7 Fichas de misión cortas (para TODOS los dispositivos)
Problema: la ficha actual es demasiado larga para chicos de 6 a 12 años. Hay que dividirla en dos niveles.

NIVEL 1, "ficha rápida" (aparece sola al completar el encuentro):
- Máximo 45 palabras en total, oraciones de 12 palabras como máximo, vocabulario de un chico de 8 años.
- Contenido: nombre del equipo; una frase gancho en primera persona (ej.: "I carried two astronauts to the Moon."); tres líneas cortas con ícono dibujado por código: QUÉ ERA, POR QUÉ SE QUEDÓ y QUÉ HIZO; y una etiqueta de estado de color según corresponda (ej.: "Resting on the Moon", "Silent", "Still talking").
- A la izquierda, el dibujo grande del propio equipo con brillo; a la derecha, el texto. En pantallas angostas (celular vertical), el dibujo arriba y el texto abajo.
- Las líneas aparecen una por una (animación corta). Un toque las completa.
- Botón grande "Continue" y otro más discreto "More info". Sin enlaces largos a la vista.
- Si el encuentro revela una palabra del mensaje oculto (sección 12.1), se muestra al final con una animación.

NIVEL 2, "Más info" (opcional, también accesible desde el Diario):
- Acá va el texto completo y preciso que ya existe (cómo funcionaba, qué se aprendió, qué pasó después) y el enlace oficial de la NASA como botón "Official NASA page" que abre en una pestaña nueva.
- Los matices (por ejemplo "la fuente no lista un descubrimiento específico") van SOLO acá. En la ficha rápida se escribe lo esencial, sin frases de duda, y siempre verdadero según la fuente de la sección 4.

Reglas de diseño:
- Texto de al menos 20 px, con contraste alto, fondo oscuro semitransparente.
- Al abrirse, la ficha atenúa u oculta el HUD y los textos de ayuda del fondo para que no se mezclen.
- Responsiva: debe verse y poder cerrarse bien en celular (vertical y horizontal), tablet y computadora; botones táctiles de al menos 44 px; nada se corta ni se solapa. Se cierra con toque, Enter, E o ESC.
- Los datos viven en datos.js: cada equipo tiene campos "corta" (gancho, qué era, por qué se quedó, qué hizo, estado) y "larga" (texto completo y fuente), en inglés y español.

Ejemplo de ficha rápida (Apollo 11, Eagle):
- Gancho: "I carried two astronauts to the Moon."
- Qué era: "A two-part Moon lander."
- Por qué se quedó: "My lower half stayed behind as a launch pad."
- Qué hizo: "I set Armstrong and Aldrin down on the Moon."
- Estado: "Resting on the Moon".
### 12.8 CAMBIO DE HISTORIA (manda sobre la sección 3 y sobre 12.1 si hay conflicto)
- El "Ecoscopio" ya no existe. Ahora Maia lleva un "Walkie-Talkie espacial" (EN: "Space Walkie-Talkie"), una radio de mano que capta las transmisiones débiles ("ecos") de los equipos de la NASA que quedaron atrás. Los "ecos" y el mensaje oculto de 14 palabras NO cambian: son los fragmentos de historia que Maia reencuentra.
- Abuela Elena es una experta en la NASA y sus misiones, con un taller lleno de equipamiento y réplicas (sin logos de la NASA). Guía a Maia por radio, le da datos reales y ánimo. Los datos solo salen de las fuentes de la sección 4. Su frase: "Escuchar es la mitad de explorar".
- Misión de Maia: redescubrir y reencontrar artefactos y reliquias de la NASA que alguna vez se usaron en misiones, y reencontrar fragmentos de la historia.
- Apertura (reemplaza la de 12.1): el walkie-talkie cruje. Elena: "Maia, ¿me copiás? Capté una señal muy débil de la NASA…" (EN: "Maia, do you copy? I'm picking up a very faint NASA signal…"). Una voz lejana dice: "…is anyone… still out there?". Maia: "Who's there?". Corte al juego.
- Elena aparece con una frase corta por radio al inicio de cada mundo.
- Renombrar en todo el juego (textos, fichas, créditos, diario, README): "Ecoscopio/Ecoscope" pasa a "Walkie-Talkie espacial/Space Walkie-Talkie", y "Diario del Ecoscopio" pasa a "Diario de Elena" (EN: "Elena's Logbook").
- No tocar mecánicas.