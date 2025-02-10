const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
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

// ✅ Запрос оборудования по `power` и `category`
app.get("/equip", async (req, res) => {
  console.log("📥 Запрос GET /equip с параметрами:", req.query);

  const { power, category } = req.query;

  if (!power || !category) {
    return res
      .status(400)
      .json({ error: "Параметры 'power' и 'category' обязательны." });
  }

  let client;
  try {
    client = await pool.connect();
    console.log("✅ Подключение к базе данных успешно.");

    // ✅ Определяем таблицу по `category`
    const categoryMap = {
      air_conditioners: "air_conditioners",
      heat_pumps: "heat_pumps",
      air_handlers: "air_handlers",
      mini_splits: "mini_splits",
      furnace: "furnace",
    };

    if (!categoryMap[category]) {
      return res
        .status(400)
        .json({ error: "Неверная категория оборудования." });
    }

    const query = `SELECT *, '${category}' AS category FROM ${categoryMap[category]} WHERE power = $1`;
    console.log("🟡 SQL-запрос:", query, "с параметром:", power);

    const result = await client.query(query, [power]);

    console.log(`✅ Найдено ${result.rows.length} записей.`);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Ошибка при запросе к базе:", err);
    res.status(500).json({
      error: "Ошибка базы данных",
      details: err.message,
      stack: err.stack,
    });
  } finally {
    if (client) {
      client.release();
      console.log("✅ Подключение закрыто.");
    }
  }
});

module.exports = app;
