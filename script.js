// Bruce Belk provided his API subscription back when we found out we all had to purchase
var appId = '692efab00ae66e9f48137e6ea4766fcd';
var searchEl = document.querySelector('#searchCity');
var previousBtn = document.querySelector('#previousSearch');
var currentEl = document.querySelector('#currentWeather');
var fiveDayEl = document.querySelector('#fiveDayForecast');
var h3El = document.createElement('h3');

var toJSON = function(res) {
  return res.json();
};

var getWeather = function(data, city) {
  var currentEl = document.querySelector('#currentWeather')
  var h3El = document.createElement('h3')
  var icon = data.current.weather[0].icon
  var date = new Date(data.current.dt * 1000).toDateString
  var pEl = document.createElement('p')
  var humidEl = document.createElement('p')
  var uviEl = document.createElement('p')
  var windEl = document.createElement('p')


  h3El.textContent = city.name
  pEl.textContent = 'temp: ' + data.current.temp + 'F'
  humidEl.textContent = 'humidity: ' + data.daily[0].humidity + '%'
  windEl.textContent = 'wind speed: ' + data.daily[0].wind_speed + 'mph'
  uviEl.textContent = 'uv index: ' + data.daily[0].uviEl
  
  currentEl.appendChild(h3El)
  
  currentEl.appendChild(pEl)
  currentEl.appendChild(humidEl)
  currentEl.appendChild(uviEl)
  currentEl.appendChild(windEl)


}