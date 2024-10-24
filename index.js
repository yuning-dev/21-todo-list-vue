const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const apptRoutes = require('./routes/api/appt-list')
const port = process.env.PORT || 80
const app = express()
const path = require('path')

app.use(cors({
    origin: [
        'http://localhost:80',
        'https://localhost:80'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}))
app.use(cookieParser())

app.use(session({
    secret: 'soincrediblymuchsecrecy',
    cookie: {
        maxAge: 60000 * 60 * 24,
        secure: false
    },
    saveUninitialized: true,
    resave: false,
}))

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'views/appt-list')))

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB database connected...')
    })
    .catch((err) => console.log(err))

app.use('/api', apptRoutes)

// code below will make the browser send the index.html file as a response - probably not desired??
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/appt-list/index.html'))
})

app.listen(port, () => {
    console.log(`Appointments app listening on port ${port}`)
})