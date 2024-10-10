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
    .then(() => {
        console.log('MongoDB database connected...')
        initialise()
    })
    .catch((err) => console.log(err))

app.use('/api', routes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/to-do-list/index.html'))
})

const Role = require('./models/role.model')

async function initialise() {
    const roleDocsCount = await Role.countDocuments()
    if (roleDocsCount === 0) {
        const userRole = await new Role({ name: 'user' }).save()
        if (!userRole) {
            throw new Error('there was an error adding "user" to the roles collection')
        } else {
            console.log("added 'user' to roles collection")
        }

        const adminRole = await new Role({ name: 'admin' }).save()
        if (!adminRole) {
            throw new Error('there was an error adding "admin" to the roles collection')
        } else {
            console.log("added 'admin' to roles collection")
        }
    }
}

app.listen(port, () => {
    console.log(`Todo list app listening on port ${port}`)
})