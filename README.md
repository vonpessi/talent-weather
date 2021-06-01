# Talent-weather

This project is a simple web-application for showing the current weather and forecast. Application use the API's from the [OpenWeather](https://openweathermap.org/) website.

This project contains only the front end application.

Tested with the Chrome web browser.

## Getting started

Clone or download this repository:
```
git clone https://github.com/vonpessi/talent-weather.git
```

Register to the https://openweathermap.org/api website and get free API-token.

Edit src/WeatherPage/WeatherController.jsx file and find the following line.
```
const weatherToken = process.env.REACT_APP_WEATHER_API_KEY
```
Replace weatherToken: "process.env.REACT_APP_WEATHER_API_KEY" with your own openweathermap API-key.

## Start Application

Go to the project directory and run:

```
npm install
```

This install all the packages and dependencies for your project.

```
npm start
```

This starts the application in the development mode and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

https://user-images.githubusercontent.com/33121987/120307636-e1fcce80-c2db-11eb-83eb-7687f794a9a5.mov



