const fs = require('fs')

const getTasks = () => {
    return JSON.parse(fs.readFileSync('tasks.json', 'utf8') || '[]')
}

const writeTasks = (tasks) => {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2))
}

// We want the following endpoints for creating, reading, updating, and
// deleting tasks:
// app.post('/api/task', () => {}) - create 1 task
// app.get('/api/tasks', () => {}) - fetch all tasks
// app.put('/api/task', () => {}) - update 1 task
// app.delete('/api/task', () => {}) - delete 1 task
// app.delete('/api/tasks/delete-multiple', () => {}) - delete a specific set of tasks as provided

const setUpRoutes = (app) => {
    app.post('/api/task', (req, res) => {
        // Example of how to read the tasks data from a file, edit it, and
        // write it back to the file

        // req.body is an object that contains the data sent from the frontend
        const newTask = req.body
    
        console.log(req.body)
    
        const tasks = getTasks()
        tasks.push(newTask)
        writeTasks(tasks)
    
        return res.sendStatus(204) // 204 is a HTTP status code meaning success but not content to return
    })

    app.get('/api/tasks', (req, res) => {
        // TODO

        // res.send() accepts a status code and a payload to return to the frontend
        // return res.send(200, tasks)
    })

    // You can add the other routes here

    app.put('/api/task', (req, res) => {
        // TODO
        
        // Example of how to read just one property from the body
        // const id = req.body.id

        // return res.sendStatus(204)
    })
}

module.exports = setUpRoutes
