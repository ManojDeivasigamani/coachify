import express from "express";
import { SignUpRouter } from "./routes/signup";

const app = express();

app.use(express.json());

// Router Middlewares

app.use(SignUpRouter);

// Catch all Route

app.get("*", async (req, res, next) => {
  next(new Error("Route not found"));
});

export { app };
