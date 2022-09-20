const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    anonymous: {
        type: Boolean,
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
module.exports = mongoose.model('Post', PostSchema)