const User = require("../models/User")
const Post = require('../models/Post')

module.exports = {
    getProfile: async (req, res) => {
        try{
            const user = await User.findById(req.params.id)
            console.log(user)
            const posts = await Post.find({posterId: user}).sort({ createdAt: "desc" }).lean()
            console.log(posts)
            res.render('profile.ejs', {user: user, posts: posts, viewer: req.user})
        }catch(err) {
            console.error(err)
        }
    },
    getEdit: async (req, res) => {
        try{
            if(req.user.id != req.params.id) {
                return res.redirect(`/profile/${req.params.id}`)
            }
            const user = await User.findById(req.params.id)
            const posts = await Post.find({postId: req.params.id}).sort({ createdAt: "desc" }).lean()
            res.render('editProfile.ejs', {user: user, posts: posts, viewer: req.user})
        }catch(err) {
            console.error(err)
        }
    },
    editProfile: async (req, res) => {
        try{
            if(req.user.id !== req.params.id) {
                return res.redirect(`/profile/${req.params.id}`)
            }
            await User.findByIdAndUpdate(req.params.id,
                {$set: {
                    displayName: req.body.displayName,
                    occupation: req.body.occupation,
                    industry: req.body.industry,
                }})
            res.redirect(`/profile/${req.params.id}`)
        }catch(err) {
            console.error(err)
        }

    },
}