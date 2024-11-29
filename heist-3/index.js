const CARS = [
  { src: "./assets/black.png", alt: "black" },
  { src: "./assets/violet.png", alt: "violet" },
  { src: "./assets/white.png", alt: "white" },
  { src: "./assets/yellow.png", alt: "yellow" },
];
const HUMANS = [
  { src: "./assets/hm1.png", alt: "human1" },
  { src: "./assets/hm2.png", alt: "human2" },
  { src: "./assets/hm3.png", alt: "human3" },
  { src: "./assets/hm4.png", alt: "human4" },
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
const ROAD_ELEMENTS = {
  left: $("#leftRoad"),
  right: $("#rightRoad"),
  bottom1: $("#bottomRoad1"),
  bottom2: $("#bottomRoad2"),
  top1: $("#topRoad1"),
  top2: $("#topRoad2"),
};
const TRAFFIC_LIGHTS = {
  yGreen: $(".y-light.green-light"),
  yRed: $(".y-light.red-light"),
  xGreen: $(".x-light.green-light"),
  xRed: $(".x-light.red-light"),
};
const MOVING_CARS = Object.keys(CAR_ANIMATIONS).reduce((acc, key) => ({ ...acc, [key]: [] }), {});

const getRandomCar = () => CARS[Math.floor(Math.random() * CARS.length)];

const addAnimationEndListener = (car, direction) => {
  car.on("animationend", () => {
    const rect = car[0].getBoundingClientRect();
    const isOutOfView =
      (direction === "left" && rect.left <= 0) ||
      (direction === "right" && rect.right >= window.innerWidth) ||
      (direction.startsWith("top") && rect.top <= 0) ||
      (direction.startsWith("bottom") && rect.bottom >= window.innerHeight);

    if (isOutOfView) {
      car.remove();
      MOVING_CARS[direction].shift();
    }
  });
};

const createCar = (direction) => {
  const { src, alt } = getRandomCar();
  const { sp, inc } = CAR_ANIMATIONS[direction];
  const carsLength = MOVING_CARS[direction].length;
  const positionOffset = sp - carsLength * inc;

  const car = $("<img>", {
    src,
    alt,
    class: `car ${direction}`,
    "data-direction": direction,
    css: {
      animation: `startto${direction.replace(/\d+/g, "")} 1s linear forwards`,
      "--start-position": `${positionOffset}%`,
    },
  });
  setTimeout(() => {
    car.css("animation-delay", `${carsLength * 0.25}s`);
  }, 0);
  MOVING_CARS[direction].push(car);
  ROAD_ELEMENTS[direction].append(car);
  return car;
};

const moveCars = (direction) => {
  MOVING_CARS[direction].forEach((car, index) => {
    setTimeout(() => {
      car.css({ animation: `move${direction.replace(/\d+/g, "")} 3s ease-in forwards` });
    }, index * Math.floor(Math.random() * 10) + 240);
    addAnimationEndListener(car, direction);
  });
};

const initializeCars = (directions, count) => {
  directions.forEach((direction) => {
    for (let i = 0; i < count; i++) {
      createCar(direction);
    }
  });
};

const toggleTrafficLights = (isYActive) => {
  TRAFFIC_LIGHTS.yGreen.toggleClass("visible", isYActive);
  TRAFFIC_LIGHTS.yRed.toggleClass("visible", !isYActive);
  TRAFFIC_LIGHTS.xGreen.toggleClass("visible", !isYActive);
  TRAFFIC_LIGHTS.xRed.toggleClass("visible", isYActive);
};

$(document).ready(() => {
  let isYActive = false;
  initializeCars(["left", "right"], 6);
  toggleTrafficLights(!isYActive);

  setInterval(() => {
    const incoming = isYActive ? ["left", "right"] : ["top1", "top2", "bottom1", "bottom2"];
    const moving = isYActive ? ["bottom1", "bottom2", "top1", "top2"] : ["left", "right"];
    moving.forEach(moveCars);
    initializeCars(incoming, isYActive ? 6 : 4);
    toggleTrafficLights(isYActive);
    isYActive = !isYActive;
  }, 5000);
});
