const express = require('express');
const fs = require('fs/promises');
const router = express.Router();
const { getUserById, getUsers, addUser, deleteUser, updateUser, getBySearch } = require('../services/users.service');

router.post('/', async (req, res, next) => {
    const newUser = req.body;
    try {
        await addUser(newUser);
    }
    catch (error) {
        next(error);
    }
    res.send();
});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const updates = req.body;
    console.log(updates);
    try {
        await updateUser(id, updates);
    }
    catch (error) {
        next(error);
    }
    res.send();
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try {
        await deleteUser(id);
    }
    catch (error) {
        next(error);
    }
    res.send();
});

router.get('/:query', async (req, res, next) => {
    console.log(req.params.query);
    let users;
    try {
        users = await getBySearch(req.params.query);
    }
    catch (error) {
        next(error);
    }
    res.send(users);
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let user;
    try {
        user = await getUserById(id);
        console.log(user);
    }
    catch (error) {
        next(error);
    }
    res.send(user);
});

router.get('/', async (req, res, next) => {
    let users;
    try {
        users = await getUsers();
    }
    catch (error) {
        next(error);
    }
    res.send(users);
});

module.exports = router;