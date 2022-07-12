const fs = require('fs/promises');
// const { parse } = require('path');
// const internal = require('stream');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./users.json', JSON.stringify(data));

const getDiaryById = async (id) => {
    const data = await getData();
    const diary = await data.users.find(user => user.id === parseInt(id)).diary;
    return diary;
}

const addDiary = async (idUser, newDiary) => {
    console.log("ffffffff"+newDiary);
    const data = await getData();
    const users = data.users || [];
    const id = uuidv4();
    const _user = await users.find(user => user.id === parseInt(idUser));
    console.log(_user);
    const diary=_user.diary;
    console.log(diary);
    const summeryDay = { id: id, date: newDiary.obj.date, summery:newDiary.obj.summery };
    console.log(summeryDay);
    diary.push(summeryDay);
    console.log("after"+ diary);
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

const updateDiaryById = async (idUser, idDiary, updatesForDay) => {
    const data = await getData();
    const users = data.users || [];
    const user = await users.find(user => user.id === parseInt(idUser));
    const diary = await user.diary;
    const day = await diary.find(day => day.id === idDiary);
    Object.assign(day, updatesForDay);
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
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
