var day = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").append(day);

const searchForm = document.querySelector("#citySearch");
var APIkey = "c5983aad19183fb683432bc8f6baf7fc"
var previousHistorylist = [];
var apiCall = `https://api.openweathermap.org/data/2.5`;

//append data on page
const displayWeather = (data) => {
    const currentTemp = document.createElement('div');
    // console.log(data);
    currentTemp.textContent = data.list[0].main.temp + " °F";
    // document.body.appendChild(currentweatherContainer);
    $(".latestCity").append(currentTemp);
};


// get information from API
var getcurrentweather = (city) => {
    
    fetch(`${apiCall}/forecast?q=${city}&appid=${APIkey}`)
    .then(function(res){
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


// console.log(searchForm.children[0]);

const handleSearchSubmit= (event) => {
    event.preventDefault();
    console.log(event.target);

    getcurrentweather(searchForm.children[0].value);
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