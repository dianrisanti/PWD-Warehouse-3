const router = require('express').Router()

const adminController = require('../controllers/adminController')

router.get('/getstock', adminController.getProductStock)
router.post('/editstock', adminController.editProductStock)
router.get('/getall', adminController.getAll)
router.get('/getjakarta', adminController.getJakarta)
router.get('/getmedan', adminController.getMedan)
router.get('/getsurabaya', adminController.getSurabaya)
router.post('/confirmPayment/:order_number', adminController.adminPaymentConfirmation)
router.post('/cancelOrder/:order_number', adminController.adminCancelOrder)
router.get('/getcategory', adminController.getCategory)
router.post('/addcategory', adminController.addCategory)
router.post('/deletecategory', adminController.deleteCategory)
router.post('/editcategory', adminController.editCategory)


module.exports = router