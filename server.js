var weather = require('weather-js');
const express = require('express')
const app = express()

const port = 8000;

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {

    const cities = ['San Francisco, CA', 'Davao City, Philippines', 'Paris, France']
    const weatherData = []
    const temperature = []
    const listOfCities = []

    const getWeather = (city) => {

        weather.find({ search: city, degreeType: 'C' }, function (err, result) {
            if (err) {
                res.send("Error! walay weather diri");
                console.log(err);
            } else {
                weatherData.push(result[0]);
                temperature.push(result[0].current.temperature);
                listOfCities.push(result[0].location.name);
                if (weatherData.length === cities.length) {
                    res.render('index', { temperature: temperature, city: listOfCities, weatherData: weatherData });
                }
            }
        });
    };

    cities.forEach(city => {
        getWeather(city);
    })
});
app.listen(port, () => { console.log(`Server connected to port ${port}`) })
