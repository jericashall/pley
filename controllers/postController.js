const validator = require("validator")
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Client = require('../models/Client')

module.exports  = {
    getCreate: async (req, res) => {
        try{
            res.render('postCreate.ejs')
        } catch(err) {
            console.error(err)
        }
    },
    getPost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id)
            const poster = await User.findById(post.posterId)
            const client = await Client.findById(post.clientId)
            const comments = await Comment.find({postId: post._id}).sort({ createdAt: "desc" }).lean();
            const commenters = []
            for (let i = 0; i < comments.length; i++) {
                const commenter = await User.findById(comments[i].posterId)
                commenters.push(commenter)
            }
            res.render('post.ejs', {post: post, poster: poster, clientPosted: client, comments: comments, commenters: commenters, user: req.user})
        }catch(err) {
            console.error(err)
        }
    },
    getEdit: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id)
            if(req.user.id != post.posterId) {
                return res.redirect(`/post/${req.params.id}`)
            }
            res.render('postEdit.ejs', {post: post})
        } catch(err) {
            console.error(err)
        }
    },
    createPost: async (req, res) => {
        try{
            const validationErrors = []
            if (!validator.isEmail(req.body.email) && !validator.isEmpty(req.body.email)) {
                validationErrors.push({msg: "Please enter a valid email"});
            };
            if(validator.isEmpty(req.body.phone) && validator.isEmpty(req.body.email)) {
                validationErrors.push({msg: "Please enter client's phone number or email"});
            };
            if(validator.isEmpty(req.body.name)) {
                validationErrors.push({msg: "Please enter client's name"});
            };
            if(validator.isEmpty(req.body.title)) {
                validationErrors.push({msg: "Please enter a title to summarize your review"});
            };
            if(validator.isEmpty(req.body.review)) {
                validationErrors.push({msg: "Please enter an explanation for your client's review"});
            };
            if(req.body.stars == undefined) {
                validationErrors.push({msg: "Please enter a rating"});
            }
            if(validationErrors.length) {
                req.flash("errors", validationErrors);
                return res.redirect("/post/create");
            } 

            function normalizeNumber(num) {
                return String(num).replace(/[^+0-9]/g, '')  // remove non-number (and +) characters
            }

            const number = normalizeNumber(req.body.phone)
            const emailCheck = await Client.findOne({email: req.body.email})
            const phoneCheck = await Client.findOne({phone: number})
            let client = emailCheck || phoneCheck
            if(client) {
                if(req.body.email && req.body.email !== client.email) {
                    await Client.findByIdAndUpdate(client._id, {
                        $set : {
                            email: req.body.email
                        }
                    })
                }
                if(req.body.phone && req.body.phone !== client.phone) {
                    await Client.findByIdAndUpdate(client._id, {
                        $set : {
                            phone: req.body.phone
                        }
                    })  
                }
            }
            if(!client) {
                client = await Client.create({
                    name: req.body.name,
                    phone: number,
                    email: req.body.email
                })

            }
            const post = await Post.create({
                title: req.body.title,
                story: req.body.review,
                stars: Number(req.body.stars),
                anonymous: req.body.anonymous === 'on' ? true : false,
                clientId: client._id,
                posterId: req.user._id,
                likes: 0,
            })
            res.redirect(`/post/${post._id}`)
        } catch(err) {
            console.error(err)
        }
    },
    editPost: async (req, res) => {
        try{
            const validationErrors = []
            if(validator.isEmpty(req.body.title)) {
                validationErrors.push({msg: "Please enter a title to summarize your review"});
            };
            if(validator.isEmpty(req.body.review)) {
                validationErrors.push({msg: "Please enter an explanation for your client's review"});
            };
            if(req.body.stars == undefined) {
                validationErrors.push({msg: "Please enter a rating"});
            }
            if(validationErrors.length) {
                req.flash("errors", validationErrors);
                return res.redirect(`/post/edit/${req.params.id}`);
            } 

            await Post.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                story: req.body.review,
                stars: Number(req.body.stars),
                anonymous: req.body.anonymous === 'on' ? true : false,
            })
            res.redirect(`/post/${req.params.id}`)
            
        } catch(err) {
            console.error(err)
        }
    },
    likePost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id)
            if(post.likedBy.includes(req.user.id)) {
                await Post.findByIdAndUpdate(req.params.id, {
                    $inc: {
                        likes: -1
                    }
                })
                await Post.findByIdAndUpdate(req.params.id, {
                    $pull: {
                        likedBy: req.user.id
                    }
                })
            } else {
                await Post.findByIdAndUpdate(req.params.id, {
                    $inc: {
                        likes: 1
                    }
                })
                await Post.findByIdAndUpdate(req.params.id, {
                    $push: {
                        likedBy: req.user.id
                    }
                })
            }
            res.redirect(`/post/${req.params.id}`);
        } catch(err) {
            console.error(err)
        }
    },
    deletePost: async (req, res) => {
        try{
            await Comment.remove({postId: req.params.id})
            await Post.remove({ _id: req.params.id })
            res.redirect(`/dashboard`);
        } catch(err) {
            console.error(err)
        }
    },
}
