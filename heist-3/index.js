const CARS = [
  { src: "./assets/black.png", alt: "black" },
  { src: "./assets/violet.png", alt: "violet" },
  { src: "./assets/white.png", alt: "white" },
  { src: "./assets/yellow.png", alt: "yellow" },
];
const CARS_LENGTH = CARS.length;
const CAR_ANIMATIONS = {
  left: { sp: 28, inc: 8 },
  right: { sp: 22, inc: 8 },
  bottom1: { sp: 22, inc: 13 },
  bottom2: { sp: 22, inc: 13 },
  top1: { sp: 10, inc: 13 },
  top2: { sp: 10, inc: 13 },
};
const MOVING_CARS = {
  left: [],
  right: [],
  bottom1: [],
  bottom2: [],
  top1: [],
  top2: [],
};

const leftRoad = $("#leftRoad");
const rightRoad = $("#rightRoad");
const bottomRoad1 = $("#bottomRoad1");
const bottomRoad2 = $("#bottomRoad2");
const topRoad1 = $("#topRoad1");
const topRoad2 = $("#topRoad2");

const addCarEventListener = (car, direction) => {
  const checkCondition = (direction) => {
    const rect = car[0].getBoundingClientRect();
    switch (direction) {
      case "left":
        return rect.left <= 0;
      case "right":
        return rect.right >= window.innerWidth;
      case "top1":
      case "top2":
        return rect.top <= 0;
      case "bottom1":
      case "bottom2":
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

  const startingPosition = animation.sp - carsLength * animation.inc;
  const car = $("<img>", {
    src: CARS[randomCar].src,
    alt: CARS[randomCar].alt,
    class: `car ${direction}`,
    "data-direction": direction,
    css: {
      animation: `start${direction.replace(/\d+/g, "")} 1s linear forwards`,
      "--start-position": `${startingPosition}%`,
    },
  });
  setTimeout(() => {
    car.css("animation-delay", `${carsLength * 0.25}s`);
  }, 0);
  MOVING_CARS[direction].push(car);
  return car;
};

const moveCars = (cars) => {
  let delay = 0;
  cars.each(function () {
    const $car = $(this);
    const direction = $car.data("direction");
    setTimeout(() => {
      $car.css({ animation: `move${direction.replace(/\d+/g, "")} 3s ease-in forwards` });
    }, delay * 200);
    addCarEventListener($car, direction);
    delay += Math.random() * 1.25 + 0.25;
  });
};

$(document).ready(() => {
  let alternateFlag = true;
  for (let i = 0; i < 6; i++) {
    leftRoad.append(createCar("left"));
    rightRoad.append(createCar("right"));
  }
  setInterval(() => {
    if (alternateFlag) {
      moveCars($(".car.left"));
      moveCars($(".car.right"));
      for (let i = 0; i < 4; i++) {
        bottomRoad1.append(createCar("bottom1"));
        bottomRoad2.append(createCar("bottom2"));
        topRoad1.append(createCar("top1"));
        topRoad2.append(createCar("top2"));
      }
    } else {
      moveCars($(".car.top1"));
      moveCars($(".car.top2"));
      moveCars($(".car.bottom1"));
      moveCars($(".car.bottom2"));
      for (let i = 0; i < 6; i++) {
        leftRoad.append(createCar("left"));
        rightRoad.append(createCar("right"));
      }
    }
    alternateFlag = !alternateFlag;
  }, 5000);
});
