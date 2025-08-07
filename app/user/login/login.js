import express from "express";
import Check from "./check.js";
import pool from "../../../config/postgresql.js";
import bcrypt from "bcrypt";
import generateJWT from "../../../utils/jwt_generator.js";

const user_login = express();

user_login.use(express.json());

user_login.post(`/api/login`, async (req, res) => {
  const { email, password } = req.body;

  //Check user details and return a message if credentials don't pass the check
  if (Check(req) !== true) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid Credentials" });
  }

  try {
    const db = await pool.connect();

    const result = await db.query(
      `
            SELECT * FROM users WHERE email = $1;
        `,
      [email]
    );

    db.release();

    if (result.rows.length < 1) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const user = result.rows[0];

    //Compare user input to hashed password stored in database
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateJWT({ id: user.id, email: user.email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 604800000,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
});

export default user_login;
