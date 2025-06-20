# Super Mario Game (heist-2/chapter-1)

A modular, canvas-based Mario-style game with audio, character switching, and a classic UI.

## Features

- **Canvas-based Mario Game** with modular JS code.
- **Character switching**: Play as Mario or Luigi (press A/B).
- **Game over and logo screens** for start/stop/game end.
- **Power, Start, Stop controls** to start/stop the game.
- **Dpad and Keyboard controls** to move the mario character.
- **Volume controls** that can control audio.
- **Background music, jump, death, and finish sounds**.

## Instructions to run

- You can download the folder and directly open `index.html` to view the output, or you can also use the below hosted link:

  [UI HEIST - Mario Game](https://charanraj-thiyagarajan-cdw-com.github.io/UI-HEIST/heist-2/chapter-1/index.html)

- Webpage is not fully responsive, use the webpage in fullscreen to view a clean output.

## Folder Structure

```
assets/
  audio/         # Sound effects and music (mp3, wav, ogg)
  icons/         # UI icons for controls
  sprites/       # Sprite sheets for tiles, characters, logo, castle, etc.
js/
  app.js         # Main entry, sets up all controls and game
  modules/
    canvas.js    # Game rendering, logic, and state
    dpad.js      # D-Pad controls
    image.js     # Sprite/image management
    play.js      # Play button logic
    power.js     # Power/start/stop logic
    volume.js    # Volume and audio logic
styles/
  styles.css     # Main stylesheet
  modules/       # Modular CSS for layout, controls, etc.
index.html       # Main HTML file
```

## How to Play

1. **Power on** the console (Power button).
2. **Press Start** to begin the game.
3. Use the **D-Pad or Arrow keys** to move and jump.
4. **A/B** switches between Mario and Luigi.
5. **Stop** shows the logo; dying shows the game over screen.
6. Adjust **volume** with the side controls.
