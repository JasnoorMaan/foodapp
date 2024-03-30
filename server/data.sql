CREATE TABLE organisation (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE pricing (
    id SERIAL,
    organisation_id INTEGER REFERENCES organisation(id),
    item_id INTEGER REFERENCES item(id),
    zone VARCHAR(50) NOT NULL,
    base_distance_in_km INTEGER NOT NULL,
    km_price DECIMAL(10, 2) NOT NULL,
    fix_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (organisation_id, item_id, zone),
    FOREIGN KEY (organisation_id) REFERENCES Organisation(id),
    FOREIGN KEY (item_id) REFERENCES Item(id)
);
CREATE TABLE pricing (
  organisation_id INT NOT NULL,
  item_id INT NOT NULL,
  zone VARCHAR(255) NOT NULL,
  base_distance_in_km INT NOT NULL DEFAULT 5,
  km_price DECIMAL(5, 2) NOT NULL DEFAULT 1.5,
  fix_price INT NOT NULL DEFAULT 10,
  PRIMARY KEY (organisation_id, item_id, zone),
  FOREIGN KEY (organisation_id) REFERENCES Organisation(id),
  FOREIGN KEY (item_id) REFERENCES Item(id)
);

CREATE TABLE Pricing (
    organization_id INTEGER REFERENCES Organization(id),
    item_id INTEGER REFERENCES Item(id),
    zone VARCHAR(255) NOT NULL,
    base_distance_in_km INTEGER NOT NULL,
    km_price NUMERIC(10, 2) NOT NULL,
    fix_price NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (organization_id, item_id, zone)
);
CREATE TABLE Pricing (
    organisation_id INTEGER REFERENCES Organisation(id),
    item_id INTEGER REFERENCES Item(id),
    zone VARCHAR(255) NOT NULL,
    base_distance_in_km INTEGER NOT NULL,
    km_price NUMERIC(10, 2) NOT NULL,
    fix_price NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (organisation_id, item_id, zone)
);


INSERT INTO organisation (name) VALUES
  ('Acme Delivery'),
  ('Fresh Farms'),
  ('Green Grocers');

  INSERT INTO item (type, description) VALUES
  ('Perishable', 'Freshly picked seasonal fruits'),
  ('Perishable', 'Organic and locally sourced vegetables'),
  ('Perishable', 'High-quality grass-fed cuts of meat'),
  ('Non-Perishable', 'Chips and candies'),
  ('Perishable', 'Organic milk, cheese, and yogurt');

INSERT INTO pricing (organisation_id, item_id, zone, base_distance_in_km, km_price, fix_price)
VALUES
  -- Acme Delivery (ID = 1) pricing
  (1, 1, 'central', 20, 1.50, 100.00),  -- Fruits, lower per km price in central zone
  (1, 2, 'north', 21, 1.50, 100.00),   -- Vegetables, higher per km price in north zone
  (1, 3, 'south', 24, 1.50, 100.00),    -- Meat, highest per km price in south zone
  (1, 4, 'central',8, 1.00, 100.00), -- Seafood, default per km price, fixed price in central zone
  (1, 5, 'north', 9, 1.50, 100.00),  -- Dairy, default per km price, fixed price in north zone

  -- Fresh Farms (ID = 2) pricing
  (2, 1, 'central', 10, 1.50, 100.00),  -- Fruits, fixed price in central zone
  (2, 2, 'north', 11, 1.50, 100.00),   -- Vegetables, fixed price in north zone
  (2, 3, 'south', 12, 1.50, 100.00),    -- Meat, higher per km price, no fixed price
  (2, 4, 'central', 13, 1.00, 100.00), -- Seafood, default per km price, fixed price in central zone
  (2, 5, 'north', 14, 1.50, 100.00),     -- Dairy, default per km price, no fixed price

  -- Green Grocers (ID = 3) pricing (assuming ID exists in Organization table)
  (3, 1, 'central', 15, 1.50, 100.00),  -- Fruits, lower per km price, fixed price in central zone
  (3, 2, 'north', 16, 1.50, 100.00),  -- Vegetables, slightly lower per km price, fixed price in north zone
  (3, 3, 'south', 17, 1.50, 100.00),    -- Meat, higher per km price, no fixed price
  (3, 4, 'central', 18, 1.00, 100.00),   -- Seafood, default per km price, no fixed price
  (3, 5, 'north', 19, 1.50, 100.00);    -- Dairy, default per km price, no fixed price


SELECT 
  o.name AS organization_name,
  i.type AS item_type,
  i.description AS item_description,
  p.zone,
  p.base_distance_in_km,
  p.km_price,
  p.fix_price
FROM organisation o
INNER JOIN pricing p ON o.id = p.organization_id
INNER JOIN item i ON p.item_id = i.id;



BEGIN
INSERT INTO organisation(name) VALUES ($1) RETURNING id
INSERT INTO item(type, description) VALUES ($1, $2) RETURNING id
INSERT INTO pricing(organization_id, item_id, base_distance_in_km) VALUES ($1, $2, $3) 
COMMIT