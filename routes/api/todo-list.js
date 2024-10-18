const { Router } = require('express')
const TodoItem = require('../../models/todo-item.model')
// const Session = require('../../models/session.model')

const router = Router()

router.get('/todo-items', async (req, res) => {
    try {
        let todoList = await TodoItem.find({ sessionId: req.session.id })
        if (!todoList) {
            throw new Error('No Todo List found')
        }
        res.status(200).json(todoList)
    } catch (error) {
        res.status(500)
    }
})

router.post('/todo-item', async (req, res) => {
    console.log(req.session.id)
    const newTodo = new TodoItem({
        ...req.body,
        sessionId: req.session.id
    })
    console.log(newTodo)

    // const newSession = new Session({ sessionId: req.session.id })
    // console.log(newSession)

    try {
        // const session = await newSession.save()
        const todo = await newTodo.save()
        if (!todo) {
            throw new Error('Something went wrong saving the todo item')
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500)
    }
})

router.delete('/todo-item/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await TodoItem.findByIdAndDelete(id)
        if (!removed) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(removed)
    } catch (error) {
        res.status(500)
    }
})

router.put('/todo-item/:id', async (req, res) => {
    const { id } = req.params
    const updatedTask = new TodoItem({
        description: req.body.description,
        dueDate: req.body.dueDate,
        completion: req.body.completion,
        _id: req.params.id
    })
    try {
        const updated = await TodoItem.findByIdAndUpdate(id, updatedTask, {})
        if (!updated) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500)
    }
})

router.post('/todo-item/:id', async (req, res) => {
    const { id } = req.params
    try {
        const taskToUpdate = await TodoItem.findById(id)
        if (!taskToUpdate) {
            throw new Error('Something went wrong')
        }
        taskToUpdate.completion = req.body.completion
        await taskToUpdate.save()
        res.status(200).json(taskToUpdate)
    } catch (error) {
        res.status(500)
    }
})

router.post('/todo-items/delete-active', async (req, res) => {
    try {
        const deleted = await TodoItem.deleteMany({ completion: false })
        if (!deleted) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500)
    }
})

router.post('/todo-items/delete-completed', async (req, res) => {
    try {
        const deleted = await TodoItem.deleteMany({ completion: true })
        if (!deleted) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500)
    }
})

router.post('/todo-items/delete-all', async (req, res) => {
    try {
        const deleted = await TodoItem.deleteMany({})
        if (!deleted) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500)
    }
})

module.exports = router