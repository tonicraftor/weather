import axios from 'axios';

export function requestCityList(init) {
  return axios.get(`http://request.tonicraftor.com/weather_REST.php?page=search&q=${init}`);
}

export function requestCurrent(name) {
  return axios.get(`http://request.tonicraftor.com/weather_REST.php?page=current&q=${name}`);
}

export function requestForecast(name, days) {
  return axios.get(`http://request.tonicraftor.com/weather_REST.php?page=forecast&q=${name}&days=${days}`);
}

export function requestHistory(name, date) {
  return axios.get(`http://request.tonicraftor.com/weather_REST.php?page=history&q=${name}&dt=${date}`);
}

export const DefaultCity = 'Houston';

// http://api.weatherapi.com/v1/current.json?key=570b817b83d9436f806165958201301&q=Houston
// http://api.weatherapi.com/v1/search.json?key=570b817b83d9436f806165958201301&q=hous
