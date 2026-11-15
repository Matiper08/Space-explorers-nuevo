// Escenas base: inicio, carga, menu y escenario de expedicion.
(function startSpaceExplorers() {
  const data = window.SpaceData;
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
      this.spinner = this.add.image(640, 415, "signal-mark").setDisplaySize(36, 36);
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
      this.add.image(0, 0, "moon-valley-sky").setOrigin(0);
      this.add.rectangle(640, 360, 1280, 720, 0x091020, 0.34);
      this.add.image(640, 162, "signal-mark").setDisplaySize(64, 64);

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
      this.add.image(0, 0, "moon-valley-sky").setOrigin(0);
      this.add.rectangle(640, 360, 1280, 720, 0x0b1020, 0.28);
      this.add.text(72, 58, data.text.expeditionLabel, {
        color: "#f0cd98",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "20px",
        fontStyle: "bold",
        letterSpacing: 3
      });
      this.add.text(72, 98, data.text.expeditionTitle, {
        color: "#fff8ec",
        fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "48px",
        fontStyle: "bold"
      });
      this.add.text(72, 166, data.text.expeditionCopy, {
        color: "#f1f0eb",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "22px",
        lineSpacing: 10,
        wordWrap: { width: 620 }
      });

      this.add.ellipse(920, 552, 440, 38, 0x171d32, 0.54);
      this.add.rectangle(0, 586, 1280, 134, 0x171d32, 0.54).setOrigin(0);
      this.add.rectangle(880, 500, 226, 220, 0x28324b, 0.9)
        .setStrokeStyle(2, 0xe7c89b, 0.82);
      this.add.circle(880, 365, 34, 0x8db5cb, 1)
        .setStrokeStyle(3, 0xd8eff2, 0.9);
      this.add.circle(880, 365, 11, 0xf8e8bd, 1);
      this.add.text(880, 435, data.text.stationLabel, {
        color: "#f0cd98",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px",
        fontStyle: "bold",
        letterSpacing: 2
      }).setOrigin(0.5);
      this.add.text(880, 468, data.text.stationTitle, {
        color: "#fff8ec",
        fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "26px"
      }).setOrigin(0.5);
      this.add.text(880, 510, data.text.stationCopy, {
        color: "#d8ddeb",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px",
        align: "center",
        lineSpacing: 4,
        wordWrap: { width: 205 }
      }).setOrigin(0.5, 0);
      this.add.text(640, 665, data.text.controls, {
        color: "#f1f0eb",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px",
        fontStyle: "bold"
      }).setOrigin(0.5);

      this.input.keyboard.once("keydown-ESC", () => this.scene.start("MenuScene"));
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
