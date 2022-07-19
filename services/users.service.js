const fs = require('fs/promises');
const User = require('../models/user');
const { ObjectId } = require('mongodb');

//v
const getUsers = async () => {
    const users = await User.find();
    return users;
}
//v
const getUserById = async (id) => {
    const user = await User.findOne({ _id: ObjectId(id) });
    return user;
}
//v
const addUser = async (newUser) => {
    return ans = await User.create(newUser);
    console.log(ans);
}

//
const deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
}

//v
const updateUser = async (id, updates) => {
    await User.findByIdAndUpdate(id, updates);
}


const getBySearch = async (searches) => {
    console.log(searches);
    let currentUsers = [];
    let boolSearch = [false, false, false, false];
    if (searches[0] != '')
        boolSearch[0] = true;
    if (searches[1] != '')
        boolSearch[1] = true;
    if (searches[3] != '')
        boolSearch[2] = true;
    if (searches[5] != '')
        boolSearch[3] = true;
    for (let i = 0; i < boolSearch.length; i++) {
        if (boolSearch[i]) {
            switch (i) {
                case 0: if (searches[0] != '') {
                    currentUsers = User.find({
                        $or: [{ "firstName": searches[0] }, { "lastName": searches[0] },
                        { "address.city": searches[0] }, { "address.street": searches[0] },
                        { "phone": searches[0] }, { "email": searches[0] }, { "height": searches[0] }]
                    });
                }
                    break;
                case 1: if (searches[1] != '' && searches[2] != '') {
                    currentUsers = byWeightFunc(currentUsers, parseInt(searches[1]), parseInt(searches[2]));
                }
                    break;
                case 2: if (searches[3] != '' && searches[4] != '') {
                    currentUsers = byBMIFunc(currentUsers, parseInt(searches[3]), parseInt(searches[4]));
                }
                    break;
                case 3: if (searches[5] != '') {
                    currentUsers = await User.find({ "address.city": searches[5] });
                }
                    break;
            }
        }
    }
    return currentUsers;
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    getBySearch
}