import express from "express";
import cors from "cors";
import user_signup from "./app/user/signup/signup.js";
import cookieParser from "cookie-parser";
import user_login from "./app/user/login/login.js";
import user_new_client from "./app/user/clients/new.js";
import user_get_clients from "./app/user/clients/fetch.js";
import user_update_clients from "./app/user/clients/update.js";
import user_new_project from "./app/user/projects/new.js";
import user_get_projects from "./app/user/projects/fetch.js";
import user_update_projects from "./app/user/projects/update.js";
import user_get_client from "./app/user/clients/fetch_single.js";

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

app.use("/", user_new_client);

app.use("/", user_get_clients);

app.use("/", user_get_client);

app.use("/", user_update_clients);

app.use("/", user_new_project);

app.use("/", user_get_projects);

app.use("/", user_update_projects);

app.get("/", (req, res) => {
  res.send("Workcity assessment backend by Ebehiremen Akhidue");
});

app.listen(5000, () => {
  console.log("Server running on localhost, port 5000");
});
