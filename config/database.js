const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URI).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    }).catch(err => {
        console.error(`Error: ${err.message}`);
    });
}

module.exports = connectDatabase;
