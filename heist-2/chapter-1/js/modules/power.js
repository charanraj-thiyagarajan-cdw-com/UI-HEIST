// Module for power controls
export function setupPowerControls() {
  const $startBtn = $(".start-btn");
  const $powerBtn = $(".power-on-btn");
  const $stopBtn = $(".stop-btn");

  $startBtn.on("click", () => {
    console.log("Start Pressed");
  });
  $powerBtn.on("click", () => {
    console.log("Power Pressed");
  });
  $stopBtn.on("click", () => {
    console.log("Stop Pressed");
  });
}
