import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});