const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    comment: {
        type: String,
        required: true,
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    likes: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Comment', CommentSchema)