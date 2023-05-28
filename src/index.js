import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
//import axios from 'axios'
import { createStore } from 'redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';


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
    .then(data => data)
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

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleDate = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let Date = format(date, 'yyyy-MM-dd');
    store.dispatch({ type: 'SET_CITY', payload: city });
    store.dispatch({ type: 'SET_DATE', payload: Date });
    console.log(Date);
    getWeather();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input type="text" value={city} onChange={handleCity} />
        </label>
        <br />
        <label>
          Date:
          <DatePicker selected={date} onChange={handleDate} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

getLocation();
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

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
