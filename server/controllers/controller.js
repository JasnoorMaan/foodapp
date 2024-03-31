const pool = require("../db");
const priceService = require("../service/pricingService");
const queries = require("../queries/queries");

const getAll = async (req, res) => {
  try {
    const pricing = await pool.query(queries.getAll);
    res.json(pricing.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
};

const postRest = async (req, res) => {
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

      const organisationQuery = queries.postName;
      const organisationResult = await client.query(organisationQuery, [name]);
      const organisationId = organisationResult.rows[0].id;

      const itemQuery = queries.postItem;
      const itemResult = await client.query(itemQuery, [type, description]);
      const itemId = itemResult.rows[0].id;

      const pricingQuery = queries.postPrice;
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
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Error adding restaurant" });
  }
};

const pricing = async (req, res) => {
  try {
    const requestData = req.body;
    const totalPrice = priceService.calculateDeliveryPrice(requestData);
    res.json({ total_price: totalPrice });
  } catch (err) {
    console.error("Error calculating delivery price:", err);
    res.status(500).json({ message: "Error calculating delivery price" });
  }
};

module.exports = {
  getAll,
  postRest,
  pricing,
};
