// SETUP VARIABLES
// =======================================
const apiKey = "appid=b17276de874363ea7a970b48553f2cc4";

// search parameters 
var queryTerm = "";

// variable to track number of search history
let searchHistoryCounter = 0;

// variable to limit number of days pulled
const numberOfDays = 5;

//URL base 5-Day
let queryBaseURL = "http://api.openweathermap.org/data/2.5/forecast?" + apiKey;


// FUNCTIONS
// =======================================
// numArticles tells number of articles to load for NYT search --- this element add to search history
function runQuery(numArticles, queryURL) {
    //AJAX function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (weatherData) {
        //JSON Obj Initialization
        console.log("WeatherData:", weatherData);
        console.log("QueryURL:", queryURL);
        console.log("===========================");

        //Current Day Data
        console.log("City Name:", weatherData.city.name);
        console.log("Date:", weatherData.list[0].dt_txt);
        console.log("Temp:", weatherData.list[0].main.temp + " F");
        console.log("Humidity:", weatherData.list[0].main.humidity + " %");
        console.log("Wind Speed:", weatherData.list[0].wind.speed + "MPH");
        //Data for One Call from 5-Day
        console.log("Latitude", weatherData.city.coord.lat);
        console.log("Longitude", weatherData.city.coord.lon);

        //Start Dumping to HTML 
        let dayPreviewTitle = $('<h2>').text(weatherData.city.name + " " + weatherData.list[0].dt_txt);
        let dayPreviewTemp = $('<p>').text("Temperature: " + weatherData.list[0].main.temp + " F");
        let dayPreviewHumidity = $('<p>').text("Humidity: " + weatherData.list[0].main.humidity + " %");
        let dayPreviewWindSpeed = $('<p>').text("Wind Speed: " + weatherData.list[0].wind.speed + " MPH");

        //let dayPreviewUVIndex = $('<p>').text();
        $("#dayPreview").append(dayPreviewTitle);
        $("#dayPreview").append(dayPreviewTemp);
        $("#dayPreview").append(dayPreviewHumidity);
        $("#dayPreview").append(dayPreviewWindSpeed);


        //Five Day Data -- create appending loop to attach 5-day li ==== weatherData.list.length
        for (let i = 0; i < numberOfDays; i++) {
            console.log("5-Day DATE:", weatherData.list[i].dt_txt);
            console.log("5-day TEMP", weatherData.list[i].main.temp + " F");
            console.log("5-DAY HUMIDITY:", weatherData.list[i].main.humidity + " %");
        }

        // longitude and latitude vars 
        let longitude = "&lon=" + weatherData.city.coord.lon;
        console.log(longitude);
        let latitude = "lat=" + weatherData.city.coord.lat;
        console.log(latitude);

        //URL base One Call
        let oneCallBaseURL = "https://api.openweathermap.org/data/2.5/onecall?" + latitude + longitude + "&exclude=hourly,minutely&" + "&units=imperial&" + apiKey;
        // needs "imperial units"
        console.log(oneCallBaseURL);

    });

}



// MAIN PROCESSES
// =======================================

$('#searchBtn').on('click', function () {
    //target input search value
    queryTerm = $('#search').val().trim();
    //add search value end of q=
    var newURL = queryBaseURL + "&q=" + queryTerm + "&units=imperial";
    //test for correct api link 
    console.log("NEW URL:", newURL);
    //send new URL to AJAX call 
    runQuery(10, newURL);

    //testing user search input 
    console.log("Query Term:", queryTerm)
    return false;

})

// 1. Retrieve user input and convert to varibles  

// 2. Use variable to run an AJAX call to Open Weather API --provides JSON obj to work with 

// 3. Break down weather obj into usable fields

// 4. Dynamically generate html content 

// 5. Dealing with 'edge cases' -- bugs or situations that are intended 

// use weather api -json object to call the info required for the city 

// info need: current date; city name; weather emoji; temp; humidity; UV Index

