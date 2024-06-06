import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL as string;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("server running");
});

mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error: Error) => console.error("MongoDB connection error:", error));
mongoose.connection.on("error", (error: Error) => console.log(error));
