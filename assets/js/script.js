var day = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").append(day);

var APIkey = "c5983aad19183fb683432bc8f6baf7fc"

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// api call
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}