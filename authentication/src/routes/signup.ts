import express from "express";
import { body } from "express-validator";

import { validateRequest } from "../middlewares/validate-middleware";

import { SignUpController } from "../controllers/signup";

var router = express.Router();

router.post(
  "/api/v1/auth/signup",
  [
    body("FirstName").not().isEmpty().withMessage("FirstName is required"),
    body("LastName").not().isEmpty().withMessage("LastName is required"),
    body("Email").isEmail().withMessage("Enter vaild Email"),
    body("Password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 to 20 characters"),
  ],
  validateRequest,
  SignUpController
);

export { router as SignUpRouter };
