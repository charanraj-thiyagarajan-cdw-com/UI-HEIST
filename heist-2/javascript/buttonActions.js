/**
 * Function to handle button actions
 */
const btnActions = {
  s: () => {
    if (fuel !== 0 && !engineStart && keyPressed == "s") {
      engineStart = true;
      carEngineStartAudio.play();
      // setTimeout(() => {
      //   carEngineRunningAudio.play();
      // }, 5000);
      carEngineStartAudio.addEventListener('ended', function() {
        if(engineStart){
          carEngineRunningAudio.play()
        }
      });
      reduceFuel();
    }
    if (!isGameOn && keyPressed == "s") {
      gameModifier();
      isGameOn = true;
    }
  },
  e: () => {
    if (isGameOn) {
      lightBtn.removeClass("active-icon");
      backgroundFullOverlay.removeClass("d-none");
      backgroundSideOverlay.addClass("d-none");
      gameModifier();
      clearInterval(timerFn);
      isGameOn = false;
      engineStart = false;
      carEngineStartAudio.currentTime = carEngineStartAudio.duration;
      carEngineRunningAudio.pause();
    }
  },
  c: () => {
    if (isGameOn) {
      isCameraOn = !isCameraOn;
      cameraBtn.toggleClass("active-icon");
      if (stream) {
        // Stop the video stream and update button text
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      } else {
        // Request access to the webcam and update button text
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (s) {
            stream = s;
            video.srcObject = stream;
          })
          .catch(function (err) {
            console.error("An error occurred: ", err);
          });
      }
    }
  },
  // FM controls
  f: () => {
    isMusicIcon = !isMusicIcon;
    if(isMusicIcon){
      musicIcon.show();
      isRadioOn = true;
      song1.play();
      song1.addEventListener('ended', function() {
        if(isRadioOn){
          song2.play()
        }
      });
      song2.addEventListener('ended', function() {
        if(isRadioOn){
          song3.play()
        }
      });
      song3.addEventListener('ended', function() {
        if(isRadioOn){
          song4.play()
        }
      });
      song4.addEventListener('ended', function() {
        if(isRadioOn){
          song5.play()
        }
      });
      song5.addEventListener('ended', function() {
        if(isRadioOn){
          song1.play()
        }
      });
    }else{
      isRadioOn = false;
      song1.currentTime = song1.duration;
      song2.currentTime = song2.duration;
      song3.currentTime = song3.duration;
      song4.currentTime = song4.duration;
      song5.currentTime = song5.duration;
      musicIcon.hide();
    }
  }
};

/**
 * Function to handle button keydown actions
 */
const btnKeyDownActions = {
  a: () => {
    if (fuel > 0 && engineStart) {
      clearInterval(decreaseFn);
      increaseSpeed();
      if (engineStart) {
        carEngineGearShiftAudio.play();
      }
    }
  },
  b: () => {
    decreaseSpeed();
    if (speed > 0) {
      carEngineBrakeAudio.play();
    } else {
      carEngineBrakeAudio.currentTime = carEngineBrakeAudio.duration;
    }
  },
  r: () => {
    refillFuel();
  },
  h: () => {
    if (isGameOn) {
      carHornAudio.play();
    }
  },
  l: () => {
    if(engineStart){
      lightBtn.toggleClass("active-icon");
      backgroundFullOverlay.toggleClass("d-none");
      backgroundSideOverlay.toggleClass("d-none");
    }
  },
  arrowleft: () => {
    clockwiseRotate();
    videoPositionHandler("left");
  },
  arrowright: () => {
    anticlockwiseRotate();
    videoPositionHandler("right");
  },
};

/**
 * Function to handle button keyup actions
 */
const btnKeyUpActions = {
  a: () => {
    clearInterval(decreaseFn);
    decreaseFn = setInterval(() => {
      decreaseSpeed();
      if (speed == 0) {
        clearInterval(decreaseFn);
      }
    }, 100);
    carEngineGearShiftAudio.pause();
  },
  b: () => {
    carEngineBrakeAudio.currentTime = carEngineBrakeAudio.duration;
  },
  h: () => {
    if (isGameOn) {
      carHornAudio.pause();
    }
  },
  arrowleft: () => {
    anticlockwiseRotate();
  },
  arrowright: () => {
    clockwiseRotate();
  },
};

//function to handle keypress events
$(document).on("keypress", function (event) {
  const KEY = event.key.toLowerCase();
  console.log(event.key);
  if (btnActions[KEY]) btnActions[KEY]();
  keyPressed = KEY;
});

//function to handle keydown events
$(document).on("keydown", function (event) {
  const KEY = event.key.toLowerCase();
  if (KEY in getButtons) getButtons[KEY].addClass("active-icon");
  if (isGameOn && btnKeyDownActions[KEY]) btnKeyDownActions[KEY]();
});

//functions to handle keyup events
$(document).on("keyup", function (event) {
  const KEY = event.key.toLowerCase();
  if (KEY in getButtons) getButtons[KEY].removeClass("active-icon");
  if (isGameOn && btnKeyUpActions[KEY]) btnKeyUpActions[KEY]();
});
