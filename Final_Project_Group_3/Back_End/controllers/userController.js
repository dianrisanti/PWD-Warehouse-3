// import module yang dibutuhkan
const { validationResult, check } = require('express-validator')
const cryptojs = require('crypto-js')
const handlebars = require('handlebars')
const fs = require('fs')

// import helpers
const { generateQuery, asyncQuery } = require('../helpers/queryHelp')
const { createToken } = require('../helpers/jwt')
const transporter = require('../helpers/nodemailer')

// import database connection
const db = require('../database')

// import dotenv
const SECRET_KEY = process.env.CRYPTO_KEY

// export controller
module.exports = {
    getAllUser: (req, res) => {
        const userQuery = 'SELECT * FROM users'
        db.query(userQuery, (err, result) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },
    login: (req, res) => {
        const { username, password, email } = req.body

        const QUERY = email ? `u.email = '${email}'` : `u.username = '${username}'`

        // hashing password
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)

        const loginQuery = `SELECT u.id, u.username, u.email, p.location, p.address FROM users u 
        JOIN profile p ON u.id = p.id_user WHERE ` + QUERY +
        `AND u.password=${db.escape(hashpass.toString())}`
        // console.log(loginQuery)

        db.query(loginQuery, (err, result) => {
            if (err) return res.status(500).send(err)

            // result bentuknya array of object
            // console.log(result)

            // cek apakah login berhasil
            if (result.length === 0) return res.status(400).send('Username or Password is wrong')

            // create token
            let token = createToken({ id: result[0].id_user, username: result[0].username })

            // console.log(result[0])

            // input token to result
            result[0].token = token

            // console.log(result[0])

            res.status(200).send(result[0])
        })
        // res.status(200).send('testing login')
    },
    register: async (req, res) => {
        const { username, password, email } = req.body

        // validation input from user
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        // encrypt password with crypto js
        // data yang sudah di encrypt oleh crypto js, TIDAK BISA di decrypt
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)
        // console.log('password : ', hashpass.toString())

        try {
            // kalau tidak ada error, proses penambahan data user baru berjalan
            const checkUser = `SELECT * FROM users 
                              WHERE username=${db.escape(username)}
                              OR email=${db.escape(email)}`
            const resCheck = await asyncQuery(checkUser)

            if (resCheck.length !== 0) return res.status(400).send('Username or Email is already exist')

            const regQuery = `INSERT INTO users (username, password, email)
                              VALUES (${db.escape(username)}, ${db.escape(hashpass.toString())}, ${db.escape(email)})`
            const resRegister = await asyncQuery(regQuery)

            const profileQuery = `INSERT INTO profile (id_user) values (${resRegister.insertId})`
            const resProfile = await asyncQuery(profileQuery)

            // create token
            const token = createToken({ id: resRegister.insertId, username: username })

            // send email notification to user
            const option = {
                from: `admin <cusunliem@gmail.com>`,
                to: `finalprojectwarehouse3@gmail.com`, // NOTE nanti ganti dengan email sesuai register
                subject: 'EMAIL VERIFICATION',
                text: '',
            }

            //set up handlebars
            const emailFile = fs.readFileSync('./email/index.html').toString()
            // console.log(email)

            // compile data email
            const template = handlebars.compile(emailFile)

            // menambah properti html di dalam option 
            option.html = template({ token: token, name: username })

            // send email
            const info = await transporter.sendMail(option)

            res.status(200).send(info.response)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    forgotPassword: async (req, res) => {
        const { email } = req.body

        try {
            // NOTE kalau tidak ada error, proses pengiriman request new password akan berjalan
            const checkUser = `SELECT * FROM users 
                              WHERE email=${db.escape(email)}`
            const resCheck = await asyncQuery(checkUser)

            if (resCheck.length === 0) return res.status(400).send('Email not yet registered')

            // send email notification to user
            const option = {
                from: `admin <cusunliem@gmail.com>`,
                to: 'cusunliem1@gmail.com', // NOTE nanti ganti dengan email sesuai register
                subject: 'NEW PASSWORD REQUEST',
                text: '',
            }

            //set up handlebars
            const emailFile = fs.readFileSync('./email/index.html').toString()
            // console.log(email)

            // compile data email
            const template = handlebars.compile(emailFile)

            // menambah properti html di dalam option 
            option.html = template({ token: token, name: username })

            // send email
            const info = await transporter.sendMail(option)

            res.status(200).send(info.response)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    edit: (req, res) => {
        const id = parseInt(req.params.id)

        // validation input from user
        const errors = validationResult(req)
        console.log(errors.errors)

        const errUsername = errors.errors.filter(item => item.param === 'username' && item.value !== undefined)
        console.log(errUsername)
        if (errUsername.length !== 0) return res.status(400).send(errUsername[0].msg)

        const errEmail = errors.errors.filter(item => item.param === 'email' && item.value !== undefined)
        console.log(errEmail)
        if (errEmail.length !== 0) return res.status(400).send(errEmail[0].msg)


        const checkUser = `SELECT * FROM users WHERE id=${db.escape(id)}`
        // console.log(checkUser)

        db.query(checkUser, (err, result) => {
            if (err) return res.status(500).send(err)

            // if id not found
            if (result.length === 0) return res.status(200).send(`User with id : ${id} is not found`)

            const editUser = `UPDATE users SET${generateQuery(req.body)} WHERE id=${id}`
            // console.log(editUser)
            db.query(editUser, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
    },
    editPass: (req, res) => {
        const id = parseInt(req.params.id)

        // validation input from user
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        const checkUser = `SELECT * FROM users WHERE id=${db.escape(id)}`
        // console.log(checkUser)

        db.query(checkUser, (err, result) => {
            console.log("status = ",parseInt(result[0].status))
            if (err) return res.status(500).send(err)

            // if id not found
            if (result.length === 0) return res.status(200).send(`User with id : ${id} is not found`)
            if (parseInt(result[0].status) === 0) return res.status(200).send(`Your account has not been verified`)

            const hashpass = cryptojs.HmacMD5(req.body.password, SECRET_KEY)

            // query change password
            const editPassword = `UPDATE users SET password=${db.escape(hashpass.toString())} WHERE id=${id}`
            // console.log(editPassword)

            db.query(editPassword, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
    },
    // delete: (req, res) => {
    //     const checkUser = `SELECT * FROM users WHERE id=${db.escape(parseInt(req.params.id))}`

    //     db.query(checkUser, (err, result) => {
    //         if (err) return res.status(500).send(err)

    //         // if id not found
    //         if (result.length === 0) return res.status(200).send(`User with id : ${parseInt(req.params.id)} is not found`)

    //         const deleteUser = `DELETE FROM users WHERE id=${parseInt(req.params.id)}`

    //         db.query(deleteUser, (err2, result2) => {
    //             if (err2) return res.status(500).send(err2)

    //             res.status(200).send(result2)
    //         })

    //     })
    // },
    emailVerification: async (req, res) => {
        console.log('req user : ', req.user)

        try {
            // query to update status to verified
            const verify = `UPDATE users SET status = 1 
                            WHERE id = ${req.user.id} AND username = ${db.escape(req.user.username)}`
            console.log(verify)
            const result = await asyncQuery(verify)
            console.log(result)

            res.status(200).send('Email has been verified')
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    keepLogin: async (req, res) => {
        console.log(req.user)
        console.log('keep login')

        try {
            // query to get data from database
            const getUser = `SELECT * FROM users c1
            LEFT JOIN profile c2
            ON (c2.id_user = c1.id)
            WHERE username='${req.user.username}'`

            const result = await asyncQuery(getUser)
            // console.log('result dari query', result[0])

            res.status(200).send(result[0])
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}