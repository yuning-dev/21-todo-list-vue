const { Router } = require('express')
const Appointment = require('../../models/appt.model')
// const Session = require('../../models/session.model')

const router = Router()

router.get('/appointments', async (req, res) => {
    try {
        let apptList = await Appointment.find({ sessionId: req.session.id })
        if (!apptList) {
            throw new Error('No Appointments List found')
        }
        res.status(200).json(apptList)
    } catch (error) {
        res.status(500)
    }
})

router.post('/appointment', async (req, res) => {
    console.log(req.session.id)
    const newAppt = new Appointment({
        ...req.body,
        sessionId: req.session.id
    })
    console.log(newAppt)

    // const newSession = new Session({ sessionId: req.session.id })
    // console.log(newSession)

    try {
        // const session = await newSession.save()
        const appt = await newAppt.save()
        if (!appt) {
            throw new Error('Something went wrong saving the apppointment')
        }
        res.status(200).json(appt)
    } catch (error) {
        res.status(500)
    }
})

router.delete('/appointment/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Appointment.findByIdAndDelete(id)
        if (!removed) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(removed)
    } catch (error) {
        res.status(500)
    }
})

router.put('/appointment/:id', async (req, res) => {
    const { id } = req.params
    const updatedAppt = new Appointment({
        title: req.body.title,
        dueDate: req.body.dueDate,
        completion: req.body.completion,
        _id: req.params.id
    })
    try {
        const updated = await Appointment.findByIdAndUpdate(id, updatedAppt, {})
        if (!updated) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500)
    }
})

router.post('/appointment/:id', async (req, res) => {
    const { id } = req.params
    try {
        const apptToUpdate = await Appointment.findById(id)
        if (!apptToUpdate) {
            throw new Error('Something went wrong')
        }
        apptToUpdate.completion = req.body.completion
        await apptToUpdate.save()
        res.status(200).json(apptToUpdate)
    } catch (error) {
        res.status(500)
    }
})

router.post('/appointments/delete-active', async (req, res) => {
    try {
        const deleted = await Appointment.deleteMany({ completion: false })
        if (!deleted) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500)
    }
})

router.post('/appointments/delete-completed', async (req, res) => {
    try {
        const deleted = await Appointment.deleteMany({ completion: true })
        if (!deleted) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500)
    }
})

router.post('/appointments/delete-all', async (req, res) => {
    try {
        const deleted = await Appointment.deleteMany({})
        if (!deleted) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500)
    }
})

module.exports = router