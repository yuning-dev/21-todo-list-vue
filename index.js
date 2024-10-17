const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const todoRoutes = require('./routes/api/todo-list')
const sessionRoutes = require('./routes/api/session')
const port = process.env.PORT || 3000
const app = express()
const path = require('path')

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://localhost:3000'
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
    resave: true,
}))

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'views/to-do-list')))

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB database connected...')
    })
    .catch((err) => console.log(err))

app.use('/api', todoRoutes)
app.use('/api', sessionRoutes)

// code below will make the browser send the index.html file as a response - probably not desired??
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/to-do-list/index.html'))
})

app.listen(port, () => {
    console.log(`Todo list app listening on port ${port}`)
})