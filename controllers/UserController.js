const User = require('../models/User');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
async function addUser(req,res) {
    try {
        // console.log(req.body, 'req.body');
        let user = new User(req.body);
        
        let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        // console.log(encryptedPassword, 'encryptedPassword');
        user.password = encryptedPassword;
        await user.save();
        // console.log("Data saved successfully....");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}

async function dologin(req,res) {
    try {
        // console.log(req.body, 'req.body');
        let user = await User.findOne({email: req.body.email});
        // console.log(user);
        if (user) {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                if (user.userType === 'Admin') {
                    let students = await Student.find({});
                    res.render('welcomeadmin', { students: students });
                } else {
                    res.render('welcomestudent');
                }
            } else {
                res.end('<h1> Invalid email/password...</h1>');
            }
        } else {
            res.end('<h1> User does not exist...</h1>');
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    addUser,
    dologin
}