// Escenas base: inicio, carga, menu y escenario de expedicion.
(function startSpaceExplorers() {
  const data = window.SpaceData;
  const art = window.SpaceArt.keys;
  const lunar = data.lunarWorld;
  const errorPanel = document.getElementById("startup-error");

  if (!window.Phaser) {
    errorPanel.textContent = data.text.loadError;
    errorPanel.hidden = false;
    return;
  }

  class BootScene extends Phaser.Scene {
    constructor() {
      super("BootScene");
    }

    create() {
      window.SpaceArt.createTextures(this);
      this.scene.start("LoadingScene");
    }
  }

  class LoadingScene extends Phaser.Scene {
    constructor() {
      super("LoadingScene");
    }

    init() {
      this.cameras.main.setBackgroundColor("#0b1020");
      this.add.text(640, 300, data.text.loading, {
        color: "#f6f1e7",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "24px",
        fontStyle: "bold",
        letterSpacing: 4
      }).setOrigin(0.5);
      this.add.text(640, 343, data.text.loadingHint, {
        color: "#aeb8d1",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "20px"
      }).setOrigin(0.5);
      this.spinner = this.add.image(640, 415, art.signal).setDisplaySize(36, 36);
    }

    create() {
      this.tweens.add({
        targets: this.spinner,
        angle: 360,
        duration: 900,
        repeat: -1
      });
      this.time.delayedCall(350, () => this.scene.start("MenuScene"));
    }
  }

  class MenuScene extends Phaser.Scene {
    constructor() {
      super("MenuScene");
    }

    create() {
      this.add.image(0, 0, art.menuBackground).setOrigin(0);
      this.add.rectangle(640, 360, 1280, 720, 0x091020, 0.34);
      this.add.image(640, 162, art.signal).setDisplaySize(64, 64);

      this.add.text(640, 232, data.text.eyebrow, {
        color: "#e7c89b",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "20px",
        fontStyle: "bold",
        letterSpacing: 5
      }).setOrigin(0.5);

      this.add.text(640, 300, data.text.title, {
        color: "#fff8ec",
        fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "64px",
        fontStyle: "bold",
        stroke: "#283047",
        strokeThickness: 4,
        shadow: { color: "#080b17", blur: 18, fill: true, offsetY: 4 }
      }).setOrigin(0.5);

      this.add.text(640, 365, data.text.subtitle, {
        color: "#e4e6ed",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "22px"
      }).setOrigin(0.5);

      const button = this.add.rectangle(640, 470, 330, 68, 0xf0cd98, 1)
        .setStrokeStyle(2, 0xffedcc, 0.9)
        .setInteractive({ useHandCursor: true });
      const buttonLabel = this.add.text(640, 470, data.text.start, {
        color: "#22253a",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "22px",
        fontStyle: "bold",
        letterSpacing: 1
      }).setOrigin(0.5);

      button.on("pointerover", () => button.setFillStyle(0xffdfb1));
      button.on("pointerout", () => button.setFillStyle(0xf0cd98));
      button.on("pointerdown", () => this.beginExpedition());
      buttonLabel.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.beginExpedition());

      this.add.text(640, 526, data.text.startHint, {
        color: "#e4e6ed",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px"
      }).setOrigin(0.5);
      this.add.text(640, 650, data.text.footer, {
        color: "#d0d5e0",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px"
      }).setOrigin(0.5);

      this.input.keyboard.once("keydown-ENTER", () => this.beginExpedition());
      this.input.keyboard.once("keydown-SPACE", () => this.beginExpedition());
    }

    beginExpedition() {
      this.scene.start("ExpeditionScene");
    }
  }

  class ExpeditionScene extends Phaser.Scene {
    constructor() {
      super("ExpeditionScene");
    }

    create() {
      this.parkour = data.config.parkour;
      this.physics.world.gravity.y = this.parkour.gravity;
      this.physics.world.setBounds(0, 0, this.parkour.worldWidth, this.parkour.rescueY);
      this.cameras.main.setBounds(0, 0, this.parkour.worldWidth, 720);
      [
        [art.sky, 0.08, -30],
        [art.farRidge, 0.18, -28],
        [art.middleRidge, 0.32, -26],
        [art.nearRidge, 0.48, -24],
        [art.regolith, 0.64, -22]
      ].forEach(([key, scroll, depth]) => {
        this.add.tileSprite(0, 0, this.parkour.worldWidth, 720, key)
          .setOrigin(0)
          .setScrollFactor(scroll)
          .setDepth(depth);
      });
      this.add.image(640, 360, art.vignette).setScrollFactor(0).setDepth(6);
      this.createPlayer();
      this.createCourse();
      this.createLunarEncounters();
      this.createCompanions();
      this.createHud();
      this.createParticles();

      this.keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        a: Phaser.Input.Keyboard.KeyCodes.A,
        d: Phaser.Input.Keyboard.KeyCodes.D,
        up: Phaser.Input.Keyboard.KeyCodes.UP,
        w: Phaser.Input.Keyboard.KeyCodes.W,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        interact: Phaser.Input.Keyboard.KeyCodes.E,
        enter: Phaser.Input.Keyboard.KeyCodes.ENTER
      });
      this.jumpKeys = [this.keys.up, this.keys.w, this.keys.space];
      this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
      this.cameras.main.setFollowOffset(120, 0);
      this.coyoteTimer = 0;
      this.jumpBufferTimer = 0;
      this.airJumps = 1;
      this.wasGrounded = false;
      this.inLowGravity = false;
      this.inWind = false;
      this.echoStars = 0;
      this.batteries = 3;
      this.checkpointX = 90;
      this.checkpointY = 530;
      this.rescueMessage = null;
      this.completed = false;
      this.playerCelebrateUntil = 0;
      this.tuercaCelebrateUntil = 0;
      this.maiaBlinkUntil = 0;
      this.nextMaiaBlink = 2400;
      this.nearStation = null;
      this.missionCardOpen = false;
      this.lrvDriving = false;
      this.alsepActive = false;
      this.surveyorActive = false;
      this.surveyorSoftLanding = false;
      this.surveyorNightReady = false;
      this.surveyorMaxFallSpeed = 0;
      this.surveyorFadeStarted = 0;
      this.inLrvLowGravity = false;
      this.updateStats();
      this.input.keyboard.on("keydown-ESC", () => this.scene.start("MenuScene"));
      this.input.keyboard.on("keydown-R", () => this.scene.restart());
    }

    createCourse() {
      const worldWidth = this.parkour.worldWidth;
      this.ground = this.physics.add.staticGroup();
      this.platforms = this.physics.add.staticGroup();
      this.fallingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true });
      this.movingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true });
      this.springs = this.physics.add.staticGroup();
      this.echoes = this.physics.add.staticGroup();

      const groundSections = [
        [0, 1050], [1190, 2130], [2260, 3370], [3490, worldWidth - 3490]
      ];
      groundSections.forEach(([x, width]) => {
        const ledge = this.ground.create(x + width / 2, this.parkour.groundY + 28, art.platform);
        ledge.setDisplaySize(width, 92).refreshBody();
        this.add.ellipse(x + width / 2, this.parkour.groundY + 16, width * 0.92, 24, 0x11182a, 0.38);
      });

      [
        [330, 510, 210], [590, 430, 180], [870, 520, 190],
        [1080, 460, 180], [1330, 505, 190], [1570, 450, 180],
        [1810, 510, 160], [1990, 435, 170], [2330, 520, 190],
        [2580, 455, 190], [2830, 390, 180], [3100, 480, 190],
        [3395, 520, 170], [3650, 450, 190], [3910, 390, 180],
        [4170, 495, 190], [4570, 430, 170]
      ].forEach(([x, y, width]) => this.addStaticPlatform(x, y, width));

      this.addFallingPlatform(1460, 370);
      this.addFallingPlatform(3030, 320);
      this.addMovingPlatform(2190, 485, 130, 76, 2300);
      this.addMovingPlatform(3770, 360, 110, 82, 1600);
      this.addSpring(1880, 574);
      this.addSpring(3245, 574);
      this.addWall(2710, 500, 44, 220);
      this.addWall(3990, 440, 44, 300);
      this.addEcho(510, 380);
      this.addEcho(1020, 400);
      this.addEcho(1680, 325);
      this.addEcho(2445, 400);
      this.addEcho(2920, 320);
      this.addEcho(3570, 375);
      this.addEcho(4300, 360);

      this.lowGravityZones = [
        this.addZone(1750, 360, 700, 500, 0x81d9e3, 0.12),
        this.addZone(2580, 330, 620, 550, 0x81d9e3, 0.1)
      ];

      this.checkpoint = this.physics.add.staticImage(2300, 542, art.signal)
        .setDisplaySize(36, 36);
      this.add.text(2300, 500, data.text.parkourCheckpoint, {
        color: "#f7e4ba", fontSize: "18px", fontStyle: "bold",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif"
      }).setOrigin(0.5);
      this.goal = this.physics.add.staticImage(worldWidth - 115, 500, art.signal)
        .setDisplaySize(66, 66);
      this.add.text(worldWidth - 115, 438, data.text.parkourGoal, {
        color: "#fff3ca", fontSize: "22px", fontStyle: "bold",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif"
      }).setOrigin(0.5);

      this.physics.add.collider(this.player, this.ground);
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.player, this.fallingPlatforms, this.touchFallingPlatform, null, this);
      this.physics.add.collider(this.player, this.movingPlatforms);
      this.physics.add.collider(this.player, this.springs, this.bounceOnSpring, null, this);
      this.physics.add.overlap(this.player, this.echoes, this.collectEcho, null, this);
      this.lowGravityZones.forEach((zone) => {
        this.physics.add.overlap(this.player, zone, () => { this.inLowGravity = true; });
      });
      this.physics.add.overlap(this.player, this.checkpoint, this.saveCheckpoint, null, this);
      this.physics.add.overlap(this.player, this.goal, this.finishCourse, null, this);

      this.cameras.main.setRoundPixels(true);
    }

    createLunarEncounters() {
      const machineArt = {
        lm: [art.lunarModule, 220, 275],
        lrv: [art.lunarRover, 270, 153],
        alsep: [art.alsep, 216, 171],
        surveyor: [art.surveyor, 190, 174]
      };
      this.lunarStations = lunar.stations.map((station) => {
        const [texture, width, height] = machineArt[station.id];
        this.add.ellipse(station.x, this.parkour.groundY + 9, width * 0.9, 22, 0x10182c, 0.34)
          .setDepth(1);
        const glow = this.add.image(station.x, station.y - 20, art.signal)
          .setDisplaySize(48, 48)
          .setAlpha(0.42)
          .setDepth(1.2);
        this.tweens.add({ targets: glow, alpha: 0.82, scale: 1.2, duration: 1200, yoyo: true, repeat: -1 });
        this.add.image(station.x, station.y, texture)
          .setDisplaySize(width, height)
          .setDepth(2);
        this.add.text(station.x, station.y - height / 2 - 30, station.title, {
          color: "#fff1ce",
          fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "18px",
          fontStyle: "bold",
          stroke: "#202944",
          strokeThickness: 4
        }).setOrigin(0.5).setDepth(3);
        return { ...station, completed: false };
      });

      [
        [510, 550, 120], [600, 500, 120], [510, 450, 120], [600, 400, 120]
      ].forEach(([x, y, width]) => this.addStaticPlatform(x, y, width));

      this.lrvGates = lunar.stations.find((station) => station.id === "lrv").gates;
      this.lrvGateVisuals = this.lrvGates.map((x) =>
        this.add.circle(x, this.parkour.groundY - 34, 15, 0xf3daa3, 0.3)
          .setStrokeStyle(3, 0xfff0cc, 0.9)
          .setDepth(3)
      );

      [
        [4090, 525, 140], [4190, 465, 140], [4280, 415, 150]
      ].forEach(([x, y, width]) => this.addStaticPlatform(x, y, width));
      this.surveyorPads = this.physics.add.staticGroup();
      const surveyor = lunar.stations.find((station) => station.id === "surveyor");
      this.surveyorPad = this.surveyorPads.create(surveyor.padX, surveyor.padY, art.platform);
      this.surveyorPad.setDisplaySize(190, 30).refreshBody();
      this.physics.add.collider(this.player, this.surveyorPads, this.onSurveyorPad, null, this);
      this.nightShade = this.add.rectangle(surveyor.x + 150, 360, 760, 720, 0x071024, 0)
        .setDepth(2.4);
      this.nightSignal = this.add.image(surveyor.x + 150, 438, art.signal)
        .setDisplaySize(40, 40)
        .setAlpha(0)
        .setDepth(3.2);
    }

    updateNearbyStation() {
      if (this.missionCardOpen || this.lrvDriving || this.alsepActive || this.surveyorActive) return;
      const station = this.lunarStations.find((candidate) => {
        if (candidate.completed) return false;
        const distance = Phaser.Math.Distance.Between(
          this.player.x, this.player.y, candidate.promptX, candidate.promptY
        );
        return distance <= candidate.promptRadius;
      }) || null;
      if (station === this.nearStation) return;
      this.nearStation = station;
      this.statusText.setText(station
        ? `${station.title} — ${lunar.interactionHint}`
        : lunar.hint);
    }

    handleLunarInteraction(time) {
      if (this.missionCardOpen) {
        this.closeMissionCard();
        return;
      }
      if (this.lrvDriving || this.alsepActive) return;

      if (this.surveyorActive) {
        if (this.surveyorNightReady) {
          this.completeLunarStation(this.getStation("surveyor"));
        }
        return;
      }

      const station = this.nearStation;
      if (!station || station.completed) return;
      if (station.id === "lm") {
        const atPlaque = Phaser.Math.Distance.Between(
          this.player.x, this.player.y, station.plaqueX, station.plaqueY
        ) <= 145;
        if (atPlaque) this.completeLunarStation(station);
        else this.showStatus(lunar.challenge.lmTooLow);
      } else if (station.id === "lrv") {
        this.startLrvTrial(station);
      } else if (station.id === "alsep") {
        this.alsepActive = true;
        this.alsepStartedAt = time;
        this.alsepHits = 0;
        this.alsepLastAttempt = -1;
        this.player.body.setVelocity(0, 0);
        this.player.body.setAccelerationX(0);
        this.player.body.setAllowGravity(false);
        this.rhythmPanel.setVisible(true);
        this.rhythmText.setText(lunar.challenge.alsepListen);
        this.statusText.setText(lunar.challenge.alsepListen);
      } else if (station.id === "surveyor") {
        this.surveyorActive = true;
        this.surveyorSoftLanding = false;
        this.surveyorNightReady = false;
        this.surveyorMaxFallSpeed = 0;
        this.surveyorLandingHandled = false;
        this.statusText.setText(lunar.challenge.surveyorLand);
      }
    }

    getStation(id) {
      return this.lunarStations.find((station) => station.id === id);
    }

    startLrvTrial(station) {
      this.lrvDriving = true;
      this.lrvProgress = 0;
      this.lrvVehicle = this.physics.add.sprite(station.startX, this.parkour.groundY - 37, art.lunarRover)
        .setDisplaySize(148, 84)
        .setDepth(5.3);
      this.lrvVehicle.body.setSize(210, 76).setOffset(45, 40);
      this.lrvVehicle.body.setMaxVelocity(250, 750);
      this.lrvVehicle.body.setDragX(700);
      this.physics.add.collider(this.lrvVehicle, this.ground);
      this.physics.add.collider(this.lrvVehicle, this.platforms);
      this.physics.add.overlap(this.lrvVehicle, this.lowGravityZones[0], () => {
        this.inLrvLowGravity = true;
      });
      this.player.setVisible(false);
      this.player.body.enable = false;
      this.tuerca.setVisible(false);
      this.cameras.main.startFollow(this.lrvVehicle, true, 0.12, 0.12);
      this.statusText.setText(lunar.challenge.lrvDrive);
      this.nearStation = station;
    }

    updateLrvTrial(direction, jumpPressed) {
      const body = this.lrvVehicle.body;
      const grounded = body.blocked.down || body.touching.down;
      const gravityScale = this.inLrvLowGravity ? data.config.parkour.lowGravityScale : 1;
      body.setGravityY(data.config.parkour.gravity * (gravityScale - 1));
      body.setAccelerationX(direction * data.config.parkour.acceleration * 0.55);
      body.setDragX(direction === 0 ? 900 : 0);
      if (jumpPressed && grounded) body.setVelocityY(-330);
      this.inLrvLowGravity = false;
      this.lrvVehicle.setAngle(Phaser.Math.Clamp(body.velocity.x * 0.025, -8, 8));

      while (this.lrvProgress < this.lrvGates.length
        && this.lrvVehicle.x >= this.lrvGates[this.lrvProgress]) {
        this.lrvGateVisuals[this.lrvProgress].setFillStyle(0x9fe5d0, 0.9);
        this.sparkles.emitParticleAt(this.lrvVehicle.x, this.lrvVehicle.y - 40, 8);
        this.lrvProgress += 1;
        this.statusText.setText(lunar.challenge.lrvProgress
          .replace("{current}", String(this.lrvProgress))
          .replace("{total}", String(this.lrvGates.length)));
      }
      if (this.lrvVehicle.x >= this.getStation("lrv").finishX) {
        this.completeLunarStation(this.getStation("lrv"));
      }
    }

    updateAlsep(time, jumpPressed) {
      const elapsed = Math.max(0, time - this.alsepStartedAt);
      const beat = Math.floor(elapsed / lunar.settings.alsepBeatMs);
      const phase = (elapsed % lunar.settings.alsepBeatMs) / lunar.settings.alsepBeatMs;
      this.rhythmPointer.setX(470 + phase * 340);
      if (!jumpPressed || beat <= this.alsepLastAttempt) return;

      this.alsepLastAttempt = beat;
      const onPulse = Math.abs(phase - lunar.settings.alsepTargetPhase) <= lunar.settings.alsepWindow;
      if (onPulse) {
        this.alsepHits += 1;
        this.rhythmText.setText(lunar.challenge.alsepProgress
          .replace("{current}", String(this.alsepHits))
          .replace("{total}", String(lunar.settings.alsepRequiredPulses)));
        this.sparkles.emitParticleAt(this.player.x, this.player.y - 24, 8);
        if (this.alsepHits >= lunar.settings.alsepRequiredPulses) {
          this.alsepActive = false;
          this.rhythmPanel.setVisible(false);
          this.completeLunarStation(this.getStation("alsep"));
        }
      } else {
        this.rhythmText.setText(lunar.challenge.alsepMiss);
      }
    }

    onSurveyorPad(player) {
      if (!this.surveyorActive || this.surveyorLandingHandled) return;
      this.surveyorLandingHandled = true;
      if (this.surveyorMaxFallSpeed > lunar.settings.surveyorSafeFallSpeed) {
        this.surveyorMaxFallSpeed = 0;
        this.statusText.setText(lunar.challenge.surveyorRetry);
        return;
      }

      this.surveyorSoftLanding = true;
      this.surveyorFadeStarted = this.time.now;
      this.surveyorMaxFallSpeed = 0;
      this.statusText.setText(lunar.challenge.surveyorFade);
      this.nightSignal.setAlpha(0.76);
      this.tweens.add({
        targets: this.nightShade,
        alpha: 0.55,
        duration: lunar.settings.surveyorNightDelayMs,
        ease: "Sine.inOut",
        onComplete: () => {
          this.surveyorNightReady = true;
          this.statusText.setText(lunar.challenge.surveyorNight);
          this.tweens.add({
            targets: this.nightSignal,
            alpha: 0.18,
            duration: 900,
            yoyo: true,
            repeat: -1
          });
        }
      });
    }

    completeLunarStation(station) {
      if (!station || station.completed) return;
      if (station.id === "lrv") this.endLrvTrial();
      station.completed = true;
      if (station.id === "surveyor") this.surveyorActive = false;
      this.updateStats();
      this.showMissionCard(station);
    }

    endLrvTrial() {
      this.lrvDriving = false;
      this.lrvVehicle.body.enable = false;
      this.lrvVehicle.setVisible(false);
      this.player.body.enable = true;
      this.player.body.setAllowGravity(true);
      this.player.setVisible(true);
      this.player.setPosition(this.lrvVehicle.x + 86, this.parkour.groundY - 46);
      this.player.body.reset(this.player.x, this.player.y);
      this.tuerca.setVisible(true);
      this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    }

    showMissionCard(station) {
      this.missionCardOpen = true;
      this.nearStation = null;
      this.player.body.setVelocity(0, 0);
      this.player.body.setAccelerationX(0);
      this.player.body.setAllowGravity(false);
      this.statusText.setText(lunar.challenge.stationRecovered);

      const layer = this.add.container(0, 0).setScrollFactor(0).setDepth(30);
      this.missionCardLayer = layer;
      layer.add(this.add.rectangle(640, 360, 1280, 720, 0x080d1d, 0.82));
      layer.add(this.add.rectangle(640, 360, 1120, 620, 0x15213a, 0.98)
        .setStrokeStyle(3, 0xe7c89b, 0.95));
      layer.add(this.add.rectangle(640, 360, 1098, 598, 0x101a30, 0.98)
        .setStrokeStyle(1, 0x7890a6, 0.72));
      layer.add(this.add.text(640, 88, lunar.cardTitle, {
        color: "#f0cd98", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "20px", fontStyle: "bold", letterSpacing: 3
      }).setOrigin(0.5));
      layer.add(this.add.text(640, 124, station.title, {
        color: "#fff8ec", fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "30px", fontStyle: "bold", align: "center",
        wordWrap: { width: 1000 }
      }).setOrigin(0.5));

      const fields = [
        ["what", 105, 174, 490],
        ["why", 105, 288, 490],
        ["how", 105, 402, 490],
        ["learned", 665, 174, 500],
        ["today", 665, 314, 500]
      ];
      fields.forEach(([key, x, y, width]) => {
        layer.add(this.add.text(x, y, lunar.cardLabels[key], {
          color: "#9fe5e1", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "18px", fontStyle: "bold", letterSpacing: 1
        }));
        layer.add(this.add.text(x, y + 26, station.card[key], {
          color: "#e5e9f2", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "18px", lineSpacing: 4, wordWrap: { width }
        }));
      });
      layer.add(this.add.text(105, 535, lunar.cardLabels.source, {
        color: "#9fe5e1", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", letterSpacing: 1
      }));
      const sourceLink = this.add.text(105, 562, station.card.source, {
        color: "#f3d9a6", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", wordWrap: { width: 1020 }
      }).setInteractive({ useHandCursor: true });
      sourceLink.on("pointerdown", () => window.open(station.card.source, "_blank", "noopener"));
      layer.add(sourceLink);
      layer.add(this.add.text(640, 625, lunar.cardClose, {
        color: "#fff1ce", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center"
      }).setOrigin(0.5));
    }

    closeMissionCard() {
      this.missionCardOpen = false;
      this.missionCardLayer.destroy(true);
      this.missionCardLayer = null;
      this.player.body.setAllowGravity(true);
      this.statusText.setText(
        this.lunarStations.every((station) => station.completed)
          ? lunar.completedHint
          : lunar.hint
      );
      this.updateNearbyStation();
    }

    addStaticPlatform(x, y, width) {
      const platform = this.platforms.create(x, y, art.platform);
      platform.setDisplaySize(width, 30).refreshBody();
      return platform;
    }

    addFallingPlatform(x, y) {
      const platform = this.fallingPlatforms.create(x, y, art.platform);
      platform.setDisplaySize(170, 28);
      platform.body.setSize(170, 28).setAllowGravity(false).setImmovable(true);
      platform.isFalling = false;
      return platform;
    }

    addMovingPlatform(x, y, width, distance, duration) {
      const platform = this.movingPlatforms.create(x, y, art.platform);
      platform.setDisplaySize(width, 28);
      platform.body.setSize(width, 28).setAllowGravity(false).setImmovable(true);
      this.tweens.add({
        targets: platform,
        y: y - distance,
        duration,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut"
      });
      return platform;
    }

    addSpring(x, y) {
      const spring = this.springs.create(x, y, art.spring);
      spring.setDisplaySize(150, 30).refreshBody();
      return spring;
    }

    addWall(x, y, width, height) {
      const wall = this.platforms.create(x, y, art.platform);
      wall.setDisplaySize(width, height).refreshBody();
      return wall;
    }

    addEcho(x, y) {
      const echo = this.echoes.create(x, y, art.echo);
      echo.setDisplaySize(28, 28).refreshBody();
      this.tweens.add({ targets: echo, y: y - 11, duration: 850, yoyo: true, repeat: -1, ease: "Sine.inOut" });
      return echo;
    }

    addZone(x, y, width, height, color, alpha) {
      this.add.rectangle(x, y, width, height, color, alpha).setStrokeStyle(2, color, 0.36);
      const zone = this.add.zone(x, y, width, height);
      this.physics.add.existing(zone, false);
      zone.body.setAllowGravity(false).setImmovable(true);
      return zone;
    }

    createPlayer() {
      this.player = this.physics.add.sprite(90, 530, art.maiaIdle).setDisplaySize(66, 78);
      this.playerBaseScaleX = this.player.scaleX;
      this.playerBaseScaleY = this.player.scaleY;
      this.player.body.setSize(49, 81).setOffset(23, 16);
      this.player.body.setMaxVelocity(this.parkour.maxSpeed, 1100);
      this.player.body.setDragX(this.parkour.groundFriction);
      this.player.setDepth(5);
    }

    createCompanions() {
      this.tuerca = this.add.sprite(this.player.x - 52, this.player.y + 12, art.tuercaIdle)
        .setDisplaySize(66, 66)
        .setDepth(5.2);
      this.tuercaBaseScaleX = this.tuerca.scaleX;
      this.tuercaBaseScaleY = this.tuerca.scaleY;
      this.grays = this.physics.add.staticGroup();
      [720, 1270, 2510, 4140].forEach((x) => {
        const gray = this.grays.create(x, this.parkour.groundY - 43, art.grayIdle);
        gray.setDisplaySize(52, 52).refreshBody().setDepth(4.5);
        gray.nextBlink = Phaser.Math.Between(1500, 3600);
        gray.blinkUntil = 0;
        gray.isSparked = false;
        this.tweens.add({
          targets: gray,
          scaleY: 0.94,
          duration: Phaser.Math.Between(520, 760),
          yoyo: true,
          repeat: -1,
          ease: "Sine.inOut"
        });
      });
      this.physics.add.overlap(this.player, this.grays, this.stompGray, null, this);
    }

    createHud() {
      const fixedText = {
        color: "#fff8ec",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "19px",
        fontStyle: "bold",
        stroke: "#10172a",
        strokeThickness: 4
      };
      this.add.text(28, 20, data.text.expeditionLabel, {
        ...fixedText, color: "#f0cd98", fontSize: "18px", letterSpacing: 2
      }).setScrollFactor(0).setDepth(10);
      this.add.text(28, 49, lunar.title, {
        ...fixedText, fontFamily: "Georgia, Times New Roman, serif", fontSize: "30px"
      }).setScrollFactor(0).setDepth(10);
      this.statusText = this.add.text(28, 89, lunar.hint, {
        ...fixedText, color: "#d8ddeb", fontSize: "18px", fontStyle: "normal"
      }).setScrollFactor(0).setDepth(10);
      this.statsText = this.add.text(28, 130, "", {
        ...fixedText, color: "#f7e4ba", fontSize: "18px"
      }).setScrollFactor(0).setDepth(10);
      this.helpText = this.add.text(640, 675, data.text.parkourStart, {
        ...fixedText, align: "center", fontSize: "18px", color: "#f1f0eb"
      }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
      this.rhythmPanel = this.add.container(0, 0).setScrollFactor(0).setDepth(12).setVisible(false);
      this.rhythmPanel.add(this.add.rectangle(640, 465, 580, 112, 0x111a31, 0.94)
        .setStrokeStyle(2, 0xb9d8e4, 0.88));
      this.rhythmText = this.add.text(640, 430, "", {
        color: "#fff4d2", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "20px", fontStyle: "bold", align: "center", stroke: "#10172a", strokeThickness: 3
      }).setOrigin(0.5);
      this.rhythmPanel.add(this.rhythmText);
      this.rhythmPanel.add(this.add.rectangle(640, 480, 340, 12, 0x35415d, 1)
        .setStrokeStyle(1, 0x8ea6ba, 0.9));
      this.rhythmPanel.add(this.add.rectangle(640 + (340 * lunar.settings.alsepTargetPhase) - 170, 480, 46, 22, 0xf0cd98, 0.94)
        .setStrokeStyle(2, 0xfff3cf, 1));
      this.rhythmPointer = this.add.circle(470, 480, 9, 0x95e3e1, 1)
        .setStrokeStyle(2, 0xf4ffff, 1);
      this.rhythmPanel.add(this.rhythmPointer);
    }

    createParticles() {
      this.dust = this.add.particles(0, 0, art.dust, {
        speed: { min: 45, max: 170 },
        angle: { min: 205, max: 335 },
        scale: { start: 0.9, end: 0 },
        alpha: { start: 0.7, end: 0 },
        lifespan: 400,
        gravityY: 210,
        quantity: 0,
        emitting: false,
        tint: [0xf8e8bd, 0x9fcee0, 0xffffff]
      });
      this.sparkles = this.add.particles(0, 0, art.dust, {
        speed: { min: 50, max: 190 },
        angle: { min: 0, max: 360 },
        scale: { start: 1.1, end: 0 },
        alpha: { start: 0.95, end: 0 },
        lifespan: 550,
        quantity: 0,
        emitting: false,
        tint: [0xffe6a4, 0x9fe5eb, 0xffffff]
      });
      this.colorSparks = this.add.particles(0, 0, art.dust, {
        speed: { min: 70, max: 230 },
        angle: { min: 0, max: 360 },
        scale: { start: 1.5, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 750,
        quantity: 0,
        emitting: false,
        tint: [0xff9f86, 0xffd66e, 0x92e4c2, 0x9fc8ff, 0xe7a9ff]
      });
      this.ambientDust = this.add.particles(0, 0, art.dust, {
        speedX: { min: -13, max: 13 },
        speedY: { min: -12, max: 3 },
        scale: { min: 0.25, max: 0.65 },
        alpha: { start: 0.38, end: 0 },
        lifespan: 5000,
        frequency: 110,
        maxParticles: 54,
        tint: [0xe8edfa, 0xf6dcae],
        emitZone: {
          type: "random",
          source: new Phaser.Geom.Rectangle(0, 0, this.parkour.worldWidth, 720)
        }
      });
    }

    stompGray(player, gray) {
      if (!gray.active || gray.isSparked) return;
      const landingOnTop = player.body.velocity.y > 55
        && player.y < gray.y - 10;
      if (!landingOnTop) return;

      gray.isSparked = true;
      gray.body.enable = false;
      gray.setTexture(art.grayAwake);
      player.body.setVelocityY(-330);
      this.airJumps = 1;
      this.playerCelebrateUntil = this.time.now + 420;
      this.tuercaCelebrateUntil = this.time.now + 620;
      this.colorSparks.emitParticleAt(gray.x, gray.y, 22);
      this.tweens.add({
        targets: gray,
        scale: 1.8,
        alpha: 0,
        duration: 360,
        ease: "Cubic.out",
        onComplete: () => gray.destroy()
      });
    }

    touchFallingPlatform(player, platform) {
      if (!platform.isFalling && player.body.velocity.y >= 0) {
        platform.isFalling = true;
        platform.body.setImmovable(false).setAllowGravity(true);
        this.time.delayedCall(1100, () => {
          if (platform.active) platform.destroy();
        });
      }
    }

    bounceOnSpring(player) {
      if (player.body.velocity.y >= -100) {
        player.body.setVelocityY(-this.parkour.trampolineVelocity);
        this.airJumps = 1;
        this.dust.emitParticleAt(player.x, player.y + 24, 12);
        this.cameras.main.shake(110, 0.002);
      }
    }

    collectEcho(player, echo) {
      echo.destroy();
      this.echoStars += 1;
      this.sparkles.emitParticleAt(player.x, player.y, 14);
      this.updateStats();
    }

    saveCheckpoint() {
      if (this.checkpointX !== 2300) {
        this.checkpointX = 2300;
        this.checkpointY = 510;
        this.checkpoint.setTint(0xb5f2e7);
        this.showStatus(data.text.parkourCheckpoint);
      }
    }

    finishCourse() {
      if (this.completed) return;
      this.completed = true;
      this.playerCelebrateUntil = Number.POSITIVE_INFINITY;
      this.tuercaCelebrateUntil = Number.POSITIVE_INFINITY;
      this.player.setTexture(art.maiaCelebrate).setAngle(0);
      this.tuerca.setTexture(art.tuercaCelebrate);
      this.player.body.setVelocity(0, 0);
      this.showStatus(data.text.parkourFinish);
      this.sparkles.emitParticleAt(this.goal.x, this.goal.y, 36);
    }

    showStatus(message) {
      this.statusText.setText(message);
      if (this.rescueMessage) this.rescueMessage.remove(false);
      this.rescueMessage = this.time.delayedCall(2800, () => {
        if (!this.completed) this.statusText.setText(lunar.hint);
      });
    }

    updateStats() {
      const missions = this.lunarStations.filter((station) => station.completed).length;
      this.statsText.setText(
        `${data.text.parkourStars}: ${this.echoStars}     ${data.text.parkourBatteries}: ${"●".repeat(this.batteries)}${"○".repeat(3 - this.batteries)}     ${lunar.progressLabel}: ${missions}/${this.lunarStations.length}`
      );
    }

    rescuePlayer() {
      this.batteries = Math.max(0, this.batteries - 1);
      this.updateStats();
      this.player.setPosition(this.checkpointX, this.checkpointY);
      this.player.body.reset(this.checkpointX, this.checkpointY);
      this.player.body.setVelocity(0, 0);
      this.airJumps = 1;
      this.playerCelebrateUntil = this.time.now + 600;
      this.tuercaCelebrateUntil = this.time.now + 750;
      this.showStatus(data.text.parkourRescue);
      this.sparkles.emitParticleAt(this.checkpointX, this.checkpointY, 12);
    }

    updateCharacterArt(time, grounded, direction) {
      const body = this.player.body;
      let maiaKey = art.maiaIdle;
      if (time < this.playerCelebrateUntil) {
        maiaKey = art.maiaCelebrate;
      } else if (!grounded && body.velocity.y < -75) {
        maiaKey = art.maiaJump;
      } else if (!grounded && body.velocity.y > 85) {
        maiaKey = art.maiaFall;
      } else if (grounded && Math.abs(body.velocity.x) > 30) {
        maiaKey = Math.floor(time / 115) % 2 === 0 ? art.maiaWalkA : art.maiaWalkB;
      } else if (time < this.maiaBlinkUntil) {
        maiaKey = art.maiaBlink;
      } else if (time >= this.nextMaiaBlink) {
        this.maiaBlinkUntil = time + 130;
        this.nextMaiaBlink = time + Phaser.Math.Between(2100, 3600);
        maiaKey = art.maiaBlink;
      }
      if (this.player.texture.key !== maiaKey) this.player.setTexture(maiaKey);

      let tuercaKey = art.tuercaIdle;
      if (time < this.tuercaCelebrateUntil) {
        tuercaKey = art.tuercaCelebrate;
      } else if (!grounded && body.velocity.y < -70) {
        tuercaKey = art.tuercaHop;
      } else if (!grounded && body.velocity.y > 90) {
        tuercaKey = art.tuercaFall;
      } else if (grounded && Math.abs(body.velocity.x) > 24) {
        tuercaKey = Math.floor(time / 145) % 2 === 0 ? art.tuercaRollA : art.tuercaRollB;
      }
      if (this.tuerca.texture.key !== tuercaKey) this.tuerca.setTexture(tuercaKey);
      const facing = direction === 0 ? (body.velocity.x < 0 ? -1 : 1) : direction;
      this.tuerca.setPosition(
        this.player.x - facing * 48,
        this.player.y + 13 + Math.sin(time * 0.005) * 2
      );
      this.tuerca.setAngle(grounded ? Phaser.Math.Clamp(body.velocity.x * 0.12, -9, 9) : 0);

      this.grays.children.iterate((gray) => {
        if (!gray || !gray.active || gray.isSparked) return;
        if (time >= gray.nextBlink) {
          gray.setTexture(art.grayBlink);
          gray.blinkUntil = time + 140;
          gray.nextBlink = time + Phaser.Math.Between(1900, 3400);
        } else if (gray.texture.key === art.grayBlink && time >= gray.blinkUntil) {
          gray.setTexture(art.grayIdle);
        }
      });
    }

    update(time, delta) {
      if (!this.player || this.completed) return;
      const dt = Math.min(delta / 1000, 0.04);
      const body = this.player.body;
      const grounded = body.blocked.down || body.touching.down;
      const left = this.keys.left.isDown || this.keys.a.isDown;
      const right = this.keys.right.isDown || this.keys.d.isDown;
      const direction = Number(right) - Number(left);
      const jumpPressed = this.jumpKeys.some((key) => Phaser.Input.Keyboard.JustDown(key));
      const jumpHeld = this.jumpKeys.some((key) => key.isDown);
      const interactPressed = Phaser.Input.Keyboard.JustDown(this.keys.interact)
        || Phaser.Input.Keyboard.JustDown(this.keys.enter);

      if (this.missionCardOpen) {
        if (interactPressed) this.closeMissionCard();
        return;
      }

      this.updateNearbyStation();
      if (interactPressed) this.handleLunarInteraction(time);
      if (this.missionCardOpen) return;
      if (this.lrvDriving) {
        this.updateLrvTrial(direction, jumpPressed);
        return;
      }
      if (this.alsepActive) {
        this.updateAlsep(time, jumpPressed);
        return;
      }

      if (this.surveyorActive && !grounded && body.velocity.y < 0) {
        this.surveyorLandingHandled = false;
      }
      if (this.surveyorActive && !grounded && body.velocity.y > 0) {
        if (jumpHeld) body.setVelocityY(Math.min(body.velocity.y, 160));
        this.surveyorMaxFallSpeed = Math.max(this.surveyorMaxFallSpeed, body.velocity.y);
      }

      if (grounded) {
        this.coyoteTimer = this.parkour.coyoteTime;
        this.airJumps = 1;
      } else {
        this.coyoteTimer = Math.max(0, this.coyoteTimer - dt);
      }
      if (jumpPressed) this.jumpBufferTimer = this.parkour.jumpBuffer;
      else this.jumpBufferTimer = Math.max(0, this.jumpBufferTimer - dt);

      const wallSide = body.blocked.left || body.touching.left ? -1
        : body.blocked.right || body.touching.right ? 1 : 0;
      const wallSliding = !grounded && wallSide !== 0 && body.velocity.y > 0;
      const control = grounded ? 1 : this.parkour.airControl;
      body.setAccelerationX(direction * this.parkour.acceleration * control);
      body.setDragX(direction === 0
        ? (grounded ? this.parkour.groundFriction : this.parkour.groundFriction * 0.16)
        : 0);
      if (wallSliding) body.setVelocityY(Math.min(body.velocity.y, 170));
      if (this.inWind) body.setAccelerationX(body.acceleration.x + 110);

      const atApex = Math.abs(body.velocity.y) < 105;
      const gravityScale = (this.inLowGravity ? this.parkour.lowGravityScale : 1)
        * (atApex ? this.parkour.apexGravityScale : 1);
      body.setGravityY(this.parkour.gravity * (gravityScale - 1));

      if (this.jumpBufferTimer > 0) {
        if (grounded || this.coyoteTimer > 0) {
          body.setVelocityY(-this.parkour.jumpVelocity);
          this.jumpBufferTimer = 0;
          this.coyoteTimer = 0;
          this.wasGrounded = false;
        } else if (wallSliding) {
          body.setVelocity(this.parkour.wallJumpVelocityX * wallSide, -this.parkour.wallJumpVelocityY);
          this.jumpBufferTimer = 0;
          this.airJumps = 1;
          this.wasGrounded = false;
          this.sparkles.emitParticleAt(this.player.x, this.player.y, 8);
        } else if (this.airJumps > 0) {
          body.setVelocityY(-this.parkour.doubleJumpVelocity);
          this.airJumps -= 1;
          this.jumpBufferTimer = 0;
          this.sparkles.emitParticleAt(this.player.x, this.player.y, 10);
        }
      }

      if (this.wasJumpHeld && !jumpHeld && body.velocity.y < -150) {
        body.setVelocityY(body.velocity.y * 0.52);
      }
      this.wasJumpHeld = jumpHeld;
      this.inLowGravity = false;
      this.inWind = false;
      this.cameras.main.setFollowOffset(direction < 0 ? -90 : 120, 0);

      if (grounded && !this.wasGrounded) {
        this.dust.emitParticleAt(this.player.x, this.player.y + 24, 9);
        this.cameras.main.shake(75, 0.001);
        if (!this.playerLandingTweenActive) {
          this.playerLandingTweenActive = true;
          this.tweens.add({
            targets: this.player,
            scaleX: this.playerBaseScaleX * 0.82,
            scaleY: this.playerBaseScaleY * 1.13,
            duration: 75,
            yoyo: true,
            ease: "Quad.out",
            onComplete: () => {
              this.player.setScale(this.playerBaseScaleX, this.playerBaseScaleY);
              this.playerLandingTweenActive = false;
            }
          });
        }
        if (!this.tuercaLandingTweenActive) {
          this.tuercaLandingTweenActive = true;
          this.tweens.add({
            targets: this.tuerca,
            scaleX: this.tuercaBaseScaleX * 0.86,
            scaleY: this.tuercaBaseScaleY * 1.12,
            duration: 85,
            yoyo: true,
            ease: "Quad.out",
            onComplete: () => {
              this.tuerca.setScale(this.tuercaBaseScaleX, this.tuercaBaseScaleY);
              this.tuercaLandingTweenActive = false;
            }
          });
        }
      }
      this.wasGrounded = grounded;
      this.player.setAngle(Phaser.Math.Clamp(body.velocity.x * 0.018, -7, 7));
      this.updateCharacterArt(time, grounded, direction);

      if (this.player.y > this.parkour.rescueY - 30) this.rescuePlayer();
      if (this.surveyorActive && this.surveyorSoftLanding && !this.surveyorNightReady
        && time - this.surveyorFadeStarted >= lunar.settings.surveyorNightDelayMs) {
        this.surveyorNightReady = true;
        this.statusText.setText(lunar.challenge.surveyorNight);
      }
    }
  }

  const sceneTypes = {
    BootScene,
    LoadingScene,
    MenuScene,
    ExpeditionScene
  };
  const config = {
    ...data.config,
    type: Phaser.AUTO,
    scene: data.config.scene.map((name) => sceneTypes[name]),
    scale: {
      ...data.config.scale,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };

  try {
    new Phaser.Game(config);
  } catch (error) {
    console.error("Space Explorers failed to initialize:", error);
    errorPanel.textContent = data.text.signalError;
    errorPanel.hidden = false;
  }
}());
