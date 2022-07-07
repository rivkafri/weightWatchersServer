const express = require('express');
const router = express.Router();
const { getDiaryById, addDiary, updateDiaryById, deleteDayOfDiary } = require('../services/diary.service');

router.post('/:idUser', async (req, res, next) => {
    const newDiary = req.body;
    const idUser = req.params.idUser;
    console.log(idUser);
    console.log(newDiary);
    try {
        await addDiary(idUser, newDiary);
    }
    catch (error) {
        next(error);
    }
    res.send();
});

router.put('/:idUser/:idDiary', async (req, res, next) => {
    const idUser = req.params.idUser;
    const idDiary = req.params.idDiary;
    const updates = req.body;
    console.log(idUser + ' ' + idDiary);
    console.log(updates);
    try {
        await updateDiaryById(idUser, idDiary, updates);
    }
    catch (error) {
        next(error);
    }
    res.send();
});

router.delete('/:idUser/:idDiary', async (req, res, next) => {
    const idUser = req.params.idUser;
    const idDiary = req.params.idDiary;
    console.log(idUser + ' ' + idDiary);
    try {
        await deleteDayOfDiary(idUser, idDiary);
    }
    catch (error) {
        next(error);
    }
    res.send();
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let diary;
    try {
        diary = await getDiaryById(id);
        console.log(diary);
    }
    catch (error) {
        next(error);
    }
    res.send(diary);
});

module.exports = router;