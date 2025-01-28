import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    
    await mongoose.connect(mongodb+srv://nikkhatri311:nikkhatri311@cluster0.mq70n.mongodb.net)
}

export default connectDB
