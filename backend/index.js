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

// CORS
app.use(cors({
  origin: "https://staybnb-frontend.onrender.com",
  credentials: true
}));

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

// Server
app.listen(port, () => {
  connectDb();
  console.log(`Server started on port ${port}`);
});
