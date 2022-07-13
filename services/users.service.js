const fs = require('fs/promises');

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./users.json', JSON.stringify(data));

const getUsers = async () => {
    const data = await getData();
    return data.users;
}

const getUserById = async (id) => {
    const data = await getData();
    const user = await data.users.find(user => user.id === parseInt(id));
    return user;
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
    const NewUser = {
        id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address: newUser.address,
        phone: newUser.phone,
        email: newUser.email,
        height: newUser.height,
        weight: newUser.weight,
        diary: []
    };
    users.push(NewUser);
    console.log(users);
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

const deleteUser = async (id) => {
    const data = await getData();
    const users = data.users || [];
    const index = await users.findIndex(user => user.id === parseInt(id));
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
    const _user = await users.find(user => user.id === parseInt(id));
    updateOne(_user, updates);
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
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
    const ans = arr.filter(f => f.address.city === city);
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
const getBySearch = async (searches) => {
    // let searchArr = cutToSearch(query);
    console.log(searches);
    const data = await getData();
    const users = data.users;
    let currentUsers = users;
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
                    currentUsers = searchFunc(currentUsers, searches[0]);
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
                    currentUsers = byCityFunc(currentUsers, searches[5]);
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
