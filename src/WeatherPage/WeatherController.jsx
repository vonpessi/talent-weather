import React, { useState, useEffect } from 'react';
import CitySelector from './CitySelector';
import WeatherCard from './WeatherCard';



const WeatherHandler = () => {

    const [locationName, setLocationName] = useState('')
    const baseURL = 'https://api.openweathermap.org/data/2.5'
    const [currentWeather, setCurrentWeather] = useState([])
    const [forecast, setForecast] = useState([])
    const date = new Date()
    const [locations, setLocation] = useState([])
    const [openWeatherPage, setOpenWeatherPage] = useState(false)
    const [validCity, setValidCity] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)

    // Change this open weather map API-key https://openweathermap.org/
    const weatherToken = process.env.REACT_APP_WEATHER_API_KEY

    


    useEffect(() => {

        if (locations.length < 1 && localStorage.length) {
            getCityNamesFromLocalStorage()
        }
    }, [locations, locationName])


    const getCityNamesFromLocalStorage = () => {

        const localStorageLocations = [];

        for (var i = 0; i < localStorage.length; i++) {
            var location = localStorage.getItem(localStorage.key(i))
            localStorageLocations.push(location)
        }
        if (localStorage && localStorage.length === 0) {
            setLocation(localStorage.getItem[0])
        }
        setLocation(localStorageLocations);
    }


    const getCurrentWeatherFromApi = async (city) => {
        try {
            const response = await fetch(`${baseURL}/weather?q=${city}&units=metric&appid=${weatherToken}`)
            return response.json();

        } catch (err) {
            console.error('err', err);
        }
        return {};
    };

    const getForecastFromApi = async (city) => {
        try {
            const response = await fetch(`${baseURL}/forecast?q=${city}&units=metric&appid=${weatherToken}`);
            return response.json();
        } catch (error) {
            console.error(error);
        }

        return {};
    };



    const getWeatherByCityName = async (value) => {

        if (value.length) {
            setLocationName(value)
            const [weatherData] = await Promise.all([getCurrentWeatherFromApi(value)]);
            const [forecastData] = await Promise.all([getForecastFromApi(value)]);
            setWeatherData(weatherData, forecastData)
        }
        else {
            setValidCity(true)
            console.log('Error with city name')
        }
    }


    const setWeatherData = (weatherData, forecastData) => {

        if (weatherData.cod === '404') {
            setValidCity(false)

        } else {

            if (weatherData) {
                console.log('Weather data:', weatherData)

                setCurrentWeather(
                    {
                        date: date.toDateString().split(' ')[2]
                            + ' ' + date.toDateString().split(' ')[1]
                            + ' ' + date.toDateString().split(' ')[3],
                        temp: Math.floor(weatherData.main.temp),
                        name: weatherData.name,
                        main: weatherData.weather[0].main,
                        imgurl: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon.slice(0, 2)}n@2x.png`,
                    })

            } else {
                console.log('unable to fetch weather')
            }

            if (forecastData) {
                
                console.log(forecastData)
                setForecast([])

                // take the next 4 weathervalues for every 3 hours
                const hourlyForecast = forecastData.list.slice(1, 5)

                console.log(hourlyForecast)
                const newState = () => hourlyForecast.map(weather =>


                    setForecast(forecast =>[...forecast, 
                        {
                            time: weather.dt_txt.split(' ')[1].slice(0, 5),
                            temp: Math.floor(weather.main.temp),
                            imgurl: `http://openweathermap.org/img/wn/${weather.weather[0].icon.slice(0, 2)}n.png`,

                        }
                    ])
                );

                newState()
                console.log(newState)

            } else {
                console.log('unable to fetch forecast')
            }
            localStorage.setItem(weatherData.name, weatherData.name)
            getCityNamesFromLocalStorage()
            setValidCity(true)
            setOpenWeatherPage(true)
        }

    };

    const toggleWeatherPage = () => {
        getCityNamesFromLocalStorage()
        setMenuOpen(false)
        setOpenWeatherPage(!openWeatherPage)
    }


    const handleCityNameChange = (value) => {
        setLocationName(value)
    }

    const handleSetMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <div className='WeatherCardContainer'>

            {openWeatherPage ?
                <WeatherCard
                    getCityNamesFromLocalStorage={getCityNamesFromLocalStorage}
                    locationName={locationName}
                    menuOpen={menuOpen}
                    handleSetMenuOpen={handleSetMenuOpen}
                    toggleWeatherPage={toggleWeatherPage}
                    forecast={forecast}
                    weather={currentWeather} />
                :
                <CitySelector
                    validCity={validCity}
                    locations={locations}
                    locationName={locationName}
                    getWeatherByCityName={getWeatherByCityName}
                    cityNameHandler={handleCityNameChange} />
            }
        </div>
    )
}


export default WeatherHandler;
