const User = require('./models/User');
const bcrypt = require('bcrypt');

async function makeAdmin() {
    try {
        let user = await User.findOne({ email: 'uday@123gmail.com'});
        if (user) {
            console.log("user updated...");
        } else {
            let user = new User();
            user.firstName = "Uday";
            user.lastName = "Kumar";
            user.email = "uday@123gmail.com";
            let encryptedPassword = bcrypt.hashSync("123456", 10);
            user.password = encryptedPassword;
            user.userType = "Admin";
            await user.save();
            console.log("user saved successfully....");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = makeAdmin;