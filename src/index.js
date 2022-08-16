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
}  

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchTown);

searchCity("Kyiv");










 