$(document).ready(function () {

    let forecastWeek = [];
    let searchHistory = [];
    let loopSearchTerm = "";

    function getApi(lat, lon) {
        var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=ce475acf48140382619c0453c95cfcf8';

        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            localStorage.setItem("data", JSON.stringify(data));

        });
    }

    let data = JSON.parse(localStorage.getItem("data"));

    

    for (var i = 0; i < 6; i++) {

        forecastWeek[i] = {
            "day": String(new Date(data.daily[i].dt * 1000)).slice(0,3),
            "timestampDate": data.daily[i].dt,
            "icon": data.daily[i].weather[0].icon,
            "temp": Math.round(((data.daily[i].temp.min + data.daily[i].temp.max)/2) * 10) / 10,
            "wind": data.daily[i].wind_speed,
            "humidity": data.daily[i].humidity,
            "uvindex": data.daily[i].uvi
        }

    }

    console.log(forecastWeek);

    /*
    if (localStorage.getItem("searchHistory")) {
        searchHistory = localStorage.getItem("searchHistory");
    }

    for (var i = 0; i < searchHistory.Length; i++) {
        loopSearchTerm += `<div class="search-term" id="search-term-` + i + `">` + searchHistory[i] + `</div>`;
    }

    $("#search-history").append(loopSearchTerm);

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

        let loopHtml = "";
        let DTdate = new Date(forecastWeek[i].timestampDate * 1000);

        for(let i = 1; i < forecastWeek.length; i++){

            loopHtml += `
            <div class="col day" id="day-` + i + `">
                <h3 class="title" id="title-` + i + `">` + DTdate.getDate() + `/` + (DTdate.getMonth()+1) + `/` + DTdate.getFullYear() + `</h3>
                <image class="icon-image" id="icon-image-` + i + `" src="http://openweathermap.org/img/wn/` + forecastWeek[i].icon + `@2x.png" />
                <p class="p temp" id="temp-` + i + `">Avg. Temp: ` + forecastWeek[i].temp + `° F</p>
                <p class="p wind" id="wind-` + i + `">Wind: ` + forecastWeek[i].wind + ` MPH</p>
                <p class="p humid" id="humid-` + i + `">Humidity: ` + forecastWeek[i].humidity + `%</p>
            </div>`;

        };

        $('.future-conditions').append(loopHtml);

        



    }

    getApi(43.79, -79.20);
    appendData();
    

});