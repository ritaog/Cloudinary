import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { config as _config } from "dotenv";
import User from "./routes/user.js";

const app = express();

//Load config
_config({ path: "./config/config.env" });
// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Route
app.use("/user", User);

app.listen(5000, () => console.log("Server is running"));
