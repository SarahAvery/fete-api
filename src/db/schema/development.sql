INSERT INTO users (email, password)
VALUES
  ('email@email.com', '$2a$10$AImobkRCiRbwwgR5uRufgutlYpeyYYjA6kOA/pbq7OTF.REoOTmsa'),
  ('memail@otheremail.com', '$2a$10$AImobkRCiRbwwgR5uRufgutlYpeyYYjA6kOA/pbq7OTF.REoOTmsa');

INSERT INTO events (title, first_name, second_name, event_date, email, phone, unit, street_number, street_name, street_type, postal_code, city, expense_budget, expense_actual)
VALUES
  ('F&G wedding', 'Frank Alistair', 'Georgia Green', '2016-06-22 22:10:25-04', 'fngwedding@email.com', '4168261456', '23A', 145, 'Brooklands', 'Place', 'M2X 4W9', 'Cityville', 5000, 0),
  ('Lucy & Kate', 'Lucy Watson', 'Kate Lincoln', '2016-06-22 22:10:25-04', 'gettingmarried@email.com', '4161649826', 'Suite 2306', 4873, 'Astor', 'Drive', 'L7R 1K8', 'Townsville', 15000, 0);

INSERT INTO users_events (user_id, event_id)
VALUES 
  (1, 1),
  (1, 2);

INSERT INTO boards (event_id, title)
VALUES
  (1, 'F&G wedding'),
  (2, 'L&K wedding');

INSERT INTO swimlanes (board_id, status, title)
VALUES
  (1, 1, 'To Do'),
  (1, 1, 'Follow Up'),
  (1, 1, 'Pending Approval'),
  (1, 1, 'Approved'),
  (1, 1, 'Booked'),
  (1, 1, 'Billed'),
  (1, 1, 'Paid'),
  (2, 1, 'To Do'),
  (2, 1, 'Follow Up'),
  (2, 1, 'Pending Approval'),
  (2, 1, 'Approved'),
  (2, 1, 'Booked'),
  (2, 1, 'Billed'),
  (2, 1, 'Paid');

INSERT INTO tasks (swimlane_id, task_order, status, title, content, expense_budget, expense_actual)
VALUES
  (1, 0, 1, 'Choose Flowers', 'Floras Flowers', 100, 150),
  (1, 1, 1, 'Buy Dress', 'Dress Barn - 123 Discount Wedding Way, Brantford', 100, 150),
  (1, 2, 1, 'Call Grandma', 'Tell her not to die before the big day', 100, 150),
  (2, 0, 1, 'Confirm with bridesmaids', 'Make sure they all accept', 100, 150),
  (2, 1, 1, 'Confirm Photographer', 'Marianne Rothbauer', 100, 150),
  (3, 0, 1, 'Venue Booking', 'The Country House Hotel', 100, 150),
  (4, 0, 1, 'Invitations', 'Design and cost', 100, 150),
  (5, 0, 1, 'DJ', 'The Beatmeister Wedding DJ - 416-459-3579', 100, 150),
  (7, 0, 1, 'Deposit for rings', 'Vaughan Vintage and Specialty Jewellery', 100, 150),
  (8, 0, 1, 'Choose Flowers', 'Floras Flowers', 100, 150),
  (8, 1, 1, 'Buy Dress', 'Dress Barn - 123 Discount Wedding Way, Brantford', 100, 150),
  (8, 2, 1, 'Call Grandma', 'Tell her not to die before the big day', 100, 150),
  (9, 0, 1, 'Confirm with bridesmaids', 'Make sure they all accept', 100, 150),
  (9, 1, 1, 'Confirm Photographer', 'Marianne Rothbauer', 100, 150),
  (9, 0, 1, 'Venue Booking', 'The Country House Hotel', 100, 150),
  (10, 0, 1, 'Invitations', 'Design and cost', 100, 150),
  (11, 0, 1, 'DJ', 'The Beatmeister Wedding DJ - 416-459-3579', 100, 150),
  (12, 0, 1, 'Deposit for rings', 'Vaughan Vintage and Specialty Jewellery', 100, 150);



















