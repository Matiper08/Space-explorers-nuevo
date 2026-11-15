// Created with AI assistance (Claude, GitHub Copilot)
// Escenas base: inicio, carga, menu y escenario de expedicion.
(function startSpaceExplorers() {
  const data = window.SpaceData;
  const art = window.SpaceArt.keys;
  const worldData = (worldId) => {
    if (worldId === "mars") return data.marsWorld;
    if (worldId === "deep") return data.deepSpaceWorld;
    return data.lunarWorld;
  };
  let lunar = data.lunarWorld;
  const errorPanel = document.getElementById("startup-error");
  const journalStorageKey = "space-explorers-ecoscope-journal";
  const languageStorageKey = "space-explorers-language";
  const allStations = () => [
    ...data.lunarWorld.stations,
    ...data.marsWorld.stations,
    ...data.deepSpaceWorld.stations
  ];
  const stationIds = allStations().map((station) => station.id);
  let journalIds = [];
  let languageStorageFailed = false;
  const introShownWorlds = new Set();
  let selectedWorldId = "moon";

  try {
    if (window.localStorage.getItem(languageStorageKey) === "es") data.setLanguage("es");
  } catch (error) {
    console.error("Could not read the saved language preference:", error);
    languageStorageFailed = true;
  }
  lunar = data.lunarWorld;

  try {
    const storedJournal = window.localStorage.getItem(journalStorageKey);
    if (storedJournal) {
      let parsedJournal;
      try {
        parsedJournal = JSON.parse(storedJournal);
      } catch (error) {
        console.error("The saved Ecoscope Journal is not valid JSON:", error);
        parsedJournal = [];
      }
      if (Array.isArray(parsedJournal)) {
        const validJournal = parsedJournal.filter((id) => stationIds.includes(id));
        if (validJournal.length !== parsedJournal.length) {
          console.error("The saved Ecoscope Journal contains unknown mission IDs.");
        }
        journalIds = [...new Set(validJournal)];
      } else {
        console.error("The saved Ecoscope Journal must be a list of mission IDs.");
      }
    }
  } catch (error) {
    console.error("Could not read the saved Ecoscope Journal:", error);
  }

  document.documentElement.lang = data.language;
  document.title = data.text.pageTitle;
  document.getElementById("page-description").content = data.text.pageDescription;
  document.getElementById("page-caption").textContent = data.text.footer;
  document.getElementById("game-container").setAttribute("aria-label", data.text.gameLabel);

  function applyLanguage(language) {
    data.setLanguage(language);
    lunar = worldData(selectedWorldId);
    document.documentElement.lang = language;
    document.title = data.text.pageTitle;
    document.getElementById("page-description").content = data.text.pageDescription;
    document.getElementById("page-caption").textContent = data.text.footer;
    document.getElementById("game-container").setAttribute("aria-label", data.text.gameLabel);
    try {
      window.localStorage.setItem(languageStorageKey, language);
      languageStorageFailed = false;
      return true;
    } catch (error) {
      console.error("Could not save the language preference:", error);
      languageStorageFailed = true;
      return false;
    }
  }

  function saveJournalEntry(stationId) {
    if (!stationIds.includes(stationId)) {
      throw new RangeError(`Unknown Ecoscope Journal entry: ${stationId}`);
    }
    if (!journalIds.includes(stationId)) journalIds.push(stationId);
    try {
      window.localStorage.setItem(journalStorageKey, JSON.stringify(journalIds));
      return true;
    } catch (error) {
      console.error("Could not save the mission card to the Ecoscope Journal:", error);
      return false;
    }
  }

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
      this.input.keyboard.once("keydown-ESC", () => this.scene.start("MenuScene"));
      this.time.delayedCall(350, () => this.scene.start("MenuScene"));
    }
  }

  class MenuScene extends Phaser.Scene {
    constructor() {
      super("MenuScene");
    }

    create() {
      const menuBackground = selectedWorldId === "mars" ? art.marsMenuBackground
        : selectedWorldId === "deep" ? art.deepMenuBackground : art.menuBackground;
      this.add.image(0, 0, menuBackground).setOrigin(0);
      this.add.rectangle(640, 360, 1280, 720, 0x091020, 0.26);
      this.add.image(640, 162, art.signal).setDisplaySize(64, 64);

      this.add.text(640, 232, data.text.eyebrow, {
        color: "#82f2ff",
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

      const languageButton = this.add.rectangle(1150, 42, 200, 42, 0x10213e, 0.34)
        .setStrokeStyle(2, 0x72e9ff, 0.56)
        .setInteractive({ useHandCursor: true });
      this.add.text(1150, 42, data.text.languageButton, {
        color: "#fff1ce",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px",
        fontStyle: "bold"
      }).setOrigin(0.5);
      languageButton.on("pointerdown", () => this.toggleLanguage());

      const creditsButton = this.add.rectangle(1150, 94, 180, 40, 0x10213e, 0.34)
        .setStrokeStyle(2, 0x72e9ff, 0.56)
        .setInteractive({ useHandCursor: true });
      const creditsLabel = this.add.text(1150, 94, data.text.creditsButton, {
        color: "#fff1ce",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px",
        fontStyle: "bold"
      }).setOrigin(0.5);
      creditsButton.on("pointerdown", () => this.openCredits());
      creditsLabel.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.openCredits());

      const button = this.add.rectangle(640, 428, 320, 56, 0x1b819b, 0.38)
        .setStrokeStyle(2, 0x91f5ff, 0.82)
        .setInteractive({ useHandCursor: true });
      const buttonLabel = this.add.text(640, 428, data.text.start, {
        color: "#f5fcff",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "22px",
        fontStyle: "bold",
        letterSpacing: 1
      }).setOrigin(0.5);

      button.on("pointerover", () => button.setFillStyle(0x1b819b, 0.54));
      button.on("pointerout", () => button.setFillStyle(0x1b819b, 0.38));
      button.on("pointerdown", () => this.beginExpedition());
      buttonLabel.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.beginExpedition());

      this.add.text(640, 469, data.text.startHint, {
        color: "#e4e6ed",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px"
      }).setOrigin(0.5);

      const worldButton = this.add.rectangle(640, 520, 400, 44, 0x44234f, 0.36)
        .setStrokeStyle(2, 0xd780ff, 0.66)
        .setInteractive({ useHandCursor: true });
      this.worldButtonLabel = this.add.text(640, 520, "", {
        color: "#f3e4ff",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px",
        fontStyle: "bold",
        align: "center"
      }).setOrigin(0.5);
      worldButton.on("pointerdown", () => this.openSystemMap());
      this.worldButtonLabel.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.openSystemMap());
      this.updateWorldButton();

      const journalButton = this.add.rectangle(640, 580, 460, 50, 0x153d59, 0.36)
        .setStrokeStyle(2, 0x6fe7ff, 0.64)
        .setInteractive({ useHandCursor: true });
      const journalLabel = this.add.text(640, 580, data.text.journalButton, {
        color: "#e9fbff",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px",
        fontStyle: "bold",
        align: "center",
        wordWrap: { width: 460 }
      }).setOrigin(0.5);
      journalButton.on("pointerover", () => journalButton.setFillStyle(0x17617a, 0.52));
      journalButton.on("pointerout", () => journalButton.setFillStyle(0x153d59, 0.36));
      journalButton.on("pointerdown", () => this.openJournal());
      journalLabel.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.openJournal());

      this.add.text(640, 674, data.text.footer, {
        color: "#d0d5e0",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px"
      }).setOrigin(0.5);
      if (languageStorageFailed) {
        this.add.text(640, 632, data.text.languageStorageError, {
          color: "#f0c6a8", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "18px", align: "center", wordWrap: { width: 1100 }
        }).setOrigin(0.5);
      }

      this.input.keyboard.once("keydown-ENTER", () => this.beginExpedition());
      this.input.keyboard.once("keydown-SPACE", () => this.beginExpedition());
      this.creditsKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
      this.languageKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(this.languageKey)) this.toggleLanguage();
      if (Phaser.Input.Keyboard.JustDown(this.creditsKey)) this.openCredits();
    }

    beginExpedition() {
      this.scene.start("ExpeditionScene", { worldId: selectedWorldId });
    }

    openJournal() {
      this.scene.start("JournalScene");
    }

    openSystemMap() {
      this.scene.start("SystemMapScene");
    }

    openCredits() {
      this.scene.start("CreditsScene");
    }

    toggleLanguage() {
      applyLanguage(data.language === "en" ? "es" : "en");
      this.scene.restart();
    }

    updateWorldButton() {
      const worldLabel = selectedWorldId === "mars" ? data.text.worldMars
        : selectedWorldId === "deep" ? data.text.worldDeep : data.text.worldMoon;
      this.worldButtonLabel.setText(data.text.worldButton.replace("{world}", worldLabel));
    }

  }

  class SystemMapScene extends Phaser.Scene {
    constructor() {
      super("SystemMapScene");
    }

    create() {
      this.add.image(0, 0, art.deepMenuBackground).setOrigin(0);
      this.add.rectangle(640, 360, 1280, 720, 0x091020, 0.36);
      this.add.text(640, 82, data.text.mapTitle, {
        color: "#fff8ec", fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "38px", fontStyle: "bold", align: "center",
        wordWrap: { width: 1060 }
      }).setOrigin(0.5);
      this.add.text(640, 132, data.text.mapSubtitle, {
        color: "#e5e9f2", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "20px", align: "center"
      }).setOrigin(0.5);
      this.add.text(640, 176, data.text.mapScaleNote, {
        color: "#f0cd98", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", letterSpacing: 2, align: "center"
      }).setOrigin(0.5);

      const orbitLines = this.add.graphics().setDepth(1);
      orbitLines.lineStyle(2, 0xa8bdd8, 0.32);
      orbitLines.strokeEllipse(205, 368, 440, 230);
      orbitLines.strokeEllipse(205, 368, 760, 390);
      orbitLines.strokeEllipse(205, 368, 1110, 560);
      this.add.circle(205, 368, 62, 0xf0cd98, 0.12).setDepth(1);
      this.add.circle(205, 368, 42, 0xffd787, 1).setStrokeStyle(3, 0xfff0c4, 0.95)
        .setDepth(2);
      this.add.circle(191, 353, 11, 0xfff6d8, 0.82).setDepth(3);

      const worlds = [
        { id: "moon", x: 470, y: 330, color: 0x55caff, description: data.text.mapMoonDescription },
        { id: "mars", x: 735, y: 430, color: 0xff654b, description: data.text.mapMarsDescription },
        { id: "deep", x: 1040, y: 305, color: 0xc46bff, description: data.text.mapDeepDescription }
      ];
      this.worldNodes = worlds.map((world, index) => {
        const halo = this.add.circle(world.x, world.y, 74, world.color, 0.12).setDepth(2);
        const body = this.add.circle(world.x, world.y, 48, world.color, 1)
          .setStrokeStyle(3, 0xe9e9f3, 0.82)
          .setInteractive({ useHandCursor: true })
          .setDepth(3);
        this.add.circle(world.x - 14, world.y - 15, 13, 0xffffff, 0.28).setDepth(4);
        const ring = this.add.circle(world.x, world.y, 62, 0x000000, 0)
          .setStrokeStyle(4, 0xf0cd98, 0.96)
          .setDepth(4);
        const worldLabel = world.id === "moon" ? data.text.worldMoon
          : world.id === "mars" ? data.text.worldMars : data.text.worldDeep;
        const label = this.add.text(world.x, world.y + 82, worldLabel, {
          color: "#fff8ec", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "22px", fontStyle: "bold", align: "center",
          wordWrap: { width: 250 }
        }).setOrigin(0.5).setDepth(4);
        const description = this.add.text(world.x, world.y + 112, world.description, {
          color: "#d8ddeb", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "18px", align: "center"
        }).setOrigin(0.5).setDepth(4);
        const node = { world, halo, body, ring, label, description };
        const select = () => this.selectWorld(world.id);
        body.on("pointerdown", select);
        label.setInteractive({ useHandCursor: true }).on("pointerdown", select);
        body.on("pointerover", () => this.setSelectedIndex(index));
        return node;
      });
      this.selectedIndex = Math.max(0, worlds.findIndex((world) => world.id === selectedWorldId));
      this.setSelectedIndex(this.selectedIndex);

      this.add.text(640, 585, data.text.mapSelectHint, {
        color: "#e5e9f2", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", align: "center", wordWrap: { width: 1100 }
      }).setOrigin(0.5);
      const backButton = this.add.rectangle(640, 654, 320, 46, 0x153d59, 0.36)
        .setStrokeStyle(2, 0x6fe7ff, 0.62)
        .setInteractive({ useHandCursor: true });
      const backLabel = this.add.text(640, 654, data.text.mapBack, {
        color: "#f6f1e7", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center"
      }).setOrigin(0.5);
      backButton.on("pointerdown", () => this.scene.start("MenuScene"));
      backLabel.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.scene.start("MenuScene"));

      this.languageButton = this.add.rectangle(1150, 42, 200, 40, 0x10213e, 0.34)
        .setStrokeStyle(2, 0x72e9ff, 0.54)
        .setInteractive({ useHandCursor: true });
      this.add.text(1150, 42, data.text.languageButton, {
        color: "#fff1ce", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold"
      }).setOrigin(0.5);
      this.languageButton.on("pointerdown", () => this.toggleLanguage());
      this.mapKeys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        escape: Phaser.Input.Keyboard.KeyCodes.ESC,
        language: Phaser.Input.Keyboard.KeyCodes.L
      });
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(this.mapKeys.left)) this.setSelectedIndex(this.selectedIndex - 1);
      if (Phaser.Input.Keyboard.JustDown(this.mapKeys.right)) this.setSelectedIndex(this.selectedIndex + 1);
      if (Phaser.Input.Keyboard.JustDown(this.mapKeys.enter)) {
        this.selectWorld(this.worldNodes[this.selectedIndex].world.id);
      }
      if (Phaser.Input.Keyboard.JustDown(this.mapKeys.escape)) this.scene.start("MenuScene");
      if (Phaser.Input.Keyboard.JustDown(this.mapKeys.language)) this.toggleLanguage();
    }

    setSelectedIndex(index) {
      this.selectedIndex = Phaser.Math.Wrap(index, 0, this.worldNodes.length);
      this.worldNodes.forEach((node, nodeIndex) => {
        const selected = nodeIndex === this.selectedIndex;
        node.ring.setVisible(selected);
        node.halo.setAlpha(selected ? 0.24 : 0.12);
        node.body.setScale(selected ? 1.08 : 1);
      });
    }

    selectWorld(worldId) {
      selectedWorldId = worldId;
      this.scene.start("MenuScene");
    }

    toggleLanguage() {
      applyLanguage(data.language === "en" ? "es" : "en");
      this.scene.restart();
    }
  }

  class CreditsScene extends Phaser.Scene {
    constructor() {
      super("CreditsScene");
    }

    create() {
      this.add.image(0, 0, art.deepMenuBackground).setOrigin(0);
      this.add.rectangle(640, 360, 1280, 720, 0x091020, 0.36);
      this.add.text(640, 48, data.text.creditsTitle, {
        color: "#fff8ec", fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "32px", fontStyle: "bold", align: "center",
        wordWrap: { width: 940 }
      }).setOrigin(0.5);
      this.add.text(640, 90, data.text.creditsInstructions, {
        color: "#e5e9f2", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", align: "center", wordWrap: { width: 900 }
      }).setOrigin(0.5);

      const columns = [
        { title: data.text.worldMoon, stations: data.lunarWorld.stations },
        { title: data.text.worldMars, stations: data.marsWorld.stations },
        { title: data.text.worldDeep, stations: data.deepSpaceWorld.stations }
      ];
      const centers = [220, 640, 1060];
      columns.forEach((column, columnIndex) => {
        const centerX = centers[columnIndex];
        this.add.rectangle(centerX, 380, 390, 470, 0x111a30, 0.38)
          .setStrokeStyle(2, 0x8298b1, 0.82);
        this.add.text(centerX, 157, column.title, {
          color: "#f0cd98", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "20px", fontStyle: "bold", align: "center",
          wordWrap: { width: 350 }
        }).setOrigin(0.5);
        column.stations.forEach((station, stationIndex) => {
          const x = centerX - 174;
          const y = 184 + stationIndex * 83;
          this.add.text(x, y, station.title, {
            color: "#fff8ec", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
            fontSize: "18px", fontStyle: "bold", wordWrap: { width: 348 }
          });
          const sourceLink = this.add.text(x, y + 44, data.text.creditsOpenSource, {
            color: "#9fe5e1", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
            fontSize: "18px", fontStyle: "bold"
          }).setInteractive({ useHandCursor: true });
          sourceLink.on("pointerdown", () => window.open(station.card.source, "_blank", "noopener"));
          sourceLink.on("pointerover", () => sourceLink.setColor("#fff1ce"));
          sourceLink.on("pointerout", () => sourceLink.setColor("#9fe5e1"));
        });
      });

      this.add.text(640, 626, data.text.creditsAI, {
        color: "#fff1ce", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center",
        wordWrap: { width: 1100 }
      }).setOrigin(0.5);
      const backButton = this.add.rectangle(640, 682, 320, 42, 0x153d59, 0.36)
        .setStrokeStyle(2, 0x6fe7ff, 0.62)
        .setInteractive({ useHandCursor: true });
      const backLabel = this.add.text(640, 682, data.text.creditsBack, {
        color: "#f6f1e7", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center"
      }).setOrigin(0.5);
      backButton.on("pointerdown", () => this.scene.start("MenuScene"));
      backLabel.setInteractive({ useHandCursor: true }).on("pointerdown", () => this.scene.start("MenuScene"));

      this.languageButton = this.add.rectangle(1150, 42, 200, 40, 0x10213e, 0.34)
        .setStrokeStyle(2, 0x72e9ff, 0.54)
        .setInteractive({ useHandCursor: true });
      this.add.text(1150, 42, data.text.languageButton, {
        color: "#fff1ce", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold"
      }).setOrigin(0.5);
      this.languageButton.on("pointerdown", () => this.toggleLanguage());
      this.creditsKeys = this.input.keyboard.addKeys({
        escape: Phaser.Input.Keyboard.KeyCodes.ESC,
        enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        language: Phaser.Input.Keyboard.KeyCodes.L
      });
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(this.creditsKeys.escape)
        || Phaser.Input.Keyboard.JustDown(this.creditsKeys.enter)) {
        this.scene.start("MenuScene");
      }
      if (Phaser.Input.Keyboard.JustDown(this.creditsKeys.language)) this.toggleLanguage();
    }

    toggleLanguage() {
      applyLanguage(data.language === "en" ? "es" : "en");
      this.scene.restart();
    }
  }

  class PauseScene extends Phaser.Scene {
    constructor() {
      super("PauseScene");
    }

    init(sceneData) {
      this.worldId = sceneData && sceneData.worldId ? sceneData.worldId : selectedWorldId;
    }

    create() {
      this.add.rectangle(640, 360, 1280, 720, 0x080c18, 0.3);
      this.add.rectangle(640, 360, 590, 490, 0x111a30, 0.38)
        .setStrokeStyle(3, 0xe7c89b, 0.9);
      this.add.rectangle(640, 360, 566, 466, 0x192641, 0.36)
        .setStrokeStyle(1, 0x8298b1, 0.72);
      this.add.text(640, 205, data.text.pauseTitle, {
        color: "#fff8ec", fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "34px", fontStyle: "bold", align: "center",
        wordWrap: { width: 560 }
      }).setOrigin(0.5);
      this.add.text(640, 250, data.text.pauseHint, {
        color: "#d8ddeb", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", align: "center", wordWrap: { width: 560 }
      }).setOrigin(0.5);
      this.addPauseButton(data.text.pauseRestart, 400, () => this.restartExpedition());
      this.addPauseButton(data.text.pauseMenu, 475, () => this.returnToMenu());

      this.languageButton = this.add.rectangle(1150, 42, 200, 40, 0x10213e, 0.34)
        .setStrokeStyle(2, 0x72e9ff, 0.54)
        .setInteractive({ useHandCursor: true });
      this.add.text(1150, 42, data.text.languageButton, {
        color: "#fff1ce", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold"
      }).setOrigin(0.5);
      this.languageButton.on("pointerdown", () => this.toggleLanguage());
      this.pauseKeys = this.input.keyboard.addKeys({
        escape: Phaser.Input.Keyboard.KeyCodes.ESC,
        pause: Phaser.Input.Keyboard.KeyCodes.P,
        restart: Phaser.Input.Keyboard.KeyCodes.R,
        menu: Phaser.Input.Keyboard.KeyCodes.M,
        language: Phaser.Input.Keyboard.KeyCodes.L
      });
    }

    addPauseButton(label, y, callback) {
      const button = this.add.rectangle(640, y, 360, 50, 0x153d59, 0.36)
        .setStrokeStyle(2, 0x6fe7ff, 0.7)
        .setInteractive({ useHandCursor: true });
      const buttonLabel = this.add.text(640, y, label, {
        color: "#f6f1e7", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center",
        wordWrap: { width: 350 }
      }).setOrigin(0.5);
      button.on("pointerover", () => button.setFillStyle(0x17617a, 0.52));
      button.on("pointerout", () => button.setFillStyle(0x153d59, 0.36));
      button.on("pointerdown", callback);
      buttonLabel.setInteractive({ useHandCursor: true }).on("pointerdown", callback);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(this.pauseKeys.escape)) this.returnToMenu();
      if (Phaser.Input.Keyboard.JustDown(this.pauseKeys.pause)) this.resumeExpedition();
      if (Phaser.Input.Keyboard.JustDown(this.pauseKeys.restart)) this.restartExpedition();
      if (Phaser.Input.Keyboard.JustDown(this.pauseKeys.menu)) this.returnToMenu();
      if (Phaser.Input.Keyboard.JustDown(this.pauseKeys.language)) this.toggleLanguage();
    }

    resumeExpedition() {
      this.scene.stop();
      this.scene.resume("ExpeditionScene");
    }

    restartExpedition() {
      this.scene.stop("ExpeditionScene");
      this.scene.start("ExpeditionScene", { worldId: this.worldId });
    }

    returnToMenu() {
      this.scene.stop("ExpeditionScene");
      this.scene.start("MenuScene");
    }

    toggleLanguage() {
      applyLanguage(data.language === "en" ? "es" : "en");
      const expedition = this.scene.get("ExpeditionScene");
      if (expedition && typeof expedition.refreshLanguage === "function") expedition.refreshLanguage();
      this.scene.restart({ worldId: this.worldId });
    }
  }

  class JournalScene extends Phaser.Scene {
    constructor() {
      super("JournalScene");
    }

    init(sceneData) {
      this.selectedIndex = sceneData && Number.isInteger(sceneData.selectedIndex)
        ? sceneData.selectedIndex
        : 0;
    }

    create() {
      const journalBackground = selectedWorldId === "mars" ? art.marsMenuBackground
        : selectedWorldId === "deep" ? art.deepMenuBackground : art.menuBackground;
      this.add.image(0, 0, journalBackground).setOrigin(0);
      this.add.rectangle(640, 360, 1280, 720, 0x091020, 0.36);
      this.add.rectangle(640, 360, 1160, 620, 0x111a30, 0.38)
        .setStrokeStyle(3, 0xe7c89b, 0.95);
      this.add.text(640, 80, data.text.journalTitle, {
        color: "#fff8ec", fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "34px", fontStyle: "bold", align: "center",
        wordWrap: { width: 980 }
      }).setOrigin(0.5);

      this.languageButton = this.add.rectangle(1150, 42, 200, 40, 0x10213e, 0.34)
        .setStrokeStyle(2, 0x72e9ff, 0.54)
        .setInteractive({ useHandCursor: true });
      this.languageButtonLabel = this.add.text(1150, 42, data.text.languageButton, {
        color: "#fff1ce", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold"
      }).setOrigin(0.5);
      this.languageButton.on("pointerdown", () => this.toggleLanguage());
      this.entryLayer = this.add.container(0, 0);
      this.countText = this.add.text(640, 125, "", {
        color: "#b9d8e4", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center"
      }).setOrigin(0.5);
      this.renderEntry();

      const returnButton = this.add.rectangle(640, 658, 290, 44, 0x153d59, 0.36)
        .setStrokeStyle(2, 0x6fe7ff, 0.62)
        .setInteractive({ useHandCursor: true });
      this.add.text(640, 658, data.text.journalReturn, {
        color: "#f6f1e7", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center",
        wordWrap: { width: 280 }
      }).setOrigin(0.5);
      returnButton.on("pointerdown", () => this.scene.start("MenuScene"));
      this.add.text(640, 705, data.text.journalInstructions, {
        color: "#d8ddeb", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", align: "center"
      }).setOrigin(0.5);

      this.journalKeys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        escape: Phaser.Input.Keyboard.KeyCodes.ESC,
        language: Phaser.Input.Keyboard.KeyCodes.L
      });
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(this.journalKeys.language)) this.toggleLanguage();
      if (Phaser.Input.Keyboard.JustDown(this.journalKeys.left)) this.changeEntry(-1);
      if (Phaser.Input.Keyboard.JustDown(this.journalKeys.right)) this.changeEntry(1);
      if (Phaser.Input.Keyboard.JustDown(this.journalKeys.enter)
        || Phaser.Input.Keyboard.JustDown(this.journalKeys.escape)) {
        this.scene.start("MenuScene");
      }
    }

    getEntries() {
      return journalIds
        .map((id) => allStations().find((station) => station.id === id))
        .filter(Boolean);
    }

    renderEntry() {
      this.entryLayer.removeAll(true);
      const entries = this.getEntries();
      this.selectedIndex = entries.length ? Phaser.Math.Wrap(this.selectedIndex, 0, entries.length) : 0;
      this.countText.setText(languageStorageFailed
        ? data.text.languageStorageError
        : data.text.journalCount
          .replace("{count}", String(entries.length))
          .replace("{total}", String(allStations().length)));
      if (!entries.length) {
        this.entryLayer.add(this.add.text(640, 350, data.text.journalEmpty, {
          color: "#e5e9f2", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "22px", align: "center", wordWrap: { width: 900 }
        }).setOrigin(0.5));
        return;
      }

      const station = entries[this.selectedIndex];
      this.entryLayer.add(this.add.text(640, 158, station.title, {
        color: "#f0cd98", fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "26px", fontStyle: "bold", align: "center",
        wordWrap: { width: 1040 }
      }).setOrigin(0.5));
      [
        ["what", 105, 204, 490],
        ["why", 105, 310, 490],
        ["how", 105, 416, 490],
        ["learned", 665, 204, 500],
        ["today", 665, 342, 500]
      ].forEach(([key, x, y, width]) => {
        this.entryLayer.add(this.add.text(x, y, lunar.cardLabels[key], {
          color: "#9fe5e1", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "18px", fontStyle: "bold", letterSpacing: 1
        }));
        this.entryLayer.add(this.add.text(x, y + 24, station.card[key], {
          color: "#e5e9f2", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "18px", lineSpacing: 3, wordWrap: { width }
        }));
      });
      this.entryLayer.add(this.add.text(105, 548, lunar.cardLabels.source, {
        color: "#9fe5e1", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold"
      }));
      const sourceLink = this.add.text(105, 574, station.card.source, {
        color: "#f3d9a6", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", wordWrap: { width: 1020 }
      }).setInteractive({ useHandCursor: true });
      sourceLink.on("pointerdown", () => window.open(station.card.source, "_blank", "noopener"));
      this.entryLayer.add(sourceLink);
      if (entries.length > 1) {
        this.addJournalNavigation(-1, data.text.journalPrevious, 130);
        this.addJournalNavigation(1, data.text.journalNext, 1150);
      }
    }

    addJournalNavigation(direction, label, x) {
      const button = this.add.rectangle(x, 658, 180, 44, 0x153d59, 0.36)
        .setStrokeStyle(2, 0x6fe7ff, 0.62)
        .setInteractive({ useHandCursor: true });
      const buttonText = this.add.text(x, 658, label, {
        color: "#f6f1e7", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center"
      }).setOrigin(0.5);
      button.on("pointerdown", () => this.changeEntry(direction));
      this.entryLayer.add([button, buttonText]);
    }

    changeEntry(direction) {
      this.selectedIndex += direction;
      this.renderEntry();
    }

    toggleLanguage() {
      applyLanguage(data.language === "en" ? "es" : "en");
      this.scene.restart({ selectedIndex: this.selectedIndex });
    }
  }

  class ExpeditionScene extends Phaser.Scene {
    constructor() {
      super("ExpeditionScene");
    }

    init(sceneData) {
      if (sceneData && sceneData.worldId) {
        selectedWorldId = ["moon", "mars", "deep"].includes(sceneData.worldId)
          ? sceneData.worldId : "moon";
      }
      lunar = worldData(selectedWorldId);
      this.worldId = selectedWorldId;
    }

    create() {
      this.parkour = data.config.parkour;
      this.physics.world.gravity.y = this.parkour.gravity;
      this.physics.world.setBounds(0, 0, this.parkour.worldWidth, this.parkour.rescueY);
      this.cameras.main.setBounds(0, 0, this.parkour.worldWidth, 720);
      const parallaxLayers = this.worldId === "mars"
        ? [
          [art.marsSky, 0.08, -30],
          [art.marsFarRidge, 0.18, -28],
          [art.marsMiddleRidge, 0.32, -26],
          [art.marsNearRidge, 0.48, -24],
          [art.marsRegolith, 0.64, -22]
        ]
        : this.worldId === "deep"
          ? [
            [art.deepSky, 0.06, -30],
            [art.deepFarRidge, 0.16, -28],
            [art.deepMiddleRidge, 0.29, -26],
            [art.deepNearRidge, 0.44, -24],
            [art.deepDust, 0.62, -22]
          ]
          : [
          [art.sky, 0.08, -30],
          [art.farRidge, 0.18, -28],
          [art.middleRidge, 0.32, -26],
          [art.nearRidge, 0.48, -24],
          [art.regolith, 0.64, -22]
        ];
      parallaxLayers.forEach(([key, scroll, depth]) => {
        this.add.tileSprite(0, 0, this.parkour.worldWidth, 720, key)
          .setOrigin(0)
          .setScrollFactor(scroll)
          .setDepth(depth);
      });
      if (this.worldId === "mars") {
        this.add.image(650, 182, art.marsMons).setOrigin(0).setScrollFactor(0.14).setDepth(-29.5);
        this.add.image(2070, 238, art.marsCanyonWall).setOrigin(0).setScrollFactor(0.31).setDepth(-23.6);
      } else if (this.worldId === "deep") {
        this.add.tileSprite(0, 0, this.parkour.worldWidth, 720, art.deepAurora)
          .setOrigin(0).setScrollFactor(0.38).setDepth(-21).setAlpha(0.58);
        this.add.image(1220, 210, art.deepGasGiant)
          .setDisplaySize(430, 330).setScrollFactor(0.18).setDepth(-20);
        this.add.image(1710, 150, art.deepRingedPlanet)
          .setDisplaySize(510, 350).setScrollFactor(0.3).setDepth(-19.8);
        this.add.image(4650, 185, art.deepEarthDot)
          .setDisplaySize(56, 56).setScrollFactor(0.98).setDepth(-19.5);
      }
      const vignette = this.worldId === "mars" ? art.marsVignette
        : this.worldId === "deep" ? art.deepVignette : art.vignette;
      this.add.image(640, 360, vignette)
        .setScrollFactor(0).setDepth(6);
      this.platformTexture = this.worldId === "mars" ? art.marsPlatform
        : this.worldId === "deep" ? art.deepPlatform : art.platform;
      this.springTexture = this.worldId === "mars" ? art.marsAirbag
        : this.worldId === "deep" ? art.deepSpring : art.spring;
      this.createPlayer();
      this.createCourse();
      if (this.worldId === "mars") this.createMarsEncounters();
      else if (this.worldId === "deep") this.createDeepSpaceEncounters();
      else this.createLunarEncounters();
      this.createCompanions();
      this.touchInputState = {
        left: new Set(),
        right: new Set(),
        jump: new Set(),
        interact: new Set()
      };
      this.touchJumpPressed = false;
      this.touchInteractPressed = false;
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
        enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        escape: Phaser.Input.Keyboard.KeyCodes.ESC,
        pause: Phaser.Input.Keyboard.KeyCodes.P,
        language: Phaser.Input.Keyboard.KeyCodes.L
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
      this.inCurrent = false;
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
      this.voyagerFinaleOpen = false;
      this.updateStats();
      this.input.keyboard.on("keydown-R", () => this.scene.restart());
      this.input.addPointer(2);
      this.input.on("pointerup", (pointer) => this.releaseTouchPointer(pointer.id));
      this.input.on("pointerupoutside", (pointer) => this.releaseTouchPointer(pointer.id));
      this.input.on("gameout", () => this.clearTouchInputs());
      if (!introShownWorlds.has(this.worldId)) {
        introShownWorlds.add(this.worldId);
        this.startDialogue("intro");
      }
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
        const ledge = this.ground.create(x + width / 2, this.parkour.groundY + 28, this.platformTexture);
        ledge.setDisplaySize(width, 92).refreshBody();
        this.add.ellipse(x + width / 2, this.parkour.groundY + 16, width * 0.92, 24,
          this.worldId === "mars" ? 0x4b2a34 : 0x11182a, 0.38);
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

      this.lowGravityZones = this.worldId === "moon"
        ? [
          this.addZone(1750, 360, 700, 500, 0x81d9e3, 0.12),
          this.addZone(2580, 330, 620, 550, 0x81d9e3, 0.1)
        ]
        : [];
      this.windZones = this.worldId === "mars"
        ? [this.addZone(1240, 360, 680, 500, 0xef9a69, 0.1),
          this.addZone(3100, 350, 720, 520, 0xd57659, 0.09)]
        : [];
      this.currentZones = this.worldId === "deep"
        ? [this.addZone(1830, 330, 700, 500, 0x7b8aff, 0.08),
          this.addZone(3650, 340, 620, 480, 0x81d9e3, 0.08)]
        : [];

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
      this.windZones.forEach((zone) => {
        this.physics.add.overlap(this.player, zone, () => { this.inWind = true; });
      });
      this.currentZones.forEach((zone) => {
        this.physics.add.overlap(this.player, zone, () => { this.inCurrent = true; });
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
      this.createMissionStations(machineArt);

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
      this.surveyorPad = this.surveyorPads.create(surveyor.padX, surveyor.padY, this.platformTexture);
      this.surveyorPad.setDisplaySize(190, 30).refreshBody();
      this.physics.add.collider(this.player, this.surveyorPads, this.onSurveyorPad, null, this);
      this.nightShade = this.add.rectangle(surveyor.x + 150, 360, 760, 720, 0x071024, 0)
        .setDepth(2.4);
      this.nightSignal = this.add.image(surveyor.x + 150, 438, art.signal)
        .setDisplaySize(40, 40)
        .setAlpha(0)
        .setDepth(3.2);
    }

    createMissionStations(machineArt) {
      this.stationLabels = {};
      this.stations = lunar.stations.map((station) => {
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
        this.stationLabels[station.id] = this.add.text(station.x, station.y - height / 2 - 30, station.title, {
          color: this.worldId === "mars" ? "#ffe0bb" : "#fff1ce",
          fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
          fontSize: "18px",
          fontStyle: "bold",
          stroke: "#202944",
          strokeThickness: 4
        }).setOrigin(0.5).setDepth(3);
        return {
          ...station,
          completed: journalIds.includes(station.id),
          dialogueSeen: false,
          journalSaved: journalIds.includes(station.id)
        };
      });
    }

    createMarsEncounters() {
      const machineArt = {
        pathfinder: [art.pathfinder, 230, 215],
        rovers: [art.marsRovers, 260, 160],
        viking: [art.viking, 230, 205],
        insight: [art.insight, 255, 190],
        ingenuity: [art.ingenuity, 185, 185]
      };
      this.createMissionStations(machineArt);
      this.marsActiveTrial = null;
      this.pathfinderBounces = 0;
      this.marsAirbags = this.physics.add.staticGroup();
      [710, 850, 990].forEach((x, index) => {
        const pad = this.marsAirbags.create(x, this.parkour.groundY - 30, art.marsAirbag);
        pad.setDisplaySize(124, 56).refreshBody().setDepth(3);
        pad.challengeIndex = index;
        this.add.circle(x, this.parkour.groundY - 30, 39, 0xf3b27e, 0.1)
          .setStrokeStyle(2, 0xffd5a5, 0.55).setDepth(2.8);
      });
      this.physics.add.collider(this.player, this.marsAirbags, this.touchMarsAirbag, null, this);

      const roverStation = this.getStation("rovers");
      this.roverSunGlow = this.add.circle(roverStation.x + 98, roverStation.y - 72, 24, 0xffdf9a, 0.82)
        .setStrokeStyle(3, 0xfff0c4, 0.92).setDepth(3.2);
      this.roverSunShutter = this.add.rectangle(roverStation.x + 98, roverStation.y - 72, 64, 15, 0x5c3941, 0.9)
        .setDepth(3.3);
      this.roverProgressVisuals = [0, 1, 2].map((index) =>
        this.add.circle(roverStation.x + 48 + index * 36, this.parkour.groundY - 34, 8, 0x49343f, 0.9)
          .setStrokeStyle(2, 0xffdfa4, 0.8).setDepth(3.3)
      );

      const viking = this.getStation("viking");
      this.vikingArmContainer = this.add.container(viking.x + 74, this.parkour.groundY - 115)
        .setDepth(4).setVisible(false);
      const arm = this.add.graphics();
      arm.lineStyle(12, 0xd4c19b, 1);
      arm.beginPath();
      arm.moveTo(0, 0);
      arm.lineTo(34, -22);
      arm.lineTo(66, -22);
      arm.strokePath();
      arm.fillStyle(0x536273, 1);
      arm.fillCircle(0, 0, 11);
      arm.fillStyle(0xe2c18f, 1);
      arm.fillRoundedRect(60, -29, 22, 14, 4);
      arm.lineStyle(2, 0xffebc3, 0.95);
      arm.strokeCircle(0, 0, 12);
      this.vikingArmContainer.add(arm);
      this.vikingTarget = this.add.circle(viking.x + 160, this.parkour.groundY - 22, 14, 0xf6c482, 0.85)
        .setStrokeStyle(3, 0xfff2d2, 0.9).setDepth(3.5).setVisible(false);

      const insight = this.getStation("insight");
      this.insightSignal = this.add.image(insight.x + 125, insight.y - 10, art.signal)
        .setDisplaySize(44, 44).setAlpha(0.65).setDepth(3.2);
      this.tweens.add({ targets: this.insightSignal, scale: 1.24, alpha: 0.22, duration: 1000, yoyo: true, repeat: -1 });

      const helicopter = this.getStation("ingenuity");
      this.ingenuityGates = lunar.settings.ingenuityGateHeights.map((height, index) => {
        const x = helicopter.x + [80, 210, 350][index];
        const ring = this.add.circle(x, height, 33, 0xf7d08d, 0.12)
          .setStrokeStyle(5, 0xffe6ae, 0.85).setDepth(4);
        this.add.image(x, height, art.signal).setDisplaySize(30, 30).setDepth(4.1);
        return { x, y: height, ring, passed: false };
      });
      this.ingenuityGateIndex = 0;
      this.marsStormShade = this.add.rectangle(640, 360, 1280, 720, 0x743c39, 0.08)
        .setScrollFactor(0).setDepth(8);
    }

    createDeepSpaceEncounters() {
      const machineArt = {
        dawn: [art.dawn, 250, 178],
        near: [art.near, 230, 180],
        pioneer: [art.pioneer, 240, 190],
        kepler: [art.kepler, 230, 180],
        voyager: [art.voyager, 250, 190]
      };
      this.createMissionStations(machineArt);
      this.deepActiveTrial = null;
      this.deepAsteroids = [];
      for (let index = 0; index < 30; index += 1) {
        const x = 1320 + index * 108;
        const y = 110 + ((index * 83) % 310);
        const size = 27 + ((index * 17) % 40);
        const asteroid = this.add.image(x, y, art.deepAsteroid)
          .setDisplaySize(size, size * 0.82)
          .setScrollFactor(0.64)
          .setDepth(-18.5)
          .setAlpha(0.5 + (index % 4) * 0.1);
        this.deepAsteroids.push(asteroid);
        this.tweens.add({
          targets: asteroid,
          angle: index % 2 ? 18 : -18,
          duration: 3800 + (index % 5) * 410,
          yoyo: true,
          repeat: -1,
          ease: "Sine.inOut"
        });
      }

      const dawn = this.getStation("dawn");
      this.dawnGates = [110, 250, 390].map((offset) => {
        const x = dawn.x + offset;
        const y = this.parkour.groundY - 180;
        const ring = this.add.circle(x, y, 29, 0x8fe8ff, 0.12)
          .setStrokeStyle(4, 0xbaf4ff, 0.9).setDepth(4);
        this.add.image(x, y, art.signal).setDisplaySize(24, 24).setDepth(4.1);
        return { x, y, ring };
      });

      const near = this.getStation("near");
      this.nearLandingMark = this.add.circle(
        near.x + 82, lunar.settings.nearLandingY, 39, 0x9fe5d0, 0.14
      ).setStrokeStyle(4, 0xc1ffed, 0.95).setDepth(4);
      this.add.image(near.x + 82, lunar.settings.nearLandingY, art.signal)
        .setDisplaySize(26, 26).setDepth(4.1);
      this.add.image(near.x + 260, this.parkour.groundY - 35, art.deepAsteroid)
        .setDisplaySize(380, 235).setDepth(1.6).setAlpha(0.88);

      const pioneer = this.getStation("pioneer");
      this.pioneerGates = [125, 270, 420].map((offset, index) => {
        const x = pioneer.x + offset;
        const y = this.parkour.groundY - [120, 210, 135][index];
        const ring = this.add.circle(x, y, 31, 0xf0cd98, 0.12)
          .setStrokeStyle(4, 0xffe6ae, 0.95).setDepth(4);
        this.add.image(x, y, art.signal).setDisplaySize(24, 24).setDepth(4.1);
        return { x, y, ring };
      });

      const kepler = this.getStation("kepler");
      this.keplerStar = this.add.image(kepler.x + 155, kepler.y - 185, art.deepStar)
        .setDisplaySize(116, 116).setDepth(4);
      this.keplerPlanet = this.add.circle(
        kepler.x + 155, kepler.y - 185, 15, 0x392f59, 1
      ).setStrokeStyle(2, 0xf0cd98, 0.9).setDepth(4.2);

      const voyager = this.getStation("voyager");
      this.voyagerGates = [
        [voyager.x + 110, this.parkour.groundY - 175, art.deepGasGiant],
        [voyager.x + 255, this.parkour.groundY - 295, art.deepRingedPlanet],
        [voyager.x + 405, this.parkour.groundY - 205, art.deepGasGiant]
      ].map(([x, y, texture], index) => {
        this.add.image(x, y, texture)
          .setDisplaySize(index === 1 ? 142 : 118, index === 1 ? 100 : 92)
          .setDepth(3.2);
        const ring = this.add.circle(x, y, 43, 0x9fe5d0, 0.12)
          .setStrokeStyle(4, 0xbaf4ff, 0.9).setDepth(4.1);
        return { x, y, ring };
      });
    }

    handleDeepSpaceInteraction(time) {
      if (this.deepActiveTrial) return;
      const station = this.nearStation;
      if (!station || station.completed) return;
      if (!station.dialogueSeen) {
        station.dialogueSeen = true;
        this.startDialogue(station.id);
        return;
      }

      this.startDeepSpaceTrial(station, time);
    }

    startDeepSpaceTrial(station, time) {
      this.deepActiveTrial = station.id;
      this.deepTrialStation = station;
      this.nearStation = null;
      if (station.id === "pioneer") {
        this.pioneerGateIndex = 0;
        this.statusText.setText(lunar.challenge.pioneerCross);
        return;
      }
      if (station.id === "kepler") {
        this.keplerTrialStartedAt = time;
        this.keplerTransits = 0;
        this.keplerLastAttempt = -1;
        this.rhythmPanel.setVisible(true);
        this.rhythmText.setText(lunar.challenge.keplerTransit);
        this.statusText.setText(lunar.challenge.keplerTransit);
        this.player.body.setVelocity(0, 0);
        this.player.body.setAccelerationX(0);
        this.player.body.setAllowGravity(false);
        return;
      }

      const starts = {
        dawn: [station.x - 150, this.parkour.groundY - 180],
        near: [station.x - 68, 232],
        voyager: [station.x - 100, this.parkour.groundY - 165]
      };
      const [x, y] = starts[station.id];
      this.deepFlightCraft = this.add.sprite(x, y, art[station.id])
        .setDisplaySize(station.id === "near" ? 114 : 112, station.id === "near" ? 90 : 88)
        .setDepth(5.4);
      this.deepFlightVelocity = station.id === "near" ? 118 : 0;
      this.deepGateIndex = 0;
      this.player.body.enable = false;
      this.player.setVisible(false);
      this.tuerca.setVisible(false);
      this.cameras.main.startFollow(this.deepFlightCraft, true, 0.12, 0.12);
      if (station.id === "dawn") {
        this.statusText.setText(lunar.challenge.dawnThrust);
      } else if (station.id === "near") {
        this.statusText.setText(lunar.challenge.nearDescend);
      } else {
        this.statusText.setText(lunar.challenge.voyagerFly);
      }
    }

    updateDeepSpaceTrial(time, delta, direction, jumpHeld, jumpPressed) {
      const dt = Math.min(delta / 1000, 0.04);
      if (this.deepActiveTrial === "dawn") {
        this.deepFlightVelocity = Phaser.Math.Clamp(
          this.deepFlightVelocity + direction * 92 * dt, 0, 220
        );
        this.deepFlightCraft.x += this.deepFlightVelocity * dt;
        this.deepFlightCraft.y = this.dawnGates[0].y + Math.sin(time * 0.002) * 3;
        this.deepFlightCraft.setAngle(Math.sin(time * 0.002) * 2);
        const gate = this.dawnGates[this.deepGateIndex];
        if (gate && this.deepFlightCraft.x >= gate.x) {
          gate.ring.setStrokeStyle(4, 0x9fe5d0, 1).setFillStyle(0x9fe5d0, 0.42);
          this.deepGateIndex += 1;
          this.sparkles.emitParticleAt(gate.x, gate.y, 12);
          this.statusText.setText(lunar.challenge.dawnProgress
            .replace("{current}", String(this.deepGateIndex))
            .replace("{total}", String(this.dawnGates.length)));
          if (this.deepGateIndex >= this.dawnGates.length) this.finishDeepSpaceFlight();
        }
      } else if (this.deepActiveTrial === "near") {
        this.deepFlightCraft.x = Phaser.Math.Clamp(
          this.deepFlightCraft.x + direction * 185 * dt,
          this.deepTrialStation.x - 140,
          this.deepTrialStation.x + 210
        );
        this.deepFlightVelocity = Phaser.Math.Clamp(
          this.deepFlightVelocity + (jumpHeld ? -210 : 95) * dt, 40, 205
        );
        this.deepFlightCraft.y += this.deepFlightVelocity * dt;
        this.deepFlightCraft.setAngle(Phaser.Math.Clamp(direction * 8, -8, 8));
        if (this.deepFlightCraft.y >= lunar.settings.nearLandingY) {
          const aligned = Math.abs(this.deepFlightCraft.x - this.nearLandingMark.x)
            <= lunar.settings.nearTargetRadius;
          if (aligned && this.deepFlightVelocity <= lunar.settings.nearSafeSpeed) {
            this.nearLandingMark.setFillStyle(0x9fe5d0, 0.55);
            this.sparkles.emitParticleAt(this.nearLandingMark.x, this.nearLandingMark.y, 22);
            this.finishDeepSpaceFlight();
          } else {
            this.deepFlightCraft.setPosition(this.deepTrialStation.x - 68, 232).setAngle(0);
            this.deepFlightVelocity = 118;
            this.statusText.setText(lunar.challenge.nearRetry);
          }
        }
      } else if (this.deepActiveTrial === "kepler") {
        const elapsed = Math.max(0, time - this.keplerTrialStartedAt);
        const beat = Math.floor(elapsed / lunar.settings.keplerBeatMs);
        const phase = (elapsed % lunar.settings.keplerBeatMs) / lunar.settings.keplerBeatMs;
        const inTransit = Math.abs(phase - lunar.settings.keplerTargetPhase)
          <= lunar.settings.keplerWindow;
        this.rhythmPointer.setX(470 + phase * 340);
        this.keplerStar.setAlpha(inTransit ? 0.38 : 1);
        this.keplerPlanet.setPosition(
          this.keplerStar.x - 45 + phase * 90,
          this.keplerStar.y
        );
        if (jumpPressed && beat > this.keplerLastAttempt) {
          this.keplerLastAttempt = beat;
          if (inTransit) {
            this.keplerTransits += 1;
            this.sparkles.emitParticleAt(this.keplerStar.x, this.keplerStar.y, 11);
            this.rhythmText.setText(lunar.challenge.keplerProgress
              .replace("{current}", String(this.keplerTransits))
              .replace("{total}", String(lunar.settings.keplerRequiredTransits)));
            if (this.keplerTransits >= lunar.settings.keplerRequiredTransits) {
              this.deepActiveTrial = null;
              this.rhythmPanel.setVisible(false);
              this.player.body.setAllowGravity(true);
              this.completeMissionStation(this.getStation("kepler"));
            }
          } else {
            this.rhythmText.setText(lunar.challenge.keplerMiss);
          }
        }
      } else if (this.deepActiveTrial === "voyager") {
        const flight = this.deepFlightCraft;
        const gate = this.voyagerGates[this.deepGateIndex];
        flight.x += (82 + this.deepGateIndex * 32 + direction * 58) * dt;
        flight.y = Phaser.Math.Clamp(
          flight.y + (Phaser.Math.Clamp((gate.y - flight.y) * 1.1, -140, 140)
            + (jumpHeld ? -90 : 0)) * dt,
          this.parkour.groundY - 355,
          this.parkour.groundY - 70
        );
        flight.setAngle(direction * -7 + Math.sin(time * 0.005) * 2);
        if (gate && Phaser.Math.Distance.Between(flight.x, flight.y, gate.x, gate.y)
          <= lunar.settings.voyagerGateRadius) {
          gate.ring.setStrokeStyle(4, 0x9fe5d0, 1).setFillStyle(0x9fe5d0, 0.42);
          this.deepGateIndex += 1;
          this.sparkles.emitParticleAt(gate.x, gate.y, 17);
          this.statusText.setText(lunar.challenge.voyagerProgress
            .replace("{current}", String(this.deepGateIndex))
            .replace("{total}", String(this.voyagerGates.length)));
          if (this.deepGateIndex >= this.voyagerGates.length) this.finishDeepSpaceFlight();
        } else if (gate && flight.x > gate.x + lunar.settings.voyagerGateRadius * 2) {
          this.deepFlightCraft.setPosition(
            this.deepTrialStation.x - 100, this.parkour.groundY - 165
          );
          this.deepFlightCraft.setAngle(0);
          this.deepGateIndex = 0;
          this.statusText.setText(lunar.challenge.voyagerFly);
        }
      }
    }

    updatePioneerTrial() {
      if (this.deepActiveTrial !== "pioneer") return;
      const gate = this.pioneerGates[this.pioneerGateIndex];
      if (!gate || Phaser.Math.Distance.Between(
        this.player.x, this.player.y, gate.x, gate.y
      ) > lunar.settings.pioneerGateRadius) return;

      gate.ring.setStrokeStyle(4, 0x9fe5d0, 1).setFillStyle(0x9fe5d0, 0.42);
      this.pioneerGateIndex += 1;
      this.sparkles.emitParticleAt(gate.x, gate.y, 14);
      this.statusText.setText(lunar.challenge.pioneerProgress
        .replace("{current}", String(this.pioneerGateIndex))
        .replace("{total}", String(this.pioneerGates.length)));
      if (this.pioneerGateIndex >= this.pioneerGates.length) {
        this.deepActiveTrial = null;
        this.completeMissionStation(this.getStation("pioneer"));
      }
    }

    finishDeepSpaceFlight() {
      const station = this.deepTrialStation;
      this.deepActiveTrial = null;
      if (this.deepFlightCraft) {
        this.deepFlightCraft.destroy();
        this.deepFlightCraft = null;
      }
      this.player.body.enable = true;
      this.player.setVisible(true).setPosition(station.x + 52, this.parkour.groundY - 72);
      this.player.body.reset(this.player.x, this.player.y);
      this.player.body.setAllowGravity(true).setVelocity(0, 0);
      this.tuerca.setVisible(true).setPosition(this.player.x - 52, this.player.y + 12);
      this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
      this.completeMissionStation(station);
    }

    updateNearbyStation() {
      if (this.dialogueOpen || this.missionCardOpen || this.lrvDriving || this.alsepActive
        || this.surveyorActive || this.marsActiveTrial || this.deepActiveTrial) return;
      const station = this.stations.find((candidate) => {
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

    handleStationInteraction(time) {
      if (this.missionCardOpen) {
        this.closeMissionCard();
        return;
      }
      if (this.dialogueOpen) {
        this.advanceDialogue();
        return;
      }
      if (this.worldId === "mars") {
        this.handleMarsInteraction(time);
        return;
      }
      if (this.worldId === "deep") {
        this.handleDeepSpaceInteraction(time);
        return;
      }
      if (this.lrvDriving || this.alsepActive) return;

      if (this.surveyorActive) {
        if (this.surveyorNightReady) {
          this.completeMissionStation(this.getStation("surveyor"));
        }
        return;
      }

      const station = this.nearStation;
      if (!station || station.completed) return;
      if (!station.dialogueSeen) {
        station.dialogueSeen = true;
        this.startDialogue(station.id);
        return;
      }
      if (station.id === "lm") {
        const atPlaque = Phaser.Math.Distance.Between(
          this.player.x, this.player.y, station.plaqueX, station.plaqueY
        ) <= 145;
        if (atPlaque) this.completeMissionStation(station);
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

    handleMarsInteraction(time) {
      if (this.marsActiveTrial) {
        if (this.marsActiveTrial === "rovers") this.trySolarAlignment(time);
        else if (this.marsActiveTrial === "viking") this.tryVikingSample();
        return;
      }

      const station = this.nearStation;
      if (!station || station.completed) return;
      if (!station.dialogueSeen) {
        station.dialogueSeen = true;
        this.startDialogue(station.id);
        return;
      }

      this.startMarsChallenge(station, time);
    }

    startMarsChallenge(station, time) {
      this.marsActiveTrial = station.id;
      this.marsTrialBlockInput = true;
      this.nearStation = null;
      if (station.id === "pathfinder") {
        this.pathfinderBounces = 0;
        this.statusText.setText(lunar.challenge.pathfinderBounce);
        this.updatePathfinderProgress();
      } else if (station.id === "rovers") {
        this.roverTrialStartedAt = time;
        this.roverSunbeams = 0;
        this.roverLastAttempt = -1;
        this.rhythmPanel.setVisible(true);
        this.rhythmText.setText(lunar.challenge.roverAlign);
        this.statusText.setText(lunar.challenge.roverAlign);
        this.player.body.setVelocity(0, 0);
        this.player.body.setAccelerationX(0);
        this.player.body.setAllowGravity(false);
      } else if (station.id === "viking") {
        this.vikingArmAngle = 0;
        this.vikingSamples = 0;
        this.vikingArmContainer.setRotation(0).setVisible(true);
        this.vikingTarget.setVisible(true);
        this.updateVikingTarget();
        this.player.body.setVelocity(0, 0);
        this.player.body.setAccelerationX(0);
        this.player.body.setAllowGravity(false);
        this.statusText.setText(lunar.challenge.vikingAim);
      } else if (station.id === "insight") {
        this.insightTrialStartedAt = time;
        this.insightPulses = 0;
        this.insightLastAttempt = -1;
        this.rhythmPanel.setVisible(true);
        this.rhythmText.setText(lunar.challenge.insightListen);
        this.statusText.setText(lunar.challenge.insightListen);
        this.player.body.setVelocity(0, 0);
        this.player.body.setAccelerationX(0);
        this.player.body.setAllowGravity(false);
      } else if (station.id === "ingenuity") {
        this.ingenuityGateIndex = 0;
        this.ingenuityGates.forEach((gate) => gate.ring.setAlpha(0.9));
        this.player.body.enable = false;
        this.player.setVisible(false);
        this.tuerca.setVisible(false);
        this.ingenuityFlight = this.add.sprite(
          station.x - 100, this.parkour.groundY - 160, art.ingenuity
        ).setDisplaySize(100, 100).setDepth(5.4);
        this.cameras.main.startFollow(this.ingenuityFlight, true, 0.12, 0.12);
        this.statusText.setText(lunar.challenge.ingenuityFly);
      }
    }

    touchMarsAirbag(player, pad) {
      if (player.body.velocity.y < 0) return;
      player.body.setVelocityY(-this.parkour.trampolineVelocity * 0.82);
      this.airJumps = 1;
      this.dust.emitParticleAt(pad.x, pad.y - 20, 12);
      this.cameras.main.shake(100, 0.0015);
      if (this.marsActiveTrial !== "pathfinder" || pad.challengeIndex !== this.pathfinderBounces) return;

      this.pathfinderBounces += 1;
      pad.setTint(0xffe6b5);
      this.sparkles.emitParticleAt(pad.x, pad.y - 25, 16);
      this.updatePathfinderProgress();
      if (this.pathfinderBounces >= lunar.settings.pathfinderRequiredBounces) {
        this.marsActiveTrial = null;
        this.completeMissionStation(this.getStation("pathfinder"));
      }
    }

    updatePathfinderProgress() {
      this.statusText.setText(lunar.challenge.pathfinderProgress
        .replace("{current}", String(this.pathfinderBounces))
        .replace("{total}", String(lunar.settings.pathfinderRequiredBounces)));
    }

    trySolarAlignment(time) {
      const cycle = lunar.settings.roverCycleMs;
      const elapsed = Math.max(0, time - this.roverTrialStartedAt);
      const cycleIndex = Math.floor(elapsed / cycle);
      if (cycleIndex <= this.roverLastAttempt) return;
      this.roverLastAttempt = cycleIndex;
      const phase = (elapsed % cycle) / cycle;
      if (phase < lunar.settings.roverWindowStart || phase > lunar.settings.roverWindowEnd) {
        this.rhythmText.setText(lunar.challenge.roverMiss);
        return;
      }

      this.roverSunbeams += 1;
      this.roverProgressVisuals[this.roverSunbeams - 1].setFillStyle(0xffdf9a, 1);
      this.roverSunShutter.setVisible(false);
      this.sparkles.emitParticleAt(this.roverSunGlow.x, this.roverSunGlow.y, 10);
      this.rhythmText.setText(lunar.challenge.roverProgress
        .replace("{current}", String(this.roverSunbeams))
        .replace("{total}", String(lunar.settings.roverRequiredSunbeams)));
      if (this.roverSunbeams >= lunar.settings.roverRequiredSunbeams) {
        this.marsActiveTrial = null;
        this.rhythmPanel.setVisible(false);
        this.player.body.setAllowGravity(true);
        this.completeMissionStation(this.getStation("rovers"));
      } else {
        this.roverSunShutter.setVisible(true);
      }
    }

    updateVikingTarget() {
      const targetAngles = [-lunar.settings.vikingArmStep, 0, lunar.settings.vikingArmStep];
      const angle = targetAngles[Math.min(this.vikingSamples, targetAngles.length - 1)];
      const viking = this.getStation("viking");
      this.vikingTarget.setPosition(
        viking.x + 98 + angle * 115,
        this.parkour.groundY - 20
      );
    }

    tryVikingSample() {
      const targetAngles = [-lunar.settings.vikingArmStep, 0, lunar.settings.vikingArmStep];
      const targetAngle = targetAngles[Math.min(this.vikingSamples, targetAngles.length - 1)];
      if (Math.abs(this.vikingArmAngle - targetAngle) > 0.2) {
        this.showStatus(lunar.challenge.vikingMiss);
        return;
      }

      this.vikingSamples += 1;
      this.sparkles.emitParticleAt(this.vikingTarget.x, this.vikingTarget.y, 12);
      this.vikingTarget.setFillStyle(0xa6e4c9, 0.95);
      if (this.vikingSamples >= lunar.settings.vikingRequiredSamples) {
        this.marsActiveTrial = null;
        this.vikingArmContainer.setVisible(false);
        this.vikingTarget.setVisible(false);
        this.player.body.setAllowGravity(true);
        this.statusText.setText(lunar.challenge.vikingProgress
          .replace("{current}", String(this.vikingSamples))
          .replace("{total}", String(lunar.settings.vikingRequiredSamples)));
        this.completeMissionStation(this.getStation("viking"));
        return;
      }
      this.statusText.setText(lunar.challenge.vikingProgress
        .replace("{current}", String(this.vikingSamples))
        .replace("{total}", String(lunar.settings.vikingRequiredSamples)));
      this.updateVikingTarget();
      this.vikingTarget.setFillStyle(0xf6c482, 0.85);
    }

    updateMarsTrial(time, delta, direction, jumpPressed, jumpHeld) {
      const dt = Math.min(delta / 1000, 0.04);
      if (this.marsStormShade) {
        this.marsStormShade.setAlpha(0.04 + (Math.sin(time * 0.00055) + 1) * 0.09);
      }
      if (this.marsTrialBlockInput) {
        this.marsTrialBlockInput = false;
        jumpPressed = false;
      }

      if (this.marsActiveTrial === "rovers") {
        const phase = ((time - this.roverTrialStartedAt) % lunar.settings.roverCycleMs)
          / lunar.settings.roverCycleMs;
        this.rhythmPointer.setX(470 + phase * 340);
        this.roverSunShutter.setVisible(
          phase < lunar.settings.roverWindowStart || phase > lunar.settings.roverWindowEnd
        );
      } else if (this.marsActiveTrial === "viking") {
        this.vikingArmAngle = Phaser.Math.Clamp(
          this.vikingArmAngle + direction * dt * 1.65, -0.84, 0.84
        );
        this.vikingArmContainer.setRotation(this.vikingArmAngle);
      } else if (this.marsActiveTrial === "insight") {
        const elapsed = Math.max(0, time - this.insightTrialStartedAt);
        const beat = Math.floor(elapsed / lunar.settings.insightBeatMs);
        const phase = (elapsed % lunar.settings.insightBeatMs) / lunar.settings.insightBeatMs;
        this.rhythmPointer.setX(470 + phase * 340);
        if (jumpPressed && beat > this.insightLastAttempt) {
          this.insightLastAttempt = beat;
          if (Math.abs(phase - lunar.settings.insightTargetPhase) <= lunar.settings.insightWindow) {
            this.insightPulses += 1;
            this.sparkles.emitParticleAt(this.insightSignal.x, this.insightSignal.y, 9);
            this.rhythmText.setText(lunar.challenge.insightProgress
              .replace("{current}", String(this.insightPulses))
              .replace("{total}", String(lunar.settings.insightRequiredPulses)));
            if (this.insightPulses >= lunar.settings.insightRequiredPulses) {
              this.marsActiveTrial = null;
              this.rhythmPanel.setVisible(false);
              this.player.body.setAllowGravity(true);
              this.completeMissionStation(this.getStation("insight"));
            }
          } else {
            this.rhythmText.setText(lunar.challenge.insightMiss);
          }
        }
      } else if (this.marsActiveTrial === "ingenuity") {
        const flight = this.ingenuityFlight;
        flight.x = Phaser.Math.Clamp(flight.x + direction * 250 * dt, 4110, this.parkour.worldWidth - 60);
        flight.y = Phaser.Math.Clamp(
          flight.y + (jumpHeld ? -150 : 78) * dt,
          this.parkour.groundY - 330,
          this.parkour.groundY - 48
        );
        flight.setAngle(direction * -7 + Math.sin(time * 0.006) * 2);
        const gate = this.ingenuityGates[this.ingenuityGateIndex];
        if (gate && Phaser.Math.Distance.Between(flight.x, flight.y, gate.x, gate.y)
          <= lunar.settings.ingenuityGateRadius) {
          gate.ring.setStrokeStyle(5, 0x9fe5c7, 1).setFillStyle(0x9fe5c7, 0.42);
          this.ingenuityGateIndex += 1;
          this.sparkles.emitParticleAt(gate.x, gate.y, 16);
          this.statusText.setText(lunar.challenge.ingenuityProgress
            .replace("{current}", String(this.ingenuityGateIndex))
            .replace("{total}", String(this.ingenuityGates.length)));
          if (this.ingenuityGateIndex >= this.ingenuityGates.length) this.finishIngenuityTrial();
        }
      }
    }

    finishIngenuityTrial() {
      this.marsActiveTrial = null;
      this.ingenuityFlight.destroy();
      this.ingenuityFlight = null;
      const station = this.getStation("ingenuity");
      this.player.body.enable = true;
      this.player.setVisible(true).setPosition(station.x - 82, this.parkour.groundY - 70);
      this.player.body.reset(this.player.x, this.player.y);
      this.player.body.setAllowGravity(true).setVelocity(0, 0);
      this.tuerca.setVisible(true).setPosition(this.player.x - 52, this.player.y + 12);
      this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
      this.completeMissionStation(station);
    }

    getStation(id) {
      return this.stations.find((station) => station.id === id);
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
        this.completeMissionStation(this.getStation("lrv"));
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
          this.completeMissionStation(this.getStation("alsep"));
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

    completeMissionStation(station) {
      if (!station || station.completed) return;
      if (this.worldId === "moon" && station.id === "lrv") this.endLrvTrial();
      station.completed = true;
      station.journalSaved = saveJournalEntry(station.id);
      if (this.worldId === "moon" && station.id === "surveyor") this.surveyorActive = false;
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
      this.missionCardStationId = station.id;
      this.missionCardOpen = true;
      this.nearStation = null;
      this.player.body.setVelocity(0, 0);
      this.player.body.setAccelerationX(0);
      this.player.body.setAllowGravity(false);
      this.statusText.setText(station.journalSaved === false
        ? data.text.journalStorageError
        : lunar.challenge.stationRecovered);

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
      const cardCloseText = this.add.text(640, 625, lunar.cardClose, {
        color: "#fff1ce", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center"
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      cardCloseText.on("pointerdown", () => this.closeMissionCard());
      layer.add(cardCloseText);
    }

    closeMissionCard() {
      const opensVoyagerFinale = this.worldId === "deep"
        && this.missionCardStationId === "voyager";
      this.missionCardOpen = false;
      this.missionCardLayer.destroy(true);
      this.missionCardLayer = null;
      this.missionCardStationId = null;
      this.player.body.setAllowGravity(true);
      this.statusText.setText(
        this.stations.every((station) => station.completed)
          ? lunar.completedHint
          : lunar.hint
      );
      if (opensVoyagerFinale) this.openVoyagerFinale();
      else this.updateNearbyStation();
    }

    openVoyagerFinale() {
      this.voyagerFinaleOpen = true;
      this.player.body.setVelocity(0, 0);
      this.player.body.setAllowGravity(false);
      const layer = this.add.container(0, 0).setScrollFactor(0).setDepth(40);
      this.voyagerFinaleLayer = layer;
      layer.add(this.add.rectangle(640, 360, 1280, 720, 0x050914, 0.88));
      layer.add(this.add.rectangle(640, 360, 1020, 500, 0x111b34, 0.98)
        .setStrokeStyle(3, 0xb9d8e4, 0.95));
      layer.add(this.add.circle(640, 212, 48, 0x8ee4f2, 0.2)
        .setStrokeStyle(2, 0xb7f3ff, 0.8));
      layer.add(this.add.circle(640, 212, 15, 0x8ee4f2, 0.95));
      layer.add(this.add.text(640, 292, lunar.finaleTitle, {
        color: "#f0cd98", fontFamily: "Georgia, Times New Roman, serif",
        fontSize: "30px", fontStyle: "bold", align: "center",
        wordWrap: { width: 900 }
      }).setOrigin(0.5));
      layer.add(this.add.text(640, 398, lunar.finaleMessage, {
        color: "#fff8ec", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "22px", lineSpacing: 12, align: "center",
        wordWrap: { width: 850 }
      }).setOrigin(0.5));
      const finaleCloseText = this.add.text(640, 568, lunar.finaleClose, {
        color: "#b9d8e4", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center"
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      finaleCloseText.on("pointerdown", () => this.scene.start("MenuScene"));
      layer.add(finaleCloseText);
    }

    addStaticPlatform(x, y, width) {
      const platform = this.platforms.create(x, y, this.platformTexture);
      platform.setDisplaySize(width, 30).refreshBody();
      return platform;
    }

    addFallingPlatform(x, y) {
      const platform = this.fallingPlatforms.create(x, y, this.platformTexture);
      platform.setDisplaySize(170, 28);
      platform.body.setSize(170, 28).setAllowGravity(false).setImmovable(true);
      platform.isFalling = false;
      return platform;
    }

    addMovingPlatform(x, y, width, distance, duration) {
      const platform = this.movingPlatforms.create(x, y, this.platformTexture);
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
      const spring = this.springs.create(x, y, this.springTexture);
      spring.setDisplaySize(150, 30).refreshBody();
      return spring;
    }

    addWall(x, y, width, height) {
      const wall = this.platforms.create(x, y, this.platformTexture);
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
      const worldAccent = this.worldId === "mars" ? 0xff8a50
        : this.worldId === "deep" ? 0xe279ff : 0x64e6ff;
      this.add.rectangle(420, 88, 790, 136, 0x09152e, 0.34)
        .setStrokeStyle(2, worldAccent, 0.5)
        .setScrollFactor(0)
        .setDepth(8);
      this.expeditionLabelText = this.add.text(28, 20,
        this.worldId === "mars" ? data.text.marsExpeditionLabel
          : this.worldId === "deep" ? data.text.deepSpaceExpeditionLabel
            : data.text.expeditionLabel, {
        ...fixedText, color: this.worldId === "mars" ? "#ff9b55"
          : this.worldId === "deep" ? "#e68cff" : "#7bedff",
        fontSize: "18px", letterSpacing: 2
      }).setScrollFactor(0).setDepth(10);
      this.worldTitleText = this.add.text(28, 49, lunar.title, {
        ...fixedText, fontFamily: "Georgia, Times New Roman, serif", fontSize: "23px",
        wordWrap: { width: 770 }
      }).setScrollFactor(0).setDepth(10);
      this.statusText = this.add.text(28, 81, lunar.hint, {
        ...fixedText, color: "#d8ddeb", fontSize: "18px", fontStyle: "normal",
        wordWrap: { width: 770 }
      }).setScrollFactor(0).setDepth(10);
      this.statsText = this.add.text(28, 119, "", {
        ...fixedText, color: this.worldId === "mars" ? "#ffb06d"
          : this.worldId === "deep" ? "#f09bff" : "#91f5ff",
        fontSize: "18px"
      }).setScrollFactor(0).setDepth(10);
      this.helpText = this.add.text(640, 680, data.text.touchControlsHint, {
        ...fixedText, align: "center", fontSize: "18px", color: "#f1f0eb",
        wordWrap: { width: 1160 }
      }).setOrigin(0.5).setScrollFactor(0).setDepth(10).setAlpha(0.84);
      this.languageButton = this.add.rectangle(1150, 34, 200, 40, 0x10213e, 0.34)
        .setStrokeStyle(2, 0x72e9ff, 0.54)
        .setScrollFactor(0)
        .setDepth(12)
        .setInteractive({ useHandCursor: true });
      this.languageButtonLabel = this.add.text(1150, 34, data.text.languageButton, {
        color: "#fff1ce", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold"
      }).setOrigin(0.5).setScrollFactor(0).setDepth(12);
      this.languageButton.on("pointerdown", () => this.toggleLanguage());
      this.languageButton.on("pointerover", () => this.languageButton.setFillStyle(0x17496c, 0.52));
      this.languageButton.on("pointerout", () => this.languageButton.setFillStyle(0x10213e, 0.34));
      this.createTouchControls();
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
      const targetPhase = this.worldId === "mars" ? lunar.settings.insightTargetPhase
        : this.worldId === "deep" ? lunar.settings.keplerTargetPhase
          : lunar.settings.alsepTargetPhase;
      this.rhythmPanel.add(this.add.rectangle(640 + (340 * targetPhase) - 170, 480, 46, 22, 0xf0cd98, 0.94)
        .setStrokeStyle(2, 0xfff3cf, 1));
      this.rhythmPointer = this.add.circle(470, 480, 9, 0x95e3e1, 1)
        .setStrokeStyle(2, 0xf4ffff, 1);
      this.rhythmPanel.add(this.rhythmPointer);

      this.dialoguePanel = this.add.container(0, 0).setScrollFactor(0).setDepth(20).setVisible(false);
      this.dialoguePanel.add(this.add.rectangle(640, 566, 1120, 152, 0x10182c, 0.97)
        .setStrokeStyle(3, 0xe7c89b, 0.95));
      this.dialoguePanel.add(this.add.rectangle(640, 566, 1098, 130, 0x192641, 0.98)
        .setStrokeStyle(1, 0x8298b1, 0.7));
      this.dialogueSpeakerText = this.add.text(104, 512, "", {
        color: "#f0cd98", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "20px", fontStyle: "bold", letterSpacing: 1
      });
      this.dialogueText = this.add.text(104, 546, "", {
        color: "#fff8ec", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "22px", lineSpacing: 4, wordWrap: { width: 1040 }
      });
      this.dialogueContinueText = this.add.text(1172, 622, data.text.dialogueContinue, {
        color: "#b9d8e4", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "right"
      }).setOrigin(1, 0).setInteractive({ useHandCursor: true });
      this.dialogueContinueText.on("pointerdown", () => this.advanceDialogue());
      this.dialoguePanel.add([
        this.dialogueSpeakerText,
        this.dialogueText,
        this.dialogueContinueText
      ]);
    }

    createTouchControls() {
      this.touchControlsLayer = this.add.container(0, 0).setScrollFactor(0).setDepth(14);
      this.touchControlLabels = {};
      this.touchButtons = {};
      this.addTouchButton("left", 72, 622, data.text.touchLeft);
      this.addTouchButton("right", 182, 622, data.text.touchRight);
      this.addTouchButton("jump", 1090, 622, data.text.touchJump);
      this.addTouchButton("interact", 1202, 622, data.text.touchAction);
    }

    addTouchButton(action, x, y, label) {
      const button = this.add.rectangle(x, y, 100, 56, 0x12304d, 0.32)
        .setStrokeStyle(2, 0x7ceeff, 0.44)
        .setInteractive({ useHandCursor: true });
      const buttonLabel = this.add.text(x, y, label, {
        color: "#fff8ec", fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px", fontStyle: "bold", align: "center",
        wordWrap: { width: 94 }, stroke: "#08142b", strokeThickness: 3
      }).setOrigin(0.5).setAlpha(0.82);
      this.touchControlsLayer.add([button, buttonLabel]);
      this.touchButtons[action] = [button, buttonLabel];
      const setPressed = (pressed) => {
        button.setFillStyle(pressed ? 0x176f91 : 0x12304d, pressed ? 0.5 : 0.32);
        button.setStrokeStyle(2, pressed ? 0x9af8ff : 0x7ceeff, pressed ? 0.78 : 0.44);
        buttonLabel.setAlpha(pressed ? 1 : 0.82);
      };
      button.on("pointerdown", (pointer) => {
        this.touchInputState[action].add(pointer.id);
        if (action === "jump") this.touchJumpPressed = true;
        if (action === "interact") this.touchInteractPressed = true;
        setPressed(true);
      });
      const release = (pointer) => {
        this.releaseTouchPointer(pointer.id);
        setPressed(this.touchInputState[action].size > 0);
      };
      button.on("pointerup", release);
      button.on("pointerupoutside", release);
      this.touchControlLabels[action] = buttonLabel;
    }

    releaseTouchPointer(pointerId) {
      if (!this.touchInputState) return;
      Object.values(this.touchInputState).forEach((pointers) => pointers.delete(pointerId));
    }

    clearTouchInputs() {
      if (!this.touchInputState) return;
      Object.values(this.touchInputState).forEach((pointers) => pointers.clear());
      this.touchJumpPressed = false;
      this.touchInteractPressed = false;
    }

    pauseExpedition() {
      this.clearTouchInputs();
      this.scene.pause();
      this.scene.launch("PauseScene", { worldId: this.worldId });
    }

    startDialogue(dialogueId) {
      this.dialogueId = dialogueId;
      this.dialogueLines = lunar.dialogues[dialogueId];
      this.dialogueIndex = 0;
      this.dialogueOpen = true;
      this.player.body.setVelocity(0, 0);
      this.player.body.setAccelerationX(0);
      this.player.body.setAllowGravity(false);
      this.jumpBufferTimer = 0;
      this.dialoguePanel.setVisible(true);
      this.showDialogueLine();
    }

    showDialogueLine() {
      const line = this.dialogueLines[this.dialogueIndex];
      if (this.dialogueEvent) this.dialogueEvent.remove(false);
      this.dialogueSpeakerText.setText(line.speaker);
      this.dialogueText.setText("");
      this.dialogueContinueText.setText(data.text.dialogueContinue);
      this.dialogueIndexChar = 0;
      this.dialogueReady = false;
      this.dialogueEvent = this.time.addEvent({
        delay: 28,
        repeat: Math.max(0, line.text.length - 1),
        callback: () => {
          this.dialogueIndexChar += 1;
          this.dialogueText.setText(line.text.slice(0, this.dialogueIndexChar));
          if (this.dialogueIndexChar >= line.text.length) this.dialogueReady = true;
        }
      });
    }

    advanceDialogue() {
      if (!this.dialogueReady) {
        if (this.dialogueEvent) this.dialogueEvent.remove(false);
        const line = this.dialogueLines[this.dialogueIndex];
        this.dialogueText.setText(line.text);
        this.dialogueReady = true;
        return;
      }
      this.dialogueIndex += 1;
      if (this.dialogueIndex >= this.dialogueLines.length) {
        this.dialogueOpen = false;
        this.dialoguePanel.setVisible(false);
        this.player.body.setAllowGravity(true);
        this.updateNearbyStation();
        return;
      }
      this.showDialogueLine();
    }

    toggleLanguage() {
      const languageSaved = applyLanguage(data.language === "en" ? "es" : "en");
      this.refreshLanguage();
      if (!languageSaved) this.statusText.setText(data.text.languageStorageError);
    }

    refreshLanguage() {
      const nearbyId = this.nearStation && this.nearStation.id;
      const cardId = this.missionCardStationId;
      this.stations.forEach((station) => {
        const localized = lunar.stations.find((entry) => entry.id === station.id);
        station.title = localized.title;
        station.card = localized.card;
        this.stationLabels[station.id].setText(station.title);
      });
      this.nearStation = nearbyId ? this.getStation(nearbyId) : null;
      this.expeditionLabelText.setText(this.worldId === "mars"
        ? data.text.marsExpeditionLabel
        : this.worldId === "deep" ? data.text.deepSpaceExpeditionLabel
          : data.text.expeditionLabel);
      this.worldTitleText.setText(lunar.title);
      this.helpText.setText(data.text.touchControlsHint);
      this.languageButtonLabel.setText(data.text.languageButton);
      this.touchControlLabels.left.setText(data.text.touchLeft);
      this.touchControlLabels.right.setText(data.text.touchRight);
      this.touchControlLabels.jump.setText(data.text.touchJump);
      this.touchControlLabels.interact.setText(data.text.touchAction);
      this.dialogueContinueText.setText(data.text.dialogueContinue);
      this.updateStats();

      if (this.dialogueOpen) {
        this.dialogueLines = lunar.dialogues[this.dialogueId];
        this.showDialogueLine();
      }
      if (this.worldId === "mars" && this.marsActiveTrial === "pathfinder") {
        this.updatePathfinderProgress();
      } else if (this.worldId === "mars" && this.marsActiveTrial === "rovers") {
        this.statusText.setText(lunar.challenge.roverAlign);
        this.rhythmText.setText(lunar.challenge.roverProgress
          .replace("{current}", String(this.roverSunbeams))
          .replace("{total}", String(lunar.settings.roverRequiredSunbeams)));
      } else if (this.worldId === "mars" && this.marsActiveTrial === "viking") {
        this.statusText.setText(lunar.challenge.vikingAim);
      } else if (this.worldId === "mars" && this.marsActiveTrial === "insight") {
        this.statusText.setText(lunar.challenge.insightListen);
        this.rhythmText.setText(lunar.challenge.insightProgress
          .replace("{current}", String(this.insightPulses))
          .replace("{total}", String(lunar.settings.insightRequiredPulses)));
      } else if (this.worldId === "mars" && this.marsActiveTrial === "ingenuity") {
        this.statusText.setText(lunar.challenge.ingenuityFly);
      } else if (this.worldId === "deep" && this.deepActiveTrial === "dawn") {
        this.statusText.setText(lunar.challenge.dawnThrust);
      } else if (this.worldId === "deep" && this.deepActiveTrial === "near") {
        this.statusText.setText(lunar.challenge.nearDescend);
      } else if (this.worldId === "deep" && this.deepActiveTrial === "pioneer") {
        this.statusText.setText(lunar.challenge.pioneerCross);
      } else if (this.worldId === "deep" && this.deepActiveTrial === "kepler") {
        this.statusText.setText(lunar.challenge.keplerTransit);
        this.rhythmText.setText(this.keplerTransits
          ? lunar.challenge.keplerProgress
            .replace("{current}", String(this.keplerTransits))
            .replace("{total}", String(lunar.settings.keplerRequiredTransits))
          : lunar.challenge.keplerTransit);
      } else if (this.worldId === "deep" && this.deepActiveTrial === "voyager") {
        this.statusText.setText(lunar.challenge.voyagerFly);
      } else if (this.lrvDriving) {
        this.statusText.setText(lunar.challenge.lrvDrive);
      } else if (this.alsepActive) {
        this.statusText.setText(lunar.challenge.alsepListen);
        this.rhythmText.setText(this.alsepHits
          ? lunar.challenge.alsepProgress
            .replace("{current}", String(this.alsepHits))
            .replace("{total}", String(lunar.settings.alsepRequiredPulses))
          : lunar.challenge.alsepListen);
      } else if (this.surveyorActive) {
        this.statusText.setText(this.surveyorNightReady
          ? lunar.challenge.surveyorNight
          : lunar.challenge.surveyorLand);
      } else if (this.nearStation) {
        this.statusText.setText(`${this.nearStation.title} — ${lunar.interactionHint}`);
      } else {
        this.statusText.setText(lunar.hint);
      }

      if (this.missionCardOpen) {
        this.missionCardLayer.destroy(true);
        this.showMissionCard(this.getStation(cardId));
      }
      if (this.voyagerFinaleOpen) {
        this.voyagerFinaleLayer.destroy(true);
        this.openVoyagerFinale();
      }
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
        speedX: this.worldId === "mars" ? { min: -50, max: 65 }
          : this.worldId === "deep" ? { min: -8, max: 8 } : { min: -13, max: 13 },
        speedY: this.worldId === "mars" ? { min: -9, max: 12 }
          : this.worldId === "deep" ? { min: -10, max: 10 } : { min: -12, max: 3 },
        scale: this.worldId === "mars" ? { min: 0.3, max: 0.9 }
          : this.worldId === "deep" ? { min: 0.18, max: 0.55 } : { min: 0.25, max: 0.65 },
        alpha: { start: this.worldId === "mars" ? 0.5 : 0.38, end: 0 },
        lifespan: this.worldId === "mars" ? 3800 : this.worldId === "deep" ? 6200 : 5000,
        frequency: this.worldId === "mars" ? 65 : this.worldId === "deep" ? 135 : 110,
        maxParticles: this.worldId === "mars" ? 100 : this.worldId === "deep" ? 78 : 54,
        tint: this.worldId === "mars" ? [0xf1a36e, 0xd87955, 0xf5c38b]
          : this.worldId === "deep" ? [0x9fe5e1, 0xaeb8ff, 0xe9ddff] : [0xe8edfa, 0xf6dcae],
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
      if (this.worldId === "deep" && this.stations
        && !this.stations.every((station) => station.completed)) return;
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
      const missions = this.stations.filter((station) => station.completed).length;
      this.statsText.setText(
        `${data.text.parkourStars}: ${this.echoStars}     ${data.text.parkourBatteries}: ${"●".repeat(this.batteries)}${"○".repeat(3 - this.batteries)}     ${lunar.progressLabel}: ${missions}/${this.stations.length}`
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
      if (this.touchControlsLayer) {
        const overlayOpen = this.dialogueOpen || this.missionCardOpen || this.voyagerFinaleOpen;
        Object.keys(this.touchButtons).forEach((action) => {
          this.touchButtons[action].forEach((control) => control.setVisible(!overlayOpen && !this.completed));
        });
      }
      if (!this.player) return;
      if (this.completed) {
        if (Phaser.Input.Keyboard.JustDown(this.keys.escape)) this.scene.start("MenuScene");
        return;
      }
      const dt = Math.min(delta / 1000, 0.04);
      const body = this.player.body;
      const grounded = body.blocked.down || body.touching.down;
      const left = this.keys.left.isDown || this.keys.a.isDown || this.touchInputState.left.size > 0;
      const right = this.keys.right.isDown || this.keys.d.isDown || this.touchInputState.right.size > 0;
      const direction = Number(right) - Number(left);
      const jumpPressed = this.jumpKeys.some((key) => Phaser.Input.Keyboard.JustDown(key))
        || this.touchJumpPressed;
      this.touchJumpPressed = false;
      const jumpHeld = this.jumpKeys.some((key) => key.isDown) || this.touchInputState.jump.size > 0;
      const interactPressed = Phaser.Input.Keyboard.JustDown(this.keys.interact)
        || Phaser.Input.Keyboard.JustDown(this.keys.enter)
        || this.touchInteractPressed;
      this.touchInteractPressed = false;
      const escapePressed = Phaser.Input.Keyboard.JustDown(this.keys.escape);
      const pausePressed = Phaser.Input.Keyboard.JustDown(this.keys.pause);
      const languagePressed = Phaser.Input.Keyboard.JustDown(this.keys.language);

      if (escapePressed) {
        this.scene.start("MenuScene");
        return;
      }
      if (pausePressed) {
        this.pauseExpedition();
        return;
      }
      if (languagePressed) {
        this.toggleLanguage();
        return;
      }

      if (this.dialogueOpen) {
        if (interactPressed) this.advanceDialogue();
        return;
      }

      if (this.voyagerFinaleOpen) {
        if (interactPressed) this.scene.start("MenuScene");
        return;
      }

      if (this.missionCardOpen) {
        if (interactPressed) this.closeMissionCard();
        return;
      }

      this.updateNearbyStation();
      if (interactPressed) this.handleStationInteraction(time);
      if (this.missionCardOpen) return;
      if (this.lrvDriving) {
        this.updateLrvTrial(direction, jumpPressed);
        return;
      }
      if (this.alsepActive) {
        this.updateAlsep(time, jumpPressed);
        return;
      }
      if (this.worldId === "mars" && this.marsActiveTrial
        && this.marsActiveTrial !== "pathfinder") {
        this.updateMarsTrial(time, delta, direction, jumpPressed, jumpHeld);
        return;
      }
      if (this.worldId === "deep" && this.deepActiveTrial
        && this.deepActiveTrial !== "pioneer") {
        this.updateDeepSpaceTrial(time, delta, direction, jumpHeld, jumpPressed);
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
      if (this.inWind) {
        const gust = Math.sin(time * 0.0007) >= 0 ? 125 : -125;
        body.setAccelerationX(body.acceleration.x + gust);
      }
      if (this.inCurrent) {
        body.setAccelerationX(body.acceleration.x + Math.sin(time * 0.0006) * 145);
        body.setAccelerationY(Math.cos(time * 0.00045) * 135);
      } else body.setAccelerationY(0);

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
      this.inCurrent = false;
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
      this.updatePioneerTrial();
      if (this.marsStormShade) {
        this.marsStormShade.setAlpha(0.035 + (Math.sin(time * 0.00055) + 1) * 0.075);
      }

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
    SystemMapScene,
    CreditsScene,
    JournalScene,
    PauseScene,
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
