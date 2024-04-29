var weather = require('weather-js');
const express = require('express')
const { fulldata } = require('./mymodule')
const app = express()
app.set('view engine', 'ejs')
const cors = require('cors')
app.use(
    cors({
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
    }))

app.use(express.json())

const port = 5173;

var admin = require("firebase-admin");

var serviceAccount = require("./code-3ac2d-firebase-adminsdk-2hy4g-966999037a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const memberColl = db.collection('Portfolio')
const studentColl = db.collection('student')

app.use((req, res, next) => {
    console.log("Request Made");
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    next()
})

app.use(express.static('public'));
app.use(express.static('views'))

app.get('/', async function (req, res) {
    const items = await memberColl.get();
    const studentSnapshot = await studentColl.get();
    const studentsList = studentSnapshot.docs.map(doc => doc.data());
    res.json(studentsList);
    console.log(items.docs.length);
    let data = { itemData: items.docs, myData: fulldata }
    res.render('index', data);
})

app.get('/addstudent', async function (req, res) {
    const { name, age, course, subjects } = req.body;
    try {
        const docRef = await studentColl.add({ name, age, course, subjects })
        console.log(docRef.id);
    } catch (error) {
        console.error('Error adding student', error);
        res.status(500).json({ error: 'Failed to add student' });
    }
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
