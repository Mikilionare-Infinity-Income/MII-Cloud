import express, {Router} from "express";
import morgan from "morgan";
import {routes} from "./routes";
import {config} from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

// Dotenv
config();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Morgan
app.use(morgan("dev"));

// Routes
app.get("/api", routes);

// Catch-all route
app.get("*", (req, res) => {
  res.status(200).send("Hello, World!");
});

// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
