const { response } = require('express');
const express = require('express');
const router = express.Router();
const { getDiaryById, addDiary, updateDiaryById, deleteDayOfDiary } = require('../services/diary.service');

router.post('/:idUser', async (req, res) => {
    const newDiary = req.body;
    const { idUser } = req.params;
    console.log(idUser);
    console.log(newDiary);
    try {
        await addDiary(idUser, newDiary);
        res.send();
    }
    catch (error) {
        res.status(400).json({
            massage: 'post failed'
        })
    }
});

router.put('/:idUser/:idDiary', async (req, res) => {
    const { idUser } = req.params;
    const { idDiary } = req.params;
    const updates = req.body;
    console.log(idUser + ' ' + idDiary);
    console.log(updates);
    try {
        await updateDiaryById(idUser, idDiary, updates);
        res.send();
    }
    catch (error) {
        response.status(400).json({
            message: 'put update failed'
        })
    }
});

router.delete('/:idUser/:idDiary', async (req, res) => {
    const { idUser } = req.params;
    const { idDiary } = req.params;
    console.log(idUser + ' ' + idDiary);
    try {
        await deleteDayOfDiary(idUser, idDiary);
        res.send();
    }
    catch (error) {
        res.status(404).json({
            message: 'delete - id failed'
        })
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const diary = await getDiaryById(id);
        console.log(diary);
        res.send(diary);
    }
    catch (error) {
        res.status(404).json({
            message: 'put - id not found',
        })
    }
});

module.exports = router;