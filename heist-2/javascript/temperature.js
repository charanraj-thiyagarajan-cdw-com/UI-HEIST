/**
 * Function to fetch and update temperature for each minute
 */
 const fetchTemperature = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.status}`);
      }
      const weatherData = await response.json();
      const tempInKelvin = weatherData.main.temp;
      const tempInCelsius = tempInKelvin - 273.15;
  
      dashboardTemperature.text(`${tempInCelsius.toFixed(1)} °C`)
    } catch (error) {
      console.error("Error:", error);
    }finally{
      // Schedule the next update after 30 minute * (60 seconds)
      setTimeout(fetchTemperature, 30 * ONE_MINUTE);
    }
  };