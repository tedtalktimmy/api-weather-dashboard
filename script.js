var searchEl = document.querySelector('#searchCity');
var previousBtn = document.querySelector('#previousSearch');
var currentEl = document.querySelector('#currentWeather');
var fiveDayEl = document.querySelector('#fiveDayForecast');
var h3El = document.createElement('h3');
searchEl = document.getElementById('formSubmit');
// Bruce Belk provided his API subscription back when we found out we all had to purchase
var appId = '692efab00ae66e9f48137e6ea4766fcd';

getOneCall = (city => {
  oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appId}&units=imperial&exclude=hourly,minutely`;

  fetch(oneCall)
  .then(toJSON)
  .then((data) => {
    findWeather(data, city);
  })
});

var toJSON = (res => {
  return res.json();
});

var displayBtn = (cities => {
  var savedCity = JSON.parse(localStorage.getItem('cities')) || [];
  for (city of savedCity) {
    buttonEl = document.createElement('button');
    buttonEl.textContent = city;
    buttonEl.className = 'btn btn primary';
    previousBtn.appendChild(buttonEl);
  }
});

var getWeather = (data, city) => {
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
  } else if (data.daily[0].uvi >= 4 && data.daily[0].uvi <= 6) {
  } else if (data.daily[0].uvi >= 7 && data.daily[0].uvi <= 8) {
  } else if (data.daily[0].uvi >= 9 && data.daily[0].uvi <= 10) {
    uviEl.classList.add('veryHigh')
  } else {
    uviEl.classList.add('extreme')
  }


  var fiveDayForecast = data.daily.slice(1, 6);
  for (day of fiveDayForecast) {
    var dates = new Date(day.dt * 1000).toLocaleDateString();
    var temp = day.temp.day;
    var humidity = day.humidity
    var wind = day.wind_speed

    var column = document.createElement('div');
    var card = document.createElement('div');
    date = document.createElement('p');
    temp = document.createElement('p');
    humidity = document.createElement('p');
    wind = document.createElement('p');

    card.className = 'card m-3 w-80 p-2'
    date.textContent = dates
    temp.textContent = 'temp: ' + temp + 'f'
    humidity.textContent = 'humidity: ' + humidity + '%'
    wind.textContent = 'Wind: ' + 'mph'

    fiveDayForecastEl.appendChild(column);
    column.appendChild(card);
    card.appendChild(date);
    card.appendChild(temp);
    card.appendChild(humidity);
    card.appendChild(wind);

  }

};

getGeo = (locations => {
  city = locations[0]
  saveToLocalStorage(city.name);
  getOneCall(city);
  displayBtn();
});



saveToLocalStorage = (city => {
  savedCity = JSON.parse(localStorage.getItem('cities')) || [];
  savedCity.push(city);
  cityArr = Array.from(new Set (savedCity));
  saved = JSON.stringify(cityArr);
  localStorage.setItem('cities', saved)
});



diplayBtn = (cities => {
  prevCities = JSON.parse(localStorage.getItem('cities')) || [];
  for (cities of prevCities)
  buttonEl = document.createElement('button');
  buttonEl.textContent = city;
  buttonEl.className = 'btn btn primary';

  prevBtn.appendChild(buttonEl);
});


handler = (event => {
  event.preventDefault();
  q = document.querySelector('#cityInput');
  newUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${q.value}&appid=${appId}`

  fetch(newURL).then(toJSON).then(getGeo);
});

displayBtn();
searchEl.addEventListener('click', getGeo);
prevBtn.addEventListener('click', handleCity);
