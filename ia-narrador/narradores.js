// Perfiles de voz y lectura para los personajes del juego.
(function defineSpaceNarrator() {
  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  const profiles = {
    "elena": {
      color: "#f0cd98", interval: 34, pitch: 0.96, rate: 0.92, voiceStyle: "feminine"
    },
    "maia": {
      color: "#9fe5ff", interval: 25, pitch: 1.12, rate: 1, voiceStyle: "feminine"
    },
    "tuerca": {
      color: "#f4a8e8", interval: 20, pitch: 1.04, rate: 0.98, voiceStyle: "robotic"
    },
    "eagle": { color: "#ffd27d", interval: 30, pitch: 0.98, rate: 0.98 },
    "lunar rover": { color: "#91e8d2", interval: 22, pitch: 1.04, rate: 1 },
    "rover lunar": { color: "#91e8d2", interval: 22, pitch: 1.04, rate: 1 },
    "alsep": { color: "#c5b5ff", interval: 38, pitch: 0.94, rate: 0.96 },
    "surveyor 3": { color: "#a9d8ff", interval: 34, pitch: 0.96, rate: 0.95 },
    "pathfinder": { color: "#ffb38b", interval: 19, pitch: 1.08, rate: 1.06 },
    "spirit & opportunity": { color: "#ffe097", interval: 27, pitch: 1, rate: 0.98 },
    "spirit y opportunity": { color: "#ffe097", interval: 27, pitch: 1, rate: 0.98 },
    "viking 1": { color: "#ffc28f", interval: 31, pitch: 0.94, rate: 0.96 },
    "insight": { color: "#b7d8ff", interval: 40, pitch: 0.92, rate: 0.94 },
    "ingenuity": { color: "#a8f0da", interval: 18, pitch: 1.1, rate: 1.06 },
    "dawn": { color: "#b1e6ff", interval: 37, pitch: 0.94, rate: 0.96 },
    "near shoemaker": { color: "#e5bdff", interval: 28, pitch: 1.06, rate: 0.99 },
    "pioneer 10": { color: "#ffe4a8", interval: 33, pitch: 0.98, rate: 0.96 },
    "kepler": { color: "#d0b6ff", interval: 36, pitch: 1.08, rate: 0.97 },
    "voyager 1 & 2": { color: "#a9edff", interval: 42, pitch: 0.94, rate: 0.94 },
    "voyager 1 y 2": { color: "#a9edff", interval: 42, pitch: 0.94, rate: 0.94 }
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
  const voiceNameHints = {
    feminine: /sabina|zira|samantha|aria|jenny|hazel|susan|female|woman|mujer/i,
    robotic: /raul|david|guy|male|man|hombre/i
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
      const availableVoices = window.speechSynthesis.getVoices();
      const voices = availableVoices.filter((voice) =>
        voice.lang.toLowerCase().startsWith(languagePrefix)
      );
      const voiceHint = voiceNameHints[profile.voiceStyle];
      const preferredVoice = voiceHint
        && availableVoices.find((voice) => voiceHint.test(voice.name));
      const naturalVoice = voices.find((voice) => /natural|neural|online/i.test(voice.name));
      utterance.lang = languagePrefix === "es" ? "es-ES" : "en-US";
      const selectedVoice = preferredVoice || naturalVoice || voices[0];
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
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
