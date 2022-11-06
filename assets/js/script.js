var day = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").append(day);

const searchForm = document.querySelector("#citySearch");
const APIkey = "c5983aad19183fb683432bc8f6baf7fc"
var previousHistorylist = [];
var apiCall = `https://api.openweathermap.org`;

//append data on page
const displayWeather = (data) => {
    $(".latestCity").empty();
    $(".currentSearchedCity").empty(); 

    const currentCityName = document.createElement('h3');
    currentCityName.textContent = data.city.name;
    $(".currentSearchedCity").append(currentCityName);

    const currentIcon = document.createElement('img');
    currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png")
    $(".latestCity").append(currentIcon);
    
    const currentTemp = document.createElement('div');
    currentTemp.textContent = "Temperature: " + data.list[0].main.temp + " °F";
    $(".latestCity").append(currentTemp);
    
    const currentHumidity = document.createElement('p');
    currentHumidity.textContent = "Humidity: " + data.list[0].main.humidity;
    $(".latestCity").append(currentHumidity);

    const currentWindSpeed = document.createElement("p");
    currentWindSpeed.textContent = "Wind Speed: " + data.list[0].wind.speed;
    $(".latestCity").append(currentWindSpeed);
};


// get information from API
const getcurrentweather = (city) => {
    
    fetch(`${apiCall}/data/2.5/forecast?q=${city}&appid=${APIkey}`)
    .then((res) => {
        // console.log(res)
        if (!res.ok){
            console.error("response not ok")
        }
        return res.json()
    })
    .then((data) => {
        displayWeather(data);
        console.log(data);
        return data
    }).catch((err) => console.error(err))

};

const getFivedayForecast = () => {
    const {lat, lon} = getUserlocation(searchForm.children[0].value);
    fetch(`${apiCall}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then((res) => {
        if (!res.ok) {
            console.log("response not ok")
            return null
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
};

const getUserlocation = (city) => {
    fetch(`${apiCall}/geo/1.0/direct?q=${city}&appid=${APIkey}`)
    .then((res) => {
        if (!res.ok) {
            console.error("response not ok")
            return null
        }
        return res.json()
    })
    .then((data) => {
        // console.log(data)
        const {lat, lon} = data[0]
        // console.log(lat, lon);
        return {lat, lon}
    })
};

// console.log(searchForm.children[0]);

const handleSearchSubmit= (event) => {
    event.preventDefault();
    console.log(event.target);

    getcurrentweather(searchForm.children[0].value);
    getUserlocation(searchForm.children[0].value);
}


searchForm.addEventListener("click", handleSearchSubmit);


// console.log(getcurrentweather())

$("#searchBtn").on("click",function(event) {
    console.log(event);
    event.preventDefault();
    
    var currentCity = $("#searchedCity").val().trim();
    console.log(currentCity);
    if (!previousHistorylist.includes(currentCity)) {
        previousHistorylist.push(currentCity);
        var pastCity = $(
            `<li>${currentCity}</li>`
            );
            $(".previousHistory").append(pastCity);
        };
        localStorage.setItem(currentCity, JSON.stringify(previousHistorylist));
});

$(document).on("click","#previousHistory-item", function() {
    var cityList = $(this).text();
    displayWeather(cityList);
});