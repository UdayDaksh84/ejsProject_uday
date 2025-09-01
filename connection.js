const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ejsStudentProject1');
        console.log('DataBase connected successfully...');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;
