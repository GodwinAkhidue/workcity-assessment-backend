import express from "express";
import Check from "./check.js";
import pool from "../../../config/postgresql.js";
import bcrypt from "bcrypt";
import generateJWT from "../../../utils/jwt_generator.js";

const user_signup = express();

user_signup.use(express.json());

user_signup.post(`/api/signup`, async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  //Check user details and return a message if credentials don't pass the check
  if (Check(req) !== true) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid Credentials" });
  }

  //hash plain password
  const hashPassword = async (password) => {
    const saltrounds = 10;
    const hash = await bcrypt.hash(password, saltrounds);
    return hash;
  };

  //return hashed password and insert into database
  hashPassword(password).then(async (hashedPassword) => {
    try {
      const db = await pool.connect();

      const result = await db.query(
        `
                INSERT INTO users 
                ( firstname, lastname, email, password )
                VALUES ( $1, $2, $3, $4 )
                RETURNING id, email;
            `,
        [firstname, lastname, email, hashedPassword]
      );

      db.release();

      const user = result.rows[0];

      const token = generateJWT(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 604800000,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      //return this warning if there's a duplicate email
      if (err.code === "23505") {
        return res.status(200).json({
          success: false,
          message: "Email already in use",
        });
      }
      return res.status(200).json({
        success: false,
        message: "Something went wrong please try again",
      });
    }
  });
});

export default user_signup;
