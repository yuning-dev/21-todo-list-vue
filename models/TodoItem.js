const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')

const opts = { toJSON: { virtuals: true } }

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
    }
}, opts)

TodoSchema.virtual('dueDate_formatted').get( function() {
    return this.dueDate ? DateTime.fromJSDate(this.dueDate).toLocaleString(DateTime.DATE_MED) : ''
})

module.exports = model('todoItem', TodoSchema)