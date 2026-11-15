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
    surveyor: "surveyor-3-lander"
  },

  createTextures(scene) {
    const keys = this.keys;
    this.createCanvas(scene, keys.sky, 1280, 720, this.drawSky);
    this.createCanvas(scene, keys.farRidge, 1280, 720, (ctx) => this.drawRidge(ctx, 0));
    this.createCanvas(scene, keys.middleRidge, 1280, 720, (ctx) => this.drawRidge(ctx, 1));
    this.createCanvas(scene, keys.nearRidge, 1280, 720, (ctx) => this.drawRidge(ctx, 2));
    this.createCanvas(scene, keys.regolith, 1280, 720, this.drawRegolith);
    this.createCanvas(scene, keys.vignette, 1280, 720, this.drawVignette);
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
  }
};
