import Search from '../components/search/search';
import Signup from './signup';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import CurrentWeather from '../components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';
import Login from './login';

const Home = (props) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
            console.log("uid", uid)
          } else {
            // User is signed out
            // ...
            console.log("user is logged out")
          }
        });
       
  }, [])


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
    <div className="mainContainer">
      <div className={'titleContainer'}>
      <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
      <Link
                to={'/signup'}
                className='login-button'
              >
                Login Button
              </Link>
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
        <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
      </div>
    </div>
  )
}

export default Home