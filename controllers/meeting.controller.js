const { ok } = require('assert');
const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
const uuid = require('uuid');
const uuidv4 = uuid.v4;
const { addUserMeeting, getMeetings, getMeetingsByUserId
,updateMeeting, deleteMeeting } = require('../services/meeting.service');
//POST /meeting/:id
router.post('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const idmeeting = uuidv4();
    const newMeeting = req.body;
    newMeeting.idmeeting = idmeeting;
    console.log(newMeeting);
    try {
        await addUserMeeting(id, newMeeting);
    }
    catch (error) {
        next(error);
    }
    res.send();
});

//GET /meeting
router.get('/', async (req, res, next) => {
    let meetings;
    try {
        meetings = await getMeetings();
        console.log(meetings);
    }
    catch (error) {
        next(error);
    }
    res.send(meetings);
});

//GET /meeting/:id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let meetings;
    try {
        meetings = await getMeetingsByUserId(id);
        console.log(meetings);
    }
    catch (error) {
        next(error);
    }
    res.send(meetings);
});

//DELETE /meeting/:id
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await deleteMeeting(id);
    } catch (error) {
        next(error);
    }
    res.send();
})

//PUT /meeting/:id
router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const updates = req.body;
    console.log(updates);
    try {
        await updateMeeting(updates,id);
    }
    catch (error) {
        next(error);
    }
    res.send();
});


module.exports = router;