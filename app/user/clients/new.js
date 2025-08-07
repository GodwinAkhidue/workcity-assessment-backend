import express from "express";
import pool from "../../../config/postgresql.js";

const user_new_client = express();

user_new_client.use(express.json());

user_new_client.post(`/api/new_client`, async (req, res) => {
  const { fullname, company, position, email, phone, user_id } = req.body;

  try {
    //Insert new client data into the database
    const db = await pool.connect();

    const result = await db.query(
      `
            INSERT INTO clients ( fullname, company, position, email, phone, user_id )
            VALUES ( $1, $2, $3, $4, $5, $6 );
        `,
      [fullname, company, position, email, phone, user_id]
    );

    db.release();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
});

export default user_new_client;
