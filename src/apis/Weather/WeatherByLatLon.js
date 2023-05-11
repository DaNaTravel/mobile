const API_KEY = 'c5e20c1c9c2b705472628870902b29d9';
export const WeatherPlace = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  )
    .then(response => response.json())
    .catch(err => console.error(err));
};
