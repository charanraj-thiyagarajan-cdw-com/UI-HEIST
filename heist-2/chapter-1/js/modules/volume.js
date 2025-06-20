// Module for volume controls
let audio, jumpAudio, deathAudio, finishAudio;
let volume = 0.5;

export function playGameAudio() {
  if (!audio) {
    audio = new Audio("./assets/audio/world.mp3");
    audio.loop = true;
  }
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();
}

export function stopGameAudio() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

export function playJumpAudio() {
  if (!jumpAudio) {
    jumpAudio = new Audio("./assets/audio/jump.ogg");
  }
  jumpAudio.currentTime = 0;
  jumpAudio.volume = volume;
  jumpAudio.play();
}

export function playDeathAudio() {
  if (!deathAudio) {
    deathAudio = new Audio("./assets/audio/death.wav");
  }
  deathAudio.currentTime = 0;
  deathAudio.volume = volume;
  deathAudio.play();
}

export function playFinishAudio() {
  if (!finishAudio) {
    finishAudio = new Audio("./assets/audio/finish.mp3");
  }
  finishAudio.currentTime = 0;
  finishAudio.volume = volume;
  finishAudio.play();
}

export function setupVolumeControls() {
  const $increaseBtn = $(".increase-btn");
  const $decreaseBtn = $(".decrease-btn");
  const $muteBtn = $(".mute-btn");
  const $volumeLevel = $(".volume-level");

  function updateVolumeBar() {
    $volumeLevel.css("height", `${volume * 100}%`);
  }

  function applyVolume() {
    if (audio) audio.volume = volume;
    if (jumpAudio) jumpAudio.volume = volume;
    if (deathAudio) deathAudio.volume = volume;
    if (finishAudio) finishAudio.volume = volume;
    updateVolumeBar();
  }

  $increaseBtn.on("click", () => {
    if (volume < 1) volume = Math.min(1, volume + 0.1);
    applyVolume();
  });
  $decreaseBtn.on("click", () => {
    if (volume > 0) volume = Math.max(0, volume - 0.1);
    applyVolume();
  });
  $muteBtn.on("click", () => {
    volume = 0;
    applyVolume();
  });

  applyVolume();
}
