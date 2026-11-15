// Configuracion inicial y textos visibles del prototipo.
window.SpaceData = {
  config: {
    width: 1280,
    height: 720,
    backgroundColor: "#0b1020",
    parent: "game-container",
    scene: ["BootScene", "LoadingScene", "MenuScene", "ExpeditionScene"],
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
    signalError: "The expedition could not be loaded. Please refresh the page and try again."
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
