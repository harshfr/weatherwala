import { useState, useRef, useEffect } from "react"
import CurrentWeather from "./components/CurrentWeather"
import HourlyWeatherItem from "./components/HourlyWeatherItem"
import SearchSection from "./components/SearchSection"
import { weatherCodes } from "./constants"
import NoResultsDiv from "./components/NoResultsDiv"


const App = () => {

    const API_KEY = "cc4a9057e8f34fab8fa184250250607";   

   const[currentWeather, setCurrentWeather] = useState({});
   const[hourlyForecasts, setHourlyForecasts] = useState([]);
   const[hasNoResults , setHasNoResults] = useState(false);
   const searchInputRef = useRef(null);

   const filterHourlyForecast = (hourlyData) =>{

     const currentHour = new Date().setMinutes(0, 0, 0);
     const next24Hours = currentHour + 24*60*60*1000;

     //Filter the hourly data to only include the next 24 hours
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
   
     setHourlyForecasts(next24HoursData);
   };

   //Fetches weather details based on the API URL
  const getWeatherDetails = async(API_URL)=>{
    setHasNoResults(false);
     window.innerWidth <= 768 && searchInputRef.current.focus(); 

     try {
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error();
        const data = await response.json();
       
      //Extract current weather data  
     const temperature = Math.floor(data.current.temp_c);
     const description = data.current.condition.text;
     const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

    setCurrentWeather({temperature, description, weatherIcon});
      
    //Combined hourly data from both forecast days
    const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];

    searchInputRef.current.value = data.location.name;
   
    filterHourlyForecast(combinedHourlyData); 

     } catch   {
      
      //Set setHasNoResults state if there's and error
       setHasNoResults(true);
     }
  };
  
   //Fetch Default City (like london) weather data on initial render
  useEffect(()=>{
       const defaultCity = 'London';
       const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;

    getWeatherDetails(API_URL);  
  }, []);

  return (
   
    <div className="container">
      {/* Search Section */}
      
      <SearchSection  getWeatherDetails={getWeatherDetails} searchInputRef = {searchInputRef}/> 
          
     {/* Conditionally render based on hasNoResults state  */}
         {hasNoResults ? (
          <NoResultsDiv/>
         ) : (
               
        <div className="weather-section">
         {/* Weather section */}
           <CurrentWeather currentWeather = {currentWeather}/>
               
      {/* Hourly weather forecast list */}
           <div className="hourly-forecast">
            <ul className="weather-list">
             {hourlyForecasts.map(hourlyWeather => (
  <HourlyWeatherItem  key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather} />
              ))}   
              </ul>
              </div>
             </div>
         )
        }
           </div>
  )
}

export default App