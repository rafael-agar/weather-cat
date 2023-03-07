const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp')
const dateOutput = document.querySelector('.date')
const tiemOutput = document.querySelector('.time')
const conditionOutput = document.querySelector('.condition')
const nameOutput = document.querySelector('.name')
const icon = document.querySelector('.icon')
const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector('.humidity')
const windOutput = document.querySelector('.wind')
const form = document.getElementById('locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')

// default city when the page load
let cityInput = "Atlanta";

cities.forEach((city) => {
    
    city.addEventListener('click', (e) => {
        // change from default city to the click one
        cityInput = e.target.innerHTML;
        /* Function that fetches and display all the data from the wather API */
        fetchWeatherData();
        // fade out the app animation
        app.style.opacity = "0";
    });
});

// Add submit event to the form
form.addEventListener('submit', e => {
    
    // if the input filed is empty show a alert
    if(search.value.length == 0) {
        alert('Please type a city name')
    } else {
        // change form default city to the one writen in the input field
        cityInput = search.value 
        // function taht fetch and display all the data from the weather API
        fetchWeatherData();
        // remove all text from the input file
        search.value = ""
        // fade out the app animation
        app.style.opacity = "0";

        e.preventDefault()
    }
})

// function dayOfTheWeek(day, month, year) {
//     const weekday = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday"
//     ];
//     return weekday[new Date(`${day}/${month}/${year}`).getDay()];
   
// }



function fetchWeatherData(){
    // const url = `https://api.weatherapi.com/v1/current.json?key=90774fd0a7724c2a91f200331231302&q=${cityInput}&aqi=no`
    fetch(`https://api.weatherapi.com/v1/current.json?key=43131378a510491c9aa232648231302&q=${cityInput}`)
        .then(responce => responce.json())
        .then(data => {
            // console.log(data)
            // add temp and weather condition to the page
            temp.innerHTML = data.current.temp_c + "&#176;"
            conditionOutput.innerHTML = data.current.condition.text;
            console.log(data)

             //////////////////////////////////////////////
            const weekday = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ];
            // console.log(weekday[0])
            // get the date and time
            const date = data.location.localtime
            const y = parseInt(date.substr(0, 4))
            const m = parseInt(date.substr(5, 2))
            // const d = (date.substr(8, 2))
            const d = data.current.is_day
            const time = date.substr(11, 5);
            console.log(d)
            
            // date format
            // dateOutput.innerHTML = `${dayOfTheWeek(parseInt(d), m, y)} ${d}, ${m} ${y}`;
            dateOutput.innerHTML = `${weekday[d]}, ${m} ${y}`;
            tiemOutput.innerHTML = time
            //add name of the city
            nameOutput.innerHTML = data.location.name
            // get the icon
            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length)
            console.log(iconId)
            icon.src = "./icons/" + iconId

            //weather details
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "Km/h"

            //set default time
            let timeOfDay = "day"
            //get the unique id for each weather condition
            const code = data.current.condition.code;

            //change to night ig it night
            if (!data.current.is_day) {
                timeOfDay = "night"
            }

            if (code == 1000) {
                //set the background img
                app.style.backgroundImage = `url('./images/${timeOfDay}/clear.jpg')`
                //changing the button color if is day or night
                btn.style.background = "#e5a92"
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27"
                }
            } 
            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ){
                app.style.backgroundImage = `url('./images/${timeOfDay}/cloudy.jpg')`
                btn.style.background = "#fa6d1b"
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27"
                }
            }
            //and rain
            else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1286 ||
                code == 1289 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`
                btn.style.background = "#647d75"
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80"
                }
            } else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`
                btn.style.background = "#4d72aa"
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b"
                }
            }
            //fade in the page all is done
            app.style.opacity = "1"
        })
        //rong typing
        .catch(() => {
            alert('This city no found, please try again.')
            app.style.opacity = "1";
        });
}

// fetchWeatherData();

app.style.opacity = "1";