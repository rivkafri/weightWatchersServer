const express = require('express');
const router = express.Router();
const { login } = require('../services/account.service');

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

module.exports = router;