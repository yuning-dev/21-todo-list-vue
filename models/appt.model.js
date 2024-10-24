const { Schema, model } = require('mongoose')

const ApptSchema = new Schema({
    title: {
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
    sessionId: {
        type: String,
        required: true
    }
})

module.exports = model('Appointment', ApptSchema)