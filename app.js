const BASE_URL ="https://api.openweathermap.org/data/2.5"
const API_KEY = "5dfdef68f9036cc5329e3fd2d4a26151"
const DAYS = [
    "sunday",
    "Monday",
    "Tuesday",
    "wednesday",
    "Thursday",
    "friday",
    "saturday",
];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
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

const getForecastWeatherByName = async (city) => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url)
    const json = await response.json();
    return json
};

const getForecastWeatherBycoordinates = async (lat , lon) => {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon }&appid=${API_KEY}&units=metric`;
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
};

const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
}

 const renderForecastWeather = (data) => {
    forecastContainer.innerHTML= "";
    data = data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"))
    data.forEach((i) => {
        const forecastJSX = `
        <div>
        <img alt"weather icon" src="http://openweathermap.org/img/w/${
            i.weather[0].icon
        }.png" />
        <h3>${getWeekDay(i.dt)}</h3>
        <p>${Math.round(i.main.temp)} °C</p>
        <span>${i.weather[0].main}</span>
        </div>
        `;
        forecastContainer.innerHTML += forecastJSX;
    });
 };

const searchHandler = async () => {
    const cityName = searchInput.value;

    if (!cityName) {
        alert("plaese enter city name!");
    }

    const currentData = await getCurrentWeatherByName(cityName);
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByName(cityName);
    renderForecastWeather(forecastData)
};

const positionCallBack = async (positon) => {
    const {latitude, longitude} = positon.coords;
    const currentData = await getCurrentWeatherBycoordinates(latitude, longitude);
    renderCurrentWeather(currentData);
    const forecastData = await getCurrentWeatherBycoordinates(
        latitude,
        longitude
    );
    renderForecastWeather(forecastData)
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