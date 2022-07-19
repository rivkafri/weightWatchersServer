const fs = require('fs/promises');
const User = require('../models/user');
const { ObjectId } = require('mongodb');

//v
const getDiaryById = async (id) => {
    const user = await User.findById(id);
    return user.diary;
}
//v
const addDiary = async (idUser, newDiary) => {
    const user = await User.findOne({ _id: ObjectId(idUser) });
    user.diary.push(newDiary);
    await User.findByIdAndUpdate(idUser, user);
}

const updateDiaryById = async (idUser, idDiary, updatesForDay) => {
    const user = await User.findOne({ _id: ObjectId(idUser) });
    console.log(user + user.diary);
    // console.log(user.diary.ObjectId(_id));
    // const d = await user.diary.find(day => day._id === idDiary);
    // console.log(d);
    // Object.assign(d, updatesForDay);
    // console.log(diary);
    // await User.findByIdAndUpdate(idUser, user);
    // diary = updatesForDay;
    // console.log(diary);
    // await User.findByIdAndUpdate(idUser, user);
}

const deleteDayOfDiary = async (idUser, idDiary) => {
    const data = await getData();
    const users = data.users || [];
    const user = await users.find(user => user.id === parseInt(idUser));
    const diary = await user.diary;
    const newDiary = await diary.filter(day => day.id != idDiary);
    user.diary = newDiary;
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

module.exports = {
    getDiaryById,
    addDiary,
    updateDiaryById,
    deleteDayOfDiary
}
