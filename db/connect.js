const mongoose = require('mongoose');

const connectDB = (url) => {
    console.log('CONNECTING TO DB...')
    return mongoose.connect(url);
};

module.exports = connectDB;
