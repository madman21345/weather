import React, {useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client'
//import axios from 'axios'
import { createStore } from 'redux'
import { format } from 'date-fns';
import './index.css'
import Content from './content'
import Form from './form'

const weatherUrl = '/api/weather';

const getWeather = () => {
  const currentState = store.getState();
  return fetch(weatherUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentState),
  }).then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

const initialState = {
  city: '',
  date: null
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload
      };
    case 'SET_DATE':
      return {
        ...state,
        date: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(locationReducer)

const App = () => {
  
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [nlc, setNlc] = useState(null);
  const [history, setHistory] = useState(false);
  
  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleDate = (selectedDate) => {
    setDate(selectedDate);
  };

  //submits, saves the date and location and then sends to server for weatherData
  const handleSubmit = async (event) => {
    event.preventDefault();

    let Date = format(date, 'yyyy-MM-dd');
    store.dispatch({ type: 'SET_CITY', payload: city });
    store.dispatch({ type: 'SET_DATE', payload: Date });
    //console.log(Date);
    //console.log(city);
    try {
      let weatherData = await getWeather();
      //console.log(weatherData);
      setWeatherData(weatherData);
      setHistory(true);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [weatherR, nlcR] = await Promise.all([
        fetch(weatherUrl),
        fetch('http://localhost:3001/')
      ]);
      
      const data = await weatherR.json();
      const nloc = await nlcR.json();
      //console.log(weatherData);
      //console.log(nlc);
      setWeatherData(data);
      setNlc(nloc);
    };
    fetchData();
    getLocation();
  }, []);
  
  //JSX
  console.log(weatherData);
  //console.log(history);
  return (
    <>
      <Form city={city} handleCity={handleCity} date={date} handleDate={handleDate} handleSubmit={handleSubmit} />
      {weatherData && (weatherData.current || weatherData.forecast) && nlc && <Content data={weatherData} nlc={nlc.nlc} history={history} />}
    </>
  )
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(transmitPosition);
  };
};

function transmitPosition(position) {
  fetch("/save_location", {
    method: "POST",
    body: JSON.stringify({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    //credentials: "include" 
  });
};

const root = document.getElementById('root');
const rootApp = createRoot(root);

const renderApp = () => {
  rootApp.render(<App />);
};

renderApp();
store.subscribe(renderApp);
