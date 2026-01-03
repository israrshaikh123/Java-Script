const apiKey = "688722a17d5e42d4af5100602260301";
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");
const body = document.body;

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    // Update DOM with weather info
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
    feelsLike.textContent = `Feels Like: ${data.current.feelslike_c}°C`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    condition.textContent = `Condition: ${data.current.condition.text}`;
    weatherIcon.src = data.current.condition.icon;

    const temp = data.current.temp_c;
    if (temp >= 30) {
      body.style.background = "linear-gradient(to right, #fbc2eb, #a6c1ee)"; // hot
    } else if (temp >= 20) {
      body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)"; // warm
    } else if (temp >= 10) {
      body.style.background = "linear-gradient(to right, #89f7fe, #66a6ff)"; // cool
    } else {
      body.style.background = "linear-gradient(to right, #d7d2cc, #304352)"; // cold
    }
  } catch (error) {
    alert(error.message);
  }
}

cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && cityInput.value.trim() !== "") {
    getWeather(cityInput.value.trim());
    cityInput.value = "";
  }
});

getWeather("surat");
