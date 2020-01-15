import axios from 'axios';

export function requestCityList(init) {
  return axios.get(`http://request.tonicraftor.com/weather_REST.php?page=search&q=${init}`);
}

export function requestCurrent(name) {
  return axios.get(`http://request.tonicraftor.com/weather_REST.php?page=current&q=${name}`);
}

export function requestForecast(name) {
  return axios.get(`http://request.tonicraftor.com/weather_REST.php?page=forecast&q=${name}`);
}

export const DefaultCity = 'Houston';
