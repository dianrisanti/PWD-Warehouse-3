const router = require('express').Router()

const { profileController } = require('../controllers')
const { upload } = require('../helpers/multer')
const uploader = upload()

router.post('/edit/:id', profileController.editProfile)
router.post('/upload/:id', uploader, profileController.uploadFile)
router.get('/user_location', profileController.getUserLocation)

module.exports = router