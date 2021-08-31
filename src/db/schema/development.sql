INSERT INTO users (email, password)
VALUES
  ('email@email.com', '$2a$10$AImobkRCiRbwwgR5uRufgutlYpeyYYjA6kOA/pbq7OTF.REoOTmsa'),
  ('memail@otheremail.com', '$2a$10$AImobkRCiRbwwgR5uRufgutlYpeyYYjA6kOA/pbq7OTF.REoOTmsa');

INSERT INTO events (title, first_name, second_name, event_date, email, phone, unit, street_number, street_name, street_type, postal_code, city)
VALUES
  ('F&G wedding', 'Frank Alistair', 'Georgia Green', '2016-06-22 22:10:25-04', 'fngwedding@email.com', '4168261456', '23A', 145, 'Brooklands', 'Place', 'M2X 4W9', 'Cityville'),
  ('Lucy & Kate', 'Lucy Watson', 'Kate Lincoln', '2016-06-22 22:10:25-04', 'gettingmarried@email.com', '4161649826', 'Suite 2306', 4873, 'Astor', 'Drive', 'L7R 1K8', 'Townsville');

INSERT INTO boards (event_id, title)
VALUES
  (1, 'F&G wedding');

INSERT INTO swimlanes (board_id, status, title)
VALUES
  (1, 1, 'To Do'),
  (1, 1, 'Follow Up'),
  (1, 1, 'Pending Approval'),
  (1, 1, 'Approved'),
  (1, 1, 'Booked'),
  (1, 1, 'Billed'),
  (1, 1, 'Paid');

INSERT INTO tasks (swimlane_id, task_order, status, title, content)
VALUES
  (1, 0, 1, 'Choose Flowers', 'Floras Flowers'),
  (1, 1, 1, 'Buy Dress', 'Dress Barn - 123 Discount Wedding Way, Brantford'),
  (1, 2, 1, 'Call Grandma', 'Tell her not to die before the big day'),
  (2, 0, 1, 'Confirm with bridesmaids', 'Make sure they all accept'),
  (2, 1, 1, 'Confirm Photographer', 'Marianne Rothbauer'),
  (3, 0, 1, 'Venue Booking', 'The Country House Hotel'),
  (4, 0, 1, 'Invitations', 'Design and cost'),
  (5, 0, 1, 'DJ', 'The Beatmeister Wedding DJ - 416-459-3579'),
  (7, 0, 1, 'Deposit for rings', 'Vaughan Vintage and Specialty Jewellery');



















