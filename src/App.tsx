import {useState , useRef, FormEvent, useEffect} from 'react'
import './App.css'


interface Weather {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  temperature: number;
  weather_description: string;
  humidity: number;
  wind_speed: number;
  forecast: string[];
}

function App() {
  const [ville, setVille] = useState("Paris");
  const [weather, setWeather] = useState<Weather>();

  const VilleChoisie = useRef<HTMLInputElement>(null);

  /*Definition des icones avec heroicon*/
  const IconWeather = {
    "Clear sky" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
  
,
    "Partly cloudy" : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
    <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0 1 11.573-2.226 3.75 3.75 0 0 1 4.133 4.303A4.5 4.5 0 0 1 18 20.25H6.75a5.25 5.25 0 0 1-2.23-10.004 6.072 6.072 0 0 1-.02-.496Z" clip-rule="evenodd" />
</svg>,
    "Sunny" :<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
  ,
    "Cloudy" : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
    <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0 1 11.573-2.226 3.75 3.75 0 0 1 4.133 4.303A4.5 4.5 0 0 1 18 20.25H6.75a5.25 5.25 0 0 1-2.23-10.004 6.072 6.072 0 0 1-.02-.496Z" clip-rule="evenodd" />
</svg>,
    "Rain showers" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
  ,
    "Rainy" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>

  }

  /*Conseils de tenue*/
  const AdviceWeather = {
    "Clear sky" : "N'oubliez pas la crème solaire (SPF50 c'est mieux) !",
    "Partly cloudy" : "N'oubliez pas le veston !" ,
    "Sunny" : "Sortez les claquettes (sans chaussette) !",
    "Cloudy" : "Portez votre doudoune",
    "Rain showers" : "Fuyez"   ,
    "Rainy" : "Prenez votre parapluie !"

  }

  /*Lancement de l'API au changement de ville*/
  useEffect(() => {
    if (!ville) return
    fetch("/api/v1/weathers?search=" + ville)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setWeather(json[0]);
      });
  },[ville]);


  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setVille(VilleChoisie.current?.value ?? "");
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className='FormRecherche'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
        <input id='recherche' placeholder='Rechercher' type="text" ref={VilleChoisie} />
      </form>
      <div>
        <p className='WeatherCity'>{weather?.city} , {weather?.country}</p>
        <div className='WeatherInfos'>
          <div className='ColGauche'>{weather?.temperature}°C
                                    {weather?.weather_description}
          </div>
          <div className='ColDroite'>   
            {weather?.weather_description.toLowerCase() === "clear sky" ? IconWeather["Clear sky"] : ""}
            {weather?.weather_description.toLowerCase() === "partly cloudy" ? IconWeather["Partly cloudy"] : ""}
            {weather?.weather_description.toLowerCase() === "sunny" ? IconWeather["Sunny"] : ""}
            {weather?.weather_description.toLowerCase() === "cloudy" ? IconWeather["Cloudy"] : ""}
            {weather?.weather_description.toLowerCase() === "rain showers" ? IconWeather["Rain showers"] : ""}
            {weather?.weather_description.toLowerCase() === "rainy" ? IconWeather["Rainy"] : ""}
          </div>
        </div>
        <div className='WeatherAdvice'>
        {weather?.weather_description.toLowerCase() === "clear sky" ? AdviceWeather["Clear sky"] : ""}
          {weather?.weather_description.toLowerCase() === "partly cloudy" ? AdviceWeather["Partly cloudy"] : ""}
          {weather?.weather_description.toLowerCase() === "sunny" ? AdviceWeather["Sunny"] : ""}
          {weather?.weather_description.toLowerCase() === "cloudy" ? AdviceWeather["Cloudy"] : ""}
          {weather?.weather_description.toLowerCase() === "rain showers" ? AdviceWeather["Rain showers"] : ""}
          {weather?.weather_description.toLowerCase() === "rainy" ? AdviceWeather["Rainy"] : ""}
        </div>
      </div>
    </div>
  )
}

export default App
