import express from "express";
import pool from "../../../config/postgresql.js";

const user_get_clients = express();

user_get_clients.use(express.json());

user_get_clients.post(`/api/get_clients`, async (req, res) => {
  const { user_id } = req.body;

  //Fetch all client data

  try {
    const db = await pool.connect();

    const result = await db.query(
      `
            SELECT * FROM clients WHERE user_id = $1;
        `,
      [user_id]
    );

    db.release();

    return res.status(200).json({ success: true, clients: result.rows });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
});

export default user_get_clients;
