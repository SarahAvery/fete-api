INSERT INTO users (email, password)
VALUES
  ('email@email.com', 'password'),
  ('memail@otheremail.com', 'password');

INSERT INTO events (title, first_name, second_name, event_date_weekday, event_date_day, event_date_month, event_date_year, email, phone_number, unit, street_number,street_name, street_type, postal_code, city)
VALUES
  ('F&G wedding', 'Frank Alistair', 'Georgia Green', 'Saturday', 21, 'August', 2022, 'fngwedding@email.com', '4168261456', '23A', 145, 'Brooklands', 'Place', 'M2X 4W9', 'Cityville'),
  ('Lucy & Kate', 'Lucy Watson', 'Kate Lincoln', 'Friday', 3, 'June', 2022, 'gettingmarried@email.com', '4161649826', 'Suite 2306', 4873, 'Astor', 'Drive', 'L7R 1K8', 'Townsville');

INSERT INTO users_events (user_id, event_id)
VALUES 
  (1, 1),
  (1, 2);

INSERT INTO kanban_board (event_id, name)
VALUES
  (1, 'F&G wedding');

INSERT INTO swimlane (board_id, status, name)
VALUES
  (1, 1, 'To Do'),
  (1, 1, 'Follow Up'),
  (1, 1, 'Pending Approval'),
  (1, 1, 'Approved'),
  (1, 1, 'Booked'),
  (1, 1, 'Billed'),
  (1, 1, 'Paid');

INSERT INTO do_item (swimlane_id, status, title, description)
VALUES
  (1, 1, 'Choose Flowers', 'Floras Flowers'),
  (1, 1, 'Buy Dress', 'Dress Barn - 123 Discount Wedding Way, Brantford'),
  (1, 1, 'Call Grandma', 'Tell her not to die before the big day'),
  (2, 1, 'Confirm with bridesmaids', 'Make sure they all accept'),
  (2, 1, 'Confirm Photographer', 'Marianne Rothbauer'),
  (3, 1, 'Venue Booking', 'The Country House Hotel'),
  (4, 1, 'Invitations', 'Design and cost'),
  (5, 1, 'DJ', 'The Beatmeister Wedding DJ - 416-459-3579'),
  (7, 1, 'Deposit for rings', 'Vaughan Vintage and Specialty Jewellery');



















