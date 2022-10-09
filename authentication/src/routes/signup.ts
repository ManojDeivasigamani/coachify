import express from "express";

import { SignUpController } from "../controllers/signup";

var router = express.Router();

router.post("/api/v1/auth/signup", SignUpController);

export { router as SignUpRouter };
