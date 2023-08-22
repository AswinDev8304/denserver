const db = require('./db')
const jwt = require('jsonwebtoken')

//register:
register = (uname, phno, psw) => {
    return db.User.findOne({ phno }).then(user => {
        if (user) {
            return {
                message: "user already present",
                status: false,
                statuscode: 404
            }
        }
        else {

            newuser = new db.User({
                uname: uname,
                phno: phno,
                psw: psw,
                booking: []
            })

            newuser.save()
            return {
                message: "user created sucessfully",
                status: true,
                statuscode: 200

            }

        }

    })

}
//login:
login = (uname, psw) => {
    return db.User.findOne({ uname, psw }).then(user => {
        if (user) {
            //token:
            const token = jwt.sign({ uname }, "acesskey123")

            return {
                message: "login success",
                status: true,
                statuscode: 200,
                currentUser: user.uname,
                currentphno: user.phno,
                token

            }

        }
        else {
            return {
                message: "incorrect username or password",
                status: false,
                statuscode: 400
            }
        }
    }
    )
}
//booking:
booking = (uname, patname, time, date, psw) => {
    return db.User.findOne({ uname, psw }).then(user => {

        if (user) {

            if (user.booking.length == 0) {
                user.booking.push({ patname, time, date })
                user.save()
                return {
                    message: 'booking completed',
                    status: true,
                    statuscode: 200
                }
            }
            else{
                return {
                    message: 'one booking is already done',
                    status: false,
                    statuscode: 404
                }
            }

        }
        else {
            return {
                message: 'error in details',
                status: false,
                statuscode: 404
            }
        }
    })
}
bookingdetails = (uname) => {
    return db.User.findOne({ uname }).then(user => {
        if (user) {
            return {
                message: user.booking,
                status: true,
                statuscode: 200
            }
        }
        else {
            return {
                message: 'Invalid User!',
                status: false,
                statuscode: 404
            }
        }
    })
}
cancelBooking = (uname, phno) => {
    return db.User.findOne({ uname, phno }).then(one => {
        if (one) {
            one.booking = []
            one.save()
            return {
                message: "Your Booking has been cancelled",
                status: true,
                statuscode: 200
            }
        }
        else {
            return {
                message: "No such account found!",
                status: false,
                statuscode: 404
            }
        }
    })
}
deleteAc = uname => {
    return db.User.deleteOne({ uname }).then(result => {
        if (result) {
            return {
                message: "your account deleted",
                status: true,
                statuscode: 200
            }
        }
        else {
            return {
                message: "account not present",
                status: false,
                statuscode: 400
            }

        }
    })
}

module.exports = {
    register, login, booking, bookingdetails, cancelBooking, deleteAc
}