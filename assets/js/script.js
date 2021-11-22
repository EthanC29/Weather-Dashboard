function getApi(lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=ce475acf48140382619c0453c95cfcf8';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        console.log(data);

        console.log();

        let forecastWeek = []

        for (var i = 0; i < 6; i++) {

            forecastWeek[i] = {
                "day": String(new Date(data.daily[i].dt * 1000)).slice(0,3),
                "date": new Date(data.daily[i].dt * 1000),
                "icon": data.daily[i].weather[0].icon,
                "temp": Math.round(((data.daily[i].temp.min + data.daily[i].temp.max)/2) * 10) / 10,
                "wind": data.daily[i].wind_speed,
                "humidity": data.daily[i].humidity,
                "uvindex": data.daily[i].uvi
            }

        }

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
        let dateEl = "(" + forecastWeek[i].date.getDate() + "/" + (forecastWeek[i].date.getMonth()+1) + "/" + forecastWeek[i].date.getFullYear() + ")";
        let cityDateTitle = cityName + " " + dateEl;
        let tempEl = "Avg. Temp: " + forecastWeek[i].temp + "° F";
        let windEl = "Wind: " + forecastWeek[i].wind + " MPH";
        let humidEl = "Humidity: " + forecastWeek[i].humidity + "%";
        let uviEl = "UV Index: " + forecastWeek[i].uvindex;
        let iconURL = "http://openweathermap.org/img/wn/" + forecastWeek[i].icon + "@2x.png"

        $(".title-" + i).append(cityDateTitle);
        $(".icon-image-" + i).attr("src", iconURL);
        $(".temp-" + i).append(tempEl);
        $(".wind-" + i).append(windEl);
        $(".humid-" + i).append(humidEl);
        $(".uvi-" + i).append(uviEl);

    }



}


appendData();

