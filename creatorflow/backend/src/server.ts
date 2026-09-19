import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";


dotenv.config();

const PORT = 5002;

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
})
.catch((err)=>{
    console.error("Mongo DB conection error", err);
    process.exit(1);
    
});
