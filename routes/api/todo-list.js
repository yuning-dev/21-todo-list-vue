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
        res.status(500).json({ message: error.message })
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
        res.status(500).json({ message: error.message })
    }
})

module.exports = router