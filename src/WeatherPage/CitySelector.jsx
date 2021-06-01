import React, { useEffect } from 'react'

const CitySelector = (props) => {

    const { cityNameHandler, getWeatherByCityName, locationName, locations, validCity } = props;

    useEffect(() => {
        console.log(locations)
    }, [locations])
    return (
        <div className="CitySelector">

            <div className='searchContainer'>
                <input
                    className='searchBar'
                    placeholder='Search City'
                    onChange={e => cityNameHandler(e.target.value)}></input>
                <button
                    className='addButton'
                    onClick={() => getWeatherByCityName(locationName)}>Add city</button>
            </div>

            {!validCity ? (<p>City not found</p>) : null}

            <div className='cityNameContainer'>
                {locations.length ?
                    locations.map((city, index) => (
                        <div
                            className='cityName'
                            key={index}
                            onClick={() => getWeatherByCityName(city)}>{city}</div>
                    )) : null}
            </div>
        </div>
    );
}

export default CitySelector;
