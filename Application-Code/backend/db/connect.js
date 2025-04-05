import mongoose from "mongoose";

const connect = async () => {
    try {
        console.log("Attempting to connect to Database");
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log("Error while connecting to MongoDB", error.message);
        process.exit(1);
    }
};

export default connect;