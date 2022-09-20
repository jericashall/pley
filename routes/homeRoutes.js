const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")
const homeController = require("../controllers/homeController")
const {ensureAuth, ensureGuest} = require("../middleware/auth")

router.get('/', ensureGuest, homeController.getIndex);
router.get('/dashboard', ensureAuth, homeController.getDashboard)
router.get('/login', ensureGuest, authController.getLogin);
router.get('/signup', ensureGuest, authController.getSignup);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/logout', authController.logout);


module.exports = router;