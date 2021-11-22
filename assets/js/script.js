$(document).ready(function () {

    let forecastWeek = [];
    let searchHistory = [];
    let loopHtml = '';

    function getApi(lat, lon) {
        var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=ce475acf48140382619c0453c95cfcf8';

        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            console.log(data);

            for (var i = 0; i < 6; i++) {

                forecastWeek[i] = {
                    "day": String(new Date(data.daily[i].dt * 1000)).slice(0,3),
                    "timestamp": data.daily[i].dt,
                    "icon": data.daily[i].weather[0].icon,
                    "temp": Math.round(((data.daily[i].temp.min + data.daily[i].temp.max)/2) * 10) / 10,
                    "wind": data.daily[i].wind_speed,
                    "humidity": data.daily[i].humidity,
                    "uvindex": data.daily[i].uvi
                }

            }

        });
    }





    if (localStorage.getItem("searchHistory")) {
        searchHistory = localStorage.getItem("searchHistory");
    }

    for (var i = 0; i < searchHistory.Length; i++) {
        loopHtml += `<div class="search-term" id="search-term-` + i + `">` + searchHistory[i] + `</div>`;
    }

    $("#search-history").append(loopHtml);

    $(".btn").bind("click", clickHandler);
    function clickHandler() {
        if ($("#search-bar").val()) {
            searchHistory.unshift($("#search-bar").val());
            localStorage.setItem("searchHistory", searchHistory)
        }
    }





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

        console.log(forecastWeek);

        //var i = 0;
        for (var i = 0; i < forecastWeek.Length; i++) {

            var date = new Date(forecastWeek[i].timestamp * 1000);

            let cityName = "<City Name>";
            let dateEl = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
            let cityDateTitle = cityName + " (" + dateEl + ")";
            let tempEl = "Avg. Temp: " + forecastWeek[i].temp + "° F";
            let windEl = "Wind: " + forecastWeek[i].wind + " MPH";
            let humidEl = "Humidity: " + forecastWeek[i].humidity + "%";
            let uviEl = "UV Index: " + forecastWeek[i].uvindex;
            let iconURL = "http://openweathermap.org/img/wn/" + forecastWeek[i].icon + "@2x.png"

            $("#current-title").append(cityDateTitle);
            $("#title-"+i).append(dateEl);
            $("#icon-image-"+i).attr("src", iconURL);
            $("#temp-"+i).append(tempEl);
            $("#wind-"+i).append(windEl);
            $("#humid-"+i).append(humidEl);
            $("#uvi-"+i).append(uviEl);

        }



    }

    getApi(43.79, -79.20);
    appendData();

});