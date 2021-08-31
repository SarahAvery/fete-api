DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_events CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS swimlanes CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS vendors_events CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  planner_role BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  first_name VARCHAR(255) NOT NULL,
  second_name VARCHAR(255) NOT NULL,
  event_date TIMESTAMPTZ,
  email VARCHAR(225) NOT NULL,
  phone VARCHAR(20),
  unit VARCHAR(20),
  street_number VARCHAR(20) NOT NULL,
  street_name VARCHAR(255) NOT NULL,
  street_type TEXT NOT NULL,
  postal_code VARCHAR(7) NOT NULL,
  city VARCHAR(255) NOT NULL,
  date_created TIMESTAMPTZ DEFAULT now(),
  percentage INTEGER
);

CREATE TABLE users_events (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE boards (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  title varchar(50) NOT NULL
);

CREATE TABLE swimlanes (
  id SERIAL PRIMARY KEY NOT NULL,
  board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  title varchar(50) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  task_order INTEGER NOT NULL,
  swimlane_id INTEGER REFERENCES swimlanes(id) ON DELETE CASCADE,
  last_edit TIMESTAMPTZ DEFAULT now(),
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  date_due TIMESTAMPTZ
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