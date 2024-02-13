const BASE_URL ="https://api.openweathermap.org/data/2.5"
const API_KEY = "5dfdef68f9036cc5329e3fd2d4a26151"

const getWeatherData = async (type, data) => {
    let url = null;

    switch (type)  {
        case "current":
        if (typeof data === "string") {
          url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
        } else {
            url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
        }
        break;
        case "forecast":
            if (typeof data === "string") {
              url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
            } else {
                url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
            }
            break;
            default: 
            url = `${BASE_URL}/weather?q=milan&appid=${API_KEY}&units=metric`;
            break;
    }

try {
    const response = await fetch(url)
    const json = await response.json();
    if (+json.cod === 200){
        return json
    } else {
        console.log(json.message)
    }
} catch (error){
    console.log("an error occured when fetching data");
}
};


export default getWeatherData;