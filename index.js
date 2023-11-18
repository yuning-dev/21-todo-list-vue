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

// Set up the "routes", basically the URLs that the endpoints will run from

// Imports the routes/index.js file. If you import a folder (routes in this case)
// it will implicitly import the index.js file from that folder by default.
const setUpRoutes = require('./routes')

setUpRoutes(app)


// Example of what the `get` express function might look like
// const app = {
//     get: (path, callback) => {
//         ...
//         const req = ...
//         const res = ...
//         callback(req, res)
//     }
// }