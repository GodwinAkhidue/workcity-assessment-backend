import express from "express";
import pool from "../../../config/postgresql.js";

const user_new_project = express();

user_new_project.use(express.json());

user_new_project.post(`/api/new_project`, async (req, res) => {
  const { name, status, duration, deadline, client_id } = req.body;

  try {
    //Create new project
    const db = await pool.connect();

    const result = await db.query(
      `
            INSERT INTO projects ( name, status, duration, deadline, client_id )
            VALUES ( $1, $2, $3, $4, $5 );
        `,
      [name, status, duration, deadline, client_id]
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

export default user_new_project;
