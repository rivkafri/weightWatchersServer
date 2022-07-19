const { Schema, model, mongoose } = require('mongoose');

const diarySchema = new Schema({
    date: { type: String },
    summery: { type: Array }
})

const meetingSchema = new Schema({
    date: { type: String },
    weight: { type: String },
    comments: { type: String },
    visit: { type: Boolean },
})

const userSchema = new Schema({
    firstName: { type: String, minlength: 2 },
    lastName: { type: String, minlength: 2 },
    address: { type: Object },
    phone: { type: String, minlength: 9, maxlength: 10 },
    email: { type: String, unique: true },
    height: { type: String, minlength: 2, maxlength: 3 },
    weight: {
        start: { type: String, minlength: 2, maxlength: 3 },
        meeting: [meetingSchema]
    },
    diary: [diarySchema],
});
const User = model('User', userSchema);
module.exports = User;
