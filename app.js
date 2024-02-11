const BASE_URL ="https://api.openweathermap.org/data/2.5"
const API_KEY = "5dfdef68f9036cc5329e3fd2d4a26151"

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const locationicon = document.getElementById("location");


const getCurrentWeatherByName = async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url)
    const json = await response.json();
    return json
};

const getCurrentWeatherBycoordinates = async (lat , lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon }&appid=${API_KEY}&units=metric`;
    const response = await fetch(url)
    const json = await response.json();
    return json
};


const renderCurrentWeather = (data) => {
    console.log(data);
    const weatherJSX = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
    <img alt"weather icon" src="http://openweathermap.org/img/w/${
        data.weather[0].icon
    }.png" />
    <span>${data.weather[0].main}</span>
    <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div id="info">
    <p>Humidity: <span>${data.main.humidity} %</span></p>
    <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
    </div>
    `;

    weatherContainer.innerHTML = weatherJSX;

}

const searchHandler = async () => {
    const cityName = searchInput.value;

    if (!cityName) {
        alert("plaese enter city name!");
    }

    const currentData = await getCurrentWeatherByName(cityName);
    renderCurrentWeather(currentData);
};

const positionCallBack = async (positon) => {
    const {latitude, longitude} = positon.coords;
    const currentData = await getCurrentWeatherBycoordinates(latitude, longitude);
    renderCurrentWeather(currentData);
};

const errorCallBack = (error) => {
    console.log(error.message)
};

const locationHandler = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionCallBack, errorCallBack);
    } else {
        alert("Your browser does not support geolocation");
    }
}

searchButton.addEventListener("click" ,searchHandler)
locationicon.addEventListener("click" ,locationHandler)