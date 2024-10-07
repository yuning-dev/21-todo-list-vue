const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    completion: {
        type: Boolean,
        required: true
    }
})

module.exports = model('todoItem', TodoSchema)