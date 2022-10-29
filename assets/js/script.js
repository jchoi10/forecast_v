var day = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").append(day);

var APIkey = "c5983aad19183fb683432bc8f6baf7fc"
var previousHistorylist = [];

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

var getcurrentweatherDisplay = (event) => {
    var currentCity = $("#citySearch").val().trim();
    var apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${APIkey}`;
    
    fetch(apiCall)
    .then(function(){})
    .then((res) => {
        return res.JSON
    })
}

console.log(getcurrentweatherDisplay)

$("#searchBtn").on("click",function(event) {
    event.preventDefault();

    var currentCity = $("#citySearch").val().trim();

    if (!previousHistorylist.includes(currentCity)) {
        previousHistorylist.push(currentCity);
        var pastCity = $(
            `<li>${currentCity}</li>`
        );
        $(".previousHistory").append(pastCity);
    };
    localStorage.setItem(currentCity, JSON.stringify(previousHistorylist));
})