import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import bookingRouter from "./routes/booking.route.js";

dotenv.config();

let port = process.env.PORT || 6000;
let app = express();

// 1. Middlewares
// JSON limit badhayi hai taaki images upload ho sakein (50mb)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// 2. CORS Fix - HTTPS aur Credentials ke liye
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://staybnb-frontend.onrender.com",
    credentials: true, // Token/Cookie pass karne ke liye zaroori
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

// 3. Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

// 4. Global Error Handler (500 error ko handle karne ke liye)
app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);
    res.status(500).json({ message: "Something went wrong on the server!" });
});

// 5. Database Connection & Server Start
app.listen(port, () => {
    connectDb();
    console.log(`Server started on port ${port}`);
});
