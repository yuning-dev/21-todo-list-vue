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

// app.post('/api/task/create', () => {})
// app.get('/api/task/', () => {})
// app.put('/api/task/update', () => {})
// app.delete('/api/task/delete', () => {})

app.post('/api/task/create', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'))
    const newTask = req.body

    if (!req.body.description) {
        return res.send(400)
    }

    console.log(req.body)

    tasks.push(newTask)

    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2))

    return res.send(200, tasks) // 200 is a HTTP status code
    // Codes 2xx = success
    // Codes 3xx = redirect
    // Codes 4xx = client error
    // Codes 5xx = server error
})

app.listen(port, () => {
    console.log(`Todo list app listening on port ${port}`)
})


// Example of what `get` might look like
// const app = {
//     get: (path, callback) => {
//         ...
//         const req = ...
//         const res = ...
//         callback(req, res)
//     }
// }