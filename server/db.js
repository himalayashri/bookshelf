const mongoose = require("mongoose");
require("dotenv").config()

const mongoURI = process.env.MONGODB_URI


mongoose.set('strictQuery', false);

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("MongoDB connected successfully");

        const collection = mongoose.connection.db.collection("genres");

        collection.find({}).toArray(function (err, data) {
            if (err) {
                console.log(err);
            } else {
            }
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = mongoDB;
