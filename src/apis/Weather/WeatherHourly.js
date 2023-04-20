const API_KEY = '88e5a46bab8cee63dfe64d2fb53c84d7';
export const WeatherHourly = (lat, lon, cnt) => {
  return fetch(
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=${cnt}`,
  )
    .then(response => response.json())
    .catch(err => console.error(err));
};
