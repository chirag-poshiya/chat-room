const mongoose  = require("mongoose");
const colors = require("colors");

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`mongo db connected : ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit();
    }
};


module.exports = connectDB;