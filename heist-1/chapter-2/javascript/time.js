/**
 * Function to fetch and update time for each minute
 */
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0"); // 2-digit minutes with leading zero
  const period = now.getHours() >= 12 ? "PM" : "AM";
  dashboardTime.text(`${formattedHours}:${minutes} ${period}`);
  let greetingMsg;
  if (hours >= 5 && hours < 12) {
    greetingMsg = "Good morning";
  } else if (hours >= 12 && hours < 18) {
    greetingMsg = "Good afternoon";
  } else {
    greetingMsg = "Good evening";
  }
  greetingMessage.text(`${greetingMsg}...! Charan and Kavin`);
};
