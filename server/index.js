import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Auth from "./Routes/AuthRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(cors());
app.use("/api/auth", Auth);
app.get("/", () => {
  console.log("Rakib");
});

const connectDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URL}/evoting`);
    // .then(() => console.log("Connected With DB Successful"))
    // .catch((e) => console.log("Db Connection Failed"));
  } catch (err) {
    console.log(err);
  }
}

connectDB();

app.listen(port, () => {
  console.log(`Server is Listening on PORT ${port}`);
});
