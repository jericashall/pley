const express = require('express')
const router = express.Router()
const commentController = require("../controllers/commentController")

router.post('/create/:postId', commentController.createComment)
router.put('/like/:id', commentController.likeComment)
router.delete('/delete/:id/:postId', commentController.deleteComment)

module.exports = router