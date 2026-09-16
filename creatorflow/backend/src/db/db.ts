import mongoose from "mongoose";


const connectDB= async() =>{
try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log("✅MONGO DB connected");
    
} catch (error) {
    console.log("Mongo DB connection failed",error);
    process.exit(1);
    
}
}

export default connectDB;