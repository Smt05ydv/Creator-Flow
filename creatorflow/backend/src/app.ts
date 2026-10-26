import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

import cors from "cors";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import promotionRouter from "./routes/promotion.routes.js"
import authRouter from "./routes/auth.routes.js"
import earningsRouter from "./routes/earnings.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import { User } from "./models/user.models.js";
import postmarkRouter from "./routes/postmark.routes.js"


const app = express();
console.log("APP.TS LOADED");





app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1/healthCheck", healthCheckRouter);


app.use("/api/v1/promotions",promotionRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/earnings",earningsRouter);
app.use("/api/v1/dashboard",dashboardRouter);
app.use("/api/v1/postmark",postmarkRouter);



app.get("/", (req, res) => {
    res.send("Welcome to backkk");
});

app.get("/test", (req, res) => {
    res.send("TEST WORKS");
});

app.get("/test-error", (req, res) => {
    throw new Error("Temporary test error");
});
app.get("/test-cast-error", async (req, res, next) => {
    try {
        await User.findById("not-a-valid-object-id");
        res.send("Unexpectedly succeeded");
    } catch (error) {
        next(error);
    }
});
app.use(errorHandler);

export default app;