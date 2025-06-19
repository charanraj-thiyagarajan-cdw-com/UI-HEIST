// Module for D-Pad controls
export function setupDpadControls() {
  const $upBtn = $(".dpad-btn.up");
  const $downBtn = $(".dpad-btn.down");
  const $leftBtn = $(".dpad-btn.left");
  const $rightBtn = $(".dpad-btn.right");

  $upBtn.on("click", () => {
    console.log("D-Pad Up");
  });
  $downBtn.on("click", () => {
    console.log("D-Pad Down");
  });
  $leftBtn.on("click", () => {
    console.log("D-Pad Left");
  });
  $rightBtn.on("click", () => {
    console.log("D-Pad Right");
  });
}
