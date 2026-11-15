// Created with AI assistance (Claude, GitHub Copilot)
// Texturas Canvas 2D del prototipo; cada clave puede sustituirse por un recurso de assets/.
window.SpaceArt = {
  keys: {
    sky: "moon-sky",
    farRidge: "moon-far-ridge",
    middleRidge: "moon-middle-ridge",
    nearRidge: "moon-near-ridge",
    regolith: "moon-regolith",
    vignette: "moon-vignette",
    menuBackground: "moon-valley-sky",
    signal: "signal-mark",
    maiaIdle: "maia-idle",
    maiaBlink: "maia-blink",
    maiaWalkA: "maia-walk-a",
    maiaWalkB: "maia-walk-b",
    maiaJump: "maia-jump",
    maiaFall: "maia-fall",
    maiaCelebrate: "maia-celebrate",
    tuercaIdle: "tuerca-idle",
    tuercaRollA: "tuerca-roll-a",
    tuercaRollB: "tuerca-roll-b",
    tuercaHop: "tuerca-hop",
    tuercaFall: "tuerca-fall",
    tuercaCelebrate: "tuerca-celebrate",
    grayIdle: "gray-idle",
    grayBlink: "gray-blink",
    grayAwake: "gray-awake",
    platform: "parkour-platform",
    spring: "parkour-spring",
    echo: "parkour-echo",
    dust: "parkour-dust",
    lunarModule: "lunar-module-eagle",
    lunarRover: "lunar-roving-vehicle",
    alsep: "apollo-alsep",
    surveyor: "surveyor-3-lander",
    marsSky: "mars-caramel-sky",
    marsFarRidge: "mars-olympus-ridge",
    marsMiddleRidge: "mars-canyon-ridge",
    marsNearRidge: "mars-rust-dunes",
    marsRegolith: "mars-rippled-regolith",
    marsMons: "mars-olympus-mons",
    marsCanyonWall: "mars-valles-marineris-wall",
    marsVignette: "mars-vignette",
    marsMenuBackground: "mars-canyon-panorama",
    marsPlatform: "mars-rock-platform",
    pathfinder: "mars-pathfinder-lander",
    marsRovers: "spirit-opportunity-rovers",
    viking: "viking-1-lander",
    insight: "mars-insight-lander",
    ingenuity: "ingenuity-helicopter",
    marsAirbag: "mars-airbag-pad",
    deepSky: "deep-space-sky",
    deepFarRidge: "deep-nebulae",
    deepMiddleRidge: "deep-asteroid-belt",
    deepNearRidge: "deep-cosmic-clouds",
    deepDust: "deep-star-dust",
    deepAurora: "deep-aurora-ribbons",
    deepVignette: "deep-space-vignette",
    deepMenuBackground: "deep-space-panorama",
    deepPlatform: "deep-space-platform",
    deepSpring: "deep-space-launch-pad",
    dawn: "dawn-interplanetary-orbiter",
    near: "near-shoemaker-probe",
    pioneer: "pioneer-10-plaque-probe",
    kepler: "kepler-space-telescope",
    voyager: "voyager-twin-probes",
    deepAsteroid: "deep-asteroid",
    deepGasGiant: "deep-gas-giant",
    deepRingedPlanet: "deep-ringed-planet",
    deepEarthDot: "deep-pale-blue-dot",
    deepStar: "deep-transit-star"
  },

  createTextures(scene) {
    const keys = this.keys;
    this.createCanvas(scene, keys.sky, 1280, 720, this.drawSky);
    this.createCanvas(scene, keys.farRidge, 1280, 720, (ctx) => this.drawRidge(ctx, 0));
    this.createCanvas(scene, keys.middleRidge, 1280, 720, (ctx) => this.drawRidge(ctx, 1));
    this.createCanvas(scene, keys.nearRidge, 1280, 720, (ctx) => this.drawRidge(ctx, 2));
    this.createCanvas(scene, keys.regolith, 1280, 720, this.drawRegolith);
    this.createCanvas(scene, keys.vignette, 1280, 720, this.drawVignette);
    this.createCanvas(scene, keys.marsSky, 1280, 720, this.drawMarsSky);
    this.createCanvas(scene, keys.marsFarRidge, 1280, 720, (ctx) => this.drawMarsRidge(ctx, 0));
    this.createCanvas(scene, keys.marsMiddleRidge, 1280, 720, (ctx) => this.drawMarsRidge(ctx, 1));
    this.createCanvas(scene, keys.marsNearRidge, 1280, 720, (ctx) => this.drawMarsRidge(ctx, 2));
    this.createCanvas(scene, keys.marsRegolith, 1280, 720, this.drawMarsRegolith);
    this.createCanvas(scene, keys.marsMons, 1700, 520, this.drawOlympusMons);
    this.createCanvas(scene, keys.marsCanyonWall, 1500, 520, this.drawMarsCanyonWall);
    this.createCanvas(scene, keys.marsVignette, 1280, 720, this.drawMarsVignette);
    this.createCanvas(scene, keys.marsMenuBackground, 1280, 720, (ctx) => {
      this.drawMarsSky(ctx);
      this.drawMarsRidge(ctx, 0);
      this.drawMarsRidge(ctx, 1);
      this.drawMarsRidge(ctx, 2);
      this.drawMarsRegolith(ctx);
      this.drawMarsVignette(ctx);
    });
    this.createCanvas(scene, keys.menuBackground, 1280, 720, (ctx) => {
      this.drawSky(ctx);
      this.drawRidge(ctx, 0);
      this.drawRidge(ctx, 1);
      this.drawRidge(ctx, 2);
      this.drawRegolith(ctx);
      this.drawVignette(ctx);
    });
    this.createCanvas(scene, keys.signal, 96, 96, this.drawSignal);
    this.createCanvas(scene, keys.maiaIdle, 96, 112, (ctx) => this.drawMaia(ctx, "idle"));
    this.createCanvas(scene, keys.maiaBlink, 96, 112, (ctx) => this.drawMaia(ctx, "blink"));
    this.createCanvas(scene, keys.maiaWalkA, 96, 112, (ctx) => this.drawMaia(ctx, "walk-a"));
    this.createCanvas(scene, keys.maiaWalkB, 96, 112, (ctx) => this.drawMaia(ctx, "walk-b"));
    this.createCanvas(scene, keys.maiaJump, 96, 112, (ctx) => this.drawMaia(ctx, "jump"));
    this.createCanvas(scene, keys.maiaFall, 96, 112, (ctx) => this.drawMaia(ctx, "fall"));
    this.createCanvas(scene, keys.maiaCelebrate, 96, 112, (ctx) => this.drawMaia(ctx, "celebrate"));
    this.createCanvas(scene, keys.tuercaIdle, 96, 96, (ctx) => this.drawTuerca(ctx, "idle"));
    this.createCanvas(scene, keys.tuercaRollA, 96, 96, (ctx) => this.drawTuerca(ctx, "roll-a"));
    this.createCanvas(scene, keys.tuercaRollB, 96, 96, (ctx) => this.drawTuerca(ctx, "roll-b"));
    this.createCanvas(scene, keys.tuercaHop, 96, 96, (ctx) => this.drawTuerca(ctx, "hop"));
    this.createCanvas(scene, keys.tuercaFall, 96, 96, (ctx) => this.drawTuerca(ctx, "fall"));
    this.createCanvas(scene, keys.tuercaCelebrate, 96, 96, (ctx) => this.drawTuerca(ctx, "celebrate"));
    this.createCanvas(scene, keys.grayIdle, 64, 64, (ctx) => this.drawGray(ctx, "idle"));
    this.createCanvas(scene, keys.grayBlink, 64, 64, (ctx) => this.drawGray(ctx, "blink"));
    this.createCanvas(scene, keys.grayAwake, 64, 64, (ctx) => this.drawGray(ctx, "awake"));
    this.createCanvas(scene, keys.platform, 280, 40, this.drawPlatform);
    this.createCanvas(scene, keys.spring, 180, 34, this.drawSpring);
    this.createCanvas(scene, keys.echo, 48, 48, this.drawEcho);
    this.createCanvas(scene, keys.dust, 12, 12, this.drawDust);
    this.createCanvas(scene, keys.lunarModule, 240, 300, this.drawLunarModule);
    this.createCanvas(scene, keys.lunarRover, 300, 170, this.drawLunarRover);
    this.createCanvas(scene, keys.alsep, 240, 190, this.drawAlsep);
    this.createCanvas(scene, keys.surveyor, 240, 220, this.drawSurveyor);
    this.createCanvas(scene, keys.marsPlatform, 280, 40, this.drawMarsPlatform);
    this.createCanvas(scene, keys.pathfinder, 260, 240, this.drawPathfinder);
    this.createCanvas(scene, keys.marsRovers, 310, 190, this.drawMarsRovers);
    this.createCanvas(scene, keys.viking, 260, 230, this.drawViking);
    this.createCanvas(scene, keys.insight, 280, 210, this.drawInSight);
    this.createCanvas(scene, keys.ingenuity, 230, 230, this.drawIngenuity);
    this.createCanvas(scene, keys.marsAirbag, 140, 62, this.drawMarsAirbag);
    this.createCanvas(scene, keys.deepSky, 1280, 720, this.drawDeepSky);
    this.createCanvas(scene, keys.deepFarRidge, 1280, 720, this.drawDeepNebula);
    this.createCanvas(scene, keys.deepMiddleRidge, 1280, 720, this.drawDeepAsteroidBelt);
    this.createCanvas(scene, keys.deepNearRidge, 1280, 720, this.drawDeepClouds);
    this.createCanvas(scene, keys.deepDust, 1280, 720, this.drawDeepDust);
    this.createCanvas(scene, keys.deepAurora, 1280, 720, this.drawDeepAurora);
    this.createCanvas(scene, keys.deepVignette, 1280, 720, this.drawDeepVignette);
    this.createCanvas(scene, keys.deepMenuBackground, 1280, 720, (ctx) => {
      this.drawDeepSky(ctx);
      this.drawDeepNebula(ctx);
      this.drawDeepAsteroidBelt(ctx);
      this.drawDeepClouds(ctx);
      this.drawDeepAurora(ctx);
      this.drawDeepDust(ctx);
      this.drawDeepVignette(ctx);
    });
    this.createCanvas(scene, keys.deepPlatform, 280, 40, this.drawDeepPlatform);
    this.createCanvas(scene, keys.deepSpring, 180, 34, this.drawDeepSpring);
    this.createCanvas(scene, keys.dawn, 280, 200, this.drawDawn);
    this.createCanvas(scene, keys.near, 250, 195, this.drawNear);
    this.createCanvas(scene, keys.pioneer, 260, 200, this.drawPioneer);
    this.createCanvas(scene, keys.kepler, 250, 190, this.drawKepler);
    this.createCanvas(scene, keys.voyager, 270, 210, this.drawVoyager);
    this.createCanvas(scene, keys.deepAsteroid, 110, 92, this.drawDeepAsteroid);
    this.createCanvas(scene, keys.deepGasGiant, 300, 240, this.drawDeepGasGiant);
    this.createCanvas(scene, keys.deepRingedPlanet, 360, 260, this.drawDeepRingedPlanet);
    this.createCanvas(scene, keys.deepEarthDot, 72, 72, this.drawDeepEarthDot);
    this.createCanvas(scene, keys.deepStar, 150, 150, this.drawDeepStar);
  },

  createCanvas(scene, key, width, height, draw) {
    if (scene.textures.exists(key)) return;
    const texture = scene.textures.createCanvas(key, width, height);
    draw.call(this, texture.getContext(), width, height);
    texture.refresh();
  },

  drawSky(ctx, width = 1280, height = 720) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#10172f");
    sky.addColorStop(0.52, "#303958");
    sky.addColorStop(1, "#a9a9bb");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(972, 150, 8, 972, 150, 240);
    glow.addColorStop(0, "rgba(227, 247, 255, 0.26)");
    glow.addColorStop(0.38, "rgba(147, 205, 235, 0.13)");
    glow.addColorStop(1, "rgba(147, 205, 235, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(710, 0, 530, 420);

    ctx.save();
    ctx.shadowColor = "rgba(152, 211, 255, 0.82)";
    ctx.shadowBlur = 32;
    const earth = ctx.createRadialGradient(955, 130, 5, 976, 154, 76);
    earth.addColorStop(0, "#f7f4df");
    earth.addColorStop(0.3, "#a9d8e4");
    earth.addColorStop(0.62, "#4e83aa");
    earth.addColorStop(1, "#293f70");
    ctx.fillStyle = earth;
    ctx.beginPath();
    ctx.arc(976, 154, 61, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.globalAlpha = 0.86;
    for (let i = 0; i < 180; i += 1) {
      const x = (i * 197 + 41) % width;
      const y = (i * 113 + 27) % 440;
      const radius = i % 17 === 0 ? 2 : (i % 3 === 0 ? 1.3 : 0.8);
      ctx.fillStyle = i % 4 === 0 ? "#fff2cd" : "#e5f1ff";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(201, 222, 255, 0.18)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i += 1) {
      const x = 170 + i * 95;
      ctx.beginPath();
      ctx.moveTo(x, 105 + i * 34);
      ctx.lineTo(x + 24, 93 + i * 34);
      ctx.lineTo(x + 52, 110 + i * 34);
      ctx.stroke();
    }
  },

  drawRidge(ctx, layer) {
    const paths = [
      [[0, 454], [150, 350], [330, 405], [510, 332], [690, 422], [895, 346], [1080, 410], [1280, 332]],
      [[0, 505], [120, 443], [290, 492], [475, 414], [670, 505], [850, 420], [1050, 488], [1280, 404]],
      [[0, 552], [170, 496], [350, 549], [525, 464], [760, 550], [945, 470], [1100, 535], [1280, 465]]
    ];
    const palette = [
      ["#525b79", "#262e4a"],
      ["#70758d", "#363d5a"],
      ["#9999a8", "#444c68"]
    ][layer];
    const points = paths[layer];
    const gradient = ctx.createLinearGradient(0, 320, 0, 720);
    gradient.addColorStop(0, palette[0]);
    gradient.addColorStop(1, palette[1]);
    ctx.save();
    ctx.shadowColor = "rgba(16, 23, 45, 0.45)";
    ctx.shadowBlur = layer === 2 ? 18 : 10;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) {
      const prev = points[i - 1];
      const next = points[i];
      const midX = (prev[0] + next[0]) / 2;
      ctx.quadraticCurveTo(prev[0] + (next[0] - prev[0]) * 0.36, prev[1], midX, (prev[1] + next[1]) / 2);
      ctx.quadraticCurveTo(prev[0] + (next[0] - prev[0]) * 0.72, next[1], next[0], next[1]);
    }
    ctx.lineTo(1280, 720);
    ctx.lineTo(0, 720);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = layer === 2 ? "rgba(224, 231, 244, 0.34)" : "rgba(212, 225, 248, 0.16)";
    ctx.lineWidth = layer === 2 ? 4 : 2;
    ctx.stroke();
    ctx.restore();
  },

  drawRegolith(ctx) {
    const ground = ctx.createLinearGradient(0, 500, 0, 720);
    ground.addColorStop(0, "rgba(199, 193, 197, 0)");
    ground.addColorStop(0.2, "#88889b");
    ground.addColorStop(0.56, "#5c637e");
    ground.addColorStop(1, "#252e49");
    ctx.fillStyle = ground;
    ctx.beginPath();
    ctx.moveTo(0, 583);
    ctx.quadraticCurveTo(180, 530, 360, 584);
    ctx.quadraticCurveTo(590, 630, 815, 557);
    ctx.quadraticCurveTo(1030, 511, 1280, 572);
    ctx.lineTo(1280, 720);
    ctx.lineTo(0, 720);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(223, 229, 244, 0.22)";
    for (let i = 0; i < 60; i += 1) {
      const x = (i * 173 + 32) % 1280;
      const y = 566 + ((i * 59) % 140);
      ctx.beginPath();
      ctx.ellipse(x, y, 1 + (i % 3), 1, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 6; i += 1) {
      const x = 95 + i * 202;
      ctx.strokeStyle = "rgba(204, 220, 244, 0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, 626 + (i % 2) * 17, 26 + (i % 3) * 7, 5, -0.08, 0, Math.PI * 2);
      ctx.stroke();
    }
  },

  drawVignette(ctx, width = 1280, height = 720) {
    const vignette = ctx.createRadialGradient(width / 2, height / 2, 255, width / 2, height / 2, 760);
    vignette.addColorStop(0, "rgba(6, 9, 21, 0)");
    vignette.addColorStop(0.72, "rgba(6, 9, 21, 0.05)");
    vignette.addColorStop(1, "rgba(6, 9, 21, 0.52)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  },

  drawSignal(ctx) {
    const glow = ctx.createRadialGradient(48, 48, 4, 48, 48, 47);
    glow.addColorStop(0, "#fff5d5");
    glow.addColorStop(0.34, "#ffd991");
    glow.addColorStop(1, "rgba(231, 185, 116, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 96, 96);
    ctx.save();
    ctx.shadowColor = "rgba(255, 218, 147, 0.78)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#263550";
    ctx.strokeStyle = "#f4d39e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(48, 48, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#fff4d2";
    ctx.beginPath();
    ctx.moveTo(48, 22);
    ctx.lineTo(55, 41);
    ctx.lineTo(75, 48);
    ctx.lineTo(55, 55);
    ctx.lineTo(48, 75);
    ctx.lineTo(41, 55);
    ctx.lineTo(21, 48);
    ctx.lineTo(41, 41);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(48, 48, 6, 0, Math.PI * 2);
    ctx.fill();
  },

  drawMaia(ctx, pose) {
    const walking = pose === "walk-a" || pose === "walk-b";
    const legShift = pose === "walk-a" ? -7 : (pose === "walk-b" ? 7 : 0);
    const armLift = pose === "celebrate" ? -19 : (pose === "jump" ? -9 : 0);
    const bodyTilt = pose === "fall" ? 0.14 : (pose === "jump" ? -0.06 : 0);
    ctx.save();
    ctx.translate(48, 58);
    ctx.rotate(bodyTilt);
    ctx.translate(-48, -58);

    ctx.save();
    ctx.shadowColor = "rgba(4, 8, 20, 0.62)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "rgba(8, 13, 30, 0.55)";
    ctx.beginPath();
    ctx.ellipse(49, 104, 27, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const suit = ctx.createLinearGradient(23, 46, 74, 91);
    suit.addColorStop(0, "#f4f3e7");
    suit.addColorStop(0.42, "#c8d8dd");
    suit.addColorStop(1, "#718a9f");
    ctx.fillStyle = "#435a74";
    ctx.beginPath();
    ctx.roundRect(61, 49, 20, 37, 7);
    ctx.fill();
    ctx.fillStyle = "#68d5d4";
    ctx.fillRect(66, 54, 9, 16);
    ctx.fillStyle = "#f4d79b";
    ctx.fillRect(65, 73, 11, 6);

    ctx.fillStyle = "#40566f";
    ctx.beginPath();
    ctx.roundRect(29, 76 + legShift, 17, 27 - Math.max(0, legShift), 7);
    ctx.roundRect(50, 76 - legShift, 17, 27 + Math.max(0, legShift), 7);
    ctx.fill();
    ctx.fillStyle = "#e7e8df";
    ctx.beginPath();
    ctx.roundRect(26, 94 + legShift, 22, 11, 5);
    ctx.roundRect(48, 94 - legShift, 22, 11, 5);
    ctx.fill();
    ctx.fillStyle = "#8cd9dc";
    ctx.fillRect(29, 100 + legShift, 15, 2);
    ctx.fillRect(51, 100 - legShift, 15, 2);

    ctx.save();
    ctx.shadowColor = "rgba(170, 224, 245, 0.55)";
    ctx.shadowBlur = 9;
    ctx.fillStyle = suit;
    ctx.strokeStyle = "#f8fbf2";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.roundRect(23, 48, 48, 39, 15);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = "#71889a";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(28, 57);
    ctx.lineTo(18, 68 + armLift);
    ctx.moveTo(68, 57);
    ctx.lineTo(78, 67 + armLift);
    ctx.stroke();
    ctx.fillStyle = "#edcf99";
    ctx.beginPath();
    ctx.arc(18, 69 + armLift, 6, 0, Math.PI * 2);
    ctx.arc(78, 68 + armLift, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#426783";
    ctx.beginPath();
    ctx.roundRect(38, 59, 18, 14, 4);
    ctx.fill();
    const radio = ctx.createRadialGradient(47, 64, 1, 47, 64, 8);
    radio.addColorStop(0, "#fff3c6");
    radio.addColorStop(0.45, "#ffd174");
    radio.addColorStop(1, "#e29b60");
    ctx.fillStyle = radio;
    ctx.beginPath();
    ctx.arc(47, 65, 5, 0, Math.PI * 2);
    ctx.fill();

    const helmet = ctx.createRadialGradient(37, 21, 4, 48, 31, 31);
    helmet.addColorStop(0, "#fffdf1");
    helmet.addColorStop(0.55, "#c7e0e5");
    helmet.addColorStop(0.86, "#7796a9");
    helmet.addColorStop(1, "#405976");
    ctx.save();
    ctx.shadowColor = "rgba(175, 233, 255, 0.78)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = helmet;
    ctx.strokeStyle = "#f8fcf0";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(48, 31, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    const visor = ctx.createLinearGradient(30, 22, 66, 43);
    visor.addColorStop(0, pose === "blink" ? "#18243d" : "#3c6882");
    visor.addColorStop(0.52, "#182b48");
    visor.addColorStop(1, "#101b32");
    ctx.fillStyle = visor;
    ctx.beginPath();
    ctx.ellipse(48, 32, 16, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(180, 233, 245, 0.85)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#e7fdff";
    if (pose !== "blink") {
      ctx.beginPath();
      ctx.ellipse(43, 30, 2.7, 3.2, 0, 0, Math.PI * 2);
      ctx.ellipse(53, 30, 2.7, 3.2, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(40, 31, 6, 1.5);
      ctx.fillRect(50, 31, 6, 1.5);
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.beginPath();
    ctx.ellipse(39, 25, 4, 1.5, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  drawTuerca(ctx, pose) {
    const rolling = pose === "roll-a" || pose === "roll-b";
    const offset = pose === "roll-a" ? -3 : (pose === "roll-b" ? 3 : 0);
    const lift = pose === "hop" || pose === "celebrate" ? -7 : (pose === "fall" ? 5 : 0);
    ctx.save();
    ctx.shadowColor = "rgba(4, 8, 20, 0.6)";
    ctx.shadowBlur = 11;
    ctx.fillStyle = "rgba(8, 13, 30, 0.55)";
    ctx.beginPath();
    ctx.ellipse(48, 88, 27, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    if (rolling) {
      ctx.translate(48, 49);
      ctx.rotate(pose === "roll-a" ? -0.09 : 0.09);
      ctx.translate(-48, -49);
    }
    ctx.strokeStyle = "#536b81";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(40, 69 + lift);
    ctx.lineTo(34 + offset, 81 + lift);
    ctx.moveTo(56, 69 + lift);
    ctx.lineTo(62 - offset, 81 + lift);
    ctx.stroke();
    ctx.fillStyle = "#d3d5ca";
    ctx.beginPath();
    ctx.roundRect(24 + offset, 78 + lift, 20, 8, 4);
    ctx.roundRect(52 - offset, 78 + lift, 20, 8, 4);
    ctx.fill();

    const metal = ctx.createLinearGradient(22, 22, 76, 78);
    metal.addColorStop(0, "#f0e2bd");
    metal.addColorStop(0.3, "#9eb2bb");
    metal.addColorStop(0.72, "#536e86");
    metal.addColorStop(1, "#263e5c");
    ctx.save();
    ctx.shadowColor = "rgba(150, 219, 239, 0.45)";
    ctx.shadowBlur = 9;
    ctx.fillStyle = metal;
    ctx.strokeStyle = "#e4e6d9";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(18 + offset, 24 + lift, 60, 53, 17);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#334b67";
    ctx.beginPath();
    ctx.roundRect(25, 39 + lift, 46, 23, 9);
    ctx.fill();
    const lens = ctx.createRadialGradient(41, 48 + lift, 1, 41, 48 + lift, 12);
    lens.addColorStop(0, "#f4fbdf");
    lens.addColorStop(0.22, "#74e1df");
    lens.addColorStop(0.66, "#3b83a6");
    lens.addColorStop(1, "#142846");
    ctx.fillStyle = lens;
    ctx.beginPath();
    ctx.arc(41, 50 + lift, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#162743";
    ctx.beginPath();
    ctx.arc(60, 50 + lift, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f7e0aa";
    ctx.beginPath();
    ctx.arc(60, 50 + lift, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#d0b886";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(48, 25 + lift);
    ctx.lineTo(54, 13 + lift);
    ctx.stroke();
    ctx.fillStyle = "#ffcf82";
    ctx.beginPath();
    ctx.arc(55, 12 + lift, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(237, 241, 222, 0.65)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(29, 31 + lift);
    ctx.lineTo(37, 28 + lift);
    ctx.moveTo(63, 67 + lift);
    ctx.lineTo(70, 63 + lift);
    ctx.stroke();
    ctx.fillStyle = "#d7c89f";
    [[25, 32], [71, 34], [27, 67], [69, 68]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y + lift, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  },

  drawGray(ctx, mood) {
    const awake = mood === "awake";
    const blink = mood === "blink";
    const palette = awake ? ["#fff4bf", "#67d6bd", "#4775a2"] : ["#e1e2df", "#8b929b", "#434d60"];
    ctx.save();
    ctx.shadowColor = awake ? "rgba(120, 255, 216, 0.82)" : "rgba(3, 8, 20, 0.55)";
    ctx.shadowBlur = awake ? 15 : 8;
    ctx.fillStyle = "rgba(6, 10, 22, 0.52)";
    ctx.beginPath();
    ctx.ellipse(32, 58, 21, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    const ball = ctx.createRadialGradient(24, 20, 3, 35, 37, 30);
    ball.addColorStop(0, palette[0]);
    ball.addColorStop(0.42, palette[1]);
    ball.addColorStop(0.83, palette[2]);
    ball.addColorStop(1, "#202b40");
    ctx.fillStyle = ball;
    ctx.strokeStyle = awake ? "#d7fff1" : "rgba(234, 239, 238, 0.72)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(32, 33, 23, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = awake ? "#21475b" : "#313b50";
    if (blink) {
      ctx.fillRect(23, 33, 7, 2);
      ctx.fillRect(36, 33, 7, 2);
    } else {
      ctx.beginPath();
      ctx.arc(26, 32, 2.8, 0, Math.PI * 2);
      ctx.arc(39, 32, 2.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = awake ? "#fff4bf" : "#50596a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(32, 39, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.64)";
    ctx.beginPath();
    ctx.ellipse(22, 20, 5, 2, -0.55, 0, Math.PI * 2);
    ctx.fill();
    [[14, 41], [49, 44], [45, 17]].forEach(([x, y], i) => {
      ctx.fillStyle = awake ? "rgba(255, 241, 183, 0.8)" : "rgba(240, 244, 242, 0.38)";
      ctx.beginPath();
      ctx.arc(x, y, i === 1 ? 1.5 : 1, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawPlatform(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(9, 18, 38, 0.5)";
    ctx.shadowBlur = 9;
    const face = ctx.createLinearGradient(0, 2, 0, 39);
    face.addColorStop(0, "#e1e5dc");
    face.addColorStop(0.2, "#b8c8d0");
    face.addColorStop(0.55, "#8298aa");
    face.addColorStop(1, "#425873");
    ctx.fillStyle = face;
    ctx.beginPath();
    ctx.roundRect(2, 3, 276, 34, 10);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "rgba(250, 253, 233, 0.82)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(12, 8);
    ctx.lineTo(268, 8);
    ctx.stroke();
    ctx.fillStyle = "#405875";
    ctx.fillRect(8, 25, 264, 9);
    ctx.fillStyle = "#f4d8a2";
    for (let x = 19; x < 280; x += 38) {
      ctx.beginPath();
      ctx.arc(x, 18, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  drawSpring(ctx) {
    const spring = ctx.createLinearGradient(0, 1, 0, 34);
    spring.addColorStop(0, "#f8f2d8");
    spring.addColorStop(0.28, "#a8e7e7");
    spring.addColorStop(1, "#477d94");
    ctx.fillStyle = spring;
    ctx.beginPath();
    ctx.roundRect(2, 4, 176, 28, 11);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.beginPath();
    ctx.roundRect(11, 7, 158, 6, 4);
    ctx.fill();
    ctx.strokeStyle = "#e9f9ee";
    ctx.lineWidth = 2;
    for (let x = 35; x < 150; x += 28) {
      ctx.beginPath();
      ctx.arc(x, 22, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  },

  drawEcho(ctx) {
    const glow = ctx.createRadialGradient(24, 24, 2, 24, 24, 24);
    glow.addColorStop(0, "#fffbe9");
    glow.addColorStop(0.28, "#ffe49a");
    glow.addColorStop(0.55, "rgba(255, 204, 111, 0.7)");
    glow.addColorStop(1, "rgba(255, 194, 93, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = "#fff4d2";
    ctx.beginPath();
    ctx.arc(24, 24, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.84)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(24, 24, 14, 0, Math.PI * 2);
    ctx.stroke();
  },

  drawDust(ctx) {
    const dust = ctx.createRadialGradient(6, 6, 0.5, 6, 6, 6);
    dust.addColorStop(0, "#ffffff");
    dust.addColorStop(0.55, "#e8d7b6");
    dust.addColorStop(1, "rgba(232, 215, 182, 0)");
    ctx.fillStyle = dust;
    ctx.fillRect(0, 0, 12, 12);
  },

  drawLunarModule(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(6, 11, 25, 0.62)";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(10, 15, 30, 0.56)";
    ctx.beginPath();
    ctx.ellipse(122, 278, 93, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.lineCap = "round";
    ctx.strokeStyle = "#657d91";
    ctx.lineWidth = 9;
    [[67, 179, 24, 265], [173, 179, 216, 265], [82, 189, 58, 268], [158, 189, 185, 268]].forEach((leg) => {
      ctx.beginPath();
      ctx.moveTo(leg[0], leg[1]);
      ctx.lineTo(leg[2], leg[3]);
      ctx.stroke();
    });
    ctx.strokeStyle = "rgba(229, 239, 235, 0.72)";
    ctx.lineWidth = 2;
    [[67, 179, 24, 265], [173, 179, 216, 265], [82, 189, 58, 268], [158, 189, 185, 268]].forEach((leg) => {
      ctx.beginPath();
      ctx.moveTo(leg[0] - 2, leg[1]);
      ctx.lineTo(leg[2] - 2, leg[3]);
      ctx.stroke();
    });
    ctx.fillStyle = "#d4d7cc";
    [[23, 266], [215, 266], [55, 269], [182, 269]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, 15, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    const descent = ctx.createLinearGradient(46, 155, 194, 214);
    descent.addColorStop(0, "#ece5c9");
    descent.addColorStop(0.42, "#a9a995");
    descent.addColorStop(1, "#526578");
    ctx.save();
    ctx.shadowColor = "rgba(212, 230, 240, 0.38)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = descent;
    ctx.strokeStyle = "#f4edd4";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(49, 158);
    ctx.lineTo(190, 158);
    ctx.lineTo(202, 186);
    ctx.lineTo(177, 212);
    ctx.lineTo(63, 212);
    ctx.lineTo(38, 186);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    const foil = ctx.createLinearGradient(0, 165, 0, 204);
    foil.addColorStop(0, "rgba(255,255,255,0.64)");
    foil.addColorStop(0.5, "rgba(231,208,156,0.14)");
    foil.addColorStop(1, "rgba(31,45,65,0.54)");
    ctx.fillStyle = foil;
    ctx.fillRect(62, 170, 114, 28);
    ctx.fillStyle = "#40586d";
    ctx.beginPath();
    ctx.moveTo(100, 211);
    ctx.lineTo(140, 211);
    ctx.lineTo(151, 246);
    ctx.lineTo(89, 246);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#c8d3d1";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(105, 212);
    ctx.lineTo(94, 242);
    ctx.moveTo(135, 212);
    ctx.lineTo(146, 242);
    ctx.stroke();

    const cabin = ctx.createLinearGradient(60, 46, 178, 160);
    cabin.addColorStop(0, "#f7f0d7");
    cabin.addColorStop(0.32, "#c8caba");
    cabin.addColorStop(0.7, "#8997a0");
    cabin.addColorStop(1, "#465e76");
    ctx.save();
    ctx.shadowColor = "rgba(213, 235, 246, 0.54)";
    ctx.shadowBlur = 15;
    ctx.fillStyle = cabin;
    ctx.strokeStyle = "#f5edd4";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(71, 72);
    ctx.lineTo(91, 48);
    ctx.lineTo(152, 49);
    ctx.lineTo(176, 75);
    ctx.lineTo(171, 151);
    ctx.lineTo(69, 151);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#314a62";
    ctx.strokeStyle = "#dff4ef";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(83, 75, 29, 22, 6);
    ctx.roundRect(129, 75, 29, 22, 6);
    ctx.fill();
    ctx.stroke();
    const windowGlow = ctx.createLinearGradient(0, 75, 0, 98);
    windowGlow.addColorStop(0, "#b6e0e5");
    windowGlow.addColorStop(1, "#263e5a");
    ctx.fillStyle = windowGlow;
    ctx.fillRect(87, 79, 21, 14);
    ctx.fillRect(133, 79, 21, 14);
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.fillRect(89, 80, 8, 2);
    ctx.fillRect(135, 80, 8, 2);

    ctx.strokeStyle = "#52677b";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(75, 143);
    ctx.lineTo(75, 263);
    ctx.moveTo(91, 143);
    ctx.lineTo(91, 263);
    ctx.stroke();
    ctx.lineWidth = 3;
    for (let y = 159; y < 260; y += 14) {
      ctx.beginPath();
      ctx.moveTo(75, y);
      ctx.lineTo(91, y);
      ctx.stroke();
    }

    const plaque = ctx.createLinearGradient(0, 117, 0, 143);
    plaque.addColorStop(0, "#f8e6ba");
    plaque.addColorStop(1, "#997c58");
    ctx.fillStyle = plaque;
    ctx.strokeStyle = "#fff0ce";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(115, 116, 44, 27, 4);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(53, 61, 71, 0.72)";
    ctx.lineWidth = 1;
    for (let y = 122; y < 139; y += 5) {
      ctx.beginPath();
      ctx.moveTo(121, y);
      ctx.lineTo(153, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "#d5d9ce";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(111, 51);
    ctx.lineTo(107, 21);
    ctx.stroke();
    ctx.fillStyle = "#98adbb";
    ctx.beginPath();
    ctx.ellipse(107, 20, 20, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f3ecd5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(107, 20, 20, 6, -0.3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#f2cf90";
    [[54, 174], [184, 176], [69, 205], [171, 204], [77, 66], [166, 68]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawLunarRover(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(7, 12, 24, 0.62)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "rgba(8, 13, 29, 0.6)";
    ctx.beginPath();
    ctx.ellipse(151, 151, 126, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    [61, 238].forEach((x) => {
      [75, 137].forEach((y) => {
        const tire = ctx.createRadialGradient(x - 6, y - 10, 2, x, y, 25);
        tire.addColorStop(0, "#97a2a3");
        tire.addColorStop(0.35, "#4e5969");
        tire.addColorStop(0.8, "#202b3d");
        tire.addColorStop(1, "#111a2a");
        ctx.fillStyle = tire;
        ctx.strokeStyle = "#d8d6c3";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 23, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "rgba(204, 215, 208, 0.56)";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 12; i += 1) {
          const angle = i * Math.PI / 6;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(angle) * 16, y + Math.sin(angle) * 16);
          ctx.lineTo(x + Math.cos(angle) * 22, y + Math.sin(angle) * 22);
          ctx.stroke();
        }
        ctx.fillStyle = "#c5c6b7";
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    ctx.strokeStyle = "#8898a0";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(57, 84);
    ctx.lineTo(240, 84);
    ctx.moveTo(57, 130);
    ctx.lineTo(240, 130);
    ctx.moveTo(86, 87);
    ctx.lineTo(101, 129);
    ctx.moveTo(209, 87);
    ctx.lineTo(194, 129);
    ctx.stroke();
    const chassis = ctx.createLinearGradient(0, 60, 0, 114);
    chassis.addColorStop(0, "#f0e2b9");
    chassis.addColorStop(0.38, "#b5b39f");
    chassis.addColorStop(1, "#53677b");
    ctx.fillStyle = chassis;
    ctx.strokeStyle = "#f0e9ce";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(78, 64, 142, 41, 8);
    ctx.fill();
    ctx.stroke();

    const panel = ctx.createLinearGradient(0, 21, 0, 57);
    panel.addColorStop(0, "#c9e2dd");
    panel.addColorStop(0.5, "#648c9e");
    panel.addColorStop(1, "#233f62");
    ctx.fillStyle = panel;
    ctx.strokeStyle = "#e9e5d1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(105, 22, 91, 34, 5);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(211, 235, 235, 0.55)";
    ctx.lineWidth = 1;
    for (let x = 119; x < 190; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 24);
      ctx.lineTo(x, 54);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(107, 39);
    ctx.lineTo(194, 39);
    ctx.stroke();

    ctx.strokeStyle = "#d5d3c4";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(133, 64);
    ctx.lineTo(132, 43);
    ctx.lineTo(149, 35);
    ctx.moveTo(147, 63);
    ctx.lineTo(168, 44);
    ctx.stroke();
    ctx.fillStyle = "#f2d394";
    ctx.beginPath();
    ctx.arc(151, 39, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#b8c5c6";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(214, 75);
    ctx.quadraticCurveTo(251, 37, 267, 55);
    ctx.stroke();
    ctx.fillStyle = "#e7d5a9";
    ctx.beginPath();
    ctx.arc(268, 55, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f0d496";
    [[85, 72], [212, 72], [89, 99], [211, 99], [114, 65], [207, 65]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawAlsep(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(7, 12, 24, 0.62)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "rgba(8, 13, 29, 0.56)";
    ctx.beginPath();
    ctx.ellipse(119, 178, 100, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = "#d7c89e";
    ctx.lineWidth = 2.4;
    [[110, 117, 41, 151], [125, 117, 197, 149], [95, 119, 47, 128], [138, 116, 191, 123]].forEach((cable) => {
      ctx.beginPath();
      ctx.moveTo(cable[0], cable[1]);
      ctx.quadraticCurveTo((cable[0] + cable[2]) / 2, cable[1] + 30, cable[2], cable[3]);
      ctx.stroke();
    });

    const box = ctx.createLinearGradient(73, 78, 170, 130);
    box.addColorStop(0, "#eee3bd");
    box.addColorStop(0.34, "#adb6ae");
    box.addColorStop(1, "#4b647b");
    ctx.save();
    ctx.shadowColor = "rgba(182, 221, 238, 0.52)";
    ctx.shadowBlur = 10;
    ctx.fillStyle = box;
    ctx.strokeStyle = "#f1e8c9";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(72, 81, 96, 59, 8);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#324e68";
    ctx.beginPath();
    ctx.roundRect(84, 95, 38, 27, 5);
    ctx.fill();
    const display = ctx.createRadialGradient(99, 104, 1, 101, 109, 20);
    display.addColorStop(0, "#f8efc6");
    display.addColorStop(0.5, "#72bdc2");
    display.addColorStop(1, "#31516b");
    ctx.fillStyle = display;
    ctx.beginPath();
    ctx.arc(103, 108, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4d795";
    ctx.beginPath();
    ctx.arc(146, 104, 4, 0, Math.PI * 2);
    ctx.arc(146, 119, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#d2d7cc";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(120, 81);
    ctx.lineTo(120, 35);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(120, 28, 23, 8, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = "#96aab6";
    ctx.fill();
    ctx.strokeStyle = "#e7e6d5";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(120, 28, 8, 3, -0.2, 0, Math.PI * 2);
    ctx.fillStyle = "#253c58";
    ctx.fill();

    const generator = ctx.createLinearGradient(0, 120, 0, 167);
    generator.addColorStop(0, "#f2dfb6");
    generator.addColorStop(0.55, "#9a9c92");
    generator.addColorStop(1, "#475e72");
    ctx.fillStyle = generator;
    ctx.strokeStyle = "#ded8c4";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(174, 120, 34, 42, 9);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#394e67";
    for (let y = 126; y < 159; y += 7) ctx.fillRect(177, y, 28, 3);

    ctx.fillStyle = "#687c8b";
    [[47, 122], [36, 149], [194, 121], [201, 151]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.roundRect(x - 11, y - 8, 22, 16, 4);
      ctx.fill();
      ctx.strokeStyle = "#e1ddc8";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#f0d899";
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.strokeStyle = "rgba(239, 221, 177, 0.82)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(79, 144);
    ctx.lineTo(79, 158);
    ctx.lineTo(162, 158);
    ctx.lineTo(162, 143);
    ctx.stroke();
    [[78, 87], [161, 87], [80, 134], [161, 134]].forEach(([x, y]) => {
      ctx.fillStyle = "#f4d492";
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawSurveyor(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(6, 11, 25, 0.62)";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "rgba(8, 13, 29, 0.56)";
    ctx.beginPath();
    ctx.ellipse(122, 202, 88, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.lineCap = "round";
    ctx.strokeStyle = "#b9bcae";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(86, 121);
    ctx.lineTo(44, 190);
    ctx.moveTo(151, 120);
    ctx.lineTo(198, 190);
    ctx.moveTo(117, 125);
    ctx.lineTo(119, 194);
    ctx.stroke();
    ctx.strokeStyle = "rgba(243, 240, 218, 0.78)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(84, 127);
    ctx.lineTo(45, 189);
    ctx.moveTo(149, 126);
    ctx.lineTo(197, 189);
    ctx.stroke();
    ctx.fillStyle = "#d5d4c6";
    [[43, 192], [198, 192], [118, 195]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    const deck = ctx.createLinearGradient(60, 92, 181, 139);
    deck.addColorStop(0, "#f5eac9");
    deck.addColorStop(0.38, "#c2c2b1");
    deck.addColorStop(1, "#5d7183");
    ctx.save();
    ctx.shadowColor = "rgba(199, 235, 245, 0.5)";
    ctx.shadowBlur = 11;
    ctx.fillStyle = deck;
    ctx.strokeStyle = "#f7efdb";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(57, 94, 126, 40, 8);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#4b657a";
    ctx.beginPath();
    ctx.roundRect(102, 98, 36, 30, 6);
    ctx.fill();

    ctx.strokeStyle = "#bfc9bf";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(118, 98);
    ctx.lineTo(116, 54);
    ctx.stroke();
    ctx.fillStyle = "#8da6b1";
    ctx.strokeStyle = "#f2edda";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(99, 35, 38, 28, 8);
    ctx.fill();
    ctx.stroke();
    const lens = ctx.createRadialGradient(115, 46, 1, 118, 49, 13);
    lens.addColorStop(0, "#fff5c9");
    lens.addColorStop(0.25, "#82d8dd");
    lens.addColorStop(0.72, "#315872");
    lens.addColorStop(1, "#182a43");
    ctx.fillStyle = lens;
    ctx.beginPath();
    ctx.arc(118, 49, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.beginPath();
    ctx.ellipse(114, 44, 3, 1.5, -0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#aebbb7";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(167, 107);
    ctx.lineTo(194, 91);
    ctx.lineTo(205, 72);
    ctx.stroke();
    ctx.strokeStyle = "#e3d6b7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(191, 92);
    ctx.lineTo(211, 102);
    ctx.stroke();
    ctx.fillStyle = "#c9b991";
    ctx.beginPath();
    ctx.roundRect(204, 99, 20, 9, 4);
    ctx.fill();
    ctx.fillStyle = "#687d8d";
    ctx.beginPath();
    ctx.arc(166, 108, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#e1ddca";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(166, 108, 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#f4d696";
    [[65, 103], [174, 103], [72, 127], [169, 127], [107, 98], [133, 98]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawMarsSky(ctx, width = 1280, height = 720) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#f7bf76");
    sky.addColorStop(0.38, "#dc875f");
    sky.addColorStop(0.72, "#a45249");
    sky.addColorStop(1, "#54394a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const sunGlow = ctx.createRadialGradient(1010, 150, 8, 1010, 150, 250);
    sunGlow.addColorStop(0, "rgba(255, 232, 175, 0.46)");
    sunGlow.addColorStop(0.38, "rgba(255, 201, 140, 0.2)");
    sunGlow.addColorStop(1, "rgba(255, 180, 125, 0)");
    ctx.fillStyle = sunGlow;
    ctx.fillRect(730, 0, 550, 430);
    ctx.save();
    ctx.shadowColor = "rgba(255, 224, 168, 0.74)";
    ctx.shadowBlur = 34;
    const sun = ctx.createRadialGradient(1000, 132, 4, 1010, 144, 48);
    sun.addColorStop(0, "#fff5ce");
    sun.addColorStop(0.48, "#ffdc9a");
    sun.addColorStop(1, "#e99b67");
    ctx.fillStyle = sun;
    ctx.beginPath();
    ctx.arc(1010, 144, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "rgba(255, 232, 191, 0.48)";
    for (let i = 0; i < 90; i += 1) {
      const x = (i * 197 + 41) % width;
      const y = (i * 113 + 27) % 310;
      ctx.beginPath();
      ctx.arc(x, y, i % 9 === 0 ? 1.4 : 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  drawMarsRidge(ctx, layer) {
    const palettes = [
      ["#c6755d", "#8d514f", "#69444d"],
      ["#b96750", "#82434a", "#583748"],
      ["#b65c42", "#7b3b3e", "#4b323e"]
    ];
    const colors = palettes[layer];
    const gradient = ctx.createLinearGradient(0, 260, 0, 690);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.62, colors[1]);
    gradient.addColorStop(1, colors[2]);
    ctx.save();
    ctx.shadowColor = "rgba(63, 31, 39, 0.34)";
    ctx.shadowBlur = layer === 2 ? 18 : 10;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    if (layer === 0) {
      ctx.moveTo(0, 470);
      ctx.lineTo(170, 418);
      ctx.lineTo(335, 430);
      ctx.lineTo(505, 395);
      ctx.lineTo(620, 405);
      ctx.lineTo(725, 292);
      ctx.lineTo(790, 267);
      ctx.lineTo(850, 300);
      ctx.lineTo(945, 420);
      ctx.lineTo(1080, 391);
      ctx.lineTo(1280, 438);
    } else if (layer === 1) {
      ctx.moveTo(0, 512);
      ctx.lineTo(105, 452);
      ctx.lineTo(240, 464);
      ctx.lineTo(342, 408);
      ctx.lineTo(474, 440);
      ctx.lineTo(575, 490);
      ctx.lineTo(700, 438);
      ctx.lineTo(820, 478);
      ctx.lineTo(942, 416);
      ctx.lineTo(1070, 452);
      ctx.lineTo(1160, 430);
      ctx.lineTo(1280, 485);
    } else {
      ctx.moveTo(0, 570);
      ctx.quadraticCurveTo(170, 490, 340, 570);
      ctx.quadraticCurveTo(515, 640, 700, 548);
      ctx.quadraticCurveTo(890, 480, 1050, 560);
      ctx.quadraticCurveTo(1160, 606, 1280, 530);
    }
    ctx.lineTo(1280, 720);
    ctx.lineTo(0, 720);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = layer === 2 ? "rgba(255, 194, 139, 0.38)" : "rgba(255, 210, 169, 0.22)";
    ctx.lineWidth = layer === 2 ? 4 : 2;
    ctx.stroke();
    if (layer < 2) {
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = "#f4b77a";
      for (let i = 0; i < 9; i += 1) {
        const x = 70 + i * 147;
        const y = 486 + ((i * 31 + layer * 17) % 54);
        ctx.beginPath();
        ctx.ellipse(x, y, 34 + (i % 3) * 11, 5, -0.08, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  },

  drawOlympusMons(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.88;
    ctx.shadowColor = "rgba(80, 42, 48, 0.28)";
    ctx.shadowBlur = 22;
    const mountain = ctx.createLinearGradient(0, 115, 0, 500);
    mountain.addColorStop(0, "#ce8065");
    mountain.addColorStop(0.35, "#aa6255");
    mountain.addColorStop(1, "#744650");
    ctx.fillStyle = mountain;
    ctx.beginPath();
    ctx.moveTo(0, 458);
    ctx.lineTo(120, 420);
    ctx.lineTo(250, 392);
    ctx.lineTo(385, 365);
    ctx.lineTo(530, 307);
    ctx.lineTo(625, 229);
    ctx.lineTo(735, 166);
    ctx.lineTo(852, 132);
    ctx.lineTo(958, 167);
    ctx.lineTo(1083, 244);
    ctx.lineTo(1195, 321);
    ctx.lineTo(1340, 367);
    ctx.lineTo(1500, 406);
    ctx.lineTo(1700, 455);
    ctx.lineTo(1700, 520);
    ctx.lineTo(0, 520);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "rgba(255, 202, 155, 0.38)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(385, 365);
    ctx.quadraticCurveTo(590, 332, 625, 229);
    ctx.quadraticCurveTo(798, 95, 958, 167);
    ctx.quadraticCurveTo(1090, 211, 1195, 321);
    ctx.stroke();
    ctx.strokeStyle = "rgba(90, 43, 48, 0.22)";
    ctx.lineWidth = 7;
    for (let i = 0; i < 7; i += 1) {
      const x = 660 + i * 58;
      ctx.beginPath();
      ctx.moveTo(x, 245 + (i % 2) * 15);
      ctx.quadraticCurveTo(x + 24, 338, x + 120, 392 + (i % 3) * 10);
      ctx.stroke();
    }
  },

  drawMarsCanyonWall(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(55, 24, 34, 0.38)";
    ctx.shadowBlur = 18;
    const wall = ctx.createLinearGradient(0, 50, 0, 520);
    wall.addColorStop(0, "#df8964");
    wall.addColorStop(0.24, "#b85d4d");
    wall.addColorStop(0.68, "#783d48");
    wall.addColorStop(1, "#4d3442");
    ctx.fillStyle = wall;
    ctx.beginPath();
    ctx.moveTo(0, 496);
    ctx.lineTo(0, 154);
    ctx.lineTo(172, 142);
    ctx.lineTo(282, 176);
    ctx.lineTo(434, 159);
    ctx.lineTo(540, 201);
    ctx.lineTo(675, 181);
    ctx.lineTo(784, 220);
    ctx.lineTo(918, 193);
    ctx.lineTo(1050, 224);
    ctx.lineTo(1193, 188);
    ctx.lineTo(1350, 215);
    ctx.lineTo(1500, 176);
    ctx.lineTo(1500, 520);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "rgba(255, 199, 144, 0.42)";
    ctx.lineWidth = 4;
    for (let i = 0; i < 9; i += 1) {
      const y = 255 + i * 26;
      ctx.beginPath();
      ctx.moveTo(25, y + (i % 2) * 8);
      ctx.quadraticCurveTo(405, y - 22, 748, y + 9);
      ctx.quadraticCurveTo(1105, y + 38, 1475, y - 12);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(235, 155, 104, 0.27)";
    [[240, 470, 48], [820, 430, 67], [1240, 488, 42]].forEach(([x, y, radius]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, radius, 10, -0.08, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawMarsRegolith(ctx) {
    const ground = ctx.createLinearGradient(0, 520, 0, 720);
    ground.addColorStop(0, "rgba(191, 94, 58, 0)");
    ground.addColorStop(0.18, "#b45c3f");
    ground.addColorStop(0.58, "#803f3c");
    ground.addColorStop(1, "#492f3b");
    ctx.fillStyle = ground;
    ctx.beginPath();
    ctx.moveTo(0, 586);
    ctx.quadraticCurveTo(200, 520, 380, 578);
    ctx.quadraticCurveTo(610, 642, 820, 557);
    ctx.quadraticCurveTo(1040, 502, 1280, 576);
    ctx.lineTo(1280, 720);
    ctx.lineTo(0, 720);
    ctx.closePath();
    ctx.fill();

    for (let i = 0; i < 62; i += 1) {
      const x = (i * 173 + 32) % 1280;
      const y = 570 + ((i * 59) % 145);
      const rx = 2 + (i % 5) * 2;
      ctx.fillStyle = i % 3 === 0 ? "rgba(243, 163, 106, 0.46)" : "rgba(54, 35, 44, 0.28)";
      ctx.beginPath();
      ctx.ellipse(x, y, rx, 2 + (i % 3), -0.13, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(250, 182, 128, 0.2)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 7; i += 1) {
      const x = 74 + i * 189;
      ctx.beginPath();
      ctx.ellipse(x, 632 + (i % 2) * 18, 38 + (i % 3) * 8, 6, -0.05, 0.1, Math.PI - 0.1);
      ctx.stroke();
    }
  },

  drawMarsVignette(ctx) {
    const vignette = ctx.createRadialGradient(640, 360, 250, 640, 360, 760);
    vignette.addColorStop(0, "rgba(36, 16, 23, 0)");
    vignette.addColorStop(0.72, "rgba(36, 16, 23, 0.08)");
    vignette.addColorStop(1, "rgba(36, 16, 23, 0.48)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, 1280, 720);
  },

  drawMarsPlatform(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(56, 27, 33, 0.55)";
    ctx.shadowBlur = 9;
    const rock = ctx.createLinearGradient(0, 0, 0, 40);
    rock.addColorStop(0, "#f0ac70");
    rock.addColorStop(0.25, "#c9754e");
    rock.addColorStop(0.68, "#914744");
    rock.addColorStop(1, "#593641");
    ctx.fillStyle = rock;
    ctx.beginPath();
    ctx.moveTo(3, 10);
    ctx.quadraticCurveTo(52, 0, 93, 7);
    ctx.quadraticCurveTo(155, 1, 202, 7);
    ctx.quadraticCurveTo(246, 0, 277, 10);
    ctx.lineTo(272, 38);
    ctx.lineTo(8, 38);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "rgba(255, 210, 157, 0.78)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(14, 10);
    ctx.quadraticCurveTo(70, 5, 120, 10);
    ctx.quadraticCurveTo(192, 4, 266, 10);
    ctx.stroke();
    ctx.fillStyle = "#723c40";
    for (let x = 20; x < 280; x += 38) ctx.fillRect(x, 26 + (x % 3), 12, 4);
  },

  drawMarsAirbag(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(52, 26, 34, 0.56)";
    ctx.shadowBlur = 8;
    const centers = [[36, 35, 24], [69, 25, 27], [103, 35, 24]];
    centers.forEach(([x, y, r]) => {
      const bag = ctx.createRadialGradient(x - r * 0.32, y - r * 0.4, 2, x, y, r);
      bag.addColorStop(0, "#fff2cc");
      bag.addColorStop(0.38, "#edc690");
      bag.addColorStop(0.78, "#c27b5e");
      bag.addColorStop(1, "#75434a");
      ctx.fillStyle = bag;
      ctx.strokeStyle = "#ffe4b4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
    ctx.strokeStyle = "rgba(112, 55, 53, 0.72)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(12, 53);
    ctx.lineTo(127, 53);
    ctx.stroke();
  },

  drawPathfinder(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(51, 24, 31, 0.58)";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(48, 25, 31, 0.48)";
    ctx.beginPath();
    ctx.ellipse(130, 224, 102, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#d9c29b";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(70, 128); ctx.lineTo(42, 208);
    ctx.moveTo(190, 128); ctx.lineTo(217, 208);
    ctx.moveTo(84, 146); ctx.lineTo(72, 209);
    ctx.moveTo(176, 146); ctx.lineTo(188, 209);
    ctx.stroke();
    const deck = ctx.createLinearGradient(54, 104, 208, 164);
    deck.addColorStop(0, "#fff0c8");
    deck.addColorStop(0.42, "#d0b181");
    deck.addColorStop(1, "#6b5860");
    ctx.fillStyle = deck;
    ctx.strokeStyle = "#fff0ce";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(56, 104, 148, 58, 13);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#526276";
    ctx.beginPath();
    ctx.roundRect(109, 111, 44, 39, 8);
    ctx.fill();
    const lens = ctx.createRadialGradient(126, 128, 1, 130, 131, 16);
    lens.addColorStop(0, "#fff2bd");
    lens.addColorStop(0.3, "#76dce2");
    lens.addColorStop(1, "#203d57");
    ctx.fillStyle = lens;
    ctx.beginPath();
    ctx.arc(130, 130, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f4ddb0";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(132, 106); ctx.lineTo(145, 52);
    ctx.lineTo(201, 48); ctx.lineTo(215, 54);
    ctx.stroke();
    ctx.fillStyle = "#a9bec0";
    ctx.beginPath();
    ctx.ellipse(214, 54, 28, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f2dfba";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#f2d394";
    [[67, 117], [193, 117], [77, 151], [184, 151]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    });
  },

  drawMarsRovers(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(49, 23, 31, 0.58)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "rgba(44, 22, 30, 0.46)";
    ctx.beginPath();
    ctx.ellipse(156, 169, 134, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    [[92, 0], [218, 1]].forEach(([baseX, twin]) => {
      const body = ctx.createLinearGradient(baseX - 37, 92, baseX + 30, 132);
      body.addColorStop(0, twin ? "#f5d399" : "#f8e0ad");
      body.addColorStop(0.55, "#be9b67");
      body.addColorStop(1, "#60505a");
      ctx.fillStyle = body;
      ctx.strokeStyle = "#fff0c9";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(baseX - 37, 92, 74, 39, 8);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#d2c19a";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(baseX - 26, 130); ctx.lineTo(baseX - 35, 146);
      ctx.moveTo(baseX + 26, 130); ctx.lineTo(baseX + 35, 146);
      ctx.stroke();
      ctx.fillStyle = "#263447";
      [-35, 0, 35].forEach((offset) => {
        ctx.beginPath(); ctx.arc(baseX + offset, 148, 12, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#dcc597"; ctx.lineWidth = 2; ctx.stroke();
      });
      ctx.strokeStyle = "#d5d7c8";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(baseX, 92); ctx.lineTo(baseX + (twin ? 7 : -7), 55);
      ctx.stroke();
      const head = ctx.createLinearGradient(baseX - 21, 33, baseX + 20, 66);
      head.addColorStop(0, "#f3dbac");
      head.addColorStop(1, "#657c88");
      ctx.fillStyle = head;
      ctx.strokeStyle = "#fff0c9";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(baseX - 23, 34, 46, 31, 7);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#8ee5e2";
      ctx.beginPath(); ctx.arc(baseX + 3, 49, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#293d54";
      ctx.fillRect(baseX - 39, 78, 78, 8);
      ctx.strokeStyle = "#e7d4a9";
      ctx.lineWidth = 2;
      ctx.strokeRect(baseX - 39, 78, 78, 8);
    });
  },

  drawViking(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(49, 23, 31, 0.58)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "rgba(44, 22, 30, 0.48)";
    ctx.beginPath(); ctx.ellipse(130, 218, 104, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#d4c49f";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(65, 122); ctx.lineTo(36, 209);
    ctx.moveTo(194, 122); ctx.lineTo(224, 209);
    ctx.moveTo(128, 146); ctx.lineTo(128, 212);
    ctx.stroke();
    const body = ctx.createLinearGradient(67, 83, 190, 148);
    body.addColorStop(0, "#f7e6bd");
    body.addColorStop(0.46, "#cfbc94");
    body.addColorStop(1, "#6b6470");
    ctx.fillStyle = body;
    ctx.strokeStyle = "#fff0ca";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(59, 83, 139, 66, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#39495c";
    ctx.beginPath(); ctx.roundRect(110, 93, 38, 31, 8); ctx.fill();
    ctx.fillStyle = "#8de3e5";
    ctx.beginPath(); ctx.arc(129, 108, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#c9c8b7";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(180, 101); ctx.lineTo(213, 82); ctx.lineTo(218, 48);
    ctx.stroke();
    ctx.strokeStyle = "#f2dda9";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(210, 82); ctx.lineTo(235, 89); ctx.stroke();
    ctx.fillStyle = "#896d58";
    ctx.beginPath(); ctx.roundRect(226, 87, 22, 12, 4); ctx.fill();
    ctx.strokeStyle = "rgba(240, 217, 174, 0.68)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(112, 146); ctx.lineTo(112, 177); ctx.lineTo(43, 192); ctx.stroke();
    ctx.fillStyle = "#bf9a69";
    ctx.beginPath(); ctx.ellipse(39, 195, 22, 7, -0.1, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f1d391";
    [[72, 95], [186, 95], [75, 135], [181, 135]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    });
  },

  drawInSight(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(48, 22, 31, 0.56)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "rgba(43, 22, 30, 0.44)";
    ctx.beginPath(); ctx.ellipse(140, 197, 126, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    [[8, 0], [152, 1]].forEach(([x, side]) => {
      const panel = ctx.createLinearGradient(x, 85, x + 116, 128);
      panel.addColorStop(0, "#203c61");
      panel.addColorStop(0.5, "#52779a");
      panel.addColorStop(1, "#182c4d");
      ctx.fillStyle = panel;
      ctx.strokeStyle = "#d6c6a0";
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(x, 81, 116, 45, 5); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "rgba(169, 214, 231, 0.68)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; i += 1) {
        ctx.beginPath(); ctx.moveTo(x + i * 17, 84); ctx.lineTo(x + i * 17, 123); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(x + 4, 103); ctx.lineTo(x + 112, 103); ctx.stroke();
      ctx.strokeStyle = "#d4c39f";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(side ? 154 : 119, 130); ctx.lineTo(side ? 163 : 113, 181);
      ctx.stroke();
    });
    const deck = ctx.createLinearGradient(87, 93, 195, 151);
    deck.addColorStop(0, "#f7e6bf"); deck.addColorStop(0.52, "#c4ad83"); deck.addColorStop(1, "#5c5360");
    ctx.fillStyle = deck;
    ctx.strokeStyle = "#fff0ca";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(86, 102, 110, 54, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#37485d";
    ctx.beginPath(); ctx.roundRect(120, 109, 39, 35, 8); ctx.fill();
    ctx.fillStyle = "#8be3e4";
    ctx.beginPath(); ctx.arc(139, 126, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#ece0bf";
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(142, 106); ctx.lineTo(164, 60); ctx.lineTo(192, 47); ctx.stroke();
    ctx.fillStyle = "#556578";
    ctx.beginPath(); ctx.ellipse(198, 43, 15, 8, -0.2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#f4e3bf"; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = "#ecdec0"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(107, 155); ctx.lineTo(103, 186); ctx.lineTo(174, 186); ctx.lineTo(178, 155); ctx.stroke();
    ctx.fillStyle = "#d8a775";
    ctx.beginPath(); ctx.ellipse(219, 188, 25, 7, 0, 0, Math.PI * 2); ctx.fill();
  },

  drawDeepSky(ctx, width = 1280, height = 720) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#080d25");
    sky.addColorStop(0.58, "#111735");
    sky.addColorStop(1, "#17182e");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);
    [[250, 230, 245, "#53338a"], [920, 180, 310, "#1c7291"], [670, 440, 290, "#742f75"]]
      .forEach(([x, y, radius, color]) => {
        const cloud = ctx.createRadialGradient(x, y, 4, x, y, radius);
        cloud.addColorStop(0, `${color}66`);
        cloud.addColorStop(0.52, `${color}24`);
        cloud.addColorStop(1, `${color}00`);
        ctx.fillStyle = cloud;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      });
    for (let index = 0; index < 210; index += 1) {
      const x = (index * 197 + 41) % width;
      const y = (index * 113 + 27) % height;
      const radius = index % 19 === 0 ? 2 : index % 4 === 0 ? 1.3 : 0.7;
      ctx.globalAlpha = 0.42 + (index % 5) * 0.11;
      ctx.fillStyle = index % 6 === 0 ? "#baf4ff" : "#f2e7ff";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  },

  drawDeepNebula(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.62;
    [[165, 400, 320, 138, "#704caa"], [610, 340, 380, 150, "#276c91"], [1100, 410, 260, 145, "#8c3979"]]
      .forEach(([x, y, rx, ry, color], index) => {
        const mist = ctx.createRadialGradient(x, y, 12, x, y, rx);
        mist.addColorStop(0, `${color}70`);
        mist.addColorStop(0.55, `${color}2f`);
        mist.addColorStop(1, `${color}00`);
        ctx.fillStyle = mist;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry + index * 5, -0.18 + index * 0.17, 0, Math.PI * 2);
        ctx.fill();
      });
    ctx.restore();
  },

  drawDeepAsteroidBelt(ctx) {
    const haze = ctx.createLinearGradient(0, 300, 0, 680);
    haze.addColorStop(0, "rgba(54, 69, 108, 0)");
    haze.addColorStop(0.55, "rgba(81, 91, 128, 0.34)");
    haze.addColorStop(1, "rgba(25, 30, 54, 0.42)");
    ctx.fillStyle = haze;
    ctx.fillRect(0, 280, 1280, 440);
    for (let index = 0; index < 68; index += 1) {
      const x = (index * 127 + 23) % 1280;
      const y = 365 + ((index * 71) % 260);
      const radius = 3 + (index % 7) * 1.6;
      const rock = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.42, 1, x, y, radius * 1.6);
      rock.addColorStop(0, "#b2a9ae");
      rock.addColorStop(0.4, "#6e7189");
      rock.addColorStop(1, "rgba(38, 42, 68, 0.2)");
      ctx.fillStyle = rock;
      ctx.beginPath();
      ctx.ellipse(x, y, radius * 1.5, radius, (index % 5) * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  drawDeepClouds(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.44;
    ctx.strokeStyle = "#5cd6d0";
    ctx.lineWidth = 28;
    ctx.shadowColor = "#8c78ff";
    ctx.shadowBlur = 34;
    for (let index = 0; index < 4; index += 1) {
      ctx.beginPath();
      ctx.moveTo(-80, 455 + index * 50);
      ctx.bezierCurveTo(250, 305 + index * 42, 610, 655 - index * 36, 930, 432 + index * 55);
      ctx.bezierCurveTo(1080, 330 + index * 44, 1210, 390 + index * 37, 1370, 300 + index * 48);
      ctx.stroke();
    }
    ctx.restore();
  },

  drawDeepDust(ctx) {
    for (let index = 0; index < 120; index += 1) {
      const x = (index * 307 + 19) % 1280;
      const y = 40 + ((index * 191) % 620);
      const radius = index % 12 === 0 ? 2.2 : 0.8;
      ctx.globalAlpha = 0.18 + (index % 6) * 0.1;
      ctx.fillStyle = index % 4 === 0 ? "#a5f2ee" : "#e4d8ff";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  },

  drawDeepAurora(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.58;
    ctx.lineCap = "round";
    const colors = ["#55dbd1", "#8b83ff", "#d06bbd", "#74b9ed"];
    colors.forEach((color, index) => {
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 26;
      ctx.lineWidth = 20 - index * 2;
      ctx.beginPath();
      ctx.moveTo(-50, 130 + index * 45);
      ctx.bezierCurveTo(250, 340 - index * 36, 390, 40 + index * 76, 710, 210 + index * 42);
      ctx.bezierCurveTo(980, 380 - index * 24, 1050, 90 + index * 60, 1330, 220 + index * 28);
      ctx.stroke();
    });
    ctx.restore();
  },

  drawDeepVignette(ctx) {
    const shade = ctx.createRadialGradient(640, 345, 260, 640, 345, 790);
    shade.addColorStop(0, "rgba(4, 7, 18, 0)");
    shade.addColorStop(0.74, "rgba(4, 7, 18, 0.18)");
    shade.addColorStop(1, "rgba(2, 4, 13, 0.82)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, 1280, 720);
  },

  drawDeepPlatform(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(4, 8, 24, 0.72)";
    ctx.shadowBlur = 13;
    const face = ctx.createLinearGradient(0, 4, 0, 38);
    face.addColorStop(0, "#8392c6");
    face.addColorStop(0.22, "#434e7b");
    face.addColorStop(0.72, "#242c50");
    face.addColorStop(1, "#11182e");
    ctx.fillStyle = face;
    ctx.beginPath();
    ctx.roundRect(2, 5, 276, 34, 11);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "rgba(173, 232, 247, 0.82)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(14, 9);
    ctx.quadraticCurveTo(134, 2, 266, 9);
    ctx.stroke();
    ctx.fillStyle = "#c8d8e8";
    for (let x = 18; x < 272; x += 34) {
      ctx.beginPath();
      ctx.arc(x, 19 + (x % 3), 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(115, 218, 228, 0.32)";
    ctx.lineWidth = 1;
    for (let x = 28; x < 268; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 30);
      ctx.lineTo(x + 24, 30);
      ctx.stroke();
    }
  },

  drawDeepSpring(ctx) {
    const pad = ctx.createLinearGradient(0, 2, 0, 32);
    pad.addColorStop(0, "#bcf4ec");
    pad.addColorStop(0.3, "#4eb8c9");
    pad.addColorStop(0.8, "#315080");
    pad.addColorStop(1, "#202747");
    ctx.fillStyle = pad;
    ctx.beginPath();
    ctx.roundRect(3, 5, 174, 27, 11);
    ctx.fill();
    ctx.strokeStyle = "#d5fff3";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowColor = "#8aefff";
    ctx.shadowBlur = 14;
    ctx.strokeStyle = "#c7fff2";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(25, 7); ctx.lineTo(39, 28);
    ctx.lineTo(53, 7); ctx.lineTo(67, 28);
    ctx.lineTo(81, 7); ctx.lineTo(95, 28);
    ctx.lineTo(109, 7); ctx.lineTo(123, 28);
    ctx.lineTo(137, 7); ctx.lineTo(151, 28);
    ctx.stroke();
    ctx.shadowBlur = 0;
  },

  drawDeepAsteroid(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(5, 9, 22, 0.68)";
    ctx.shadowBlur = 15;
    const stone = ctx.createRadialGradient(30, 20, 3, 55, 47, 57);
    stone.addColorStop(0, "#c7c2ce");
    stone.addColorStop(0.3, "#777d98");
    stone.addColorStop(0.72, "#454b69");
    stone.addColorStop(1, "#242a45");
    ctx.fillStyle = stone;
    ctx.beginPath();
    ctx.moveTo(16, 33); ctx.lineTo(25, 12); ctx.lineTo(46, 7);
    ctx.lineTo(63, 16); ctx.lineTo(88, 14); ctx.lineTo(100, 34);
    ctx.lineTo(91, 63); ctx.lineTo(69, 78); ctx.lineTo(42, 76);
    ctx.lineTo(19, 62); ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = "rgba(28, 33, 54, 0.52)";
    [[43, 35, 7], [74, 52, 5], [63, 23, 4]].forEach(([x, y, r]) => {
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.strokeStyle = "rgba(208, 220, 239, 0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(23, 30); ctx.lineTo(35, 17); ctx.lineTo(48, 14); ctx.stroke();
  },

  drawDeepGasGiant(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(8, 12, 31, 0.78)";
    ctx.shadowBlur = 28;
    ctx.fillStyle = "rgba(7, 10, 28, 0.5)";
    ctx.beginPath(); ctx.ellipse(150, 216, 126, 16, 0, 0, Math.PI * 2); ctx.fill();
    const planet = ctx.createRadialGradient(95, 73, 8, 151, 120, 128);
    planet.addColorStop(0, "#f1d0a6");
    planet.addColorStop(0.26, "#c48274");
    planet.addColorStop(0.58, "#835b87");
    planet.addColorStop(0.85, "#3d4777");
    planet.addColorStop(1, "#20294e");
    ctx.fillStyle = planet;
    ctx.beginPath(); ctx.arc(150, 120, 112, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.beginPath(); ctx.arc(150, 120, 110, 0, Math.PI * 2); ctx.clip();
    [[-30, 44, "#f1c99d"], [12, 73, "#9d657f"], [-10, 105, "#e1a77f"], [0, 150, "#5e7094"], [12, 183, "#e6c6a5"]]
      .forEach(([offset, y, color]) => {
        ctx.globalAlpha = 0.56;
        ctx.strokeStyle = color;
        ctx.lineWidth = 15;
        ctx.beginPath(); ctx.moveTo(24, y); ctx.bezierCurveTo(92, y + offset, 203, y - offset, 280, y + 7); ctx.stroke();
      });
    ctx.restore();
    const rim = ctx.createLinearGradient(46, 30, 260, 205);
    rim.addColorStop(0, "rgba(255, 241, 215, 0.85)");
    rim.addColorStop(0.45, "rgba(255, 241, 215, 0)");
    rim.addColorStop(1, "rgba(117, 184, 255, 0.54)");
    ctx.strokeStyle = rim;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(150, 120, 111, -2.35, 0.85); ctx.stroke();
    ctx.fillStyle = "#f4d0a8";
    ctx.beginPath(); ctx.ellipse(190, 110, 18, 8, -0.16, 0, Math.PI * 2); ctx.fill();
  },

  drawDeepRingedPlanet(ctx) {
    ctx.save();
    ctx.translate(180, 132);
    ctx.rotate(-0.2);
    ctx.shadowColor = "rgba(118, 169, 255, 0.48)";
    ctx.shadowBlur = 18;
    ctx.strokeStyle = "#e7c997";
    ctx.lineWidth = 18;
    ctx.beginPath(); ctx.ellipse(0, 0, 160, 43, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = "rgba(106, 154, 223, 0.86)";
    ctx.lineWidth = 8;
    ctx.beginPath(); ctx.ellipse(0, 0, 184, 51, 0, 0, Math.PI * 2); ctx.stroke();
    const planet = ctx.createRadialGradient(-32, -40, 4, 0, 0, 88);
    planet.addColorStop(0, "#fff0cb");
    planet.addColorStop(0.35, "#dcb883");
    planet.addColorStop(0.72, "#947e9a");
    planet.addColorStop(1, "#35426a");
    ctx.fillStyle = planet;
    ctx.beginPath(); ctx.arc(0, 0, 78, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.save();
    ctx.beginPath(); ctx.arc(0, 0, 77, 0, Math.PI * 2); ctx.clip();
    ctx.strokeStyle = "rgba(255, 238, 199, 0.46)";
    ctx.lineWidth = 11;
    [-39, -10, 24, 49].forEach((y) => {
      ctx.beginPath(); ctx.moveTo(-80, y); ctx.lineTo(80, y); ctx.stroke();
    });
    ctx.restore();
    ctx.strokeStyle = "rgba(255, 245, 220, 0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0, 0, 77, -2.8, 0.75); ctx.stroke();
    ctx.restore();
  },

  drawDeepEarthDot(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(105, 212, 255, 0.96)";
    ctx.shadowBlur = 25;
    const glow = ctx.createRadialGradient(36, 36, 2, 36, 36, 31);
    glow.addColorStop(0, "#eafaff");
    glow.addColorStop(0.18, "#7de4ff");
    glow.addColorStop(0.44, "#367dc4");
    glow.addColorStop(1, "rgba(31, 54, 120, 0.12)");
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(36, 36, 30, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = "rgba(229, 248, 255, 0.9)";
    ctx.beginPath(); ctx.ellipse(29, 27, 8, 4, -0.4, 0, Math.PI * 2); ctx.fill();
  },

  drawDeepStar(ctx) {
    ctx.save();
    ctx.shadowColor = "#fff0b0";
    ctx.shadowBlur = 35;
    const star = ctx.createRadialGradient(75, 75, 5, 75, 75, 70);
    star.addColorStop(0, "#ffffff");
    star.addColorStop(0.18, "#fff5c9");
    star.addColorStop(0.43, "#ffd57d");
    star.addColorStop(0.68, "rgba(244, 171, 83, 0.4)");
    star.addColorStop(1, "rgba(244, 171, 83, 0)");
    ctx.fillStyle = star;
    ctx.fillRect(0, 0, 150, 150);
    ctx.restore();
  },

  drawDawn(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(28, 24, 59, 0.72)";
    ctx.shadowBlur = 19;
    ctx.fillStyle = "rgba(18, 20, 43, 0.52)";
    ctx.beginPath(); ctx.ellipse(141, 171, 112, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.shadowColor = "#77eaff";
    ctx.shadowBlur = 24;
    const plume = ctx.createLinearGradient(12, 100, 87, 100);
    plume.addColorStop(0, "rgba(106, 236, 255, 0)");
    plume.addColorStop(1, "rgba(117, 225, 255, 0.92)");
    ctx.fillStyle = plume;
    ctx.beginPath(); ctx.moveTo(32, 90); ctx.lineTo(96, 77); ctx.lineTo(96, 120); ctx.lineTo(32, 106); ctx.closePath(); ctx.fill();
    ctx.restore();
    [[8, 38], [8, 136], [186, 38], [186, 136]].forEach(([x, y]) => {
      const panel = ctx.createLinearGradient(x, y, x + 84, y + 28);
      panel.addColorStop(0, "#344b79"); panel.addColorStop(0.5, "#4c8eb5"); panel.addColorStop(1, "#243257");
      ctx.fillStyle = panel; ctx.strokeStyle = "#c5e8ef"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(x, y, 83, 28, 3); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "rgba(184, 231, 244, 0.65)"; ctx.lineWidth = 1;
      for (let i = 1; i < 6; i += 1) {
        ctx.beginPath(); ctx.moveTo(x + i * 13, y + 2); ctx.lineTo(x + i * 13, y + 26); ctx.stroke();
      }
    });
    const body = ctx.createLinearGradient(93, 72, 179, 132);
    body.addColorStop(0, "#fff0c8"); body.addColorStop(0.44, "#c4b38f"); body.addColorStop(1, "#59617d");
    ctx.fillStyle = body; ctx.strokeStyle = "#fff1d2"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(92, 72, 92, 62, 16); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#34415c"; ctx.beginPath(); ctx.arc(139, 102, 17, 0, Math.PI * 2); ctx.fill();
    const lens = ctx.createRadialGradient(134, 96, 1, 142, 104, 13);
    lens.addColorStop(0, "#fff"); lens.addColorStop(0.35, "#9ef2ff"); lens.addColorStop(1, "#315477");
    ctx.fillStyle = lens; ctx.beginPath(); ctx.arc(142, 104, 12, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#f2dcaa"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(137, 73); ctx.lineTo(137, 47); ctx.stroke();
    ctx.fillStyle = "#f0d99c"; [[106, 81], [169, 81], [106, 124], [169, 124]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    });
  },

  drawNear(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(11, 12, 30, 0.74)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "rgba(15, 17, 36, 0.5)";
    ctx.beginPath(); ctx.ellipse(128, 173, 105, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#d8ccad"; ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(75, 122); ctx.lineTo(52, 167);
    ctx.moveTo(178, 122); ctx.lineTo(202, 166);
    ctx.moveTo(95, 139); ctx.lineTo(82, 170);
    ctx.moveTo(157, 139); ctx.lineTo(169, 170);
    ctx.stroke();
    [[11, 48], [184, 48]].forEach(([x, y]) => {
      const panel = ctx.createLinearGradient(x, y, x + 56, y + 69);
      panel.addColorStop(0, "#637fa7"); panel.addColorStop(0.5, "#274878"); panel.addColorStop(1, "#15274d");
      ctx.fillStyle = panel; ctx.strokeStyle = "#e2d4b8"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(x, y, 53, 65, 5); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "rgba(168, 218, 241, 0.62)"; ctx.lineWidth = 1;
      for (let i = 1; i < 4; i += 1) {
        ctx.beginPath(); ctx.moveTo(x + i * 13, y + 3); ctx.lineTo(x + i * 13, y + 62); ctx.stroke();
      }
    });
    const body = ctx.createLinearGradient(77, 74, 183, 142);
    body.addColorStop(0, "#f6e5bd"); body.addColorStop(0.46, "#bba880"); body.addColorStop(1, "#4c546e");
    ctx.fillStyle = body; ctx.strokeStyle = "#fff0c8"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(72, 79, 111, 63, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#384862"; ctx.beginPath(); ctx.arc(126, 106, 17, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#9ceaff"; ctx.beginPath(); ctx.arc(130, 103, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#eee1c5"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(81, 92); ctx.lineTo(53, 34); ctx.moveTo(174, 96); ctx.lineTo(204, 29); ctx.stroke();
    ctx.fillStyle = "#d9caa7";
    [[64, 34], [212, 30], [83, 84], [174, 84]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    });
  },

  drawPioneer(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(7, 10, 28, 0.76)";
    ctx.shadowBlur = 17;
    ctx.fillStyle = "rgba(15, 18, 39, 0.5)";
    ctx.beginPath(); ctx.ellipse(127, 175, 100, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#d4c39f"; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(129, 106); ctx.lineTo(198, 41); ctx.stroke();
    ctx.fillStyle = "#c8c0aa"; ctx.strokeStyle = "#fff0ce"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(204, 37, 42, 14, -0.38, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = "rgba(245, 229, 199, 0.75)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(204, 37, 29, 9, -0.38, 0, Math.PI * 2); ctx.stroke();
    const body = ctx.createLinearGradient(84, 78, 169, 137);
    body.addColorStop(0, "#fff0c8"); body.addColorStop(0.48, "#b5a17e"); body.addColorStop(1, "#4a536b");
    ctx.fillStyle = body; ctx.strokeStyle = "#fff1d2"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(83, 79, 92, 67, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#374861"; ctx.beginPath(); ctx.arc(128, 105, 17, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#a0efff"; ctx.beginPath(); ctx.arc(132, 103, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#ded1ad"; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(86, 97); ctx.lineTo(36, 54); ctx.moveTo(169, 96); ctx.lineTo(223, 139); ctx.stroke();
    const plaque = ctx.createLinearGradient(190, 135, 250, 163);
    plaque.addColorStop(0, "#f6e5ab"); plaque.addColorStop(1, "#9a8059");
    ctx.fillStyle = plaque; ctx.strokeStyle = "#fff0c5"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(192, 133, 52, 27, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#564c43";
    ctx.beginPath(); ctx.arc(207, 142, 3, 0, Math.PI * 2); ctx.arc(225, 150, 3, 0, Math.PI * 2); ctx.fill();
  },

  drawKepler(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(5, 9, 25, 0.74)";
    ctx.shadowBlur = 17;
    ctx.fillStyle = "rgba(13, 17, 40, 0.5)";
    ctx.beginPath(); ctx.ellipse(124, 166, 105, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#d9c8a4"; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(72, 93); ctx.lineTo(39, 61); ctx.lineTo(20, 61); ctx.stroke();
    const panel = ctx.createLinearGradient(10, 53, 71, 96);
    panel.addColorStop(0, "#6481aa"); panel.addColorStop(0.5, "#274776"); panel.addColorStop(1, "#18294c");
    ctx.fillStyle = panel; ctx.strokeStyle = "#e3d6bc"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(7, 48, 45, 50, 4); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = "#d3c09d"; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(167, 112); ctx.lineTo(207, 144); ctx.stroke();
    const barrel = ctx.createLinearGradient(71, 67, 192, 142);
    barrel.addColorStop(0, "#faf0d7"); barrel.addColorStop(0.45, "#9e9ead"); barrel.addColorStop(1, "#394462");
    ctx.fillStyle = barrel; ctx.strokeStyle = "#fff3d3"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(65, 77, 124, 57, 14); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#273751"; ctx.beginPath(); ctx.ellipse(184, 105, 19, 27, 0, 0, Math.PI * 2); ctx.fill();
    const lens = ctx.createRadialGradient(180, 99, 2, 184, 105, 20);
    lens.addColorStop(0, "#fff1c8"); lens.addColorStop(0.35, "#9fe9f3"); lens.addColorStop(1, "#233c62");
    ctx.fillStyle = lens; ctx.beginPath(); ctx.arc(185, 105, 17, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#eee0bf"; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(91, 134); ctx.lineTo(72, 160); ctx.lineTo(159, 160); ctx.lineTo(148, 133); ctx.stroke();
    ctx.fillStyle = "#ebd49b"; [[81, 87], [172, 87], [80, 124], [171, 124]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    });
  },

  drawVoyager(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(8, 11, 28, 0.76)";
    ctx.shadowBlur = 19;
    ctx.fillStyle = "rgba(14, 17, 39, 0.52)";
    ctx.beginPath(); ctx.ellipse(135, 184, 111, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#ddd0b6"; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(135, 112); ctx.lineTo(135, 55);
    ctx.moveTo(123, 117); ctx.lineTo(61, 69);
    ctx.moveTo(149, 117); ctx.lineTo(210, 69);
    ctx.moveTo(125, 134); ctx.lineTo(82, 169);
    ctx.moveTo(148, 134); ctx.lineTo(190, 169);
    ctx.stroke();
    const dish = ctx.createRadialGradient(112, 48, 3, 135, 57, 51);
    dish.addColorStop(0, "#fff4d6"); dish.addColorStop(0.5, "#d5c9ad"); dish.addColorStop(1, "#6e7c96");
    ctx.fillStyle = dish; ctx.strokeStyle = "#fff1d2"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(136, 55, 50, 33, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    const body = ctx.createLinearGradient(101, 83, 168, 147);
    body.addColorStop(0, "#f7e9c5"); body.addColorStop(0.5, "#afa27e"); body.addColorStop(1, "#4d5772");
    ctx.fillStyle = body; ctx.strokeStyle = "#fff0ce"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(101, 93, 69, 60, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#3b4b65"; ctx.beginPath(); ctx.arc(136, 114, 13, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#9deaff"; ctx.beginPath(); ctx.arc(140, 111, 7, 0, Math.PI * 2); ctx.fill();
    const record = ctx.createLinearGradient(159, 130, 193, 159);
    record.addColorStop(0, "#fff2bc"); record.addColorStop(1, "#ab7f45");
    ctx.fillStyle = record; ctx.strokeStyle = "#fff2cb"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(162, 132, 30, 27, 5); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = "#f6e1aa"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(177, 145, 8, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#f2d89d";
    [[107, 100], [164, 100], [108, 145], [163, 145]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    });
  },

  drawIngenuity(ctx) {
    ctx.save();
    ctx.shadowColor = "rgba(47, 22, 30, 0.56)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "rgba(43, 22, 30, 0.4)";
    ctx.beginPath(); ctx.ellipse(116, 213, 68, 9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#e7d5ad";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(86, 164); ctx.lineTo(69, 208);
    ctx.moveTo(145, 164); ctx.lineTo(162, 208);
    ctx.moveTo(64, 208); ctx.lineTo(168, 208);
    ctx.stroke();
    const body = ctx.createLinearGradient(71, 108, 160, 177);
    body.addColorStop(0, "#f7e8c3");
    body.addColorStop(0.5, "#b5a68e");
    body.addColorStop(1, "#4a5260");
    ctx.fillStyle = body;
    ctx.strokeStyle = "#fff1cb";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(76, 118, 79, 54, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#35455c";
    ctx.beginPath(); ctx.arc(115, 145, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#8de4e4";
    ctx.beginPath(); ctx.arc(119, 143, 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#e8d8b4";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(115, 118); ctx.lineTo(115, 78);
    ctx.moveTo(51, 78); ctx.lineTo(180, 78);
    ctx.moveTo(51, 69); ctx.lineTo(180, 69);
    ctx.stroke();
    ctx.fillStyle = "#c6b28d";
    [[52, 72], [179, 72]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.ellipse(x, y, 11, 4, 0, 0, Math.PI * 2); ctx.fill();
    });
    ctx.strokeStyle = "#d7c7a6";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(115, 76); ctx.lineTo(115, 54); ctx.stroke();
    ctx.fillStyle = "#7b6e63";
    ctx.beginPath(); ctx.roundRect(103, 44, 24, 16, 5); ctx.fill();
    ctx.strokeStyle = "#f0dfbb"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = "#f0d99f";
    [[84, 126], [147, 126], [85, 163], [146, 163]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
    });
  }
};
