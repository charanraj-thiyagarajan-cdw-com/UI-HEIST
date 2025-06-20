// Module for play (A/B) controls
import { movePlayer } from "./canvas.js";

export function setupPlayControls() {
  const $aBtn = $(".a-btn");
  const $bBtn = $(".b-btn");

  $aBtn.on("click", () => movePlayer("a"));
  $bBtn.on("click", () => movePlayer("b"));

  $(document).on("keydown", (e) => {
    if (e.key.toLowerCase() === "a") movePlayer("a");
    if (e.key.toLowerCase() === "b") movePlayer("b");
  });
}
