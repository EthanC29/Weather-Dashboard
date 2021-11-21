let forecastWeek = [];



function getApi(lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=ce475acf48140382619c0453c95cfcf8';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        console.log(data);
        console.log(data.daily[0].dt);

        console.log();

        forecastWeek = [
            {
                "day": String(new Date(data.daily[0].dt * 1000)).slice(0,3),
                "date": data.daily[0].dt,
                "icon": "",
                "tempMin": data.daily[0].temp.min,
                "tempMax": data.daily[0].temp.max,
                "wind": data.daily[0].wind_speed,
                "humidity": data.daily[0].humidity,
                "uvindex": data.daily[0].uvi
            },
            {
                "day": String(new Date(data.daily[1].dt * 1000)).slice(0,3),
                "date": data.daily[1].dt,
                "icon": "",
                "tempMin": data.daily[1].temp.min,
                "tempMax": data.daily[1].temp.max,
                "wind": data.daily[1].wind_speed,
                "humidity": data.daily[1].humidity,
                "uvindex": data.daily[1].uvi
            },
            {
                "day": String(new Date(data.daily[2].dt * 1000)).slice(0,3),
                "date": data.daily[2].dt,
                "icon": "",
                "tempMin": data.daily[2].temp.min,
                "tempMax": data.daily[2].temp.max,
                "wind": data.daily[2].wind_speed,
                "humidity": data.daily[2].humidity,
                "uvindex": data.daily[2].uvi
            },
            {
                "day": String(new Date(data.daily[3].dt * 1000)).slice(0,3),
                "date": data.daily[3].dt,
                "icon": "",
                "tempMin": data.daily[3].temp.min,
                "tempMax": data.daily[3].temp.max,
                "wind": data.daily[3].wind_speed,
                "humidity": data.daily[3].humidity,
                "uvindex": data.daily[3].uvi
            },
            {
                "day": String(new Date(data.daily[4].dt * 1000)).slice(0,3),
                "date": data.daily[4].dt,
                "icon": "",
                "tempMin": data.daily[4].temp.min,
                "tempMax": data.daily[4].temp.max,
                "wind": data.daily[4].wind_speed,
                "humidity": data.daily[4].humidity,
                "uvindex": data.daily[4].uvi
            },
            {
                "day": String(new Date(data.daily[5].dt * 1000)).slice(0,3),
                "date": data.daily[5].dt,
                "icon": "",
                "tempMin": data.daily[5].temp.min,
                "tempMax": data.daily[5].temp.max,
                "wind": data.daily[5].wind_speed,
                "humidity": data.daily[5].humidity,
                "uvindex": data.daily[5].uvi
            },
        ];

        localStorage.setItem("forecast", JSON.stringify(forecastWeek));

        

                
    });
}

getApi(43.79, -79.20);

