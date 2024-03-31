const getAll = `SELECT o.name AS organization_name, i.type AS item_type, i.description AS item_description, p.zone, p.base_distance_in_km, p.km_price, p.fix_price FROM organisation o INNER JOIN pricing p ON o.id = p.organization_id INNER JOIN item i ON p.item_id = i.id`;

module.exports = {
  getAll,
};
