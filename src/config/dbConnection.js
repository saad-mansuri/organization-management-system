const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('MongoDB is Connented Successfully');
    } catch (err) {
        console.log('Getting error on connecting DB');
        // process.exit(1)
    }
}

module.exports = connectDB