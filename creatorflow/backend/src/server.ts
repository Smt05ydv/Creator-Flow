import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/db.js";




const PORT = Number(process.env.PORT) || 5002;

const startServer= async()=>{
    try {
        await connectDB();

        app.listen(PORT,()=>{
            console.log(`Server listening on port ${PORT}`);
            
        });

    } catch (error) {
        console.log("Unable to start Server:",error);
        process.exit(1);
    }
};

startServer();
