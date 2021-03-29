let NODEMAILER = require('nodemailer')
let nodeMailerToken = process.env.NODEMAILER

// NOTE syntax ini bisa liat di documentation nodemailer
let transporter = NODEMAILER.createTransport ({
    service : 'gmail',
    auth : {
        user : 'cusunliem@gmail.com',
        pass : nodeMailerToken,
    },
    tls : {
        rejectUnauthorized : true
    }
}) 

module.exports = transporter

