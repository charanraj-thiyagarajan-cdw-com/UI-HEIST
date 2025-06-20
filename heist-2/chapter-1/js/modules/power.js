// Module for power controls
import { startCanvasAnimation, stopCanvasAnimation, showStartScreen } from "./canvas.js";
import { loadTilesImage } from "./image.js";
import { playGameAudio, stopGameAudio } from "./volume.js";

export function setupPowerControls() {
  const $startBtn = $(".start-btn");
  const $powerBtn = $(".power-on-btn");
  const $stopBtn = $(".stop-btn");
  const $canvas = $(".game-canvas");
  let isPoweredOn = false;

  $startBtn.on("click", () => {
    if (isPoweredOn) {
      startCanvasAnimation();
      playGameAudio();
    }
  });

  $powerBtn.on("click", () => {
    isPoweredOn = !isPoweredOn;
    if (isPoweredOn) {
      $powerBtn.css({ background: "#ffffff" });
      $canvas.show();
      showStartScreen();
      loadTilesImage();
    } else {
      $powerBtn.css({ background: "#ae0a15" });
      $canvas.hide();
      stopCanvasAnimation();
    }
  });

  $stopBtn.on("click", () => {
    if (isPoweredOn) {
      stopCanvasAnimation();
      showStartScreen();
      stopGameAudio();
    }
  });
}
