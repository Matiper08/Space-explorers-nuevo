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
    parkourStart: "MOVE: A/D or arrows   •   JUMP: Space/W/Up   •   ESC: title",
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
  }
};
