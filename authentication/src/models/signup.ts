import mongoose from "mongoose";
import { Password } from "./../utils/Password";

// An interface that describes the properties that are required to create the new user

interface UserAttributes {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  EmailOTP: number;
  OTPExpiresAt: Date;
  isEmailVerified: Boolean;
}

// An interface that describes the properties that a User model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttributes): UserDoc;
}

// An interface that describes the properties that a User Document has

interface UserDoc extends mongoose.Document {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  EmailOTP: number;
  OTPExpiresAt: Date;
  isEmailVerified: Boolean;
}

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      min: 1,
      max: 25,
    },
    LastName: {
      type: String,
      required: true,
      min: 1,
      max: 25,
    },
    Email: {
      type: String,
      required: true,
      min: 1,
      max: 40,
    },
    Password: {
      type: String,
      required: true,
      min: 8,
      max: 16,
    },
    EmailOTP: {
      type: Number,
    },
    OTPExpiresAt: {
      type: Date,
    },
    isEmailVerified: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.Password;
        delete ret.__v;
        delete ret.EmailOTP;
        delete ret.OTPExpiresAt;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    const hashed = await Password.toHash(this.get("Password"));
    this.set("Password", hashed);
  }
  next();
});

userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
