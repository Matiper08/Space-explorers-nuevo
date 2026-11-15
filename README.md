<!-- Created with AI assistance (Claude, GitHub Copilot) -->
# Space Explorers: The Quiet Signal

A browser-based 2D platform adventure for the NASA Space Apps Challenge 2026 challenge **NASA's Discarded Equipment Storytelling**. Maia and her companion Tuerca follow signals from robotic explorers and human spaceflight hardware across the Moon, Mars, and deep space.

- **Challenge page:** <https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/>
- **Repository:** <https://github.com/Matiper08/Space-explorers-nuevo>

The story is built around a gentle idea: forgotten does not always mean abandoned. Each encounter pairs a short playable activity with a mission card that explains what an object was, why it went, how it worked, what was learned, and what happened next.

## Play

Open [`index.html`](./index.html) in a modern browser with an internet connection so Phaser can load from its CDN. If your browser restricts local files, serve the repository root with a static server:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000/`. No Node.js, npm, or build step is required.

The files are ready to be served as a static site on GitHub Pages. To publish, open the repository's **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save. Verify the resulting site loads before sharing a live-demo link; this repository's Pages deployment has not been verified here.

## Worlds and encounters

Each world is one continuous route with mission stations along the way:

- **The Moon:** Apollo 11's Eagle Lunar Module, the Apollo 15 Lunar Roving Vehicle, Apollo 12 ALSEP, and Surveyor 3.
- **Mars:** Mars Pathfinder, Spirit and Opportunity, Viking 1, InSight, and Ingenuity.
- **Deep space and other bodies:** Dawn, NEAR Shoemaker, Pioneer 10, Kepler, and Voyager 1 and 2.

That is 14 mission stations across three worlds. Voyager is the deep-space finale. The System Map labels itself as a story map and **not to scale**.

## Controls

| Action | Keyboard | On-screen controls |
| --- | --- | --- |
| Move | `A` / `D` or `←` / `→` | `LEFT` / `RIGHT` |
| Jump; jump again in the air for a boost | `Space`, `W`, or `↑` | `JUMP` |
| Interact, continue dialogue, or close a mission card | `E` or `Enter` | `ACTION` in the route; tap the prompt in a dialogue or card |
| Pause / resume | `P` toggles pause; `Esc` returns to the main menu from any game screen | — |
| Change language | `L` or the language button | Language button |
| Browse the Journal | `←` / `→`; `Enter` or `Esc` returns | Use the on-screen navigation buttons |

The menu's system map can be navigated with `←` / `→` and `Enter`, or by selecting a world with the pointer. The on-screen route controls work with touch and mouse.

## Features

- Phaser 3.80.1 from a pinned CDN URL; HTML, CSS, and JavaScript only.
- Procedurally drawn Canvas 2D textures and layered scenery; no AI-generated images or audio.
- A platforming route with acceleration, buffered and variable jumps, double jump, wall slide/jump, moving and falling platforms, springs, and world-specific movement areas.
- A HUD for echo stars, batteries, and mission progress; Tuerca can rescue Maia.
- English by default, Spanish available with `L`, and a Journal that stores recovered mission cards in the browser's local storage.
- Keyboard, pointer, and on-screen route controls. The game has no voice acting or audio track.

## Accuracy and sources

Mission-card facts are drawn from the official NASA pages listed in [`CREDITS.md`](./CREDITS.md). A claim marked `// VERIFY` in `datos.js` needs further verification against the cited source and should not be presented as confirmed. The game is an educational fan project and is not affiliated with or endorsed by NASA.

## Project documents

- [`CREDITS.md`](./CREDITS.md) — mission, framework, and project credits.
- [`AI_DISCLOSURE.md`](./AI_DISCLOSURE.md) — AI assistance and asset disclosure.
- [`SUBMISSION.md`](./SUBMISSION.md) — challenge submission summary.
- [`DEMO_SCRIPT.md`](./DEMO_SCRIPT.md) — suggested walkthrough.
