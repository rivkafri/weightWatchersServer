const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const getData = async () => fs.readFile('./users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./users.json', JSON.stringify(data));

const addUserMeeting = async (id, updates) => {
    const data = await getData();
    const users = data.users || [];
    const _user = await users.find(user => user.id === parseInt(id));
    console.log(_user);
    const idmeeting = uuidv4();
    if (_user) {
        const meetings = _user.weight.meetings;
        console.log("befor" + meetings);
        const newMeeting = {
            date: updates.date, weight: updates.weight,
            comments: updates.comments, visit: updates.visit, idmeeting: idmeeting
        };
        meetings.push(newMeeting);
        console.log("after" + meetings);
    }
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

const getMeetings = async () => {
    const data = await getData();
    const allMeetings = [];
    data.users.forEach(element => {
        element.weight.meetings.forEach(m => {
            allMeetings.push(m);
        })
    });
    console.log("all meetings " + allMeetings);
    return allMeetings;
}

const getMeetingsByUserId = async (id) => {
    const data = await getData();
    const user = await data.users.find(user => user.id === parseInt(id));
    const meetings = user.weight.meetings;
    return meetings;
}

const getMeetingsById = async (id, allMeetings) => {
    console.log(id);
    const allMeeting = allMeetings;
    const meeting = allMeeting.find(m => m.idmeeting === id)
    console.log(meeting);
    return meeting;
}

const updateMeeting = async (updates, id) => {
    const data = await getData();
    const users = data.users || [];
    const allMeetings = [];
    data.users.forEach(element => {
        element.weight.meetings.forEach(m => {
            allMeetings.push(m);
        })
    });
    const meeting = await getMeetingsById(id, allMeetings);
    meeting.date = updates.date;
    meeting.weight = updates.weight;
    meeting.comments = updates.comments;
    meeting.visit = updates.visit;
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

const deleteMeeting = async (idUser, id) => {
    const data = await getData();
    const users = data.users || [];
    const arrMeetings = await users.find(user => user.id === parseInt(idUser)).weight.meetings;
    console.log(arrMeetings);
    const index = await arrMeetings.findIndex(m => m.idmeeting === id);
    arrMeetings.splice(index, 1);
    const AllData = { 'manager': data.manager, 'users': users };
    await updateData(AllData);
}

module.exports = {
    addUserMeeting,
    getMeetings,
    getMeetingsByUserId,
    updateMeeting,
    getMeetingsById,
    deleteMeeting
}