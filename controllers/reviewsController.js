const Client = require('../models/Client')
const Post = require('../models/Post')

module.exports = {
    searchReviews: async (req, res) => {
        try{
            function normalizeNumber(num) {
                return String(num).replace(/[^+0-9]/g, '')  // remove non-number (and +) characters
            }

            const phone = normalizeNumber(req.body.phone)
            const email = req.body.email
            const name = req.body.name
            const searchName = `(?i)${name[0]}(?-i)${name.substring(1)}`
            //const name = req.body.name
            const phoneClient = phone ? await Client.findOne({phone: phone}).lean() : ""
            const emailClient = email ? await Client.findOne({email: email}).lean() : ""
            const nameClient = name ? await Client.findOne({name: { $regex: searchName }}).lean() : ""
            let phoneReviews = []
            let emailReviews = []
            let nameReviews = []
            if(phoneClient) {
                phoneReviews = await Post.find({clientId: phoneClient._id}).lean()
            }
            if(emailClient) {
                emailReviews = await Post.find({clientId: emailClient._id}).lean()
            }
            if(nameClient) {
                nameReviews = await Post.find({clientId: nameClient._id}).lean()
            }
            res.render('reviews.ejs', {phone: phone, email: email, name: name, phoneReviews: phoneReviews,  emailReviews: emailReviews, nameReviews: nameReviews})
        }catch(err){
            console.log(err)
        }
    },
    userReviews: async (req, res) => {
        try{
            const client = await Client.findById(req.params.id).lean()
            const reviews = await Post.find({clientId: req.params.id}).lean()
            res.render('userReviews.ejs', {clientReviewed: client, reviews: reviews})
        }catch(err){    
            console.err(err)
        }
    },
}
