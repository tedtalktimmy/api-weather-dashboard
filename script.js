// Bruce Belk provided his API subscription back when we found out we all had to purchase
var appId = '692efab00ae66e9f48137e6ea4766fcd';
var searchEl = document.querySelector('#searchCity');
var previousBtn = document.querySelector('#previousSearch');
var currentEl = document.querySelector('#currentWeather');
var fiveDayEl = document.querySelector('#fiveDayForecast');
var h3El = document.createElement('h3');

var toJSON = (res => {
  return res.json();
});

var displayBtn = (cities => {
  var savedCity = JSON.parse(localStorage.getItem('cities')) || [];
  previousBtn.innerHTML = null
  currentEl.innerHTML = null
  for (city of citySaved) {
    buttonEl = document.createElement('button');
    buttonEl.textContent = city;
    buttonEl.className = 'btn btn primary';
    previousBtn.appendChild(buttonEl);
  }
});

var getWeather = (data, city => {
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

  if (data.daily[0].uvi >= 0 && data.daily[0].uvi <= 3) {
    uviEl.classList.add('low')
  } else if (data.daily[0].uvi >= 4 && data.daily[0].uvi <=6) {
  } else if (data.daily[0].uvi >= 7 && data.daily[0].uvi <=8) {
  } else if (data.daily[0].uvi >= 9 && data.daily[0].uvi <=10) {
    uviEl.classList.add('veryHigh')
  } else {
    uviEl.classList.add('extreme')
  }


  var fiveDayForecast = data.daily.slice(1,6);
  fiveDayEl.innerHTML = null;
  for (day of fiveDayForecast) {
  date;
  }



})