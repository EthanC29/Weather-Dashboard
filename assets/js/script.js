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

        let forecastWeek = []

        for (var i = 0; i < 6; i++) {

            forecastWeek[i] = {
                "day": String(new Date(data.daily[i].dt * 1000)).slice(0,3),
                "date": new Date(data.daily[i].dt * 1000),
                "icon": data.daily[i].weather.icon,
                "tempMin": data.daily[i].temp.min,
                "tempMax": data.daily[i].temp.max,
                "wind": data.daily[i].wind_speed,
                "humidity": data.daily[i].humidity,
                "uvindex": data.daily[i].uvi
            }

        }
            /*{
                "day": String(new Date(data.daily[1].dt * 1000)).slice(0,3),
                "date": data.daily[1].dt,
                "icon": data.daily[1].weather.icon,
                "tempMin": data.daily[1].temp.min,
                "tempMax": data.daily[1].temp.max,
                "wind": data.daily[1].wind_speed,
                "humidity": data.daily[1].humidity,
                "uvindex": data.daily[1].uvi
            },
            {
                "day": String(new Date(data.daily[2].dt * 1000)).slice(0,3),
                "date": data.daily[2].dt,
                "icon": data.daily[2].weather.icon,
                "tempMin": data.daily[2].temp.min,
                "tempMax": data.daily[2].temp.max,
                "wind": data.daily[2].wind_speed,
                "humidity": data.daily[2].humidity,
                "uvindex": data.daily[2].uvi
            },
            {
                "day": String(new Date(data.daily[3].dt * 1000)).slice(0,3),
                "date": data.daily[3].dt,
                "icon": data.daily[3].weather.icon,
                "tempMin": data.daily[3].temp.min,
                "tempMax": data.daily[3].temp.max,
                "wind": data.daily[3].wind_speed,
                "humidity": data.daily[3].humidity,
                "uvindex": data.daily[3].uvi
            },
            {
                "day": String(new Date(data.daily[4].dt * 1000)).slice(0,3),
                "date": data.daily[4].dt,
                "icon": data.daily[4].weather.icon,
                "tempMin": data.daily[4].temp.min,
                "tempMax": data.daily[4].temp.max,
                "wind": data.daily[4].wind_speed,
                "humidity": data.daily[4].humidity,
                "uvindex": data.daily[4].uvi
            },
            {
                "day": String(new Date(data.daily[5].dt * 1000)).slice(0,3),
                "date": data.daily[5].dt,
                "icon": data.daily[5].weather.icon,
                "tempMin": data.daily[5].temp.min,
                "tempMax": data.daily[5].temp.max,
                "wind": data.daily[5].wind_speed,
                "humidity": data.daily[5].humidity,
                "uvindex": data.daily[5].uvi
            }*/
        

        localStorage.setItem("forecastWeek", JSON.stringify(forecastWeek));
      
    });
}

getApi(43.79, -79.20);

/*
$("#btn").click(function(){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': $("#search-bar").value}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
        }
    });
});
*/

function appendData() {
    forecastWeek = JSON.parse(localStorage.getItem("forecastWeek"));
    console.log(forecastWeek);

    for (var i = 0; i < forecastWeek.Length; i++) {

        let cityName = "<City Name>";
        let dateEl = new Date(forecastWeek[i].date * 1000);
        let tempEl = "Avg. Temp: " + (Math.round(((forecastWeek[i].tempMax + forecastWeek[i].tempMin)/2) * 10) / 10) + "° F";
        let windEl = "Wind: " + forecastWeek[i].wind + " MPH";
        let humidEl = "Humidity: " + forecastWeek[i].humidity + "%";
        let uviEl = "UV Index: " + forecastWeek[i].uvindex;

        $(".city").append();
        $(".current-temp").append(tempEl);
        $(".current-wind").append(windEl);
        $(".current-humid").append(humidEl);
        $(".current-uvi").append(uviEl);

    }



}


appendData();