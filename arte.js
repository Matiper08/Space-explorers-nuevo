// Crea el fondo inicial como textura de Canvas, sin imagenes externas.
window.SpaceArt = {
  createTextures(scene) {
    const key = "moon-valley-sky";
    if (scene.textures.exists(key)) return;

    const width = 1280;
    const height = 720;
    const texture = scene.textures.createCanvas(key, width, height);
    const context = texture.getContext();

    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#11172d");
    sky.addColorStop(0.58, "#353f62");
    sky.addColorStop(1, "#d0bfae");
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);

    const glow = context.createRadialGradient(970, 155, 12, 970, 155, 210);
    glow.addColorStop(0, "rgba(255, 249, 225, 0.22)");
    glow.addColorStop(1, "rgba(255, 249, 225, 0)");
    context.fillStyle = glow;
    context.fillRect(740, 0, 470, 390);

    context.save();
    context.shadowColor = "rgba(168, 205, 255, 0.5)";
    context.shadowBlur = 34;
    const earth = context.createRadialGradient(976, 154, 8, 976, 154, 68);
    earth.addColorStop(0, "#e5f1ef");
    earth.addColorStop(0.48, "#83b7ca");
    earth.addColorStop(1, "#42648d");
    context.fillStyle = earth;
    context.beginPath();
    context.arc(976, 154, 61, 0, Math.PI * 2);
    context.fill();
    context.restore();

    context.globalAlpha = 0.72;
    context.fillStyle = "#ecf4e3";
    for (let i = 0; i < 130; i += 1) {
      const x = (i * 197 + 41) % width;
      const y = (i * 113 + 27) % 390;
      const radius = i % 11 === 0 ? 2 : 1;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;

    context.fillStyle = "#525978";
    context.beginPath();
    context.moveTo(0, 438);
    context.quadraticCurveTo(180, 328, 375, 420);
    context.quadraticCurveTo(555, 493, 760, 394);
    context.quadraticCurveTo(1010, 297, 1280, 420);
    context.lineTo(1280, 720);
    context.lineTo(0, 720);
    context.closePath();
    context.fill();

    const ground = context.createLinearGradient(0, 420, 0, height);
    ground.addColorStop(0, "#8d8a9b");
    ground.addColorStop(0.3, "#65677f");
    ground.addColorStop(1, "#282f49");
    context.fillStyle = ground;
    context.beginPath();
    context.moveTo(0, 533);
    context.quadraticCurveTo(200, 465, 390, 528);
    context.quadraticCurveTo(700, 602, 930, 492);
    context.quadraticCurveTo(1090, 435, 1280, 508);
    context.lineTo(1280, height);
    context.lineTo(0, height);
    context.closePath();
    context.fill();

    const vignette = context.createRadialGradient(640, 350, 270, 640, 350, 790);
    vignette.addColorStop(0, "rgba(6, 9, 21, 0)");
    vignette.addColorStop(1, "rgba(6, 9, 21, 0.48)");
    context.fillStyle = vignette;
    context.fillRect(0, 0, width, height);

    texture.refresh();

    const mark = scene.textures.createCanvas("signal-mark", 96, 96);
    const markContext = mark.getContext();
    const markGlow = markContext.createRadialGradient(48, 48, 2, 48, 48, 43);
    markGlow.addColorStop(0, "#fff3cd");
    markGlow.addColorStop(1, "#e7b974");
    markContext.fillStyle = "#17223a";
    markContext.strokeStyle = "#f0cd98";
    markContext.lineWidth = 2;
    markContext.beginPath();
    markContext.arc(48, 48, 44, 0, Math.PI * 2);
    markContext.fill();
    markContext.stroke();
    markContext.fillStyle = markGlow;
    markContext.beginPath();
    markContext.moveTo(48, 15);
    markContext.lineTo(55, 38);
    markContext.lineTo(79, 48);
    markContext.lineTo(55, 56);
    markContext.lineTo(48, 81);
    markContext.lineTo(40, 56);
    markContext.lineTo(17, 48);
    markContext.lineTo(40, 39);
    markContext.closePath();
    markContext.fill();
    markContext.fillStyle = "#fffdf5";
    markContext.beginPath();
    markContext.arc(48, 48, 7, 0, Math.PI * 2);
    markContext.fill();
    mark.refresh();
  }
};
