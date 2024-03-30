const PORT = process.env.PORT ?? 8000;
const priceService = require("./service/pricingService");
const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/api", async (req, res) => {
  try {
    const pricing = await pool.query(
      `SELECT o.name AS organisation_name, i.type AS item_type, i.description AS item_description, p.zone, p.base_distance_in_km, p.km_price, p.fix_price FROM organisation o INNER JOIN pricing p ON o.id = p.organisation_id INNER JOIN item i ON p.item_id = i.id;`
    );
    res.json(pricing.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.post("/api/add", async (req, res) => {
  try {
    const {
      name,
      description,
      zone,
      base_distance_in_km,
      type,
      km_price,
      fix_price,
    } = req.body;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const organisationQuery =
        "INSERT INTO Organisation (name) VALUES ($1) RETURNING id";
      const organisationResult = await client.query(organisationQuery, [name]);
      const organisationId = organisationResult.rows[0].id;

      const itemQuery =
        "INSERT INTO Item (type, description) VALUES ($1, $2) RETURNING id";
      const itemResult = await client.query(itemQuery, [type, description]);
      const itemId = itemResult.rows[0].id;

      const pricingQuery =
        "INSERT INTO Pricing (organisation_id, item_id, zone, base_distance_in_km, km_price, fix_price) VALUES ($1, $2, $3, $4, $5, $6)";
      await client.query(pricingQuery, [
        organisationId,
        itemId,
        zone,
        base_distance_in_km,
        km_price,
        fix_price,
      ]);

      await client.query("COMMIT");

      res.status(200).json({ message: "Restaurant added successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error adding restaurant:", error);
      throw error; // Re-throw the error for the outer catch block to handle
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Error adding restaurant" });
  }
});
app.post("/api/price", async (req, res) => {
  try {
    const requestData = req.body;
    const totalPrice = priceService.calculateDeliveryPrice(requestData);
    res.json({ total_price: totalPrice }); // Respond with the total price
  } catch (err) {
    console.error("Error calculating delivery price:", err);
    res.status(500).json({ message: "Error calculating delivery price" });
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
