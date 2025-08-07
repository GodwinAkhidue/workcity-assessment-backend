import express from "express";
import pool from "../../../config/postgresql.js";

const user_update_projects = express();

user_update_projects.use(express.json());

user_update_projects.post(`/api/update_project`, async (req, res) => {
  const { name, status, duration, deadline, id } = req.body;

  try {
    //Update single project data
    const db = await pool.connect();

    const result = await db.query(
      `
            UPDATE projects
            SET name = $1,
            status = $2,
            duration = $3,
            deadline = $4
            WHERE id = $5;
        `,
      [name, status, duration, deadline, id]
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

export default user_update_projects;
