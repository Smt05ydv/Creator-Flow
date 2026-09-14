const app = express();
console.log("APP.TS LOADED");

import express from "express";


import cors from "cors";
import healthCheckRouter from "./routes/healthcheck.routes.js";



app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/healthCheck", healthCheckRouter);

app.get("/", (req, res) => {
    res.send("Welcome to backkk");
});

app.get("/test", (req, res) => {
    res.send("TEST WORKS");
});

export default app;