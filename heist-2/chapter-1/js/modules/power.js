// Module for power controls
import { startCanvasAnimation, stopCanvasAnimation, showCanvas } from "./canvas.js";

export function setupPowerControls() {
  const $startBtn = $(".start-btn");
  const $powerBtn = $(".power-on-btn");
  const $stopBtn = $(".stop-btn");
  const $canvas = $(".game-canvas");
  let isPoweredOn = false;

  $startBtn.on("click", () => {
    if (isPoweredOn) {
      startCanvasAnimation();
    }
  });

  $powerBtn.on("click", () => {
    isPoweredOn = !isPoweredOn;
    if (isPoweredOn) {
      $powerBtn.css({ background: "#ffffff" });
      $canvas.show();
      showCanvas();
    } else {
      $powerBtn.css({ background: "#ae0a15" });
      $canvas.hide();
      stopCanvasAnimation();
    }
  });

  $stopBtn.on("click", () => {
    if (isPoweredOn) {
      stopCanvasAnimation();
    }
  });
  $powerBtn.trigger("click");
  $startBtn.trigger("click");
}
