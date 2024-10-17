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
    completion: {
        type: Boolean,
        required: true
    },
    // session: { type: Schema.Types.ObjectId, ref: 'Session'}
})

module.exports = model('todoItem', TodoSchema)