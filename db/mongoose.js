const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://new-user:gN5HQ3tA1sqBCFRE@cluster0-y8hdl.mongodb.net/quick-alert?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const user = mongoose.model('users', {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: Number },
    age: { type: Number },
    conditions: { type: String },
    otherDetails: { type: String }
})

const hospital = mongoose.model('hospitals', {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
})

module.exports = {
    User: user,
    Hospital: hospital
}