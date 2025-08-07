import express from "express";
import cors from "cors";
import user_signup from "./app/user/signup/signup.js";
import cookieParser from "cookie-parser";
import user_login from "./app/user/login/login.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/", user_signup);

app.use("/", user_login);

app.get("/", (req, res) => {
  res.send("Workcity assessment backend by Ebehiremen Akhidue");
});

app.listen(5000, () => {
  console.log("Server running on localhost, port 5000");
});
