const express = require('express');
const router = express.Router();
const { login, getAllData } = require('../services/account.service');

router.post('/', async (req, res) => {
    const { email } = req.body;
    console.log(email);
    let user;
    try {
        user = await login(email);
        res.send(user);
    }
    catch (error) {
        res.status(500).json({
            massage: massage.error
        })
    }
    if (!user) {
        console.log("not found");
    }
});


router.get('/', async (req, res) => {
    try {
        const data = await getAllData();
        res.send(data);
    }
    catch (error) {
        res.status(500).json({ message: 'reading from json failed' })
    }
});

module.exports = router;