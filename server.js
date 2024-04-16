var weather = require('weather-js');
const express = require('express')
const { fulldata } = require('./mymodule')
const app = express()
app.set('view engine', 'ejs')

const port = 8000;

app.use((req, res, next) => {
    console.log("Request Made");
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    next()
})

app.use(express.static('public'));
app.use(express.static('views'))

app.get('/', function (req, res) {
    res.render('index', { myData: fulldata })
})

app.get('/about', function (req, res) {
    res.render('about', { myData: fulldata });
})

app.get('/portfolio', function (req, res) {
    res.render('portfolio', { myData: fulldata })
})

app.get('/project', function (req, res) {
    res.render('project', { myData: fulldata })
})

app.get('/index', (req, res) => {
    res.redirect('/')
})

// app.get('/weather', function (req, res) {
//     const cities = ['San Francisco, CA', 'Davao City, Philippines', 'Paris, France']
//     const weatherData = []
//     const temperature = []
//     const listOfCities = []

//     const getWeather = (city) => {

//         weather.find({ search: city, degreeType: 'C' }, function (err, result) {
//             if (err) {
//                 res.send("Error! walay weather diri");
//                 console.log(err);
//             } else {
//                 weatherData.push(result[0]);
//                 temperature.push(result[0].current.temperature);
//                 listOfCities.push(result[0].location.name);
//                 if (weatherData.length === cities.length) {
//                     res.render('weather', { temperature: temperature, city: listOfCities, weatherData: weatherData });
//                 }
//             }
//         });
//     };

//     cities.forEach(city => {
//         getWeather(city);
//     })
// });

app.get('/paris-weather', function (req, res) {
    weather.find({ search: "Paris, France", degreeType: 'C' }, function (err, result) {
        if (err || !result || result.length === 0) {
            res.send("Error! walay weather diri!");
            console.log(err);
        } else {
            const weatherData = result;
            res.render('paris-weather', { weatherData: weatherData });
        }
    })
})

app.get('/davao-weather', function (req, res) {
    weather.find({ search: "Davao City, Philippines", degreeType: 'C' }, function (err, result) {
        if (err || !result || result.length === 0) {
            res.send("Error! walay weather diri!");
            console.log(err);
        } else {
            const weatherData = result;
            res.render('davao-weather', { weatherData: weatherData });
        }
    })
})

app.get('/sanfran-weather', function (req, res) {
    weather.find({ search: "San Francisco, CA", degreeType: 'C' }, function (err, result) {
        if (err || !result || result.length === 0) {
            res.send("Error! walay weather diri!");
            console.log(err);
        } else {
            const weatherData = result;
            res.render('sanfran-weather', { weatherData: weatherData });
        }
    })
})

app.use((req, res) => {
    res.status(404).sendFile('./views/error.html', { root: __dirname })
})

app.listen(port, () => { console.log(`Server connected to port ${port}`) })
