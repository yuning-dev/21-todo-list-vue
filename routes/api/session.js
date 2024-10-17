const { Router } = require('express')
const Session = require('../../models/session.model')

const router = Router()

// router.get('/session', async (req, res) => {
//     req.session.example = UUID.v4()
//     response.send({ id: req.session.example })
// })

// router.post('/session', async (req, res) => {
//     if (req.body.session !== req.session.example) {
//         return res.status(500).send({ message: })
//     }
// })

router.get('/session', async (req, res) => {
    try {
        let session = await Session.find({ sessionId: req.session.id })
        if (session) {
            let todoList = await TodoItem.find({ sessionId: req.session.id })
            res.status(200).json(todoList)
        }
        res.status(200).json({})
    } catch (error) {
        res.status(500)
    }
})

router.post('/session', async (req, res) => {
    console.log(req.session.id)
    const newSession = new Session(req.session.id)
    try {
        const session = await newSession.save()
        if (!session) {
            throw new Error('Something went wrong saving the session')
        }
        res.status(200).json(session)
    } catch (error) {
        res.status(500)
    }
})

module.exports = router