// Perfiles de voz y lectura para los personajes del juego.
(function defineSpaceNarrator() {
  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  const profiles = {
    "elena": { color: "#f0cd98", interval: 34, pitch: 0.88, rate: 0.88 },
    "maia": { color: "#9fe5ff", interval: 25, pitch: 1.12, rate: 1.02 },
    "tuerca": { color: "#f4a8e8", interval: 20, pitch: 1.38, rate: 1.12 },
    "eagle": { color: "#ffd27d", interval: 30, pitch: 0.96, rate: 0.94 },
    "lunar rover": { color: "#91e8d2", interval: 22, pitch: 1.06, rate: 1.04 },
    "rover lunar": { color: "#91e8d2", interval: 22, pitch: 1.06, rate: 1.04 },
    "alsep": { color: "#c5b5ff", interval: 38, pitch: 0.78, rate: 0.84 },
    "surveyor 3": { color: "#a9d8ff", interval: 34, pitch: 0.92, rate: 0.9 },
    "pathfinder": { color: "#ffb38b", interval: 19, pitch: 1.26, rate: 1.12 },
    "spirit & opportunity": { color: "#ffe097", interval: 27, pitch: 1.02, rate: 0.98 },
    "spirit y opportunity": { color: "#ffe097", interval: 27, pitch: 1.02, rate: 0.98 },
    "viking 1": { color: "#ffc28f", interval: 31, pitch: 0.84, rate: 0.9 },
    "insight": { color: "#b7d8ff", interval: 40, pitch: 0.74, rate: 0.82 },
    "ingenuity": { color: "#a8f0da", interval: 18, pitch: 1.34, rate: 1.16 },
    "dawn": { color: "#b1e6ff", interval: 37, pitch: 0.82, rate: 0.86 },
    "near shoemaker": { color: "#e5bdff", interval: 28, pitch: 1.16, rate: 1.02 },
    "pioneer 10": { color: "#ffe4a8", interval: 33, pitch: 0.9, rate: 0.9 },
    "kepler": { color: "#d0b6ff", interval: 36, pitch: 1.22, rate: 0.92 },
    "voyager 1 & 2": { color: "#a9edff", interval: 42, pitch: 0.8, rate: 0.84 },
    "voyager 1 y 2": { color: "#a9edff", interval: 42, pitch: 0.8, rate: 0.84 }
  };
  const interactionKeys = {
    moon: { lm: "lmClimb", lrv: "lrvDrive", alsep: "alsepListen", surveyor: "surveyorLand" },
    mars: {
      pathfinder: "pathfinderBounce",
      rovers: "roverAlign",
      viking: "vikingAim",
      insight: "insightListen",
      ingenuity: "ingenuityFly"
    },
    deep: {
      dawn: "dawnThrust",
      near: "nearDescend",
      pioneer: "pioneerCross",
      kepler: "keplerTransit",
      voyager: "voyagerFly"
    }
  };

  const voiceFor = (speaker) => {
    const profile = profiles[normalize(speaker)];
    if (!profile) throw new RangeError(`Unknown narrator voice: ${speaker}`);
    return profile;
  };
  let speechWarningShown = false;

  window.SpaceNarrators = Object.freeze({
    voiceFor(speaker) {
      return voiceFor(speaker);
    },
    interactionKey(worldId, stationId) {
      const key = interactionKeys[worldId] && interactionKeys[worldId][stationId];
      if (!key) throw new RangeError(`Unknown narrator interaction: ${worldId}/${stationId}`);
      return key;
    },
    interactionSpeaker(stationId) {
      const speakers = {
        lm: "Eagle",
        lrv: "Lunar rover",
        alsep: "ALSEP",
        surveyor: "Surveyor 3",
        pathfinder: "Pathfinder",
        rovers: "Spirit & Opportunity",
        viking: "Viking 1",
        insight: "InSight",
        ingenuity: "Ingenuity",
        dawn: "Dawn",
        near: "NEAR Shoemaker",
        pioneer: "Pioneer 10",
        kepler: "Kepler",
        voyager: "Voyager 1 & 2"
      };
      const speaker = speakers[stationId];
      if (!speaker) throw new RangeError(`Unknown narrator station: ${stationId}`);
      return speaker;
    },
    speak(speaker, text, language) {
      if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        if (!speechWarningShown) {
          console.warn("Speech synthesis is unavailable; dialogue captions remain enabled.");
          speechWarningShown = true;
        }
        return;
      }
      const utterance = new window.SpeechSynthesisUtterance(text);
      const profile = voiceFor(speaker);
      const languagePrefix = language === "es" ? "es" : "en";
      const voices = window.speechSynthesis.getVoices()
        .filter((voice) => voice.lang.toLowerCase().startsWith(languagePrefix));
      utterance.lang = languagePrefix === "es" ? "es-ES" : "en-US";
      if (voices.length) {
        utterance.voice = voices[0];
        utterance.lang = voices[0].lang;
      }
      utterance.pitch = profile.pitch;
      utterance.rate = profile.rate;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    stop() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  });
}());
