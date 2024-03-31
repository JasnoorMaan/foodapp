const getAll = `SELECT o.name AS organisation_name, i.type AS item_type, i.description AS item_description, p.zone, p.base_distance_in_km, p.km_price, p.fix_price FROM organisation o INNER JOIN pricing p ON o.id = p.organisation_id INNER JOIN item i ON p.item_id = i.id;`;

const postName = `INSERT INTO Organisation (name) VALUES ($1) RETURNING id`;
const postItem = `INSERT INTO Item (type, description) VALUES ($1, $2) RETURNING id`;
const postPrice = `INSERT INTO Pricing (organisation_id, item_id, zone, base_distance_in_km, km_price, fix_price) VALUES ($1, $2, $3, $4, $5, $6)`;

module.exports = {
  getAll,
  postName,
  postItem,
  postPrice,
};
