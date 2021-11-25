$(document).ready(function () {
    // set up the main data array
    let forecastWeek = [];
    // hides all elements in the main section to leave a blank start screen
    $(".forecast-section").attr("style", "visibility: hidden;");
    // if there were searches during a previous session, call them from localStorage and display them now
    function appendSearchHistory() {
        let searchHistory = localStorage.getItem("searchHistory");
        searchHistory = JSON.parse(searchHistory);
        let loopSearchEl = "";
        if (searchHistory) {
            for (var i = 0; i < searchHistory.length; i++) {
                loopSearchEl += `<button class="previous-search-result">` + searchHistory[i] + `</button>`
            }
            $("#search-history").html(loopSearchEl);
        }
        return searchHistory;
    };
    appendSearchHistory();
    
    // appends all the data for all 6 days of the forecast to the html
    function appendData(cityName, countryCode) {
        // clears forecast section first so there is no duplication
        $(".current-conditions").empty();
        $(".future-conditions").empty();
        let singleHtml = "";
        let loopHtml = "";
        // loops through until all 6 days are created
        for(let i = 0; i < forecastWeek.length; i++){
            // differentiates between the large top div and the 5 small bottom divs in the html
            if (i === 0) {
                var singleDayData = forecastWeek[i];
                singleDayData.timestampDate = new Date(singleDayData.timestampDate * 1000);
                // dynamically fills the top box with the info for the current day
                singleHtml = `
                <h2 class="title" id="current-title">` + cityName + `, ` + countryCode + ` (` + (singleDayData.timestampDate.getMonth()+1) + `/` + singleDayData.timestampDate.getDate() + `/` + singleDayData.timestampDate.getFullYear() + `)</h2><img class="icon-image main" id="icon-image-` + i + `" src="http://openweathermap.org/img/wn/` + singleDayData.icon + `@2x.png" />
                <p class="temp" id="temp-` + i + `">Avg. Temp:  ` + singleDayData.temp + `° F</p>
                <p class="wind" id="wind-` + i + `">Wind:  ` + singleDayData.wind + ` MPH</p>
                <p class="humid" id="humid-` + i + `">Humidity:  ` + singleDayData.humidity + `%</p>
                <p class="uvi" id="uvi-` + i + `">UV Index:  <span>` + singleDayData.uvindex + `</span></p>`;
                // appends to the "current conditions" section
                $('.current-conditions').append(singleHtml);
            } else if (i >= 0) {
                var singleDayData = forecastWeek[i];
                singleDayData.timestampDate = new Date(singleDayData.timestampDate * 1000);
                // dynamically creates each day-section depending on the data obtained from the api
                loopHtml = `
                <div class="col day" id="day-` + i + `">
                    <h3 class="title" id="title-` + i + `">` + (singleDayData.timestampDate.getMonth()+1) + `/` + singleDayData.timestampDate.getDate() + `/` + singleDayData.timestampDate.getFullYear() + `</h3>
                    <img class="icon-image" id="icon-image-` + i + `" src="http://openweathermap.org/img/wn/` + singleDayData.icon + `.png" />
                    <p class="p temp" id="temp-` + i + `">Avg. Temp:  ` + singleDayData.temp + `° F</p>
                    <p class="p wind" id="wind-` + i + `">Wind:  ` + singleDayData.wind + ` MPH</p>
                    <p class="p humid" id="humid-` + i + `">Humidity:  ` + singleDayData.humidity + `%</p>
                </div>`;
                // appends to the "5-day forecast" section
                $('.future-conditions').append(loopHtml);
            }
        };
        $(".forecast-section").attr("style", "visibility: visible;");
    }

    // uses latitude and longitude to send a request to the api to get the data and saves it to an array of objects for each day
    function getApi(lat, lon, city, country) {
        var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=ce475acf48140382619c0453c95cfcf8';

        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
            var cityName = city;
            var countryCode = country;
            appendData(cityName, countryCode);
        });
        return forecastWeek;
    }

    // saves valid search term into array in localStorage and clears all current entries on display
    function retrieveHistory(city) {
        let searchHistory = localStorage.getItem("searchHistory");
        if (searchHistory) {
            searchHistory = JSON.parse(searchHistory);
        } else {
            searchHistory = [];
        }
        searchHistory.unshift(city);
        searchHistory = [...new Set(searchHistory)];
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        $('div#search-history').empty();
        appendSearchHistory();
        return searchHistory;
    }

    // This function just sends a request to the api with the city name to get a response with the latitude and longitude of said city to input in the other request
    // I know it is convoluted but I tried switching the original requestUrl with this one that uses city name and it broke the code
    // It ended up breaking so badly that I had to delete everything and re-clone from github
    function getLatLon(cityName) {
        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=ce475acf48140382619c0453c95cfcf8';

        fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var latitude = data.coord.lat;
                    var longitude = data.coord.lon;
                    var city = data.name;
                    var country = data.sys.country;
                    
                    retrieveHistory(city);
                    getApi(latitude, longitude, city, country);
                });
            } else {
                // calls an error alert if an invalid city name is input
                alert("Error: Invalid city name!");
            }
        });
    }
    
    // when the "search" button is clicked, send the contents on input to the getLanLon() function
    $(".btn").click(function() {
        var searchTerm = $("#search-bar").val();
        $("#search-bar").val("");
        getLatLon(searchTerm);
    });

    // runs the past-searches function continiously
    const TIMEOUT_MS = 1000
    let keepGoing = true;
    function replayReplay() {
        // click past search terms to search them again
        $('.previous-search-result').each(function () {
            var $this = $(this);
            $this.on("click", function () {
                var resulting = $this.text();
                getLatLon(resulting);
            });
        });
        if (keepGoing) {
            setTimeout(replayReplay, TIMEOUT_MS);
        }
    }
    replayReplay();
});






