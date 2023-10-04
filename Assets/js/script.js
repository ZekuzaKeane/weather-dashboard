var searchButton = $('#search-btn');
var searchInput = $('#searchInput');

function searchButtonHandler() {
    var inputString = searchInput.val().toLowerCase();
    
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputString + '&limit=1&appid=e9b8186425312aeb2aeb30949d61fa5c';

    fetch(requestUrl).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
      console.log(data[i].title);
        }
    });
    
    
    

}



// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e9b8186425312aeb2aeb30949d61fa5c

searchButton.on('click', searchButtonHandler);