/**
 * Functions to handle car fuel
 */
const reduceFuel = () => {
  if (engineStart) {
    timerFn = setInterval(() => {
      carRunTime += FUEL_DECREASE_INTERVAL;
      const progress = (1 - carRunTime / FUEL_RUN_TIME) * 100;
      fuel -= 1;
      let progressColor;
      if (progress > 60) {
        progressColor = "#4caf50";
      } else if (progress > 20) {
        progressColor = "#f59639";
      } else {
        progressColor = "#ff0000";
      }
      fuelBar.css({ "background-color": progressColor, width: `${progress}%` });
      fuelValue.text(fuel);
      if (carRunTime == FUEL_RUN_TIME) {
        engineStart = false;
        carEngineRunningAudio.pause();
        fuelBar.css("width", "0%");
        clearInterval(timerFn);
        clearInterval(decreaseFn);
        decreaseFn = setInterval(() => {
          decreaseSpeed();
        }, 100);
      }
    }, FUEL_DECREASE_INTERVAL);
  }
};

const refillFuel = () => {
  clearInterval(timerFn);
  clearInterval(decreaseFn);
  carRunTime = 0;
  fuel = 60;
  fuelBar.css({ "background-color": "#4caf50", width: `100%` });
  fuelValue.text(fuel);
  reduceFuel();
};
