/**
 * Function to rotate clockwise
 */
const clockwiseRotate = () => {
  if (currentAngle > -75) {
    currentAngle -= 75; // decrement for desired rotation speed
    carSteeringWheel.style.transform = `rotate(${currentAngle}deg)`;
  }
};

/**
 * Function to rotate anti clockwise
 */
const anticlockwiseRotate = () => {
  if (currentAngle < 75) {
    currentAngle += 75; // increment for desired rotation speed
    carSteeringWheel.style.transform = `rotate(${currentAngle}deg)`;
  }
};
