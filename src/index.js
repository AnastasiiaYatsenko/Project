let currentDate = new Date();
console.log(currentDate);
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let today = daysOfWeek[currentDate.getDay()];
console.log(today);
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let date = currentDate.getDate();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[currentDate.getMonth()];
if (hours < 10) {
    hours = `0${hours}`;
}
if (minutes < 10) {
    minutes = `0${minutes}`;
}
currentDate = document.querySelector("#current-time");
currentDate.innerHTML = `${date} ${month}, ${today} ${hours}:${minutes}`;

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[day];

}

function searchCity(city) {
    let apiKey = "486d80106caa3182b4a0eb80c7778807"; 
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function searchTown(event) {
    event.preventDefault();
   let searchInput = document.querySelector("#search-input");
   let city = document.querySelector("#searching-city");
   city.innerHTML = `${searchInput.value}`;
   let apiKey = "486d80106caa3182b4a0eb80c7778807"; 
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showWeather);
}


 

function showWeather(response) {
    let weatherNow = document.querySelector("#weather-now");
    weatherNow.innerHTML = Math.round(response.data.main.temp);
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let wind = document.querySelector("#wind-speed");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let icon = document.querySelector("#icon");
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute('alt', `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);

    displayForecast(response.data.coord);
}  

function showForecast(response) {
    console.log(response.data.daily);
   let forecast = response.data.daily;
   let forecastElement = document.querySelector("#forecast");
   
   let forecastHTML = `<div class="row">`;
   forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index >= 1) {
    forecastHTML = forecastHTML + 
    `
    <div class="col">
        <div class="card">
            <div class="card-body forecast-box">
            <h6 class="day">${formatDay(forecastDay.dt)}</h6>
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" class="icon" id="icon"> 
            <span id="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}</span>° |
            <span id="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}</span>°
            </div>
        </div>
    </div>`
    }
   });
   
   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;
}

function displayForecast(coord) {
    let apiKey = "486d80106caa3182b4a0eb80c7778807";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchTown);

searchCity("Kyiv");


   










 