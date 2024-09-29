const apiKey = 'a17f9742e7a2195515341d52f983a62e'; 
const weatherDataDiv = document.getElementById('weather-data');

document.getElementById('get-weather').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherDataDiv.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name } = data;
    const { temp } = data.main;
    const { description } = data.weather[0];
    
    weatherDataDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${description}</p>
    `;
}
