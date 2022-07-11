const express = require('express');
const router = express.Router();
const { addUserMeeting, getMeetings, getMeetingsByUserId
    , updateMeeting, deleteMeeting } = require('../services/meeting.service');

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const newMeeting = req.body;
    console.log(newMeeting);
    try {
        await addUserMeeting(id, newMeeting);
        res.send();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//GET /meeting
router.get('/', async (req, res) => {
    try {
        const meetings = await getMeetings();
        console.log(meetings);
        res.send(meetings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//GET /meeting/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const meetings = await getMeetingsByUserId(id);
        console.log(meetings);
        res.send(meetings);
    }
    catch (error) {
        res.status(404).json({ message: 'idMeeting not found' })
    }
});

//DELETE /meeting/:id
router.delete('/:idUser/:id', async (req, res) => {
    const { id } = req.params;
    const { idUser } = req.params;
    try {
        await deleteMeeting(idUser, id);
        res.send();
    } catch (error) {
        res.status(400).json({ message: 'idMeeting not found' });
    }
})

//PUT /meeting/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const updates = req.body;
    console.log(updates);
    try {
        await updateMeeting(updates, id);
        res.send();
    }
    catch (error) {
        res.status(400).json({ message: 'idMeeting not found' });
    }
});


module.exports = router;