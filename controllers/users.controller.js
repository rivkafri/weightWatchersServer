const express = require('express');
const router = express.Router();
const { getUserById, getUsers, addUser, deleteUser, updateUser, getBySearch } = require('../services/users.service');

router.post('/', async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    try {
        const succsess = await addUser(newUser);
        if (succsess)
            res.send('true');
        else
            res.send('false');
    }
    catch (error) {
        res.status(400).json({
            massage: 'post failed',
        })
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const updates = req.body;
    console.log(updates);
    try {
        await updateUser(id, updates);
        res.send();
    }
    catch (error) {
        res.status(400).json({
            massage: 'put failed'
        })
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        await deleteUser(id);
        res.send();
    }
    catch (error) {
        res.status(404).json({ message: 'id not found' });
    }
});

router.post('/:query', async (req, res) => {
    const searches = req.body;
    console.log(searches);
    try {
        const users = await getBySearch(searches);
        res.send(users);
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const user = await getUserById(id);
        console.log(user);
        res.send(user);
    }
    catch (error) {
        res.status(404).json({ message: 'id not found' });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.send(users);
    }
    catch (error) {
        res.status(500).json({ message: 'reading from json failed' })
    }
});

module.exports = router;