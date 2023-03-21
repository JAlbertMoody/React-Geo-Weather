import React, { useState, useEffect } from 'react';

function Weather({coordinates}){
    const [weatherData, setWeatherData] = useState(null);
    
    // Openweather Api Key goes here
    const API_KEY = "YOUR_API_KEY"

    // Call the OpenWeatherAPI to get weather data for the coordinate pair returned from the map.
    // weatherData is set to the object returned from the API call
    useEffect(() => {
        async function fetchWeatherData() {
            if (coordinates) {
                const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=hourly,daily&appid=${API_KEY}`;
                try {
                    const response = await fetch(URL);
                    if (response.ok) {
                        const data = await response.json();
                        setWeatherData(data);
                    } else {
                        throw new Error('API request failed');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        fetchWeatherData();
    }, [coordinates] );

    function DisplayWeather(){
        if (weatherData){
            // Format some data returned from the API Call.
            // This is just a few of the many data points returned. 
            // console.log(weatherData) to see the full amount.
            const location = weatherData.name;
            const temperature = ((weatherData.main.temp - 273.15) * 1.8 + 32).toFixed(1);
            const description = (weatherData.weather[0].description).toUpperCase();

            // return a 'weather' element to be rendered
            return (
                <div className='Weather'>
                    <h3>Weather for {location}</h3>
                    <p>Temperature: {temperature}&deg; F</p>
                    <p>{description}</p>
                </div>
            )
        }
        else {
            return (
                <h2>No weather data for that location.</h2>
            )
        }
    }

    // call the function to display the weather data
    return (
        <>
            <DisplayWeather />
        </>
    )
}

export default Weather