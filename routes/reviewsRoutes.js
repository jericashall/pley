const express = require('express')
const router = express.Router()
const reviewsController = require("../controllers/reviewsController")


//search function
router.post('/search', reviewsController.searchReviews)
router.get('/:id', reviewsController.userReviews)

module.exports = router