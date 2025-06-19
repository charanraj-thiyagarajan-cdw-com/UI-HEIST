// Module for play (A/B) controls
export function setupPlayControls() {
  const $aBtn = $(".a-btn");
  const $bBtn = $(".b-btn");

  $aBtn.on("click", () => {
    console.log("A Button Pressed");
  });
  $bBtn.on("click", () => {
    console.log("B Button Pressed");
  });
}
