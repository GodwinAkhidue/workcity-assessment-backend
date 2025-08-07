import express from "express";
import pool from "../../../config/postgresql.js";

const user_update_clients = express();

user_update_clients.use(express.json());

user_update_clients.post(`/api/update_client`, async (req, res) => {
  const { fullname, company, position, email, phone, id } = req.body;

  try {
    //Update client data
    const db = await pool.connect();

    const result = await db.query(
      `
            UPDATE clients
            SET fullname = $1,
            company = $2,
            position = $3,
            email = $4,
            phone = $5
            WHERE id = $6;
        `,
      [fullname, company, position, email, phone, id]
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

export default user_update_clients;
