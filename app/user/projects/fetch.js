import express from "express";
import pool from "../../../config/postgresql.js";

const user_get_projects = express();

user_get_projects.use(express.json());

user_get_projects.post(`/api/get_projects`, async (req, res) => {
  const { client_id } = req.body;

  //Fetch all Projects under one client
  try {
    const db = await pool.connect();

    const result = await db.query(
      `
            SELECT * FROM projects WHERE client_id = $1;
        `,
      [client_id]
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

export default user_get_projects;
