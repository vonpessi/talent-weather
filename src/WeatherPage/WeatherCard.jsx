import React, { useEffect } from 'react';

const WeatherCard = (props) => {

    const { weather, toggleWeatherPage, forecast, handleSetMenuOpen, menuOpen, locationName, getCityNamesFromLocalStorage } = props;


    useEffect(() => {
        console.log(props)
    }, [props])

    return (
        <div>
            <div className='weatherInfoContainer'>

                <div className='weatherCardTopElementContainer'>
                    <div
                        className='arrowContainer'
                        onClick={() => toggleWeatherPage()}>
                        <i className='arrow left'></i>
                    </div>
                    <div
                        className='threeDots'
                        onClick={() => handleSetMenuOpen()}>&#xFE19;</div>
                </div>
                {menuOpen ?
                    (<div
                        className='menuBox'
                        onClick={() => {
                            localStorage.removeItem(locationName);
                            toggleWeatherPage();
                            getCityNamesFromLocalStorage();
                            handleSetMenuOpen();
                        }
                        }
                    >Remove city</div>) : null}

                <div className='nameText'>{weather.name}</div>
                <div className='WeatherText'>{weather.temp}&#176;</div>
                <div className='DateText'>{weather.date}</div>
                <div className='WeatherIcon'>
                    <img src={weather.imgurl} alt='Weather icon' />
                </div>
                <h2 className='mainWeatherText'>{weather.main}</h2>
                <div className='forecastInfoContainer'>


                    {forecast && forecast.length ?
                        forecast.map((forecastData, index) => (
                            <div
                                className='forecastRowContainer'
                                key={index}>
                                <p>{forecastData.time} </p>
                                <div>
                                    <div className='WeatherIcon'>
                                        <img src={forecastData.imgurl} alt='Weather icon' />
                                    </div>
                                </div>
                                <p>{forecastData.temp}&#176;</p>
                            </div>)) : null}

                </div>
            </div>
        </div>
    )

}

export default WeatherCard;
