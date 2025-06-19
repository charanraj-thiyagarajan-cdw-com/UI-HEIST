// Module for volume controls
export function setupVolumeControls() {
  const $increaseBtn = $(".increase-btn");
  const $decreaseBtn = $(".decrease-btn");
  const $muteBtn = $(".mute-btn");
  const $volumeLevel = $(".volume-level");
  let volume = 50;

  function updateVolumeBar() {
    $volumeLevel.css("height", `${volume}%`);
  }

  $increaseBtn.on("click", () => {
    if (volume < 100) volume += 10;
    updateVolumeBar();
  });
  $decreaseBtn.on("click", () => {
    if (volume > 0) volume -= 10;
    updateVolumeBar();
  });
  $muteBtn.on("click", () => {
    volume = 0;
    updateVolumeBar();
  });

  updateVolumeBar();
}
