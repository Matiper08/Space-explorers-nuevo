// Created with AI assistance (Claude, GitHub Copilot)
// Configuracion inicial y textos visibles del prototipo.
window.SpaceData = {
  config: {
    width: 1280,
    height: 720,
    backgroundColor: "#0b1020",
    parent: "game-container",
    scene: ["BootScene", "LoadingScene", "MenuScene", "SystemMapScene", "CreditsScene", "JournalScene", "PauseScene", "ExpeditionScene"],
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
    parkourStart: "MOVE: A/D or arrows • JUMP: Space/W/Up • INTERACT: E/Enter • P: pause • ESC: main menu",
    parkourGoal: "SIGNAL REACHED",
    parkourFinish: "You crossed the practice route! Tuerca is proud of your careful steps.",
    parkourRescue: "Tuerca caught you and brought you back to the last safe place.",
    parkourCheckpoint: "SAFE SIGNAL SAVED",
    parkourProgress: "ROUTE {percent}%  •  ATTEMPTS {attempts}",
    parkourTryAgain: "Almost! Try again!",
    parkourStars: "ECHO STARS",
    parkourBatteries: "BATTERIES",
    parkourLowGravity: "LOW GRAVITY",
    parkourHintWall: "Wall jump: press jump while touching a wall.",
    parkourHintDouble: "Press jump again in the air for a backpack boost.",
    parkourReturn: "ESC  MAIN MENU",
    controlsMenu: "MOVE  A / D  or  ← / →     JUMP  SPACE / W / ↑",
    return: "RETURN TO THE TITLE",
    signalError: "The expedition could not be loaded. Please refresh the page and try again.",
    languageButton: "LANGUAGE: EN  (L)",
    journalButton: "OPEN THE ECOSCOPE JOURNAL",
    journalResetButton: "RESET JOURNAL",
    journalResetTitle: "Reset the Ecoscope Journal?",
    journalResetPrompt: "This will erase every recovered mission card on this device.",
    journalResetConfirm: "RESET JOURNAL",
    journalResetCancel: "CANCEL",
    journalResetSuccess: "Journal reset.",
    journalResetError: "Could not reset the journal on this device.",
    journalTitle: "THE ECOSCOPE JOURNAL",
    journalCount: "RECOVERED MISSION CARDS: {count} / {total}",
    journalEmpty: "No mission cards yet. Visit a station on the Moon, Mars, or deep space and listen to its story.",
    journalInstructions: "LEFT / RIGHT: browse cards     ENTER / ESC: return to main menu",
    journalPrevious: "PREVIOUS",
    journalNext: "NEXT",
    journalReturn: "RETURN TO THE MENU",
    journalStorageError: "This mission card is open, but the journal could not save it on this device.",
    languageStorageError: "The language changed, but this device could not save the preference.",
    gameLabel: "Space Explorers game",
    pageTitle: "Space Explorers",
    pageDescription: "A gentle journey to the stories of robotic explorers.",
    dialogueContinue: "TAP OR PRESS E / ENTER TO CONTINUE",
    dialogueIntro: "The Moon is quiet, Maia. Listen with care; every machine has a story.",
    dialogueIntroReply: "I'm ready, Grandma. Tuerca and I will follow each signal.",
    worldButton: "CHOOSE WORLD: {world} — OPEN SYSTEM MAP",
    worldMoon: "THE MOON",
    worldMars: "MARS",
    worldDeep: "DEEP SPACE",
    creditsButton: "CREDITS",
    creditsTitle: "CREDITS & NASA MISSION SOURCES",
    creditsInstructions: "Select a mission source to open its official NASA page.",
    creditsAI: "Created with AI assistance (Claude, GitHub Copilot)",
    creditsOpenSource: "OPEN NASA SOURCE",
    creditsBack: "BACK TO THE MENU",
    mapTitle: "CHOOSE A SIGNAL TO FOLLOW",
    mapSubtitle: "Three places, many stories waiting to be heard.",
    mapScaleNote: "STORY MAP — NOT TO SCALE",
    mapMoonDescription: "4 mission signals",
    mapMarsDescription: "5 mission signals",
    mapDeepDescription: "5 mission signals",
    mapSelectHint: "Select a world with the pointer or LEFT/RIGHT + ENTER.",
    mapBack: "RETURN TO THE MENU",
    pauseTitle: "EXPEDITION PAUSED",
    pauseHint: "P: resume journey     ESC: return to the main menu",
    pauseRestart: "RESTART THIS WORLD",
    pauseMenu: "RETURN TO THE MENU",
    pauseHelpMode: "HELP MODE: {state}",
    pauseHelpOn: "ON",
    pauseHelpOff: "OFF",
    touchLeft: "LEFT",
    touchRight: "RIGHT",
    touchJump: "JUMP",
    touchAction: "ACTION",
    touchControlsHint: "Use on-screen buttons or keyboard • P: pause • ESC: main menu",
    marsExpeditionLabel: "MISSION 02  /  MARS",
    deepSpaceExpeditionLabel: "MISSION 03  /  DEEP SPACE"
  },
  lunarWorld: {
    title: "THE MOON — FOUR QUIET SIGNALS",
    hint: "Explore the valley and find the four glowing mission stations.",
    interactionHint: "Press E to begin or inspect this mission.",
    completedHint: "MISSION RECORDED — keep exploring the valley.",
    progressLabel: "MISSIONS",
    cardTitle: "ECOSCOPE MISSION CARD",
    cardClose: "TAP OR PRESS E / ENTER TO RETURN TO THE LUNAR ROUTE.",
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
  },
  marsWorld: {
    title: "MARS — FIVE RED-PLANET STORIES",
    hint: "Cross the rust dunes and canyon shelves to find five glowing mission stations.",
    interactionHint: "Press E to meet this explorer and try its mission challenge.",
    completedHint: "MISSION RECORDED — follow the wind to the next signal.",
    progressLabel: "MISSIONS",
    cardTitle: "ECOSCOPE MISSION CARD",
    cardClose: "TAP OR PRESS E / ENTER TO RETURN TO THE MARTIAN ROUTE.",
    cardLabels: {
      what: "WHAT IT WAS",
      why: "WHY IT WENT",
      how: "HOW IT WORKED",
      learned: "WHAT WE LEARNED",
      today: "WHAT HAPPENED NEXT",
      source: "OFFICIAL NASA SOURCE"
    },
    challenge: {
      pathfinderStart: "Press E to practise Pathfinder's airbag landing.",
      pathfinderBounce: "LANDING TEST: bounce across all three soft airbag pads.",
      pathfinderProgress: "AIRBAG BOUNCES: {current} / {total}",
      pathfinderMiss: "Keep your bounce gentle and land on the next glowing airbag.",
      roverStart: "Press E to help Spirit and Opportunity keep their solar panels clear.",
      roverAlign: "SOLAR PANELS: press E when sunlight slips through the dust-storm gap.",
      roverProgress: "SUNLIGHT CAUGHT: {current} / {total}",
      roverMiss: "Dust covered the panels. Watch for the next clear patch of sunlight.",
      vikingStart: "Press E to guide Viking 1's sampler arm toward Martian soil.",
      vikingAim: "SAMPLER ARM: use LEFT/RIGHT to aim, then press E to collect each sample.",
      vikingProgress: "SOIL SAMPLES: {current} / {total}",
      vikingMiss: "The scoop missed the marked soil. Adjust the arm and try again.",
      insightStart: "Press E to listen for a tremor with InSight.",
      insightListen: "SEISMOMETER: press SPACE when the moving wave reaches the bright center.",
      insightProgress: "MARSQUAKES RECORDED: {current} / {total}",
      insightMiss: "That wave passed. Listen for the next gentle pulse.",
      ingenuityStart: "Press E to try Ingenuity's first powered flight on Mars.",
      ingenuityFly: "FLIGHT TEST: hold SPACE to rise; steer LEFT/RIGHT through all three beacons.",
      ingenuityProgress: "FLIGHT BEACONS: {current} / {total}",
      stationRecovered: "SIGNAL SAVED — mission card added to the Ecoscope Journal."
    },
    dialogues: {
      intro: [
        { speaker: "Elena", text: "Mars is full of old wind and red dust, Maia. Every signal here carried a brave idea." },
        { speaker: "Maia", text: "We'll listen, Grandma. Tuerca and I are ready to follow the tracks." }
      ],
      pathfinder: [
        { speaker: "Pathfinder", text: "I wrapped myself in airbags and bounced before Sojourner rolled down my ramp." },
        { speaker: "Maia", text: "Let's try a gentle bounce, Pathfinder, and help your little rover explore." }
      ],
      rovers: [
        { speaker: "Spirit & Opportunity", text: "We are twins. Our solar panels gathered sunlight while we searched for signs of ancient water." },
        { speaker: "Maia", text: "I'll help brush away the storm and give your panels a little sunlight." }
      ],
      viking: [
        { speaker: "Viking 1", text: "I reached out with my sampler arm and brought Martian soil to my onboard laboratory." },
        { speaker: "Maia", text: "Let's guide your careful arm and see what the red soil can tell us." }
      ],
      insight: [
        { speaker: "InSight", text: "I listened to Mars tremble. Seismic waves helped scientists study what lies inside." },
        { speaker: "Maia", text: "I'll listen for your quiet pulses and help them travel home." }
      ],
      ingenuity: [
        { speaker: "Ingenuity", text: "I was a small helicopter. I made the first powered flight on another planet." },
        { speaker: "Maia", text: "Let's fly a little route together, Ingenuity. Tuerca will watch from below." }
      ]
    },
    settings: {
      pathfinderRequiredBounces: 3,
      roverCycleMs: 2600,
      roverWindowStart: 0.48,
      roverWindowEnd: 0.8,
      roverRequiredSunbeams: 3,
      vikingArmStep: 0.48,
      vikingRequiredSamples: 3,
      insightBeatMs: 1500,
      insightTargetPhase: 0.63,
      insightWindow: 0.14,
      insightRequiredPulses: 3,
      ingenuityGateRadius: 88,
      ingenuityGateHeights: [396, 304, 382]
    },
    stations: [
      {
        id: "pathfinder",
        title: "MARS PATHFINDER & SOJOURNER",
        x: 620, y: 475, promptX: 620, promptY: 510, promptRadius: 245,
        card: {
          what: "Mars Pathfinder was a lander that delivered the Sojourner rover to Mars in 1997.",
          why: "It was designed as a technology demonstration to safely land an instrumented lander and a free-roving robot.",
          how: "A parachute slowed Pathfinder in the thin atmosphere; airbags cushioned impact. The lander bounced about 15 times before stopping, and Sojourner rolled down a ramp.",
          learned: "The mission returned 2.3 billion bits of information, thousands of images, and more than 15 chemical analyses of rocks and soil. Findings suggested Mars was once warmer and wetter.",
          today: "The final data transmission came on September 27, 1997, when the mission ended.",
          source: "https://science.nasa.gov/mission/mars-pathfinder/"
        }
      },
      {
        id: "rovers",
        title: "SPIRIT & OPPORTUNITY",
        x: 1510, y: 492, promptX: 1510, promptY: 535, promptRadius: 250,
        card: {
          what: "Spirit and Opportunity were twin, solar-powered Mars rovers.",
          why: "They searched for signs that water had once existed on Mars.",
          how: "Their cameras and science instruments examined rocks and soil as the rovers drove across the surface; sunlight powered their work.",
          learned: "The rovers confirmed that water had been present on Mars for long periods in the ancient past.",
          today: "Spirit's mission ended in 2010. Opportunity last communicated on June 10, 2018, during a planet-wide dust storm.",
          source: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
        }
      },
      {
        id: "viking",
        title: "VIKING 1",
        x: 2450, y: 477, promptX: 2450, promptY: 520, promptRadius: 250,
        card: {
          what: "Viking 1 paired an orbiter with a lander that carried cameras, science instruments, and a remote sampler arm.",
          why: "It explored Mars from orbit and the surface, including experiments looking for evidence about the possibility of life.",
          how: "The lander's sampler arm scooped Martian soil and placed it in onboard biology and chemistry instruments.",
          learned: "Viking 1 returned the first images from a successful NASA landing on Mars. Its major soil test for organic compounds gave negative results.",
          today: "The orbiter was shut down in 1980. The lander stopped operating in 1982 after receiving a faulty command.",
          source: "https://science.nasa.gov/mission/viking-1/"
        }
      },
      {
        id: "insight",
        title: "INSIGHT",
        x: 3380, y: 500, promptX: 3380, promptY: 540, promptRadius: 255,
        card: {
          what: "InSight was a stationary lander built to study Mars' deep interior.",
          why: "Its measurements were designed to reveal how Mars and other rocky planets formed and changed.",
          how: "A robotic arm placed a seismometer on the ground to listen for marsquakes and vibrations inside the planet.",
          learned: "Seismic waves from marsquakes and impacts helped scientists study the structure of Mars' interior.",
          today: "The mission ended on December 15, 2022.",
          source: "https://science.nasa.gov/mission/insight/"
        }
      },
      {
        id: "ingenuity",
        title: "INGENUITY MARS HELICOPTER",
        x: 4260, y: 448, promptX: 4260, promptY: 500, promptRadius: 260,
        card: {
          what: "Ingenuity was a small helicopter carried to Mars beneath the Perseverance rover.",
          why: "It was a technology demonstration to test powered, controlled flight in the thin Martian atmosphere.",
          how: "Its spinning rotors lifted it from the ground; after its first test flights, it also scouted terrain from the air.",
          learned: "Ingenuity made the first powered, controlled flight on another planet and completed 72 flights, far beyond its planned five test flights.",
          today: "Its final flight was January 18, 2024. NASA declared the mission complete on January 25, 2024.",
          source: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
        }
      }
    ]
  },
  deepSpaceWorld: {
    title: "DEEP SPACE — FIVE DISTANT SIGNALS",
    hint: "Follow the nebula ribbons, asteroid belt, and star signals to find five explorers.",
    interactionHint: "Press E to meet this explorer and try its mission challenge.",
    completedHint: "MISSION RECORDED — follow the aurora to the next signal.",
    progressLabel: "MISSIONS",
    cardTitle: "ECOSCOPE MISSION CARD",
    cardClose: "TAP OR PRESS E / ENTER TO RETURN TO THE DEEP-SPACE ROUTE.",
    finaleTitle: "A THANK-YOU, CARRIED INTO THE QUIET",
    finaleMessage: "Maia sends a small thank-you toward the Voyager twins.\nTheir journey continues beyond the Sun's protective bubble.\nFar behind them, Earth is a pale blue dot.",
    finaleClose: "TAP OR PRESS E / ENTER TO RETURN TO THE TITLE.",
    cardLabels: {
      what: "WHAT IT WAS",
      why: "WHY IT WENT",
      how: "HOW IT WORKED",
      learned: "WHAT WE LEARNED",
      today: "WHAT HAPPENED NEXT",
      source: "OFFICIAL NASA SOURCE"
    },
    challenge: {
      dawnStart: "Press E to guide Dawn's gentle, steady ion-propulsion practice.",
      dawnThrust: "ION THRUST: hold RIGHT to build a small, steady push through all three beacons.",
      dawnProgress: "STEADY THRUST BEACONS: {current} / {total}",
      nearStart: "Press E to begin NEAR Shoemaker's careful descent to Eros.",
      nearDescend: "DESCENT: steer LEFT/RIGHT over the landing mark; hold SPACE to slow down.",
      nearRetry: "A safe touchdown needs gentle speed and a centered approach. Try again.",
      nearProgress: "APPROACH: line up with the glowing landing mark.",
      pioneerStart: "Press E to follow Pioneer 10's plaque signal through the asteroid belt.",
      pioneerCross: "ASTEROID BELT: jump and steer through each glowing passage.",
      pioneerProgress: "BELT PASSAGES: {current} / {total}",
      keplerStart: "Press E to watch the star and count three tiny transits.",
      keplerTransit: "TRANSIT WATCH: press SPACE when a planet dims the star.",
      keplerProgress: "STAR DIPS COUNTED: {current} / {total}",
      keplerMiss: "The star brightened again. Wait for the next small dip.",
      voyagerStart: "Press E to ride the planets' gravity assists toward the Voyager twins.",
      voyagerFly: "GRAVITY ASSISTS: steer through each planetary ring; hold SPACE to rise.",
      voyagerProgress: "PLANETARY SWINGS: {current} / {total}",
      stationRecovered: "SIGNAL SAVED — mission card added to the Ecoscope Journal."
    },
    dialogues: {
      intro: [
        { speaker: "Elena", text: "Beyond the planets, Maia, old signals still travel through the dark." },
        { speaker: "Maia", text: "We'll follow them gently, Grandma. Every distance holds a story." }
      ],
      dawn: [
        { speaker: "Dawn", text: "I visited Vesta and Ceres, two very different worlds in the asteroid belt." },
        { speaker: "Maia", text: "I'll keep a small, steady push going as we follow your path, Dawn." }
      ],
      near: [
        { speaker: "NEAR Shoemaker", text: "I orbited Eros, then touched down gently. I wasn't built to land, but I survived." },
        { speaker: "Maia", text: "Let's line up carefully, NEAR. Your last landing still had more to tell." }
      ],
      pioneer: [
        { speaker: "Pioneer 10", text: "I crossed the asteroid belt and carried a small plaque about the people who sent me." },
        { speaker: "Maia", text: "We'll pass the stones together, Pioneer, and keep your message safe." }
      ],
      kepler: [
        { speaker: "Kepler", text: "I watched distant stars. A tiny dip in their light could reveal a planet passing by." },
        { speaker: "Maia", text: "I'll watch for each little shadow, Kepler. One quiet blink can mean a whole new world." }
      ],
      voyager: [
        { speaker: "Voyager 1 & 2", text: "We flew past giant planets and now travel beyond the Sun's protective bubble." },
        { speaker: "Maia", text: "Thank you for carrying our curiosity so far. I have a little message for you both." }
      ]
    },
    settings: {
      dawnGateRadius: 66,
      nearTargetRadius: 72,
      nearSafeSpeed: 82,
      nearLandingY: 455,
      pioneerGateRadius: 78,
      keplerBeatMs: 1800,
      keplerTargetPhase: 0.68,
      keplerWindow: 0.13,
      keplerRequiredTransits: 3,
      voyagerGateRadius: 84
    },
    stations: [
      {
        id: "dawn",
        title: "DAWN — VESTA & CERES",
        x: 620, y: 465, promptX: 620, promptY: 505, promptRadius: 245,
        card: {
          what: "Dawn was an orbiter and NASA's first truly interplanetary spaceship.",
          why: "It made extended stays at Vesta and Ceres, two different bodies in the main asteroid belt.",
          how: "// VERIFY — the linked NASA mission page does not describe Dawn's ion-propulsion system.",
          learned: "The linked page identifies Dawn's two targets but does not state a specific science finding.",
          today: "NASA lists Dawn's mission status as successful; the page does not describe its present-day condition.",
          source: "https://science.nasa.gov/mission/dawn/"
        }
      },
      {
        id: "near",
        title: "NEAR SHOEMAKER — EROS",
        x: 1510, y: 475, promptX: 1510, promptY: 515, promptRadius: 245,
        card: {
          what: "NEAR Shoemaker was the first spacecraft to orbit an asteroid and the first to land on one.",
          why: "It traveled to asteroid Eros to study its physical properties, minerals, shape, interior mass distribution, and magnetic field.",
          how: "After orbiting Eros, it made a slow, controlled descent at about 4 mph. Though not designed as a lander, it survived and returned data for about two weeks.",
          learned: "It found that Eros had no magnetic field, mapped more than 70% of its surface, and returned about 160,000 images.",
          today: "The last contact was on Feb. 28, 2001; the spacecraft succumbed to extreme cold.",
          source: "https://science.nasa.gov/mission/near-shoemaker/"
        }
      },
      {
        id: "pioneer",
        title: "PIONEER 10",
        x: 2440, y: 475, promptX: 2440, promptY: 515, promptRadius: 245,
        card: {
          what: "Pioneer 10 was the first spacecraft to fly past Jupiter and cross the main asteroid belt.",
          why: "It explored Jupiter and continued outward through the solar system.",
          how: "It crossed the asteroid belt and carried an aluminum plaque with diagrams of a man and woman, the solar system, and the Sun's location relative to 14 pulsars.",
          learned: "Its Jupiter encounter was the first close-up exploration of the giant planet by a spacecraft.",
          today: "Its last signal reached Earth on Jan. 23, 2003. A final NASA contact attempt in 2006 failed; the spacecraft is inert and heads toward Aldebaran.",
          source: "https://science.nasa.gov/mission/pioneer-10/"
        }
      },
      {
        id: "kepler",
        title: "KEPLER / K2",
        x: 3330, y: 470, promptX: 3330, promptY: 510, promptRadius: 245,
        card: {
          what: "Kepler was NASA's first space telescope dedicated to hunting for planets beyond our solar system.",
          why: "It surveyed stars to find Earth-sized planets and learn how common planets are in our galaxy.",
          how: "It watched for transits: tiny dips in a star's brightness as a planet crossed in front of it.",
          learned: "Kepler and K2 revealed thousands of exoplanets and showed that planets are common around stars.",
          today: "NASA retired Kepler on Oct. 30, 2018, after it ran out of fuel; it remains in a safe orbit.",
          source: "https://science.nasa.gov/mission/kepler/"
        }
      },
      {
        id: "voyager",
        title: "VOYAGER 1 & 2",
        x: 4240, y: 445, promptX: 4240, promptY: 495, promptRadius: 255,
        card: {
          what: "Voyager 1 and Voyager 2 are twin spacecraft sent on multiple flybys of the outer Solar System.",
          why: "They explored the outer planets and continued toward interstellar space.",
          how: "// VERIFY — the linked NASA Voyager page does not describe the gravity-assist maneuvers; this challenge is a simplified illustration.",
          learned: "They are the only spacecraft to operate outside the heliosphere. Voyager 1 reached that boundary in 2012 and Voyager 2 in 2018.",
          today: "NASA lists the Voyagers as an extended mission; both continue traveling beyond the Sun's protective bubble.",
          source: "https://science.nasa.gov/mission/voyager/"
        }
      }
    ]
  }
};

(function addSpanishLanguage(data) {
  const englishText = data.text;
  const englishLunar = data.lunarWorld;
  const englishMars = data.marsWorld;
  const englishDeepSpace = data.deepSpaceWorld;
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
      parkourStart: "MOVER: A/D o flechas • SALTAR: Espacio/W/Arriba • INTERACTUAR: E/Enter • P: pausa • ESC: menú",
      parkourGoal: "SEÑAL ALCANZADA",
      parkourFinish: "¡Cruzaste la ruta de práctica! Tuerca está orgulloso de tus pasos cuidadosos.",
      parkourRescue: "Tuerca te atrapó y te llevó de vuelta al último lugar seguro.",
      parkourCheckpoint: "SEÑAL SEGURA GUARDADA",
      parkourProgress: "RUTA {percent}%  •  INTENTOS {attempts}",
      parkourTryAgain: "¡Casi! ¡Otra vez!",
      parkourStars: "ESTRELLAS DE ECO",
      parkourBatteries: "BATERÍAS",
      parkourLowGravity: "BAJA GRAVEDAD",
      parkourHintWall: "Salto en pared: pulsa saltar mientras tocas una pared.",
      parkourHintDouble: "Pulsa saltar otra vez en el aire para activar la mochila.",
      parkourReturn: "ESC  MENÚ PRINCIPAL",
      controlsMenu: "MOVER  A / D  o  ← / →     SALTAR  ESPACIO / W / ↑",
      return: "VOLVER AL TÍTULO",
      signalError: "No se pudo cargar la expedición. Actualiza la página e inténtalo de nuevo.",
      languageButton: "IDIOMA: ES  (L)",
      journalButton: "ABRIR EL DIARIO DEL ECOSCOPIO",
      journalResetButton: "REINICIAR DIARIO",
      journalResetTitle: "¿Reiniciar el Diario del Ecoscopio?",
      journalResetPrompt: "Se borrarán todas las fichas recuperadas de este dispositivo.",
      journalResetConfirm: "REINICIAR",
      journalResetCancel: "CANCELAR",
      journalResetSuccess: "Diario reiniciado.",
      journalResetError: "No se pudo reiniciar el diario en este dispositivo.",
      journalTitle: "DIARIO DEL ECOSCOPIO",
      journalCount: "FICHAS DE MISIÓN RECUPERADAS: {count} / {total}",
      journalEmpty: "Aún no hay fichas. Visita una estación en la Luna, Marte o el espacio profundo y escucha su historia.",
      journalInstructions: "IZQUIERDA / DERECHA: explorar fichas     ENTER / ESC: volver al menú principal",
      journalPrevious: "ANTERIOR",
      journalNext: "SIGUIENTE",
      journalReturn: "VOLVER AL MENÚ",
      journalStorageError: "La ficha está abierta, pero no se pudo guardar el diario en este dispositivo.",
      languageStorageError: "El idioma cambió, pero este dispositivo no pudo guardar la preferencia.",
      gameLabel: "Juego Space Explorers",
      pageTitle: "Exploradores espaciales",
      pageDescription: "Un viaje amable por las historias de los exploradores robóticos.",
      dialogueContinue: "TOCA O PULSA E / ENTER PARA CONTINUAR",
      dialogueIntro: "La Luna está callada, Maia. Escucha con atención; cada máquina tiene una historia.",
      dialogueIntroReply: "Estoy lista, abuela. Tuerca y yo seguiremos cada señal.",
      worldButton: "ELIGE MUNDO: {world} — ABRIR MAPA",
      worldMoon: "LA LUNA",
      worldMars: "MARTE",
      worldDeep: "ESPACIO PROFUNDO",
      creditsButton: "CRÉDITOS",
      creditsTitle: "CRÉDITOS Y FUENTES DE MISIONES NASA",
      creditsInstructions: "Selecciona una fuente para abrir su página oficial de la NASA.",
      creditsAI: "Created with AI assistance (Claude, GitHub Copilot)",
      creditsOpenSource: "ABRIR FUENTE NASA",
      creditsBack: "VOLVER AL MENÚ",
      mapTitle: "ELIGE UNA SEÑAL PARA SEGUIR",
      mapSubtitle: "Tres lugares, muchas historias por escuchar.",
      mapScaleNote: "MAPA NARRATIVO — NO A ESCALA",
      mapMoonDescription: "4 señales de misión",
      mapMarsDescription: "5 señales de misión",
      mapDeepDescription: "5 señales de misión",
      mapSelectHint: "Elige un mundo con el puntero o IZQUIERDA/DERECHA + ENTER.",
      mapBack: "VOLVER AL MENÚ",
      pauseTitle: "EXPEDICIÓN EN PAUSA",
      pauseHint: "P: continuar el viaje     ESC: volver al menú principal",
      pauseRestart: "REINICIAR ESTE MUNDO",
      pauseMenu: "VOLVER AL MENÚ",
      pauseHelpMode: "MODO AYUDA: {state}",
      pauseHelpOn: "ACTIVADO",
      pauseHelpOff: "DESACTIVADO",
      touchLeft: "IZQUIERDA",
      touchRight: "DERECHA",
      touchJump: "SALTAR",
      touchAction: "ACCIÓN",
      touchControlsHint: "Usa los botones o el teclado • P: pausa • ESC: menú principal",
      marsExpeditionLabel: "MISIÓN 02  /  MARTE",
      deepSpaceExpeditionLabel: "MISIÓN 03  /  ESPACIO PROFUNDO"
    },
    lunarWorld: {
      title: "LA LUNA — CUATRO SEÑALES TRANQUILAS",
      hint: "Recorre el valle y encuentra las cuatro estaciones de misión luminosas.",
      interactionHint: "Pulsa E para comenzar o conocer esta misión.",
      completedHint: "MISIÓN REGISTRADA — sigue explorando el valle.",
      progressLabel: "MISIONES",
      cardTitle: "FICHA DE MISIÓN DEL ECOSCOPIO",
      cardClose: "TOCA O PULSA E / ENTER PARA VOLVER A LA RUTA LUNAR.",
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
    marsWorld: {
      title: "MARTE — CINCO HISTORIAS DEL PLANETA ROJO",
      hint: "Cruza las dunas oxidadas y los bordes del cañón para hallar cinco estaciones.",
      interactionHint: "Pulsa E para conocer a esta exploradora y probar su reto de misión.",
      completedHint: "MISIÓN REGISTRADA — sigue el viento hacia la próxima señal.",
      progressLabel: "MISIONES",
      cardTitle: "FICHA DE MISIÓN DEL ECOSCOPIO",
      cardClose: "TOCA O PULSA E / ENTER PARA VOLVER A LA RUTA MARCIANA.",
      cardLabels: {
        what: "QUÉ ERA",
        why: "POR QUÉ VIAJÓ",
        how: "CÓMO FUNCIONABA",
        learned: "QUÉ APRENDIMOS",
        today: "QUÉ PASÓ DESPUÉS",
        source: "FUENTE OFICIAL DE LA NASA"
      },
      challenge: {
        pathfinderStart: "Pulsa E para practicar el aterrizaje con airbags de Pathfinder.",
        pathfinderBounce: "PRUEBA DE ATERRIZAJE: rebota por los tres airbags acolchados.",
        pathfinderProgress: "REBOTES CON AIRBAGS: {current} / {total}",
        pathfinderMiss: "Mantén un rebote suave y aterriza sobre el siguiente airbag luminoso.",
        roverStart: "Pulsa E para ayudar a Spirit y Opportunity a despejar sus paneles solares.",
        roverAlign: "PANELES SOLARES: pulsa E cuando la luz atraviese una abertura en la tormenta.",
        roverProgress: "RAYOS DE SOL CAPTADOS: {current} / {total}",
        roverMiss: "El polvo cubrió los paneles. Espera el próximo claro de luz.",
        vikingStart: "Pulsa E para dirigir el brazo recolector de Viking 1 hacia el suelo marciano.",
        vikingAim: "BRAZO RECOLECTOR: usa IZQUIERDA/DERECHA para apuntar y E para recoger cada muestra.",
        vikingProgress: "MUESTRAS DE SUELO: {current} / {total}",
        vikingMiss: "La pala no alcanzó el suelo marcado. Ajusta el brazo e inténtalo otra vez.",
        insightStart: "Pulsa E para escuchar un temblor con InSight.",
        insightListen: "SISMÓMETRO: pulsa ESPACIO cuando la onda móvil cruce el centro luminoso.",
        insightProgress: "MARTEMOTOS REGISTRADOS: {current} / {total}",
        insightMiss: "Esa onda pasó. Escucha el siguiente pulso suave.",
        ingenuityStart: "Pulsa E para probar el primer vuelo motorizado de Ingenuity en Marte.",
        ingenuityFly: "PRUEBA DE VUELO: mantén ESPACIO para subir; gira IZQUIERDA/DERECHA por las tres señales.",
        ingenuityProgress: "SEÑALES DE VUELO: {current} / {total}",
        stationRecovered: "SEÑAL GUARDADA — la ficha se añadió al Diario del Ecoscopio."
      },
      dialogues: {
        intro: [
          { speaker: "Elena", text: "Marte está lleno de viento antiguo y polvo rojo, Maia. Cada señal trajo una idea valiente." },
          { speaker: "Maia", text: "Escucharemos, abuela. Tuerca y yo estamos listas para seguir las huellas." }
        ],
        pathfinder: [
          { speaker: "Pathfinder", text: "Me envolví en airbags y reboté antes de que Sojourner bajara por mi rampa." },
          { speaker: "Maia", text: "Probemos un rebote suave, Pathfinder, y ayudemos a tu pequeño rover a explorar." }
        ],
        rovers: [
          { speaker: "Spirit y Opportunity", text: "Somos gemelos. Nuestros paneles solares recogían luz mientras buscábamos señales de agua antigua." },
          { speaker: "Maia", text: "Ayudaré a despejar la tormenta y a llevar un poco de luz a sus paneles." }
        ],
        viking: [
          { speaker: "Viking 1", text: "Extendí mi brazo recolector y llevé suelo marciano hasta mi laboratorio." },
          { speaker: "Maia", text: "Guiemos tu brazo con cuidado y veamos qué nos cuenta el suelo rojo." }
        ],
        insight: [
          { speaker: "InSight", text: "Escuché temblar a Marte. Las ondas sísmicas ayudaron a estudiar lo que hay en su interior." },
          { speaker: "Maia", text: "Escucharé tus pulsos suaves y ayudaré a que viajen hasta casa." }
        ],
        ingenuity: [
          { speaker: "Ingenuity", text: "Era un pequeño helicóptero. Hice el primer vuelo motorizado en otro planeta." },
          { speaker: "Maia", text: "Volemos juntos un pequeño recorrido, Ingenuity. Tuerca mirará desde abajo." }
        ]
      },
      settings: {
        pathfinderRequiredBounces: 3,
        roverCycleMs: 2600,
        roverWindowStart: 0.48,
        roverWindowEnd: 0.8,
        roverRequiredSunbeams: 3,
        vikingArmStep: 0.48,
        vikingRequiredSamples: 3,
        insightBeatMs: 1500,
        insightTargetPhase: 0.63,
        insightWindow: 0.14,
        insightRequiredPulses: 3,
        ingenuityGateRadius: 88,
        ingenuityGateHeights: [396, 304, 382]
      },
      stations: {
        pathfinder: {
          title: "MARS PATHFINDER Y SOJOURNER",
          card: {
            what: "Mars Pathfinder fue una sonda de aterrizaje que llevó el rover Sojourner a Marte en 1997.",
            why: "Se diseñó como demostración tecnológica para aterrizar con seguridad una sonda instrumentada y un rover autónomo.",
            how: "Un paracaídas frenó a Pathfinder en la tenue atmósfera; airbags acolcharon el impacto. Rebotó unas 15 veces y Sojourner bajó por una rampa.",
            learned: "La misión envió 2.300 millones de bits, miles de imágenes y más de 15 análisis químicos de rocas y suelo. Los resultados sugirieron que Marte fue más cálido y húmedo.",
            today: "La transmisión final de datos llegó el 27 de septiembre de 1997, cuando terminó la misión."
          }
        },
        deepSpaceWorld: {
          title: "ESPACIO PROFUNDO — CINCO SEÑALES LEJANAS",
          hint: "Sigue las nebulosas, el cinturón de asteroides y las estrellas para hallar cinco exploradores.",
          interactionHint: "Pulsa E para conocer a esta exploradora y probar su reto de misión.",
          completedHint: "MISIÓN REGISTRADA — sigue la aurora hacia la próxima señal.",
          progressLabel: "MISIONES",
          cardTitle: "FICHA DE MISIÓN DEL ECOSCOPIO",
          cardClose: "TOCA O PULSA E / ENTER PARA VOLVER A LA RUTA DEL ESPACIO PROFUNDO.",
          finaleTitle: "UN AGRADECIMIENTO QUE VIAJA EN EL SILENCIO",
          finaleMessage: "Maia envía un pequeño gracias a las gemelas Voyager.\nSu viaje continúa más allá de la burbuja protectora del Sol.\nMuy lejos, la Tierra es un punto azul pálido.",
          finaleClose: "TOCA O PULSA E / ENTER PARA VOLVER AL TÍTULO.",
          cardLabels: {
            what: "QUÉ ERA",
            why: "POR QUÉ VIAJÓ",
            how: "CÓMO FUNCIONABA",
            learned: "QUÉ APRENDIMOS",
            today: "QUÉ PASÓ DESPUÉS",
            source: "FUENTE OFICIAL DE LA NASA"
          },
          challenge: {
            dawnStart: "Pulsa E para guiar la práctica de propulsión iónica suave y constante de Dawn.",
            dawnThrust: "EMPUJE IÓNICO: mantén DERECHA para avanzar suave y continuamente por las tres señales.",
            dawnProgress: "SEÑALES DE EMPUJE CONSTANTE: {current} / {total}",
            nearStart: "Pulsa E para iniciar el descenso cuidadoso de NEAR Shoemaker hacia Eros.",
            nearDescend: "DESCENSO: gira IZQUIERDA/DERECHA sobre la marca; mantén ESPACIO para frenar.",
            nearRetry: "Para aterrizar con cuidado, baja despacio y centra el acercamiento. Inténtalo otra vez.",
            nearProgress: "ACERCAMIENTO: alinea la nave con la marca luminosa.",
            pioneerStart: "Pulsa E para seguir la señal de la placa de Pioneer 10 por el cinturón de asteroides.",
            pioneerCross: "CINTURÓN DE ASTEROIDES: salta y gira para pasar por cada abertura luminosa.",
            pioneerProgress: "PASOS DEL CINTURÓN: {current} / {total}",
            keplerStart: "Pulsa E para observar la estrella y contar tres tránsitos diminutos.",
            keplerTransit: "OBSERVA EL TRÁNSITO: pulsa ESPACIO cuando un planeta atenúe la estrella.",
            keplerProgress: "BAJADAS DE LUZ CONTADAS: {current} / {total}",
            keplerMiss: "La estrella volvió a brillar. Espera la próxima pequeña bajada.",
            voyagerStart: "Pulsa E para aprovechar la asistencia gravitatoria de los planetas rumbo a Voyager.",
            voyagerFly: "ASISTENCIAS GRAVITATORIAS: atraviesa cada anillo planetario; mantén ESPACIO para subir.",
            voyagerProgress: "GIROS PLANETARIOS: {current} / {total}",
            stationRecovered: "SEÑAL GUARDADA — la ficha se añadió al Diario del Ecoscopio."
          },
          dialogues: {
            intro: [
              { speaker: "Elena", text: "Más allá de los planetas, Maia, antiguas señales todavía viajan en la oscuridad." },
              { speaker: "Maia", text: "Las seguiremos con cuidado, abuela. Cada distancia guarda una historia." }
            ],
            dawn: [
              { speaker: "Dawn", text: "Visité Vesta y Ceres, dos mundos muy distintos del cinturón de asteroides." },
              { speaker: "Maia", text: "Mantendré un empujoncito constante mientras seguimos tu camino, Dawn." }
            ],
            near: [
              { speaker: "NEAR Shoemaker", text: "Orbité Eros y luego aterricé suavemente. No estaba hecha para aterrizar, pero sobreviví." },
              { speaker: "Maia", text: "Alineémonos con cuidado, NEAR. Tu último aterrizaje aún tenía mucho que contar." }
            ],
            pioneer: [
              { speaker: "Pioneer 10", text: "Crucé el cinturón de asteroides y llevé una placa pequeña sobre quienes me enviaron." },
              { speaker: "Maia", text: "Pasaremos entre las rocas y cuidaremos tu mensaje, Pioneer." }
            ],
            kepler: [
              { speaker: "Kepler", text: "Observé estrellas lejanas. Una diminuta bajada de luz podía revelar un planeta." },
              { speaker: "Maia", text: "Buscaré cada sombrita, Kepler. Un pequeño parpadeo puede revelar un mundo." }
            ],
            voyager: [
              { speaker: "Voyager 1 y 2", text: "Pasamos junto a planetas gigantes y ahora viajamos más allá de la burbuja del Sol." },
              { speaker: "Maia", text: "Gracias por llevar tan lejos nuestra curiosidad. Tengo un pequeño mensaje para ustedes." }
            ]
          },
          settings: {
            dawnGateRadius: 66,
            nearTargetRadius: 72,
            nearSafeSpeed: 82,
            nearLandingY: 455,
            pioneerGateRadius: 78,
            keplerBeatMs: 1800,
            keplerTargetPhase: 0.68,
            keplerWindow: 0.13,
            keplerRequiredTransits: 3,
            voyagerGateRadius: 84
          },
          stations: {
            dawn: {
              title: "DAWN — VESTA Y CERES",
              card: {
                what: "Dawn fue un orbitador y la primera nave verdaderamente interplanetaria de NASA.",
                why: "Permaneció durante largos períodos en Vesta y Ceres, dos cuerpos distintos del cinturón principal de asteroides.",
                how: "// VERIFY — la página NASA citada no describe el sistema de propulsión iónica de Dawn.",
                learned: "La página citada identifica los dos destinos de Dawn, pero no menciona un hallazgo científico específico.",
                today: "NASA indica que Dawn completó con éxito su misión; la página no describe su estado actual."
              }
            },
            near: {
              title: "NEAR SHOEMAKER — EROS",
              card: {
                what: "NEAR Shoemaker fue la primera nave en orbitar un asteroide y la primera en aterrizar en uno.",
                why: "Viajó al asteroide Eros para estudiar sus propiedades físicas, minerales, forma, interior y campo magnético.",
                how: "Tras orbitar Eros, descendió de forma lenta y controlada a unos 6,4 km/h. Aunque no estaba diseñada para aterrizar, sobrevivió y envió datos durante unas dos semanas.",
                learned: "Descubrió que Eros no tenía campo magnético, cartografió más del 70% de su superficie y envió unas 160.000 imágenes.",
                today: "El último contacto fue el 28 de febrero de 2001; la nave sucumbió al frío extremo."
              }
            },
            pioneer: {
              title: "PIONEER 10",
              card: {
                what: "Pioneer 10 fue la primera nave en sobrevolar Júpiter y cruzar el cinturón principal de asteroides.",
                why: "Exploró Júpiter y continuó hacia las regiones exteriores del sistema solar.",
                how: "Cruzó el cinturón de asteroides y llevó una placa de aluminio con diagramas de un hombre y una mujer, el sistema solar y la ubicación del Sol respecto de 14 púlsares.",
                learned: "Su encuentro con Júpiter fue la primera exploración cercana del planeta gigante por una nave espacial.",
                today: "Su última señal llegó a la Tierra el 23 de enero de 2003. El último intento de contacto de NASA falló en 2006; la nave está inerte y se dirige hacia Aldebarán."
              }
            },
            kepler: {
              title: "KEPLER / K2",
              card: {
                what: "Kepler fue el primer telescopio espacial de NASA dedicado a buscar planetas fuera del sistema solar.",
                why: "Observó estrellas para buscar planetas del tamaño de la Tierra y conocer qué tan comunes son en la galaxia.",
                how: "Buscó tránsitos: pequeñas caídas en el brillo de una estrella cuando un planeta pasaba delante.",
                learned: "Kepler y K2 revelaron miles de exoplanetas y mostraron que los planetas son comunes alrededor de las estrellas.",
                today: "NASA retiró Kepler el 30 de octubre de 2018 al agotarse su combustible; permanece en una órbita segura."
              }
            },
            voyager: {
              title: "VOYAGER 1 Y 2",
              card: {
                what: "Voyager 1 y Voyager 2 son naves gemelas enviadas a sobrevolar los planetas exteriores del sistema solar.",
                why: "Exploraron los planetas exteriores y continuaron su viaje hacia el espacio interestelar.",
                how: "// VERIFY — la página NASA citada no describe las maniobras de asistencia gravitatoria; este reto es una representación simplificada.",
                learned: "Son las únicas naves que operan fuera de la heliosfera. Voyager 1 cruzó ese límite en 2012 y Voyager 2 en 2018.",
                today: "NASA indica que ambas siguen en misión extendida y viajan más allá de la burbuja protectora del Sol."
              }
            }
          }
        },
        rovers: {
          title: "SPIRIT Y OPPORTUNITY",
          card: {
            what: "Spirit y Opportunity eran dos rovers gemelos de Marte alimentados por energía solar.",
            why: "Buscaron señales de que alguna vez hubo agua en Marte.",
            how: "Sus cámaras e instrumentos científicos estudiaban rocas y suelo mientras recorrían la superficie; la luz solar alimentaba su trabajo.",
            learned: "Los rovers confirmaron que hubo agua en Marte durante largos períodos de su pasado antiguo.",
            today: "La misión de Spirit terminó en 2010. Opportunity se comunicó por última vez el 10 de junio de 2018, durante una tormenta de polvo que cubrió el planeta."
          }
        },
        viking: {
          title: "VIKING 1",
          card: {
            what: "Viking 1 combinó un orbitador y una sonda de aterrizaje con cámaras, instrumentos científicos y un brazo recolector.",
            why: "Exploró Marte desde la órbita y la superficie, con experimentos que buscaban indicios sobre la posibilidad de vida.",
            how: "El brazo recolector tomó suelo marciano y lo colocó en instrumentos de biología y química a bordo.",
            learned: "Viking 1 envió las primeras imágenes de un aterrizaje exitoso de NASA en Marte. Su prueba principal de compuestos orgánicos en el suelo dio resultado negativo.",
            today: "El orbitador se apagó en 1980. El módulo de aterrizaje dejó de funcionar en 1982 tras recibir una orden defectuosa."
          }
        },
        insight: {
          title: "INSIGHT",
          card: {
            what: "InSight era una sonda estacionaria diseñada para estudiar el interior profundo de Marte.",
            why: "Sus mediciones buscaban revelar cómo se formaron y cambiaron Marte y otros planetas rocosos.",
            how: "Un brazo robótico colocó un sismómetro en el suelo para escuchar martemotos y vibraciones del planeta.",
            learned: "Las ondas sísmicas de martemotos e impactos ayudaron a estudiar la estructura interior de Marte.",
            today: "La misión terminó el 15 de diciembre de 2022."
          }
        },
        ingenuity: {
          title: "HELICÓPTERO MARCIANO INGENUITY",
          card: {
            what: "Ingenuity era un pequeño helicóptero transportado a Marte debajo del rover Perseverance.",
            why: "Fue una demostración tecnológica para probar el vuelo motorizado y controlado en la tenue atmósfera marciana.",
            how: "Sus rotores giratorios lo elevaron del suelo; tras los primeros vuelos de prueba, también exploró el terreno desde el aire.",
            learned: "Ingenuity hizo el primer vuelo motorizado y controlado en otro planeta y completó 72 vuelos, mucho más que los cinco planeados.",
            today: "Su último vuelo fue el 18 de enero de 2024. NASA declaró finalizada la misión el 25 de enero de 2024."
          }
        }
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
  spanish.deepSpaceWorld = spanish.marsWorld.stations.deepSpaceWorld;
  delete spanish.marsWorld.stations.deepSpaceWorld;

  data.language = "en";
  data.setLanguage = function setLanguage(language) {
    if (language === "en") {
      this.text = englishText;
      this.lunarWorld = englishLunar;
      this.marsWorld = englishMars;
      this.deepSpaceWorld = englishDeepSpace;
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
      this.marsWorld = {
        ...englishMars,
        ...spanish.marsWorld,
        settings: englishMars.settings,
        stations: englishMars.stations.map((station) => ({
          ...station,
          ...spanish.marsWorld.stations[station.id],
          card: { ...station.card, ...spanish.marsWorld.stations[station.id].card }
        }))
      };
      this.deepSpaceWorld = {
        ...englishDeepSpace,
        ...spanish.deepSpaceWorld,
        settings: englishDeepSpace.settings,
        stations: englishDeepSpace.stations.map((station) => ({
          ...station,
          ...spanish.deepSpaceWorld.stations[station.id],
          card: { ...station.card, ...spanish.deepSpaceWorld.stations[station.id].card }
        }))
      };
    } else {
      throw new RangeError(`Unsupported language: ${language}`);
    }
    this.language = language;
  };
}(window.SpaceData));
