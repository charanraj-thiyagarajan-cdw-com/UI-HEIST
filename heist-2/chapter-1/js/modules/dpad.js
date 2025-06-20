// Module for D-Pad controls
import { movePlayer } from "./canvas.js";

export function setupDpadControls() {
  const $upBtn = $(".dpad-btn.up");
  const $downBtn = $(".dpad-btn.down");
  const $leftBtn = $(".dpad-btn.left");
  const $rightBtn = $(".dpad-btn.right");

  const directions = [
    { btn: $upBtn, dir: "up" },
    { btn: $downBtn, dir: "down" },
    { btn: $leftBtn, dir: "left" },
    { btn: $rightBtn, dir: "right" },
  ];
  directions.forEach(({ btn, dir }) => {
    btn.on("mousedown", () => movePlayer(dir, "down"));
    btn.on("mouseup", () => movePlayer(dir, "up"));
  });

  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  $(document).on("keydown", (e) => {
    if (keyMap[e.key]) movePlayer(keyMap[e.key], "down");
  });
  $(document).on("keyup", (e) => {
    if (keyMap[e.key]) movePlayer(keyMap[e.key], "up");
  });
}
