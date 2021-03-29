let router = require('express').Router()
let { upload } = require('../helpers/multer')
let uploader = upload()


// NOTE use body for express validator
let { body } = require('express-validator')

// NOTE import controller yang dibutuhkan
const { userController } = require('../controllers')

// import helpers
const { verifyToken } = require('../helpers/jwt')

let regValidator = [
    body('username')
        .notEmpty()
        .withMessage('Username can\'t be empty')
        .isLength({ min: 6 })
        .withMessage('Username lenght at least 6 character'),
    body('password')
        .notEmpty()
        .withMessage('Password can\'t be empty')
        .isLength({ min: 6 })
        .withMessage('Password lenght at least 6 character')
        .matches(/[0-9]/)
        .withMessage('Password must include a number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must include symbol'),
    body("email")
        .isEmail()
        .withMessage("Email format is not correct")


]

// edit password validation
const editPassValidation = [
    body('password')
        .notEmpty()
        .withMessage('Password can\'t empty')
        .isLength({ min: 6 })
        .withMessage('Password must have 6 character')
        .matches(/[0-9]/)
        .withMessage('Password must include number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must include symbol')
]


// NOTE create router
router.get('/getUser', userController.getAllUser)
router.post('/login', userController.login)
router.post('/register', regValidator , userController.register) 
router.post('/forgotpassword', userController.forgotPassword) 
router.post('/edit/:index', userController.edit)
router.post('/edit_password/:id', editPassValidation, userController.editPass)
// router.delete('/delete/:index', userController.delete)
router.post('/keeplogin', verifyToken, userController.keepLogin)
router.post('/verification', verifyToken, userController.emailVerification)
router.post('/upload_payment/:order_number', uploader, userController.uploadPayment)
router.get('/getpayment/:order_number', uploader, userController.getPaymentConfirmation)

// NOTE export router
module.exports = router