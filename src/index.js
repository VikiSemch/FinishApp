function formatDate(timestapm) {
  let date = new Date(timestapm);

  let hours = date.getHours();

  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    hours = "0" + minutes;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day}  ${hours}:${minutes}`;

}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
 
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement= document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index <6  ){
    forecastHTML =
    forecastHTML +
    `  <div class="col-2day">
            <div class="Forecast-date">${formatDay(forecastDay.dt)}
           
            <img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" 
            id="icon"
            alt="" 
            width="45"/>
            <br />
            <div clas="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}°C/</span>
              <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}°C</span>
            </div>
          </div>
          </div>
          `;
}
});
forecastHTML = forecastHTML +`</div>`;
forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
console.log(coordinates);
let apiKey = "435bb05a3bd8ac1e2c4d7c0df7d0cd4b";
let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayForecast);
}

function showCTD(response) {
 
  let temperatureElement = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let citynameElement = document.querySelector("#cityname");
  let descritionElement = document.querySelector("#descrition");
  let HumidityElement = document.querySelector("#Humidity");
  let WindElement = document.querySelector("#Wind");
  
  let iconElement = document.querySelector("#icon");

  
  Celsiustemperature = response.data.main.temp;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  citynameElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(Celsiustemperature);
  descritionElement.innerHTML = response.data.weather[0].description;
  HumidityElement.innerHTML = response.data.main.humidity;
  WindElement.innerHTML = Math.round(response.data.wind.speed);
  
  iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}


function searchCity(cityname) {
  let apiKey = "435bb05a3bd8ac1e2c4d7c0df7d0cd4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCTD);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
 let temperatureElement = document.querySelector("#temperature"); 
CelsiusLink.classList.remove("active");
FahrenheitLink.classList.add("active");
let Fahreheirtemperature = (Celsiustemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(Fahreheirtemperature); 
}
function showCelsiusTemp(event) {
  event.preventDefault();
  CelsiusLink.classList.remove("active");
  FahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(Celsiustemperature);
}

let Celsiustemperature = null;



function search(event) {
  event.preventDefault();
  let citynameInputElement = document.querySelector("#search-input");
  searchCity(citynameInputElement.value);
}
searchCity("New York");


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let FahrenheitLink = document.querySelector("#fahrenheit-link");
FahrenheitLink.addEventListener("click", showFahrenheitTemp);

let CelsiusLink = document.querySelector("#cilsius-link");
CelsiusLink.addEventListener("click", showCelsiusTemp);