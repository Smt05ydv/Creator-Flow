import mongoose from "mongoose";


const connectDB= async() =>{
try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log("✅MONGO DB connected");
    
} catch (error) {
    console.log("Mongo DB connection failed",error);
   
    
} }

mongoose.connection.on("disconnected", () => {
    console.error("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});


export default connectDB;