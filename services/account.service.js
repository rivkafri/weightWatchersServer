const fs = require('fs/promises');
const getData = async () => fs.readFile('../users.json').then(data => JSON.parse(data));

const login = async (email) => {
    const data = await getData();
    let user;
    if (data.manager.email === email) {
        user = data.manager;
    }
    if (!user) {
        user = await data.users.find(user => user.email == email);
    }
    return user;
}

module.exports = {
    login
}