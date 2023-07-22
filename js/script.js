let appContent = document.getElementById('app-content');
let searchInput = document.getElementById('search-input');
let toogleBtn = document.getElementById('toggle-btn');
let links = document.getElementById('links');
let nav = document.getElementById('nav')

let currentCity = 'cairo';
let currentDays = 3;


toogleBtn.addEventListener('click', function () {
  links.classList.toggle('show');
  nav.classList.toggle('height')
})

async function getWeather(currentCity) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=013ebea3e66a429fbcd165724231902&q=${currentCity}&days=${currentDays}`,
  );
  let data = await response.json();
  displayData(data);
}

function displayData(data) {
  let dateOfDayOne = new Date(data.forecast.forecastday[0].date);
  let dateOfDayTwo = new Date(data.forecast.forecastday[1].date);
  let dateOfDayThree = new Date(data.forecast.forecastday[2].date);

  appContent.innerHTML = `
    <div>
      <div class="header">
        <span class="day">${dateOfDayOne.toLocaleString('en-us', {
          weekday: 'long',
        })}</span>
        <span class="month">${
          dateOfDayOne.getDate() +
          dateOfDayOne.toLocaleString('default', { month: 'long' })
        }</span>
      </div>
    <div class="body">
      <span class="city">${data.location.name}</span>
      <div class="temp">
        <span class="the-temp">${data.current.temp_c}&#176;C</span>
        <img src="${data.current.condition.icon}" alt="Temp-Style">
      </div>
      <span class="temp-type">
        ${data.current.condition.text}
      </span>
        <div class="icons">
          <ul>
            <li><img src="./images/icon-compass@2x.png" alt="Icon"> East</li>
            <li><img src="./images/icon-umberella@2x.png" alt="Icon"> 20%</li>
            <li><img src="./images/icon-wind@2x.png" alt="Icon"> 18Km/h</li>
          </ul>
        </div>
    </div>
  </div>
  <div>
    <div class="header">
      <span class="day">${dateOfDayTwo.toLocaleString('en-us', {
        weekday: 'long',
      })}</span>
    </div>
    <div class="body">
      <img src="${
        data.forecast.forecastday[1].day.condition.icon
      }" alt="Temp-Style">
      <span class="max-temp">${
        data.forecast.forecastday[1].day.maxtemp_c
      }&#176;C</span>
      <span class="min-temp">${
        data.forecast.forecastday[1].day.mintemp_c
      }&#176;C</span>
      <span class="temp-type">
      ${data.forecast.forecastday[1].day.condition.text}
      </span>
    </div>
  </div>
<div>
  <div class="header">
    <span class="day">${dateOfDayThree.toLocaleString('en-us', {
      weekday: 'long',
    })}</span>
  </div>
  <div class="body">
    <img src="${
      data.forecast.forecastday[2].day.condition.icon
    }" alt="Temp-Style">
    <span class="max-temp">${
      data.forecast.forecastday[2].day.maxtemp_c
    }&#176;C</span>
    <span class="min-temp">${
      data.forecast.forecastday[2].day.mintemp_c
    }&#176;C</span>
    <span class="temp-type">
    ${data.forecast.forecastday[1].day.condition.text}
    </span>
  </div>
</div>
  `;
  console.log();
}

searchInput.addEventListener('input', function (e) {
  if (e.target.value.length > 3) {
    currentCity = e.target.value;
  }
  
  getWeather(currentCity);
});

getWeather(currentCity);
