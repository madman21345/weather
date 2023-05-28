const express = require('express')
const app = express();
const cors = require('cors');
const session = require('express-session');
var request = require("request");
require('dotenv').config();

const API_KEY = process.env.WEATHER_API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());
app.use(session({
    proxy: true,
    secret: SECRET_KEY, 
    resave: false,
    saveUninitialized: true
}));


app.get('/', (req, res) => {
    //res.send('<h1>Hello World!</h1>')
    let noLocAvailable = true;
    let lat, lng;
    
    try {
        lat = req.session.lat;
        lng = req.session.lng;
        //console.log(req.session.lng)
        noLocAvailable = false;
    } catch (error) {
        lat = 9.5127;
        lng = 122.8797;
    }
    res.send(noLocAvailable);
});
  
app.get('/api/weather', (req, res) => {
    let noLocAvailable = true;
    let lat, lng;
    
    try {
        lat = req.session.lat;
        lng = req.session.lng;
        //console.log(req.session.lng);
        noLocAvailable = false;
    } catch (error) {
        //toronto
        lat = 43.67;
        lng = -79.42;
    }

    const userUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lng}&aqi=yes`;
    //console.log(url);
    //will learn to use axios soon.
    request(userUrl, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            let data =  JSON.parse(body);
            res.send(data);
        }
    })
});
app.post('/api/weather', (req, res) => {
    let url;
    let { city, date } = req.body;

    if(city === '') {
        let lat = req.session.lat;
        let lng = req.session.lng;
        url = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${lat},${lng}&dt=${date}&aqi=yes`;
    }else if(date === null) {
        //doesnt work/ dont try/ cant store date value as null i believe..
        url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
    }else{
    url = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}&aqi=yes`;
    };
    console.log(url);
    request(url, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            let data =  JSON.parse(body);
            //console.log(data);
            res.send(data);
        }
    })
});

app.post('/save_location', (req, res) => {
    const { lat, lng } = req.body;  
    
    req.session.lat = lat;
    req.session.lng = lng;
    //console.log(req.session.lng);
    res.redirect('/api/weather');
});
  

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});