import mongoose from "mongoose";
import { app } from "./app";

const PORT = 4000;

const DATABASE_USERNAME = "manojd";
const DATABASE_PASSWORD = "admin";
let DATABASE =
  "mongodb+srv://manojd:admin@cluster0.utkh8.mongodb.net/coachify?retryWrites=true&w=majority";

console.log(DATABASE);

mongoose.connect(DATABASE, () => {
  console.log("Connected to Database");
});

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
