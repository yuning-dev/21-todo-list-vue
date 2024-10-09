const { Router } = require('express')
const TodoItem = require('../../models/TodoItem')

const router = Router()

router.get('/', async (req, res) => {
    try {
        let todoList = await TodoItem.find()
        if (!todoList) {
            throw new Error('No Todo List found')
        }
        res.status(200).json(todoList)
    } catch (error) {
        res.status(500)
    }
})

router.post('/', async (req, res) => {
    const newTodo = new TodoItem(req.body)
    try {
        const todo = await newTodo.save()
        if (!todo) {
            throw new Error('Something went wrong saving the todo item')
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500)
    }
})

router.delete('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.post('/delete-active', async (req, res) => {
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

module.exports = router