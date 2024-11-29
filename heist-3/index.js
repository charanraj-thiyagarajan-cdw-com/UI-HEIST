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
const CAR_ANIMATIONS = {
  left: { sp: 27, inc: 8 },
  right: { sp: 21, inc: 8 },
  bottom1: { sp: 22, inc: 13 },
  bottom2: { sp: 22, inc: 13 },
  top1: { sp: 10, inc: 13 },
  top2: { sp: 10, inc: 13 },
};
const HUMAN_ANIMATIONS = {
  vertical1: { sp: 15, inc: 4 },
  vertical2: { sp: 15, inc: 4 },
  horizontal1: { sp: 28, inc: 4 },
  horizontal2: { sp: 28, inc: 4 },
};
const ROAD_ELEMENTS = {
  left: $("#leftRoad"),
  right: $("#rightRoad"),
  bottom1: $("#bottomRoad1"),
  bottom2: $("#bottomRoad2"),
  top1: $("#topRoad1"),
  top2: $("#topRoad2"),
  vertical1: $("#verticalZCross1"),
  vertical2: $("#verticalZCross2"),
  horizontal1: $("#horizontalZCross1"),
  horizontal2: $("#horizontalZCross2"),
};
const TRAFFIC_LIGHTS = {
  yGreen: $(".y-light.green-light"),
  yRed: $(".y-light.red-light"),
  xGreen: $(".x-light.green-light"),
  xRed: $(".x-light.red-light"),
};
const MOVING_CARS = Object.keys(CAR_ANIMATIONS).reduce((acc, key) => ({ ...acc, [key]: [] }), {});
const MOVING_HUMANS = Object.keys(HUMAN_ANIMATIONS).reduce((acc, key) => ({ ...acc, [key]: [] }), {});

const getRandomCar = () => CARS[Math.floor(Math.random() * CARS.length)];
const getRandomHuman = () => HUMANS[Math.floor(Math.random() * HUMANS.length)];

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

const createHuman = (direction) => {
  const { src, alt } = getRandomHuman();
  const { sp, inc } = HUMAN_ANIMATIONS[direction];
  const humansLength = MOVING_HUMANS[direction].length;
  const positionOffset = sp - humansLength * inc;

  const human = $("<img>", {
    src,
    alt,
    class: `human ${direction}`,
    "data-direction": direction,
    css: {
      animation: `startto${direction.replace(/\d+/g, "")} 3s linear forwards`,
      "--start-position": `${positionOffset}%`,
    },
  });
  setTimeout(() => {
    human.css("animation-delay", `${humansLength * 0.25}s`);
  }, 0);
  human.on("animationend", () => {
    MOVING_HUMANS[direction].push(human);
  });
  ROAD_ELEMENTS[direction].append(human);
  return human;
};

const moveCars = (direction) => {
  const isNorthSouth = ["top1", "top2", "bottom1", "bottom2"].includes(direction);
  const isLightGreen = isNorthSouth ? TRAFFIC_LIGHTS.yGreen.hasClass("visible") : TRAFFIC_LIGHTS.xGreen.hasClass("visible");
  if (!isLightGreen) return;

  MOVING_CARS[direction].forEach((car, index) => {
    MOVING_CARS[direction].shift();
    setTimeout(() => {
      car.css({ animation: `move${direction.replace(/\d+/g, "")} 3s ease-in forwards` });
    }, index * Math.floor(Math.random() * 10) + 240);
    car.on("animationend", () => {
      car.remove();
    });
  });
};

const moveHumans = (direction) => {
  MOVING_HUMANS[direction].forEach((human, index) => {
    MOVING_HUMANS[direction].shift();
    setTimeout(() => {
      human.css({ animation: `move${direction.replace(/\d+/g, "")} 8s ease-in forwards` });
    }, index * Math.floor(Math.random() * 10) + 240);
    human.on("animationend", () => {
      human.remove();
    });
  });
};

const initializeTraffic = (directions, vehicleFrequency) => {
  directions.forEach((direction) => {
    setInterval(() => createCar(direction), 1000 / vehicleFrequency);
  });
};

const initializePedestrianTraffic = (directions, pedestrianFrequency) => {
  directions.forEach((direction, index) => {
    setInterval(() => createHuman(direction), 1000 / pedestrianFrequency + index * 250);
  });
};

const toggleTrafficLights = (isNorthSouthActive) => {
  TRAFFIC_LIGHTS.yGreen.toggleClass("visible", isNorthSouthActive);
  TRAFFIC_LIGHTS.yRed.toggleClass("visible", !isNorthSouthActive);
  TRAFFIC_LIGHTS.xGreen.toggleClass("visible", !isNorthSouthActive);
  TRAFFIC_LIGHTS.xRed.toggleClass("visible", isNorthSouthActive);
};

const setAllRed = () => {
  TRAFFIC_LIGHTS.yGreen.removeClass("visible");
  TRAFFIC_LIGHTS.yRed.addClass("visible");
  TRAFFIC_LIGHTS.xGreen.removeClass("visible");
  TRAFFIC_LIGHTS.xRed.addClass("visible");
};

const clearTraffic = (directions) => {
  directions.forEach(moveCars);
};

const clearPedestrianTraffic = (directions) => {
  directions.forEach(moveHumans);
};

$(document).ready(() => {
  const northSouthDirections = ["top1", "top2", "bottom1", "bottom2"];
  const eastWestDirections = ["left", "right"];
  const pedestrianDirections = ["vertical1", "vertical2", "horizontal1", "horizontal2"];

  let isNorthSouthActive = false;

  initializeTraffic(northSouthDirections, 8 / 60);
  initializeTraffic(eastWestDirections, 6 / 60);
  initializePedestrianTraffic(pedestrianDirections, 7 / 60);
  toggleTrafficLights(isNorthSouthActive);

  setInterval(() => {
    setAllRed();
    setTimeout(() => {
      isNorthSouthActive = !isNorthSouthActive;
      toggleTrafficLights(isNorthSouthActive);
    }, 2000);
  }, 10 * 1000);

  setInterval(() => {
    const currentMoving = isNorthSouthActive ? northSouthDirections : eastWestDirections;
    const currentHumansMoving = isNorthSouthActive ? ["vertical1", "vertical2"] : ["horizontal1", "horizontal2"];
    clearTraffic(currentMoving);
    clearPedestrianTraffic(currentHumansMoving);
  }, 1000);

  setInterval(() => {
    $("#topCount").text(MOVING_CARS["top1"].length + MOVING_CARS["top2"].length);
    $("#bottomCount").text(MOVING_CARS["bottom1"].length + MOVING_CARS["bottom2"].length);
    $("#leftCount").text(MOVING_CARS["left"].length);
    $("#rightCount").text(MOVING_CARS["right"].length);
    $("#vertHumanCount").text(MOVING_HUMANS["vertical1"].length + MOVING_HUMANS["vertical2"].length);
    $("#horizHumanCount").text(MOVING_HUMANS["horizontal1"].length + MOVING_HUMANS["horizontal2"].length);
  }, 1000);
});
