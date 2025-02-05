const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_PROXY_ENDPOINT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ Маршрут для получения оборудования с фильтрацией по мощности
app.get("/equip", async (req, res) => {
  console.log("📥 GET /equip called with query:", req.query);

  let client;
  try {
    client = await pool.connect();
    console.log("✅ Successfully connected to the database.");

    let baseQuery = `SELECT * FROM air_conditioners`;
    const values = [];

    if (req.query.power) {
      baseQuery += ` WHERE power = $1`;
      values.push(req.query.power);
    }

    console.log("🟡 Executing SQL query:", baseQuery, values);
    const result = await client.query(baseQuery, values);

    console.log(`✅ Fetched ${result.rows.length} items from database.`);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Database query error:", err);
    res
      .status(500)
      .json({ error: "Database query error", details: err.message });
  } finally {
    if (client) {
      client.release();
      console.log("✅ Connection released.");
    }
  }
});

module.exports = app;
