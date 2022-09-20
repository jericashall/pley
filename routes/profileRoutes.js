const express = require('express')
const router = express.Router()
const profileController = require("../controllers/profileController")

router.get('/:id', profileController.getProfile)
router.get('/edit/:id', profileController.getEdit)
router.put('/editProfile/:id', profileController.editProfile)

module.exports = router