import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import chalk from "chalk";
import postRoutes from "./routes/postRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb+srv://it22077288:IT22077288@cluster0.fuzmzrf.mongodb.net/bloodbank?retryWrites=true&w=majority';

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/posts", postRoutes);



// Database connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.yellow("Connected to MongoDB"));
    app.listen(PORT, () => {
      console.log(chalk.yellow(`Server is running on port ${PORT}`));
    });
  })
  .catch((err) => {
    console.error(chalk.red("Failed to connect to MongoDB"), err);
  });
