CREATE TABLE organisation (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE pricing (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES organisation(id),
    item_id INTEGER REFERENCES item(id),
    zone VARCHAR(50) NOT NULL,
    base_distance_in_km INTEGER NOT NULL,
    km_price DECIMAL(10, 2) NOT NULL,
    fix_price DECIMAL(10, 2) NOT NULL
);

INSERT INTO organisation (name) VALUES
  ('Acme Delivery'),
  ('Fresh Farms'),
  ('Green Grocers');

  INSERT INTO item (type, description) VALUES
  ('Fruits', 'Freshly picked seasonal fruits'),
  ('Vegetables', 'Organic and locally sourced vegetables'),
  ('Meat', 'High-quality grass-fed cuts of meat'),
  ('Seafood', 'Sustainable and fresh seafood options'),
  ('Dairy', 'Organic milk, cheese, and yogurt');

  INSERT INTO pricing (organization_id, item_id, zone, base_distance_in_km, km_price, fix_price)
VALUES
  -- Acme Delivery (ID = 1) pricing
  (1, 1, 'central', 5, 1.25, 0),  -- Fruits, lower per km price in central zone
  (1, 2, 'north', 5, 1.75, 0),   -- Vegetables, higher per km price in north zone
  (1, 3, 'south', 5, 2.0, 0),    -- Meat, highest per km price in south zone
  (1, 4, 'central', 5, 1.5, 1500), -- Seafood, default per km price, fixed price in central zone
  (1, 5, 'north', 5, 1.5, 1200),  -- Dairy, default per km price, fixed price in north zone

  -- Fresh Farms (ID = 2) pricing
  (2, 1, 'central', 5, 0, 1800),  -- Fruits, fixed price in central zone
  (2, 2, 'north', 5, 0, 2000),   -- Vegetables, fixed price in north zone
  (2, 3, 'south', 5, 1.8, 0),    -- Meat, higher per km price, no fixed price
  (2, 4, 'central', 5, 1.5, 800), -- Seafood, default per km price, fixed price in central zone
  (2, 5, 'north', 5, 1.5, 0),     -- Dairy, default per km price, no fixed price

  -- Green Grocers (ID = 3) pricing (assuming ID exists in Organization table)
  (3, 1, 'central', 5, 1.0, 500),  -- Fruits, lower per km price, fixed price in central zone
  (3, 2, 'north', 5, 1.2, 1000),  -- Vegetables, slightly lower per km price, fixed price in north zone
  (3, 3, 'south', 5, 1.8, 0),    -- Meat, higher per km price, no fixed price
  (3, 4, 'central', 5, 1.5, 0),   -- Seafood, default per km price, no fixed price
  (3, 5, 'north', 5, 1.5, 0);    -- Dairy, default per km price, no fixed price


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO electric;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO electric;