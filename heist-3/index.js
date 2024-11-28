const CARS = [
  { src: "./assets/black.png", alt: "black" },
  { src: "./assets/violet.png", alt: "violet" },
  { src: "./assets/white.png", alt: "white" },
  { src: "./assets/yellow.png", alt: "yellow" },
];
const CARS_LENGTH = CARS.length;
const CAR_ANIMATIONS = {
  left: { sp: 68, inc: 8 },
  right: { sp: 74, inc: 8 },
};
const MOVING_CARS = {
  left: [],
  right: [],
  bottom: [],
  top: [],
};

const leftRoad = $("#leftRoad");
const rightRoad = $("#rightRoad");
const bottomRoad = $("#bottomRoad");
const topRoad = $("#topRoad");

const addCarEventListener = (car, direction) => {
  const checkCondition = (direction) => {
    const rect = car[0].getBoundingClientRect();
    switch (direction) {
      case "left":
        return rect.left <= 0;
      case "right":
        return rect.right >= window.innerWidth;
      case "top":
        return rect.top <= 0;
      case "bottom":
        return rect.bottom >= window.innerHeight;
    }
  };
  car.on("animationend", () => {
    if (checkCondition(direction)) {
      car.remove();
      MOVING_CARS[direction].shift();
    }
  });
};

const createCar = (direction) => {
  const randomCar = Math.floor(Math.random() * CARS_LENGTH);
  const animation = CAR_ANIMATIONS[direction];
  const carsLength = MOVING_CARS[direction].length;

  const startingPosition = animation.sp + carsLength * animation.inc;
  const car = $("<img>", {
    src: CARS[randomCar].src,
    alt: CARS[randomCar].alt,
    class: `car ${direction}`,
    css: {
      [direction]: `${startingPosition}%`,
      animation: `move${direction} 5s linear forwards`,
    },
  });
  setTimeout(() => {
    car.css("animation-delay", `${carsLength * 0.25}s`);
  }, 0);
  addCarEventListener(car, direction);
  MOVING_CARS[direction].push(car);
  return car;
};

$(document).ready(() => {
  for (let i = 0; i < 8; i++) {
    const car = createCar("left");
    leftRoad.append(car);
    const rightCar = createCar("right");
    rightRoad.append(rightCar);
  }
});
