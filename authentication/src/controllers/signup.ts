import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../error-handlers/bad-request-error";

import { User } from "../models/signup";
import { OneTimePassword } from "../utils/OneTimePassword";

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
    return next(
      new BadRequestError(
        `User already available with the email: ${existingUser.Email}`
      )
    );
  }

  // 2. Generate OTP with 24 hours Validity for Email Verification and Save it in Auth Collections

  const emailVerifyOTP = parseInt(OneTimePassword.generateMobileOtp(6));
  const OTPExpiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  console.log(
    `OTP for Email verification is ${emailVerifyOTP} and it expires at ${OTPExpiryDate}`
  );

  // 3. Hash the password using "PRE-SAVE HOOK" in mongoose Model

  // 4. If the User doesn't exist, Create a new user
  const user = User.build({
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    Password: Password,
    EmailOTP: emailVerifyOTP,
    OTPExpiresAt: OTPExpiryDate,
    isEmailVerified: false,
  });

  await user.save();

  // 5. Send Email to the User for Email Verification

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
