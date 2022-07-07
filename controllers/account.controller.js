const express = require('express');
const router = express.Router();
const { login } = require('../services/account.service');

router.post('/', async (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    let user;
    try {
        user = await login(email);
    }
    catch (error) {
        next(error);
    }
    if (!user) {
        console.log('not exist!');
    }
    res.send(user);
});

module.exports = router;