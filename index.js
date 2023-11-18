const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const path = __dirname + '/views/to-do-list/'
app.use(express.static(path))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path + 'index.html')
})

app.listen(port, () => {
    console.log(`Todo list app listening on port ${port}`)
})

// Set up some configuration that allows your locally running vue app
// to communicate with the backend.
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next()
})

// Set up the "routes", basically the URLs that the endpoints will run from
// Imports the routes/index.js file. If you import a folder (routes in this case)
// it will implicitly import the index.js file from that folder by default.
const setUpRoutes = require('./routes')

setUpRoutes(app)

// Ensure that the tasks.json file exists
if (!fs.existsSync('tasks.json')) {
    fs.writeFileSync('tasks.json', '[]')
}



// Example of what the `get` express function might look like
// const app = {
//     get: (path, callback) => {
//         ...
//         const req = ...
//         const res = ...
//         callback(req, res)
//     }
// }