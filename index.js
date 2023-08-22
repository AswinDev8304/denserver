const express = require('express')
const server = express()
const logic = require('./services/logic')
const cors = require('cors')
const jwt = require('jsonwebtoken')
server.use(cors({ origin: 'http://localhost:4200' }))
server.use(express.json())

server.listen(3000, () => {
    console.log("server started at 3000");
})
const tokenMiddleware = (req, res, next) => {
    try {
        const token = req.headers["acess_token"]
        jwt.verify(token, "acesskey123")
        next()
    }
    catch{
        res.status(404).json({
            message:"token not verified",
            status:"false",
            statuscode:404
        })
    }
}

//register
server.post('/register', (req, res) => {
    logic.register(req.body.uname, req.body.phno, req.body.psw).then(result => {
        res.status(result.statuscode).json(result)
    })
})

//login
server.post('/login', (req, res) => {
    logic.login(req.body.uname, req.body.psw).then(result => {
        res.status(result.statuscode).json(result)
    })
})
//booking
server.post('/booking', tokenMiddleware, (req, res) => {
    logic.booking(req.body.uname, req.body.patname, req.body.time, req.body.date, req.body.psw).then(result => {
        res.status(result.statuscode).json(result)
    })
})
//booking details
server.get('/bookingdetails/:uname', tokenMiddleware, (req, res) => {
    logic.bookingdetails(req.params.uname).then(result => {
        res.status(result.statuscode).json(result)
    })
})
//cancel booking
server.post('/cancelbooking', tokenMiddleware, (req, res) => {
    logic.cancelBooking(req.body.uname, req.body.phno).then(result => {
        res.status(result.statuscode).json(result)
    })
})
//delete account
server.delete('/deleteac/:uname',tokenMiddleware,(req,res)=>{
    logic.deleteAc(req.params.uname).then(result=>{
        res.status(result.statuscode).json(result) 
    })
})



