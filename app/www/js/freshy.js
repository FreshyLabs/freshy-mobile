// Initialize your app
var App = new Framework7({
    modalTitle: 'freshymap'
});

// Export selectors engine
var $$ = Dom7;

// Templates
App.searchItemTemplate = $$('#search-item-template').html();
App.weatherItemTemplate = $$('#weather-item-template').html();
App.detailsTemplate = $$('#details-template').html();

// Add view
var mainView = App.addView('.view-main', {
    dynamicNavbar: true,
});

// Search Locations
var searchTimeout;
App.searchLocation = function (search) {
    var q = 'http://freshymap.com/data/mountains?q=' + search;
    if (searchTimeout) clearTimeout(searchTimeout);
    $$('.popup .preloader').show();
    searchTimeout = setTimeout(function () {
        $$.get(q, function (results) {
            var html = '';
            results = JSON.parse(results);
            //console.log('RESULTS', results)
            $$('.popup .preloader').hide();
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var mtn = results[i].feature;
                    var adminArea = mtn.properties && mtn.properties.State ? mtn.properties.State : '';
                    html += App.searchItemTemplate
                        .replace(/{{woeid}}/g, mtn.geometry.coordinates.join(':'))
                        .replace(/{{name}}/g, mtn.properties.Name)
                        .replace(/{{country}}/g, mtn.properties.Country)
                        .replace(/{{province}}/g, adminArea);
                }
            }
            $$('.popup .search-results').html(html);
        });
    }, 300);
};
// Get locations weather data
App.updateWeatherData = function (callback) {
    var names = [];
    if (!localStorage.freshyMtns) return;
    var places = JSON.parse(localStorage.freshyMtns);
    if (places.length === 0) {
        localStorage.freshyData = JSON.stringify([]);
        return;
    }
    if (!navigator.onLine) {
        App.alert('You need internet connection to update the freshy data');
    }
    console.log('PLACES', places);
    for (var i = 0; i < places.length; i++) {
        names.push(places[i].name);
    }
    var query = names.join('|');
    var q = 'http://freshymap.com/data/mountains?q=' + query;
    App.showIndicator();
    $$.get(q, function (data) {
        var freshyData = [];
        App.hideIndicator();
        data = JSON.parse(data);
        console.log('Data', data);
        var place;
        if ($$.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                place = data[i].feature.properties;
                freshyData.push({
                    name: place.Name,
                    country: place.Country,
                    region: place.State,
                    snow: place.current_new,
                    base: place.current_base,
                    wind: place.current_weather.wind_speed,
                    condition: place.current_weather.weather,
                    forecast: place.snow_forecast,
                    lat: place.Lat,
                    long: place.Long,
                    woeid: ''
                });
            }
        }
        localStorage.freshyData = JSON.stringify(freshyData);
        if (callback) callback();
    });
};
// Build list of places on home page
App.buildWeatherHTML = function () {
    var weatherData = localStorage.freshyData;
    if (!weatherData) return;
    $$('.places-list ul').html('');
    weatherData = JSON.parse(weatherData);
    var html = '';
    for (var i = 0; i < weatherData.length; i++) {
        var item = weatherData[i];
        console.log(item);
        var new_snow = ( item.snow || 0 ) +"&quot; / "+ (item.base || 0) + '&quot;';
        var date = new Date(item.condition.date);
        var time = date.getHours(date) + ':' + date.getMinutes(date);
        html += App.weatherItemTemplate
                .replace(/{{woeid}}/g, item.woeid)
                .replace(/{{name}}/g, item.name)
                .replace(/{{province}}/g, item.region)
                .replace(/{{new_snow}}/g, new_snow);
    }
    $$('.places-list ul').html(html);
};

// Delete place
$$('.places-list').on('delete', '.swipeout', function () {
    var woeid = $$(this).attr('data-woeid');
    // Update Places
    if (!localStorage.freshyMtns) return;
    var places = JSON.parse(localStorage.freshyMtns);
    for (var i = 0; i < places.length; i++) {
        if (places[i].woeid === woeid) places.splice(i, 1);
    }
    localStorage.freshyMtns = JSON.stringify(places);
    // Update places data
    if (!localStorage.freshyData) return;
    var data = JSON.parse(localStorage.freshyData);
    for (i = 0; i < data.length; i++) {
        if (data[i].woeid === woeid) data.splice(i, 1);
    }
    localStorage.freshyData = JSON.stringify(data);
});

// Handle search results
$$('.popup input[type="text"]').on('change keyup keydown', function () {
    App.searchLocation(this.value);
});
$$('.popup').on('closed', function () {
    $$('.popup input[type="text"]').val('');
    $$('.popup .search-results').html('');
    $$('.popup .preloader').hide();
});
$$('.popup').on('open', function () {
    $$('.views').addClass('blured');
    $$('.statusbar-overlay').addClass('with-popup-opened');
});
$$('.popup').on('opened', function () {
    $$('.popup input[type="text"]')[0].focus();
});
$$('.popup').on('close', function () {
    $$('.views').removeClass('blured');
    $$('.popup input[type="text"]')[0].blur();
    $$('.statusbar-overlay').removeClass('with-popup-opened');
});
$$('.popup .search-results').on('click', 'li', function () {
    var li = $$(this);
    var woeid = li.attr('data-woeid');
    var name = li.attr('data-name');
    var province = li.attr('data-province');
    var places;
    if (localStorage.freshyMtns) places = JSON.parse(localStorage.freshyMtns);
    else places = [];
    places.push({
        woeid: li.attr('data-woeid'),
        name: li.attr('data-name'),
        province: li.attr('data-province')
    });
    localStorage.freshyMtns = JSON.stringify(places);
    App.updateWeatherData(function () {
        App.buildWeatherHTML();
    });
});

// Update html and weather data on app load
App.buildWeatherHTML();
App.updateWeatherData(function () {
    App.buildWeatherHTML();
});

// Build details page
$$('.places-list').on('click', 'a.item-link', function (e) {
    var woeid = $$(this).attr('data-woeid');
    var item;
    var weatherData = JSON.parse(localStorage.freshyData);
    for (var i = 0; i < weatherData.length; i++) {
        if (weatherData[i].woeid === woeid) item = weatherData[i];
    }
    var days = ('Monday Tuesday Wednesday Thursday Friday Saturday Sunday').split(' ');
    var forecastHTML = '';
    for (i = 0; i < item.forecast.length; i++) {
        var forecastItem = item.forecast[i];
        var date = new Date(forecastItem.time);
        var formatDate  = days[date.getDay()];
        forecastHTML +=
                '<li class="item-content">' +
                  '<div class="item-inner">' +
                    '<div class="item-title">' + formatDate + '</div>' +
                    '<div class="item-after"><span class="state">' + forecastItem.weather[0].value + '</span><span class="temps"><span class="high">' + forecastItem.snow_amount + '&quot;</span></span></div>' +
                  '</div>' +
                '</li>';
    }
    var pageContent = App.detailsTemplate
                    .replace(/{{name}}/g, item.name)
                    .replace(/{{new_snow}}/g, (item.snow || 0) +'&quot; / '+ (item.base || 0) + '&quot;' )
                    .replace(/{{condition}}/g, item.condition.text)
                    .replace(/{{forecast}}/g, forecastHTML);
    mainView.loadContent(pageContent);
});

// Update app when manifest updated 
// http://www.html5rocks.com/en/tutorials/appcache/beginner/
// Check if a new cache is available on page load.
window.addEventListener('load', function (e) {
    window.applicationCache.addEventListener('updateready', function (e) {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            App.confirm('A new version of weather7 is available. Do you want to load it right now?', function () {
                window.location.reload();
            });
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);
}, false);
