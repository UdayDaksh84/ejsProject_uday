const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// http://localhost:3000
router.get('/', (req, res) => {
    res.render('home');
})

// http://localhost:3000/user/signup
router.get('/user/signup', (req, res) => {
    res.render('signup');
})

router.post('/add/user', (req, res) => {
    UserController.addUser(req, res);
})

router.post('/login', (req, res) => {
    UserController.dologin(req, res);
})

router.get('/student/add/page', (req, res) => {
    res.render('addStudent');
})

module.exports = router;
