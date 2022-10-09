import express, { Request, Response, NextFunction } from "express";

export const SignUpController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { FirstName, LastName, Email, Password } = req.body;

  console.log(FirstName, LastName, Email, Password);

  res.send("Router handles Sign Up Process");
};
