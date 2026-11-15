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
    controls: "MENU  ESC",
    return: "RETURN TO THE TITLE",
    signalError: "The expedition could not be loaded. Please refresh the page and try again."
  }
};
