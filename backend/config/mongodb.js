import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb+srv://nikkhatri311:nikkhatri311@cluster0.mq70n.mongodb.net/prescripto";

        mongoose.connection.on('connected', () => console.log("Database Connected"));

        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

export default connectDB;
