const Post = require('../models/Post')

module.exports = {
    getIndex: (req, res) => {
    try{
        res.render("index.ejs");
    }catch(err){
        console.error(err)
    }
    },
    getDashboard: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: "desc" }).lean();
            res.render("dashboard.ejs", { posts: posts });
        }catch(err){
            console.error(err)
        }
    },
};