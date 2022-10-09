import mongoose, { model, Schema } from "mongoose";

// An interface that describes the properties that are required to create the new user

interface UserAttributes {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}

// An interface that describes the properties that a User Document has

interface UserDoc extends mongoose.Document {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}

// An interface that describes the properties that a User model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttributes): UserDoc;
}

const userSchema = new Schema(
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const User = model<UserModel, UserDoc>("User", userSchema);

export { User };
