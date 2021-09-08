INSERT INTO users (email, password)
VALUES
  ('wedplanner@email.com', '$2a$10$AImobkRCiRbwwgR5uRufgutlYpeyYYjA6kOA/pbq7OTF.REoOTmsa'),
  ('email@email.com', '$2a$10$AImobkRCiRbwwgR5uRufgutlYpeyYYjA6kOA/pbq7OTF.REoOTmsa');

INSERT INTO events (title, first_name, second_name, event_date, email, phone, unit, street_number, street_name, street_type, postal_code, city, expense_budget, expense_actual)
VALUES
  ('F&G wedding', 'Frank Alistair', 'George Green', '2021-09-25 22:10:25-04', 'fngwedding@email.com', '4168261456', '23A', 145, 'Brooklands', 'Place', 'M2X 4W9', 'Cityville', 31000, 0),
  ('Lucy & Kate', 'Lucy Watson', 'Kate Lincoln', '2021-10-04 22:10:25-04', 'gettingmarried@email.com', '4161649826', 'Suite 2306', 4873, 'Astor', 'Drive', 'L7R 1K8', 'Townsville', 22000, 0),
  ('Laurie & Tracy',	'Laurie Jokela',	'Tracy Caron',	'2021-12-13 22:10:25-04',	'tracey_89@email.com',	'9051698255',	'',	647,	'Derby',	'Road',	'V2J 0K7',	'Quesnel',	21000,	0),
  ('Florence & Taylor',	'Florence Hobson',	'Taylor Leclercq', '2022-06-12 22:10:25-04',	'tleclercq@email.com',	'6476547658',	'Apt 1212',	'1616',	'Lavender',	'Crescent',	'E7B 5R6',	'Saint-Jacques',	11000,	0),
  ('Reagan & Pacey',	'Reagan Leon',	'Pacey Wallace', '2022-01-01 22:10:25-04',	'r.leon@email.com',	'9056579824',	'',	12,	'Oxford',	'Road',	'L1E 8A5',	'Courtice',	12500,	0),
  ('Claude & Carlise', 'Rayne	Claude', 'Peel	Carlisle Rayne', '2022-10-31 22:10:25-04',	'c.c.ryane@email.com',	'2896429355',	'205',	9548,	'Maple',	'Drive',	'L9L 0J6',	'Port Perry',	6700,	0);

INSERT INTO users_events (user_id, event_id)
VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6);

INSERT INTO boards (event_id, title)
VALUES
  (1, 'F&G wedding'),
  (2, 'Lucy & Kate'),
  (3, 'Laurie & Tracy'),
  (4, 'Florence & Taylor'),
  (5, 'Reagan & Pacey'),
  (6, 'Claude & Carlise');

INSERT INTO swimlanes (board_id, status, title, is_last)
VALUES
  (1, 1, 'To Do', DEFAULT),
  (1, 1, 'Follow Up', DEFAULT),
  (1, 1, 'Pending Approval', DEFAULT),
  (1, 1, 'Approved', DEFAULT),
  (1, 1, 'Booked', DEFAULT),
  (1, 1, 'Billed', DEFAULT),
  (1, 1, 'Complete', true),
  (2, 1, 'To Do', DEFAULT),
  (2, 1, 'Follow Up', DEFAULT),
  (2, 1, 'Pending Approval', DEFAULT),
  (2, 1, 'Approved', DEFAULT),
  (2, 1, 'Booked', DEFAULT),
  (2, 1, 'Billed', DEFAULT),
  (2, 1, 'Complete', true),
  (3, 1, 'To Do', DEFAULT),
  (3, 1, 'Follow Up', DEFAULT),
  (3, 1, 'Pending Approval', DEFAULT),
  (3, 1, 'Approved', DEFAULT),
  (3, 1, 'Booked', DEFAULT),
  (3, 1, 'Billed', DEFAULT),
  (3, 1, 'Complete', true),
  (4, 1, 'To Do', DEFAULT),
  (4, 1, 'Follow Up', DEFAULT),
  (4, 1, 'Pending Approval', DEFAULT),
  (4, 1, 'Approved', DEFAULT),
  (4, 1, 'Booked', DEFAULT),
  (4, 1, 'Billed', DEFAULT),
  (4, 1, 'Complete', true),
  (5, 1, 'To Do', DEFAULT),
  (5, 1, 'Follow Up', DEFAULT),
  (5, 1, 'Pending Approval', DEFAULT),
  (5, 1, 'Approved', DEFAULT),
  (5, 1, 'Booked', DEFAULT),
  (5, 1, 'Billed', DEFAULT),
  (5, 1, 'Complete', true),
  (6, 1, 'To Do', DEFAULT),
  (6, 1, 'Follow Up', DEFAULT),
  (6, 1, 'Pending Approval', DEFAULT),
  (6, 1, 'Approved', DEFAULT),
  (6, 1, 'Booked', DEFAULT),
  (6, 1, 'Billed', DEFAULT),
  (6, 1, 'Complete', true);

INSERT INTO tasks (swimlane_id, task_order, status, title, content, expense_budget, expense_actual)
VALUES
  (1,	0,	1,	'Choose Flowers',	'Floras Flowers',	4500,	5450),
  (1,	1,	1,	'Wedding Dress',	'Kleinfeld - 176 Yonge Street',	1800,	2100),
  (1,	2,	1,	'Call Grandma',	'Tell her not to die before the big day', 0, DEFAULT),
  (2,	0,	1,	'Staffing	Confirm', 'availability and head count',	1250, DEFAULT),
  (2,	1,	1,	'Confirm Photographer',	'Marianne Rothbauer',	3000,	2850),
  (2,	2,	1,	'Choose Menu',	'Undecided on soup starter. 4 Vegetarians. 3 Vegans',	2500, DEFAULT),
  (2,	3,	1,	'Find Something Blue',	'Cousin to lend her brooch', 0, DEFAULT),
  (3,	0,	1,	'Venue Booking', 'The Country House Hotel', 15000, 16872),
  (4,	0,	1,	'Invitations',	'Design and cost', 100, 158),
  (4,	1,	1,	'Seating Chart', 'Keep Uncle Jim far away from Aunt Stella', 0, DEFAULT),
  (5,	0,	1,	'DJ',	'The Beatmeister Wedding DJ - 416-459-3579', 500, 500),
  (5,	1,	1,	'Vows',	'Check if they have written their vows', 0, DEFAULT),
  (6,	0,	1,	'Transportation',	'Larrys Limos',	850, 850),
  (7,	0,	1,	'Deposit for rings', 'Vaughan Vintage and Specialty Jewellery', 200, 226),
  (7,	1,	1,	'Get Marriage License',	'10 days prior', 160, 160),
  (7,	2,	1,	'Cake',	'Bakerbots or Milkbar',	800, DEFAULT),
  (8,	0,	1,	'Choose Flowers',	'Floras Flowers',	2500,	150),
  (8,	1,	1,	'Buy Dress',	'Dress Barn - 123 Discount Wedding Way, Brantford',	2000,	150),
  (8,	2,	1,	'Call Grandma',	'Tell her not to die before the big day',	100, 150),
  (9,	0,	1,	'Confirm with bridesmaids',	'Make sure they all accept',	100, 150),
  (9,	0,	1,	'Venue Booking',	'The Country House Hotel',	12343,	11500),
  (9,	1,	1,	'Confirm Photographer',	'Marianne Rothbauer',	2000,	150),
  (10,	0,	1,	'Invitations',	'Design and cost', 250, 200),
  (11,	0,	1,	'DJ',	'The Beatmeister Wedding DJ - 416-459-3579', 600, 600),
  (12,	0,	1,	'Deposit for rings',	'Vaughan Vintage and Specialty Jewellery', 200, 226),
  (14,	0,	1,	'Get Marriage License',	'10 days prior',	160,	160),
  (14,	1,	1,	'Transportation',	'Rolls Royce for each party',	500,	624),
  (14,	2,	1,	'Meet with officient', 'Randy 1-800-WED-DING',	200, DEFAULT),
  (14,	3,	1,	'Lighting',	'Event lighting rental - warm glow string lights', 600, 550),
  (15,	0,	1,	'Choose Flowers',	'Euro Flowers',	1500, DEFAULT),
  (15,	1,	1,	'Book consultation',	'Promises & Lace',	100,	150),
  (15,	2,	1,	'Catering',	'Checkout Weddingwire',	2400,	2200),
  (16,	0,	1,	'Confirm with bridesmaids',	'Make sure they all accept', 100, 150),
  (16,	1,	1,	'Confirm Photographer',	'Marianne Rothbauer',	3000, DEFAULT),
  (16,	2,	1,	'Venue Booking',	'The Country House Hotel',	15000, 16872),
  (17,	0,	1,	'Invitations',	'Design and cost',	100,	158),
  (18,	0,	1,	'DJ',	'The Beatmeister Wedding DJ - 416-459-3579', 500, 500),
  (22,	0,	1,	'Choose Flowers',	'Euro Flowers',	1500, DEFAULT),
  (22,	1,	1,	'Book consultation',	'Promises & Lace',	100,	150),
  (22,	2,	1,	'Choose Menu',	'Undecided on soup starter. 4 Vegetarians. 3 Vegans',	2500, DEFAULT),
  (23,	0,	1,	'Transportation',	'Book transportation for immediate family',	1500, DEFAULT),
  (23,	1,	1,	'Meet with officient',	'Call Randy 1-800-WED-DING',	200, DEFAULT),
  (24,	0,	1,	'Get Marriage License',	'10 days prior',	160, 160),
  (25,	0,	1,	'Menu Card',	'Pickup menu cards from designer',	250,	200),
  (26,	0,	1,	'Gift Registry',	'Gift Registry at Crate & Barrel', 0, DEFAULT),
  (27,	0,	1,	'Outdoor tent & seating',	'20 x 40 tent seating for 80', 3100, 3200),
  (28,	0,	1,	'Lighting',	'Event lighting rental - warm glow string lights', 600,	550),
  (29,	0,	1,	'Catering',	'Checkout Weddingwire',	2400,	2200),
  (29,	1,	1,	'Confirm with bridesmaids',	'Make sure they all accept',	100, 150),
  (29,	2,	1,	'Confirm Photographer',	'Marianne Rothbauer',	3000, DEFAULT),
  (30,	0,	1,	'DJ',	'The Beatmeister Wedding DJ - 416-459-3579', 500, 500),
  (32,	0,	1,	'Get Marriage License',	'10 days prior', 160, 160),
  (36,	0,	1,	'Confirm Photographer',	'Marianne Rothbauer',	3000, DEFAULT),
  (36,	1,	1,	'Get Marriage License',	'10 days prior', 160,	160),
  (37,	0,	1,	'Outdoor tent & seating',	'20 x 40 tent seating for 80', 3100, 3200),
  (38,	0,	1,	'Lighting',	'Event lighting rental - warm glow string lights', 600,	550);


















