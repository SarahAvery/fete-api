DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_events CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS kanban_board CASCADE;
DROP TABLE IF EXISTS swimlane CASCADE;
DROP TABLE IF EXISTS do_item CASCADE;
DROP TABLE IF EXISTS vendors_events CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  planner_role BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  first_name VARCHAR(255) NOT NULL,
  second_name VARCHAR(255) NOT NULL,
  event_date_weekday TEXT,
  event_date_day INTEGER,
  event_date_month TEXT,
  event_date_year INTEGER,
  email VARCHAR(225) NOT NULL,
  phone_number VARCHAR(20),
  unit VARCHAR(20),
  street_number VARCHAR(20) NOT NULL,
  street_name VARCHAR(255) NOT NULL,
  street_type TEXT NOT NULL,
  postal_code VARCHAR(7) NOT NULL,
  city VARCHAR(255) NOT NULL,
  date_created TIMESTAMP DEFAULT now(),
  percentage INTEGER
);

CREATE TABLE users_events (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE kanban_board (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  name varchar(50) NOT NULL
);

CREATE TABLE swimlane (
  id SERIAL PRIMARY KEY NOT NULL,
  board_id INTEGER REFERENCES kanban_board(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  name varchar(50) NOT NULL
);

CREATE TABLE do_item (
  id SERIAL PRIMARY KEY NOT NULL,
  swimlane_id INTEGER REFERENCES swimlane(id) ON DELETE CASCADE,
  last_edit TIMESTAMP DEFAULT now(),
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date_due TIMESTAMP
);

-- CREATE TABLE vendors_events (
--   id SERIAL PRIMARY KEY NOT NULL,
--   vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
--   event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
--   vendor_type TEXT
-- );

-- CREATE TABLE vendors (
--   id SERIAL PRIMARY KEY NOT NULL,
--   business_name VARCHAR(255) NOT NULL,
--   contact_name VARCHAR(255) NOT NULL,
--   email VARCHAR(225) NOT NULL,
--   phone_number VARCHAR(20),
--   street_number VARCHAR(10) NOT NULL,
--   street_name VARCHAR(255) NOT NULL,
--   city VARCHAR(255) NOT NULL,
--   postal_code VARCHAR(7) NOT NULL,
--   website_url VARCHAR(255)
-- );