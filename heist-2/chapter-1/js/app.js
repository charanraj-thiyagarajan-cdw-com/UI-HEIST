import { setupVolumeControls } from "./modules/volume.js";
import { setupDpadControls } from "./modules/dpad.js";
import { setupPowerControls } from "./modules/power.js";
import { setupPlayControls } from "./modules/play.js";
import { startCanvasAnimation } from "./modules/canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  setupVolumeControls();
  setupDpadControls();
  setupPowerControls();
  setupPlayControls();
  startCanvasAnimation();
});
