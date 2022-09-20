const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.get('/edit/:id', postController.getEdit)
router.put('/like/:id', postController.likePost)
router.delete('/delete/:id', postController.deletePost)
router.get('/create', postController.getCreate)
router.post('/createPost', postController.createPost)
router.get('/:id', postController.getPost)
router.put('/editReview/:id', postController.editPost)

module.exports = router