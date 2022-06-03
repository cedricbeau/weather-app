// API - https://www.weatherbit.io/api/weather-current
const keyAPI = 'c38fb3ed6b0141f5b14d130e7f5d80a6';
const baseAPI = 'http://api.weatherbit.io/v2.0/forecast/daily?';

// Show value
function showWeather(searchValue) {

  let insertDatas = '';

  fetch(`${baseAPI}lang=fr&city=${searchValue}&days=6&key=${keyAPI}`)
  .then(response => response.json())
  .then(response => {

    const city = response.city_name;
    const lon = response.lon;
    const lat = response.lat;
    const timezone = response.timezone;
    const countryCode = response.country_code;

    // Display city infos
    displayCityInfos(city, lon, lat, timezone, countryCode);

    // Display weathers informations
    const results = response.data;

    results.map(function(result) {

      console.log(result)

      // formatDate
      const litteralDate = formatDate(result.datetime)

      insertDatas += `
        <div class="col col-md-4 mb-4">
          <div class="bg-white p-3 rounded shadow-sm border">
            <img src="https://www.weatherbit.io/static/img/icons/${result.weather.icon}.png" class="d-block mx-auto">
            <div class="text-center">${litteralDate}</div>
            <div class="text-center mb-4"><strong>${result.weather.description}</strong></div>
            <div class="d-flex justify-content-between"><span>Température : </span><strong>${Math.round(result.temp)}°</strong></div>
            <div class="d-flex justify-content-between"><span>Température minimum : </span><strong>${Math.round(result.min_temp)}°</strong></div>
            <div class="d-flex justify-content-between"><span>Température maximum : </span><strong>${Math.round(result.high_temp)}°</strong></div>
            <hr>
            <div class="d-flex justify-content-between"><span>Vitesse du vent : </span><strong>${Math.round(result.wind_spd)} m/s</strong></div>
            <div class="d-flex justify-content-between"><span>Direction du vent : </span><strong>${Math.round(result.wind_dir)}°</strong></div>
            <div class="d-flex justify-content-between"><span>Sens du vent : </span><strong>${result.wind_cdir_full}</strong></div>
            <hr>
            <div class="d-flex justify-content-between"><span>Probabilité de précipitations : </span><strong>${Math.round(result.pop)}%</strong></div>
            <div class="d-flex justify-content-between"><span>Précipitation accumulée : </span><strong>${Math.round(result.precip)} mm</strong></div>
            <div class="d-flex justify-content-between"><span>Taux de précipitation : </span><strong>${result.precip} mm/hr</strong></div>
            <hr>
            <div class="d-flex justify-content-between"><span>Couverture nuageuse : </span><strong>${result.clouds}%</strong></div>
            <div class="d-flex justify-content-between"><span>Visibilité : </span><strong>${result.vis} Km</strong></div>
          </div>
        </div>
      `
    })

    // Insert datas
    document.getElementById('datasResult').innerHTML = insertDatas;
  })
  .catch(error => alert("Erreur : " + error));
}

// add City
function displayCityInfos (name, lon, lat, timezone, country) {
  let insertCity = '';

  insertCity += `
  <div class="bg-white p-5 rounded shadow-sm border">
    <div>Ville : <strong>${name}</strong></div>
    <div>Longitude : <strong>${lon}</strong></div>
    <div>Lattitude : <strong>${lat}</strong></div>
    <div>Fuseau horaire : <strong>${timezone}</strong></div>
    <div>Pays : <strong>${country}</strong></div>
  </div>
  `
  // Insert datas
  document.getElementById('cityResult').innerHTML = insertCity
}

// formatDate
function formatDate(responseDate) {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const date = new Date(responseDate);
  const day = days[date.getDay()];
  const dayNum = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const month = months[date.getMonth()];
  const litteralDate = `${day} ${dayNum} ${month}`;

  return litteralDate;
}

// Submit
document.getElementById('searchForm').addEventListener('submit', function (event) {
  let searchValue = document.getElementById('city').value
  event.preventDefault();
  if(searchValue!=='') {
    showWeather(searchValue);
    this.reset();
  } else {
    alert('Veuillez renseigner le nom d\'une ville')
  }
})

// Map
// https://docs.mapbox.com/help/tutorials/local-search-geocoding-api/
// https://wiki.openstreetmap.org/wiki/API_v0.6