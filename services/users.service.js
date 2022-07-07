const fs = require('fs/promises');

const getData = async () => fs.readFile('../users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('../users.json', JSON.stringify(data));

const getUsers = async () => {
    const data = await getData();
    return data.users;
}

const getUserById = async (id) => {
    const data = await getData();
    const user = await data.users.find(user => user.id == id);
    return user;
}

//searches//
const byWeightFunc = (arr, min, max) => {
    const ans = arr.filter(f => (f.weight.start > min) && (f.weight.start < max));
    console.log(ans);
    return ans;
}
const byProcessFunc = (arr) => {
    console.log('byProcessFunc');
    const ans = arr.filter(f => f.weight.start > (f.weight.meetings[f.weight.meetings.length - 1].weight));
    console.log(ans);
    return ans;
}
const byBMIFunc = (arr, bmiMin, bmiMax) => {
    const ans = arr.filter(f => (f.weight.start / (f.height * f.height) > bmiMin) &&
        (f.weight.start / (f.height * f.height) < bmiMax));
    return ans;
}
const byCityFunc = (arr, city) => {
    console.log(city);
    const ans = arr.filter(f => f.address.city === city);
    console.log(ans);
    return ans;
}
const searchFunc = (arr, inputToSearch) => {
    console.log(inputToSearch);
    const ans = arr.filter(user => user.id === inputToSearch ||
        user.firstName === inputToSearch || user.lastName === inputToSearch ||
        user.address.city === inputToSearch || user.address.street === inputToSearch ||
        user.phone === inputToSearch ||
        user.email === inputToSearch || user.height === inputToSearch);
    console.log(ans);
    return ans;
}
////
const cutToSearch = (query) => {
    let search = ['', { minWeight: -1, maxWeight: -1 }, { minBmi: -1, maxBmi: -1 }, ''];
    let searchName = '';
    let valuesForSearch = query.split('&');
    for (let i = 0; i < valuesForSearch.length; i++) {
        let index = valuesForSearch[i].indexOf('=');
        searchName = valuesForSearch[i].substring(0, index);
        valuesForSearch[i] = valuesForSearch[i].substring(index + 1, valuesForSearch[i].length);
        switch (searchName) {
            case 'freeSearch': search[0] = valuesForSearch[i];
                break;
            case 'minWeight': search[1].minWeight = valuesForSearch[i];
                break;
            case 'maxWeight': search[1].maxWeight = valuesForSearch[i];
                break;
            case 'minBmi': search[2].minBmi = valuesForSearch[i];
                break;
            case 'maxBmi': search[2].maxBmi = valuesForSearch[i];
                break;
            case 'city': search[3] = valuesForSearch[i];
                break;
        }
        searchName = '';
    }
    console.log(search);
    return search;
}
const getBySearch = async (query) => {
    let searchArr = cutToSearch(query);
    const data = await getData();
    const users = data.users;
    let currentUsers = users;
    for (let i = 0; i < searchArr.length; i++) {
        if (searchArr[i]) {
            switch (i) {
                case 0: if (searchArr[i] !== '') {
                    currentUsers = searchFunc(currentUsers, searchArr[0]);
                    break;
                }
                case 1: if (searchArr[i].minWeight > -1 && searchArr[i].maxWeight > -1) {
                    currentUsers = byWeightFunc(currentUsers, parseInt(searchArr[1].minWeight), parseInt(searchArr[1].maxWeight));
                    break;
                }
                case 2: if (searchArr[i].minBmi > -1 && searchArr[i].maxBmi > -1) {
                    currentUsers = byBMIFunc(currentUsers, parseInt(searchArr[2].minBmi), parseInt(searchArr[2].maxBmi));
                    break;
                }
                case 3: if (searchArr[i] !== '') {
                    currentUsers = byCityFunc(currentUsers, searchArr[3]);
                    break;
                }

            }
        }
    }
    return currentUsers;
}

const addUser = async (newUser) => {
    let id = 0;
    const data = await getData();
    const users = data.users || [];
    const exist = await users.find(user => user.email === newUser.email || user.phone === newUser.phone);
    if (exist)
        throw new Error('user already exists');
    if (users.length > 0)
        id = users[users.length - 1].id + 1;
    else
        id = 1;
    let obj = {
        id: id,
        firstName: newUser.firstName, lastName: newUser.lastName, address: {
            city: newUser.city, street: newUser.street,
            number: newUser.number
        }, phone: newUser.phone, email: newUser.email, height: newUser.height,
        weight: { start: newUser.weight, meetings: [] }, diary: []
    };
    users.push(obj);
    console.log(users);
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

const deleteUser = async (id) => {
    const data = await getData();
    const users = data.users || [];
    const index = await users.findIndex(user => user.id === id);
    users.splice(index, 1);
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

const updateOne = (_user, updates) => {
    _user.firstName = updates.firstName;
    _user.lastName = updates.lastName;
    _user.address.city = updates.city;
    _user.address.street = updates.street;
    _user.address.number = updates.number;
    _user.phone = updates.phone;
    _user.email = updates.email;
    _user.height = updates.height;
    console.log(_user);
    return _user;
}

const updateUser = async (id, updates) => {
    const data = await getData();
    const users = data.users || [];
    const _user = await users.find(user => user.id == id);
    updateOne(_user, updates);
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    getBySearch
}
