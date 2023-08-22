const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/denserver')


const User = mongoose.model('User', {
    uname: String,
    phno: Number,
    psw: String,
    booking: []
})

//export model
module.exports = {
    User
}