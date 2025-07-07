# 🌤️ React Weather App

This site is not deployed!
A simple and responsive weather application built using **React.js** that fetches real-time weather data using the **WeatherAPI** from [weatherapi.com](https://www.weatherapi.com/).

## 🔍 Features

- Search for any city to get real-time weather updates
- Displays:
  - Current temperature
  - Weather conditions (icons, description)
  - 24-hour hourly forecast
- Error handling for invalid city names or failed API requests
- Clean and responsive UI

## 🚀 Tech Stack

- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **API**: [WeatherAPI](https://www.weatherapi.com/)
- **Icons**: [Flaticon](https://www.flaticon.com/)
- **CSS UI Inspiration**: [GetCSSScan](https://getcssscan.com/)
- **Learning Resources**: YouTube tutorials & official docs

## 🔑 API Key

This project uses a free API key from **weatherapi.com**.

👉 Sign up and generate your key here: [https://www.weatherapi.com/signup.aspx](https://www.weatherapi.com/signup.aspx)

To use it:
1. Create a `.env` file in the root directory
2. Add your API key like this:


3. Use it in your code:
```js
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
weather-app/
│
├── public/
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx
│   │   ├── HourlyWeatherItem.jsx
│   │   ├── NoResultsDiv.jsx
│   │   └── SearchSection.jsx
│   ├── App.jsx
│   ├── index.js
│   └── styles/
├── .env
├── package.json
└── README.md
