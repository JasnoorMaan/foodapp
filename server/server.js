const PORT = process.env.PORT ?? 8000;
const express = require("express");
const app = express();

const pool = require("./db");

//get all
app.get("/api", async (req, res) => {
  try {
    const pricing = await pool.query("SELECT * FROM pricing");
    res.json(pricing.rows);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
