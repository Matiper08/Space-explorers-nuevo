// Configuracion inicial y textos visibles del prototipo.
window.SpaceData = {
  config: {
    width: 1280,
    height: 720,
    backgroundColor: "#0b1020",
    parent: "game-container",
    scene: ["BootScene", "LoadingScene", "MenuScene", "JournalScene", "ExpeditionScene"],
    scale: {
      mode: "FIT",
      autoCenter: "CENTER_BOTH"
    },
    render: {
      antialias: true,
      pixelArt: false,
      roundPixels: false
    },
    physics: {
      default: "arcade",
      arcade: { debug: false }
    },
    parkour: {
      worldWidth: 4800,
      groundY: 610,
      gravity: 1420,
      acceleration: 1850,
      maxSpeed: 320,
      groundFriction: 2200,
      airControl: 0.72,
      jumpVelocity: 610,
      doubleJumpVelocity: 550,
      wallJumpVelocityX: 410,
      wallJumpVelocityY: 575,
      coyoteTime: 0.12,
      jumpBuffer: 0.14,
      apexGravityScale: 0.58,
      lowGravityScale: 0.48,
      trampolineVelocity: 900,
      rescueY: 920
    }
  },
  text: {
    loadError: "The game could not start. Check your internet connection and make sure Phaser can load from the CDN, then refresh this page.",
    loading: "TUNING THE ECOSCOPE",
    loadingHint: "Finding a signal among the stars...",
    eyebrow: "A SPACE EXPLORERS STORY",
    title: "THE QUIET SIGNAL",
    subtitle: "Some explorers are far away. Their stories are still close.",
    start: "BEGIN YOUR JOURNEY",
    startHint: "Press ENTER or SPACE",
    footer: "A gentle journey through the things we leave behind.",
    expeditionLabel: "MISSION 01  /  THE MOON",
    expeditionTitle: "A place to begin",
    expeditionCopy: "The Moon is quiet, but it is not empty. Machines came here to help people explore — and left clues in the dust.",
    stationLabel: "FIRST SIGNAL",
    stationTitle: "The landing place",
    stationCopy: "Your expedition is ready. More stories are on their way.",
    controls: "MOVE  A / D  or  ← / →     JUMP  SPACE / W / ↑     DOUBLE JUMP  IN AIR     WALL JUMP  AGAINST A WALL",
    parkourIntro: "A lunar practice route",
    parkourHint: "Try the moving and spring platforms. The glowing field has lighter gravity.",
    parkourStart: "MOVE: A/D or arrows   •   JUMP: Space/W/Up   •   INTERACT: E/ENTER   •   ESC: title",
    parkourGoal: "SIGNAL REACHED",
    parkourFinish: "You crossed the practice route! Tuerca is proud of your careful steps.",
    parkourRescue: "Tuerca caught you and brought you back to the last safe place.",
    parkourCheckpoint: "SAFE SIGNAL SAVED",
    parkourStars: "ECHO STARS",
    parkourBatteries: "BATTERIES",
    parkourLowGravity: "LOW GRAVITY",
    parkourHintWall: "Wall jump: press jump while touching a wall.",
    parkourHintDouble: "Press jump again in the air for a backpack boost.",
    parkourReturn: "ESC  TITLE",
    controlsMenu: "MOVE  A / D  or  ← / →     JUMP  SPACE / W / ↑",
    return: "RETURN TO THE TITLE",
    signalError: "The expedition could not be loaded. Please refresh the page and try again.",
    languageButton: "LANGUAGE: EN  (L)",
    journalButton: "OPEN THE ECOSCOPE JOURNAL",
    journalTitle: "THE ECOSCOPE JOURNAL",
    journalCount: "RECOVERED MISSION CARDS: {count} / {total}",
    journalEmpty: "No mission cards yet. Visit a lunar station and listen to its story.",
    journalInstructions: "LEFT / RIGHT: browse cards     ENTER / ESC: return to menu",
    journalPrevious: "PREVIOUS",
    journalNext: "NEXT",
    journalReturn: "RETURN TO THE MENU",
    journalStorageError: "This mission card is open, but the journal could not save it on this device.",
    languageStorageError: "The language changed, but this device could not save the preference.",
    gameLabel: "Space Explorers game",
    pageTitle: "Space Explorers",
    pageDescription: "A gentle journey to the stories of robotic explorers.",
    dialogueContinue: "Press E or ENTER to continue",
    dialogueIntro: "The Moon is quiet, Maia. Listen with care; every machine has a story.",
    dialogueIntroReply: "I'm ready, Grandma. Tuerca and I will follow each signal."
  },
  lunarWorld: {
    title: "THE MOON — FOUR QUIET SIGNALS",
    hint: "Explore the valley and find the four glowing mission stations.",
    interactionHint: "Press E to begin or inspect this mission.",
    completedHint: "MISSION RECORDED — keep exploring the valley.",
    progressLabel: "MISSIONS",
    cardTitle: "ECOSCOPE MISSION CARD",
    cardClose: "Press E or ENTER to return to the lunar route.",
    cardLabels: {
      what: "WHAT IT WAS",
      why: "WHY IT WENT",
      how: "HOW IT WORKED",
      learned: "WHAT WE LEARNED",
      today: "WHAT HAPPENED NEXT",
      source: "OFFICIAL NASA SOURCE"
    },
    challenge: {
      lmClimb: "Climb the lander's steps to the cabin plaque, then press E.",
      lmTooLow: "The plaque is higher up. Climb the lander's steps first.",
      lrvStart: "Press E to guide the Apollo 15 rover along the low-gravity track.",
      lrvDrive: "DRIVE: hold LEFT/RIGHT; tap SPACE to hop. Pass all three echo markers.",
      lrvProgress: "ROVER ROUTE — MARKER {current} OF {total}",
      alsepStart: "Press E to listen to the ALSEP seismometer rhythm.",
      alsepListen: "Press SPACE as the moving pulse crosses the bright center ring.",
      alsepProgress: "SEISMIC PULSES: {current} / {total}",
      alsepMiss: "That pulse passed. Listen for the next one and try again.",
      surveyorStart: "Press E to begin a gentle-landing practice near Surveyor 3.",
      surveyorLand: "SOFT-LANDING PRACTICE: hold SPACE as you descend to cushion your touchdown.",
      surveyorRetry: "The touchdown was too quick. Try the short ledge again and cushion your descent.",
      surveyorNight: "The lunar shadow is crossing the scene. Press E to open Surveyor 3's mission card.",
      surveyorFade: "A soft touchdown. Watch the sunlight fade from Surveyor 3's last signal.",
      stationRecovered: "SIGNAL SAVED — mission card added to this expedition."
    },
    dialogues: {
      intro: [
        { speaker: "Elena", text: "The Moon is quiet, Maia. Listen with care; every machine has a story." },
        { speaker: "Maia", text: "I'm ready, Grandma. Tuerca and I will follow each signal." }
      ],
      lm: [
        { speaker: "Eagle", text: "I carried two astronauts down to the Moon. My descent stage still rests here." },
        { speaker: "Maia", text: "Thank you, Eagle. I'll climb up and read the words you left behind." }
      ],
      lrv: [
        { speaker: "Lunar rover", text: "I helped Apollo 15's crew explore farther from their lunar module." },
        { speaker: "Maia", text: "Let's follow your tracks and see how you traveled over the Moon." }
      ],
      alsep: [
        { speaker: "ALSEP", text: "My instruments listened for vibrations and sent their measurements back to Earth." },
        { speaker: "Maia", text: "I'll listen to your rhythm and help your signal ring out again." }
      ],
      surveyor: [
        { speaker: "Surveyor 3", text: "I tested a soft landing and used my scoop to examine the lunar soil." },
        { speaker: "Maia", text: "I'll make a gentle touchdown and stay with you as the lunar night comes." }
      ]
    },
    settings: {
      alsepBeatMs: 1250,
      alsepTargetPhase: 0.64,
      alsepWindow: 0.13,
      alsepRequiredPulses: 4,
      surveyorSafeFallSpeed: 260,
      surveyorNightDelayMs: 1800
    },
    stations: [
      {
        id: "lm",
        title: "APOLLO 11 LUNAR MODULE — EAGLE",
        x: 650,
        y: 500,
        promptX: 680,
        promptY: 420,
        promptRadius: 190,
        plaqueX: 680,
        plaqueY: 414,
        card: {
          what: "Eagle was Apollo 11's two-stage Moon lander. Its lower descent stage was left on the surface.",
          why: "It carried Armstrong and Aldrin to the lunar surface; its upper ascent stage brought them back to the orbiting command and service module.",
          how: "Four landing legs and a descent rocket set it down. The ladder let the astronauts reach the ground and the plaque mounted beside it.",
          learned: "The Apollo 11 EASEP included a passive seismometer. NASA's entry says the package worked normally even when temperatures exceeded its planned maximum by 30 C; it does not list a specific science discovery.",
          today: "The descent stage was left on the Moon. The source says the ascent stage's fate is unknown and assumes it crashed within one to four months.",
          source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
        }
      },
      {
        id: "lrv",
        title: "APOLLO 15 LUNAR ROVING VEHICLE",
        x: 1630,
        y: 520,
        promptX: 1500,
        promptY: 550,
        promptRadius: 230,
        startX: 1510,
        finishX: 2020,
        gates: [1660, 1815, 1950],
        card: {
          what: "Apollo 15 carried a Lunar Roving Vehicle (LRV) to explore the lunar terrain.",
          why: "The rover let the crew explore regions within 5 km of the lunar module.",
          how: "The astronauts unloaded, deployed and drove it during their moonwalks.",
          learned: "Apollo 15 was the first mission to use this kind of vehicle on the Moon; NASA describes its performance as very successful. The mission traverses covered 27.9 km and collected 77.31 kg of rock and soil.",
          today: "// VERIFY — the cited NASA page does not state the rover's present-day condition or location.",
          source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C"
        }
      },
      {
        id: "alsep",
        title: "APOLLO 12 — ALSEP",
        x: 2830,
        y: 520,
        promptX: 2830,
        promptY: 535,
        promptRadius: 195,
        card: {
          what: "ALSEP was a group of scientific instruments arranged around a central station on the Moon.",
          why: "Its experiments studied moonquakes and the lunar interior, magnetic field, solar wind, ions, atmosphere and dust.",
          how: "Cables connected the instruments to a central station. A radioisotope thermoelectric generator supplied power, and an antenna relayed data to Earth.",
          learned: "The Apollo 12 lunar-module impact produced the first recorded artificial moonquake. The ALSEP seismometer was designed to measure seismic activity and the lunar interior.",
          today: "The Apollo 12 ALSEP central station was switched on in 1969 and shut down with the other ALSEP stations on September 30, 1977.",
          source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C"
        }
      },
      {
        id: "surveyor",
        title: "SURVEYOR 3",
        x: 4170,
        y: 505,
        promptX: 4150,
        promptY: 540,
        promptRadius: 235,
        padX: 4420,
        padY: 542,
        card: {
          what: "Surveyor 3 was a robotic lunar lander with a TV camera and a surface sampler.",
          why: "Its mission was to make a soft landing and test whether the lunar surface could support an Apollo lunar module.",
          how: "It sent pictures and used a scoop to dig trenches and test the soil. The sampler could reach 1.5 m from the lander and dig up to 18 cm deep.",
          learned: "The tested lunar soil behaved much like wet sand and was strong enough to support an Apollo lunar module.",
          today: "Surveyor 3's last contact was May 4, 1967, two days after lunar night began. Apollo 12 astronauts later recovered parts of the inactive lander for study on Earth.",
          source: "https://science.nasa.gov/mission/surveyor-3/"
        }
      }
    ]
  }
};

(function addSpanishLanguage(data) {
  const englishText = data.text;
  const englishLunar = data.lunarWorld;
  const spanish = {
    text: {
      loadError: "El juego no pudo iniciarse. Comprueba tu conexión y que Phaser pueda cargarse desde el CDN; luego, vuelve a intentarlo.",
      loading: "AJUSTANDO EL ECOSCOPIO",
      loadingHint: "Buscando una señal entre las estrellas...",
      eyebrow: "UNA HISTORIA DE EXPLORADORES ESPACIALES",
      title: "LA SEÑAL SILENCIOSA",
      subtitle: "Algunos exploradores están lejos. Sus historias siguen cerca.",
      start: "COMENZAR EL VIAJE",
      startHint: "Pulsa ENTER o ESPACIO",
      footer: "Un viaje amable por las cosas que dejamos atrás.",
      expeditionLabel: "MISIÓN 01  /  LA LUNA",
      expeditionTitle: "Un lugar para comenzar",
      expeditionCopy: "La Luna es silenciosa, pero no está vacía. Las máquinas llegaron para ayudarnos a explorar y dejaron pistas en el polvo.",
      stationLabel: "PRIMERA SEÑAL",
      stationTitle: "El lugar de aterrizaje",
      stationCopy: "La expedición está lista. Pronto llegarán más historias.",
      controls: "MOVER  A / D  o  ← / →     SALTAR  ESPACIO / W / ↑     DOBLE SALTO  EN EL AIRE     SALTO EN PARED  JUNTO A UNA PARED",
      parkourIntro: "Una ruta lunar de práctica",
      parkourHint: "Prueba las plataformas móviles y el trampolín. En la zona luminosa la gravedad es menor.",
      parkourStart: "MOVER: A/D o flechas   •   SALTAR: Espacio/W/Arriba   •   INTERACTUAR: E/ENTER   •   ESC: título",
      parkourGoal: "SEÑAL ALCANZADA",
      parkourFinish: "¡Cruzaste la ruta de práctica! Tuerca está orgulloso de tus pasos cuidadosos.",
      parkourRescue: "Tuerca te atrapó y te llevó de vuelta al último lugar seguro.",
      parkourCheckpoint: "SEÑAL SEGURA GUARDADA",
      parkourStars: "ESTRELLAS DE ECO",
      parkourBatteries: "BATERÍAS",
      parkourLowGravity: "BAJA GRAVEDAD",
      parkourHintWall: "Salto en pared: pulsa saltar mientras tocas una pared.",
      parkourHintDouble: "Pulsa saltar otra vez en el aire para activar la mochila.",
      parkourReturn: "ESC  TÍTULO",
      controlsMenu: "MOVER  A / D  o  ← / →     SALTAR  ESPACIO / W / ↑",
      return: "VOLVER AL TÍTULO",
      signalError: "No se pudo cargar la expedición. Actualiza la página e inténtalo de nuevo.",
      languageButton: "IDIOMA: ES  (L)",
      journalButton: "ABRIR EL DIARIO DEL ECOSCOPIO",
      journalTitle: "DIARIO DEL ECOSCOPIO",
      journalCount: "FICHAS DE MISIÓN RECUPERADAS: {count} / {total}",
      journalEmpty: "Aún no hay fichas. Visita una estación lunar y escucha su historia.",
      journalInstructions: "IZQUIERDA / DERECHA: explorar fichas     ENTER / ESC: volver al menú",
      journalPrevious: "ANTERIOR",
      journalNext: "SIGUIENTE",
      journalReturn: "VOLVER AL MENÚ",
      journalStorageError: "La ficha está abierta, pero no se pudo guardar el diario en este dispositivo.",
      languageStorageError: "El idioma cambió, pero este dispositivo no pudo guardar la preferencia.",
      gameLabel: "Juego Space Explorers",
      pageTitle: "Exploradores espaciales",
      pageDescription: "Un viaje amable por las historias de los exploradores robóticos.",
      dialogueContinue: "Pulsa E o ENTER para continuar",
      dialogueIntro: "La Luna está callada, Maia. Escucha con atención; cada máquina tiene una historia.",
      dialogueIntroReply: "Estoy lista, abuela. Tuerca y yo seguiremos cada señal."
    },
    lunarWorld: {
      title: "LA LUNA — CUATRO SEÑALES TRANQUILAS",
      hint: "Recorre el valle y encuentra las cuatro estaciones de misión luminosas.",
      interactionHint: "Pulsa E para comenzar o conocer esta misión.",
      completedHint: "MISIÓN REGISTRADA — sigue explorando el valle.",
      progressLabel: "MISIONES",
      cardTitle: "FICHA DE MISIÓN DEL ECOSCOPIO",
      cardClose: "Pulsa E o ENTER para volver a la ruta lunar.",
      cardLabels: {
        what: "QUÉ ERA",
        why: "POR QUÉ VIAJÓ",
        how: "CÓMO FUNCIONABA",
        learned: "QUÉ APRENDIMOS",
        today: "QUÉ PASÓ DESPUÉS",
        source: "FUENTE OFICIAL DE LA NASA"
      },
      challenge: {
        lmClimb: "Sube por los escalones del módulo hasta la placa y pulsa E.",
        lmTooLow: "La placa está más arriba. Primero sube por los escalones del módulo.",
        lrvStart: "Pulsa E para guiar el rover del Apollo 15 por la ruta de baja gravedad.",
        lrvDrive: "CONDUCIR: mantén IZQUIERDA/DERECHA; pulsa ESPACIO para saltar. Pasa por las tres señales.",
        lrvProgress: "RUTA DEL ROVER — SEÑAL {current} DE {total}",
        alsepStart: "Pulsa E para escuchar el ritmo del sismómetro ALSEP.",
        alsepListen: "Pulsa ESPACIO cuando el pulso móvil cruce el anillo central brillante.",
        alsepProgress: "PULSOS SÍSMICOS: {current} / {total}",
        alsepMiss: "Ese pulso pasó. Escucha el siguiente e inténtalo otra vez.",
        surveyorStart: "Pulsa E para practicar un aterrizaje suave cerca de Surveyor 3.",
        surveyorLand: "PRÁCTICA DE ATERRIZAJE: mantén ESPACIO al descender para amortiguar el contacto.",
        surveyorRetry: "El aterrizaje fue muy rápido. Vuelve al saliente y amortigua el descenso.",
        surveyorNight: "La sombra lunar cruza la escena. Pulsa E para abrir la ficha de Surveyor 3.",
        surveyorFade: "Aterrizaje suave. Observa cómo la luz se desvanece sobre la última señal de Surveyor 3.",
        stationRecovered: "SEÑAL GUARDADA — la ficha se añadió a esta expedición."
      },
      dialogues: {
        intro: [
          { speaker: "Elena", text: "La Luna está callada, Maia. Escucha con atención; cada máquina tiene una historia." },
          { speaker: "Maia", text: "Estoy lista, abuela. Tuerca y yo seguiremos cada señal." }
        ],
        lm: [
          { speaker: "Eagle", text: "Llevé a dos astronautas hasta la Luna. Mi etapa de descenso todavía descansa aquí." },
          { speaker: "Maia", text: "Gracias, Eagle. Subiré a leer las palabras que dejaste." }
        ],
        lrv: [
          { speaker: "Rover lunar", text: "Ayudé a la tripulación del Apollo 15 a explorar más lejos de su módulo lunar." },
          { speaker: "Maia", text: "Sigamos tus huellas y descubramos cómo viajabas por la Luna." }
        ],
        alsep: [
          { speaker: "ALSEP", text: "Mis instrumentos escucharon vibraciones y enviaron sus mediciones a la Tierra." },
          { speaker: "Maia", text: "Escucharé tu ritmo y ayudaré a que tu señal vuelva a sonar." }
        ],
        surveyor: [
          { speaker: "Surveyor 3", text: "Probé un aterrizaje suave y usé mi pala para examinar el suelo lunar." },
          { speaker: "Maia", text: "Aterrizaré con cuidado y te acompañaré cuando llegue la noche lunar." }
        ]
      }
    },
    stations: {
      lm: {
        title: "MÓDULO LUNAR APOLLO 11 — EAGLE",
        card: {
          what: "Eagle fue el módulo lunar de dos etapas del Apollo 11. Su etapa de descenso quedó en la superficie.",
          why: "Llevó a Armstrong y Aldrin a la superficie lunar; su etapa de ascenso los devolvió al módulo de mando y servicio en órbita.",
          how: "Cuatro patas y un motor de descenso lo posaron en la Luna. La escalera permitió a los astronautas bajar y la placa estaba junto a ella.",
          learned: "El EASEP del Apollo 11 incluía un sismómetro pasivo. La ficha de la NASA dice que funcionó normalmente aunque la temperatura superó en 30 °C el máximo previsto; no detalla un descubrimiento científico específico.",
          today: "La etapa de descenso quedó en la Luna. La ficha dice que se desconoce el destino de la etapa de ascenso y supone que chocó contra la superficie entre uno y cuatro meses después."
        }
      },
      lrv: {
        title: "VEHÍCULO LUNAR APOLLO 15",
        card: {
          what: "El Apollo 15 llevó un Vehículo Lunar (LRV) para explorar el terreno de la Luna.",
          why: "El rover permitió a la tripulación explorar zonas a menos de 5 km del módulo lunar.",
          how: "Los astronautas lo descargaron, desplegaron y condujeron durante sus caminatas lunares.",
          learned: "El Apollo 15 fue la primera misión en usar un vehículo de este tipo en la Luna; la NASA describe su desempeño como muy exitoso. Los recorridos de la misión cubrieron 27,9 km y recolectaron 77,31 kg de rocas y suelo.",
          today: "// VERIFY — la página NASA citada no indica el estado ni la ubicación actual del rover."
        }
      },
      alsep: {
        title: "APOLLO 12 — ALSEP",
        card: {
          what: "ALSEP era un conjunto de instrumentos científicos desplegados alrededor de una estación central en la Luna.",
          why: "Sus experimentos estudiaron los lunamotos y el interior lunar, el campo magnético, el viento solar, los iones, la atmósfera y el polvo.",
          how: "Cables conectaban los instrumentos a una estación central. Un generador termoeléctrico de radioisótopos daba energía y una antena enviaba datos a la Tierra.",
          learned: "El impacto del módulo lunar del Apollo 12 produjo el primer lunamoto artificial registrado. El sismómetro ALSEP estaba diseñado para medir la actividad sísmica y el interior lunar.",
          today: "La estación central ALSEP del Apollo 12 se encendió en 1969 y se apagó junto con las demás estaciones ALSEP el 30 de septiembre de 1977."
        }
      },
      surveyor: {
        title: "SURVEYOR 3",
        card: {
          what: "Surveyor 3 fue una sonda lunar robótica con una cámara de televisión y un muestreador de superficie.",
          why: "Su misión era aterrizar suavemente y comprobar si el suelo lunar podía sostener un módulo lunar Apollo.",
          how: "Envió imágenes y usó una pala para cavar zanjas y probar el suelo. El muestreador llegaba a 1,5 m de la sonda y podía cavar hasta 18 cm.",
          learned: "El suelo lunar probado se comportó de forma parecida a la arena húmeda y tenía suficiente resistencia para sostener un módulo lunar Apollo.",
          today: "El último contacto de Surveyor 3 fue el 4 de mayo de 1967, dos días después del comienzo de la noche lunar. Más tarde, astronautas del Apollo 12 recuperaron partes de la sonda inactiva para estudiarlas en la Tierra."
        }
      }
    }
  };

  data.language = "en";
  data.setLanguage = function setLanguage(language) {
    if (language === "en") {
      this.text = englishText;
      this.lunarWorld = englishLunar;
    } else if (language === "es") {
      this.text = { ...englishText, ...spanish.text };
      this.lunarWorld = {
        ...englishLunar,
        ...spanish.lunarWorld,
        settings: englishLunar.settings,
        stations: englishLunar.stations.map((station) => ({
          ...station,
          ...spanish.stations[station.id],
          card: { ...station.card, ...spanish.stations[station.id].card }
        }))
      };
    } else {
      throw new RangeError(`Unsupported language: ${language}`);
    }
    this.language = language;
  };
}(window.SpaceData));
