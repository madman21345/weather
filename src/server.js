const express = require('express')
const app = express();
const cors = require('cors');
const session = require('express-session');
var request = require("request");
require('dotenv').config();

let API_KEY = process.env.WEATHER_API_KEY;
let SECRET_KEY = process.env.SECRET_KEY;

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
    let no_loc_available = true;
    let lat, lng;
    
    try {
        lat = req.session.lat;
        lng = req.session.lng;
        //console.log(req.session.lng)
        no_loc_available = false;
    } catch (error) {
        lat = 9.5127;
        lng = 122.8797;
    }
    res.send(no_loc_available);
});
  
app.get('/api/weather', (req, res) => {
    let no_loc_available = true;
    let lat, lng;
    
    try {
        lat = req.session.lat;
        lng = req.session.lng;
        //console.log(req.session.lng);
        no_loc_available = false;
    } catch (error) {
        lat = 9.5127;
        lng = 122.8797;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lng}&aqi=yes`;
    //console.log(url);
    //will learn to use axios next time.
    request(url, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            const data =  JSON.parse(body);
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