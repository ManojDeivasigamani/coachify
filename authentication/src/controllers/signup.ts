import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/signup";

const JWT_SECRET = "mySuperCoolSecretForJWT";

export const SignUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { FirstName, LastName, Email, Password } = req.body;

  // 1. Check if the user already exist, if exist throw the error
  const existingUser = await User.findOne({
    Email: Email,
  });

  if (existingUser) {
    return next(new Error("User already exist in the system"));
  }

  // 2. If the User doesn't exist, Create a new user
  const user = User.build({
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    Password: Password,
  });

  await user.save();

  // 3. Hash the password using "PRE-SAVE HOOK" in mongoose Model

  // 4. Generate Json Web Token

  // const payload = {
  //   id: user.id,
  //   email: user.Email,
  // };

  // const token = jwt.sign(payload, JWT_SECRET);

  // // 5. Store it on the session object

  // req.session = {
  //   jwt: token,
  // };

  // 6. Send Email to the User for Email Verification

  res.status(201).send(user);
};

/* **********************************************************************
 * **********************************************************************
 * Email Sign Up Flow for Coachify
 * **********************************************************************
 * **********************************************************************
 * 1. User will provide the Firstname, Lastname, Email and Password
 *
 * 2. System needs to check if the Email is already exist in the System if exist throw the Error
 *
 * 3. If the User doesn't exist Create a new user
 *
 * 4. Hash the password before saving to the Database
 *
 * 5. Hashing should be made using the Pre Save Hook of Mongoose Model
 *
 * 6. Generate 6 digits random OTP with validity of 10 minutes and Send a email verification mail to the user with OTP and the save OTP in the DB
 *
 * 7. User will Call the Verify Email API from the front end with OTP
 *
 * 8. Verify the given OTP by user and the OTP saved in the Database
 *
 * 9. Once the OTP is verified, Generate the JWT and send it to user on Cookie.
 *
 * 10. Throw Error on invalid OTP or expired OTP
 *
 * **********************************************************************
 * **********************************************************************
 * **********************************************************************
 */
