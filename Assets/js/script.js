var cResultText = $('#cResult');
var tResultText = $('#tResult');
var hResult = $('#hResult');
var wResultText = $('#windResult')
var rowC = $("#rowCards")
var dayForecast = $('#rowday');
var cDisplay = $('#cardDisplay');
var UVIR=$('#UVIndexResult')
var buttonL=$('#ButtonsLista');
var forecastD={};
var forecastI ={};
var forecastT={};
var forecastH={};
//Grab Day/Month/Year
var now = dayjs().format('DD'+'/'+"MM"+"/"+"YYYY");

var citiesArrayed = JSON.parse(localstorage.getItem("Cities")) || [];
const APIKey = "e9b8186425312aeb2aeb30949d61fa5c"
const url = "api.openweathermap.org/data/2.5/forecast"

$(document).ready(function() {
    let user = citiesArrayed[citiesArrayed.length -1];
    currentWeather(userInput);
    forecast(user);
    lastSearch();
})

function currentWeather(user){
     var qURL = url+user+APIKey;
     $.ajax(
        {
            url: qURL,
            method: "GET"
        }
     )
     .then(function(response){
      var cityInfo,Country,Temperature,Humidity,Wind,lat,lon,icon,UVIU;
      UVIU = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&" + "lon=" + lon + "&APPID="+APIKey;
      cityInfo = response.name;
      Country = response.sys.country;
      Temperature = response.main.temp;
      Humidity = response.main.humidity;
      Wind = response.wind.speed;
      $.ajax({
        url: UVIU,
        method: "GET"
    }).then(function(uvIndex){
        var UVI = uvIndex.value;
        var color;
        if (UVI <= 3) {
            color = "green";
        } else if (UVI >= 3 & UVI <= 6) {
            color = "yellow";
        } else if (UVI >= 6 & UVI <= 8) {
            color = "orange";
        } else {
            color = "red";
        }
        UVIR.empty();
        var UVRT = $("<p>").attr("class", "card-text").text("UV Index: ");
        UVRT.append($("<span>").attr("class", "uvindex").attr("style", ("background-color: " + color)).text(UV))
        UVIndexText.append(UVRT);
        cardDisplay.attr("style", "display: flex; width: 98%");

     }
     )
    }
    )
}
function forecast (userInput) {
    dayForecast.empty();
    rowCards.empty();
    var fore5 = $("<h2>").attr("class", "forecast").text("5-Day Forecast: "); 
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=metric&APPID=123babda3bc150d180af748af99ad173";
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        for (var i = 0; i < response.list.length; i += 8){
            
            forecastD[i] = response.list[i].dt_txt;
            forecastI[i] = response.list[i].weather[0].icon;
            forecastT[i] = response.list[i].main.temp; 
            forecastH[i] = response.list[i].main.humidity;  

            var newCol2 = $("<div>").attr("class", "col-2");
            rowCards.append(newCol2);

            var newDivC = $("<div>").attr("class", "card text-white bg-primary mb-3");
            newDivC.attr("style", "max-width: 18rem;")
            newCol2.append(newDivCa);

            var newCB = $("<div>").attr("class", "card-body");
            newDivC.append(newCB);

            var newH5 = $("<h5>").attr("class", "card-title").text(moment(forecastD[i]).format("MMM Do"));
            newCB.append(newH5);

            var newImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + forecastI[i] + "@2x.png");
            newCardBody.append(newImg);

            var newPTemp = $("<p>").attr("class", "card-text").text("Temp: " + Math.floor(forecastTemp[i]) + "ÂºC");
            newCardBody.append(newPTemp);

            var newPHum = $("<p>").attr("class", "card-text").text("Humidity: " + forecastH[i] + " %");
            newCardBody.append(newPHum);

            dayForecast.append(fore5);
            };
            })

        }

function storeData (userInput) {
    var UI = $("#searchInput").val().trim().toLowerCase();
    var containsCity = false;

    if (citiesArrayed != null) {

		$(citiesArrayed).each(function(x) {
			if (citiesArrayed[x] === UI) {
				containsCity = true;
			}
		});
	}

	if (containsCity === false) {
        citiesArray.push(ui);
	}

	localStorage.setItem("Saved City", JSON.stringify(citiesArrayed));

}

function lastSearch () {
    buttonList.empty()
    for (var i = 0; i < citiesArrayed.length; i ++) {
        var newButton = $("<button>").attr("type", "button").attr("class","savedBtn btn btn-secondary btn-lg btn-block");
        newButton.attr("data-name", citiesArrayed[i])
        newButton.text(citiesArrayed[i]);
        buttonLista.prepend(newButton);
    }
    $(".savedBtn").on("click", function(event){
        event.preventDefault();
        var UI = $(this).data("name");
        currentWeather(UI);
        forecast(UI);
    })

}

$("#search-btn").on("click", function (event){
    event.preventDefault();
    if ($("#searchInput").val() === "") {
    alert("Please type a userInput to know the current weather");
    } else
    var UI = $("#searchInput").val().trim().toLowerCase();
    currentWeather(UI);
    forecast(UI);
    storeData();
    lastSearch();
    $("#searchInput").val("");

})