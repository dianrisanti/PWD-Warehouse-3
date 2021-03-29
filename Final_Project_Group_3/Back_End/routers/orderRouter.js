const router = require('express').Router()

const orderController = require('../controllers/orderController')

router.post('/add', orderController.addCart)
router.get('/get/:id', orderController.getCart)
router.patch('/edit', orderController.editCart)
router.post('/delete', orderController.deleteCart)
router.get('/history/:id', orderController.getHistory)
router.get('/summary/:id', orderController.getSummary)
router.post('/invoice/:id', orderController.getInvoice)
router.get('/order_listing', orderController.getAllOrder)
router.get('/mostBuyProduct', orderController.getMostBuy)
router.get('/detail_order', orderController.getDetailOrder)
router.get('/order_value', orderController.getTotalOrder)
router.post('/booked_stock', orderController.bookedStock)
router.post('/delivery_stock', orderController.deliveryStock)
router.post('/cancel_stock', orderController.cancelStock)
router.post('/cancel/:order_number', orderController.cancelOrder)
router.post('/confirm/:order_number', orderController.confirmArrived)

module.exports = router