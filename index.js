const express = require('express')
require('dotenv').config()
const fs = require('fs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/api/todo-list')
const port = process.env.PORT || 3000
const app = express()
const path = require('path')

app.use(cors())
app.use(express.static(path.join(__dirname, 'views/to-do-list')))

app.use(bodyParser.json())

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB database connected...'))
    .catch((err) => console.log(err))

app.use('/api', routes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/to-do-list/index.html'))
})

app.listen(port, () => {
    console.log(`Todo list app listening on port ${port}`)
})