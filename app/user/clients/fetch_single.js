import express from "express";
import pool from "../../../config/postgresql.js";

const user_get_client = express();

user_get_client.use(express.json());

user_get_client.post(`/api/get_client`, async (req, res) => {
  const { id } = req.body;

  //Fetch Single Client Data

  try {
    const db = await pool.connect();

    const result = await db.query(
      `
            SELECT * FROM clients WHERE id = $1;
        `,
      [id]
    );

    db.release();

    return res.status(200).json({ success: true, client: result.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
});

export default user_get_client;
