/**
 * Functions to handle car speed
 */
const increaseSpeed = () => {
  if (speed <= 40) {
    speed += 1;
  } else if (speed < 140) {
    speed += 3;
  } else if (speed < 280) {
    speed += 5;
  } else {
    speed = 280;
  }
  if (speed >= 80) {
    speedWarning.removeClass("d-none");
  }
  updateSpeed(speed);
};

const decreaseSpeed = () => {
  if (speed >= 100) {
    speed -= 5;
  } else if (speed >= 30) {
    speed -= 3;
  } else if (speed > 1) {
    speed -= 1;
  } else {
    speed = 0;
  }
  if (speed < 80) {
    speedWarning.addClass("d-none");
  }
  updateSpeed(speed);
};

const animationSpeed = (speed) => {
  let animationTime;
  if (speed == 0) {
    animationTime = 0;
  } else if (speed <= 40) {
    animationTime = 2;
  } else if (speed <= 120) {
    animationTime = 1.2;
  } else if (speed <= 180) {
    animationTime = 0.8;
  } else if (speed <= 280) {
    animationTime = 0.25;
  }
  dice.css("animation", `swing ${animationTime}s ease-in-out infinite alternate`);
};

const updateSpeed = (speed) => {
  speedValue.text(speed);
  videoSpeedHandler(speed);
  animationSpeed(speed);
};
