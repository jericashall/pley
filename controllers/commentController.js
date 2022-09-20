const Comment = require('../models/Comment')

module.exports = {
    createComment: async (req, res) => {
    try{
        await Comment.create({
            posterId: req.user.id,
            postId: req.params.postId,
            comment: req.body.comment,
            likes: 0,
        })
        res.redirect(`/post/${req.params.postId}`)
    } catch(err) {
        console.error(err)
    }
    },
    likeComment: async (req, res) => {
     try{
        const comment = await Comment.findById(req.params.id)
        if(comment.likedBy.includes(req.user.id)) {
            await Comment.findByIdAndUpdate(req.params.id, {
                $inc: {
                    likes: -1
                }
            })
            await Comment.findByIdAndUpdate(req.params.id, {
                $pull: {
                    likedBy: req.user.id
                }
            })
        } else {
            await Comment.findByIdAndUpdate(req.params.id, {
                $inc: {
                    likes: 1
                }
            })
            await Comment.findByIdAndUpdate(req.params.id, {
                $push: {
                    likedBy: req.user.id
                }
            })
        }
        res.redirect(`/post/${comment.postId}`);
    } catch(err) {
        console.error(err)
    }
    },
    deleteComment: async (req, res) => {
        try {

        await Comment.remove({_id: req.params.id})
        res.redirect(`/post/${req.params.postId}`);
        } catch(err) {
            console.error(err)
        }
    },
}