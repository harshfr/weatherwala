

const SearchSection = ({getWeatherDetails, searchInputRef}) => {

  const API_KEY = "cc4a9057e8f34fab8fa184250250607";

    
  const handleCitySearch = (e)=>{
    e.preventDefault();

    const searchInput = e.target.querySelector(".search-input");

    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;

    getWeatherDetails(API_URL); //Fetches weather detai;s for the entered city
    };

    //Gets users current location(latitude/longitude)
     const handleLocationSearch = ()=>{
      navigator.geolocation.getCurrentPosition(
        (position) =>{
          const {latitude, longitude} = position.coords;
           const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;

    getWeatherDetails(API_URL); //Fetches the weather details forthe user's current location
      
       window.innerWidth >= 768 && searchInputRef.current.focus();

        },
        ()=>{
          alert("Location access denied. Please enable permissions to use this feature.");
        }
      )
     }


  return (
    
     <div className="search-section">
     
        <form action="#" title="Click to Search City"  className="search-form" onSubmit={handleCitySearch}>
      <span className="material-symbols-rounded">search</span>
          <input type="search" placeholder="Enter a city name" ref={searchInputRef} className="search-input" required/>
        </form>
        <button className="location-button" title="GPS Location" onClick={handleLocationSearch}>
       <img className="gps-button" src="/icons/gps logo.png" alt=""/>
        </button>
      </div>
  )
}

export default SearchSection