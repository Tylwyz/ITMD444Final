import Search from './components/search/search';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response)=> {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse});
        setForecast({ city: searchData.label, ...forecastResponse});

      })
      .catch((err)=> console.log(err));


  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
