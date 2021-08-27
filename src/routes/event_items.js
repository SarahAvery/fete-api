const express = require("express");
const router = express.Router();

// Get all to-do items for a specific event
module.exports = (db) => {
    // http://localhost:8002/api/event/1  < 1 is the event id
  router.get("/event/:id", (req, res) => {
    db.query(
      `
        SELECT 
        swimlane.id AS swimlane_id,
        board_id,
        event_id AS events_id,
        do_item.id AS do_item_id,
        swimlane.status AS swimlane_status,
        do_item.status AS do_item_status,
        swimlane.name AS swimlane_name,
        last_edit,
        do_item.title AS do_item_title,
        description,
        date_due,
        kanban_board.name AS kanban_board_name
        FROM swimlane
        INNER JOIN do_item
        ON swimlane_id = swimlane.id
        INNER JOIN kanban_board
        ON board_id = kanban_board.id
        WHERE event_id = $1;
        `,
      [req.params.id]
    )
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// Returns this:
/*
{"users":[{"swimlane_id":1,"board_id":1,"events_id":1,"do_item_id":1,"swimlane_status":"1","do_item_status":"1","swimlane_name":"To Do","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"Choose Flowers","description":"Floras Flowers","date_due":null,"kanban_board_name":"F&G wedding"},{"swimlane_id":1,"board_id":1,"events_id":1,"do_item_id":2,"swimlane_status":"1","do_item_status":"1","swimlane_name":"To Do","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"Buy Dress","description":"Dress Barn - 123 Discount Wedding Way, Brantford","date_due":null,"kanban_board_name":"F&G wedding"},{"swimlane_id":1,"board_id":1,"events_id":1,"do_item_id":3,"swimlane_status":"1","do_item_status":"1","swimlane_name":"To Do","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"Call Grandma","description":"Tell her not to die before the big day","date_due":null,"kanban_board_name":"F&G wedding"},{"swimlane_id":2,"board_id":1,"events_id":1,"do_item_id":4,"swimlane_status":"1","do_item_status":"1","swimlane_name":"Follow Up","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"Confirm with bridesmaids","description":"Make sure they all accept","date_due":null,"kanban_board_name":"F&G wedding"},{"swimlane_id":2,"board_id":1,"events_id":1,"do_item_id":5,"swimlane_status":"1","do_item_status":"1","swimlane_name":"Follow Up","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"Confirm Photographer","description":"Marianne Rothbauer","date_due":null,"kanban_board_name":"F&G wedding"},{"swimlane_id":3,"board_id":1,"events_id":1,"do_item_id":6,"swimlane_status":"1","do_item_status":"1","swimlane_name":"Pending Approval","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"Venue Booking","description":"The Country House Hotel","date_due":null,"kanban_board_name":"F&G wedding"},{"swimlane_id":4,"board_id":1,"events_id":1,"do_item_id":7,"swimlane_status":"1","do_item_status":"1","swimlane_name":"Approved","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"Invitations","description":"Design and cost","date_due":null,"kanban_board_name":"F&G wedding"},{"swimlane_id":5,"board_id":1,"events_id":1,"do_item_id":8,"swimlane_status":"1","do_item_status":"1","swimlane_name":"Booked","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"DJ","description":"The Beatmeister Wedding DJ - 416-459-3579","date_due":null,"kanban_board_name":"F&G wedding"},{"swimlane_id":7,"board_id":1,"events_id":1,"do_item_id":9,"swimlane_status":"1","do_item_status":"1","swimlane_name":"Paid","last_edit":"2021-08-27T21:42:08.622Z","do_item_title":"Deposit for rings","description":"Vaughan Vintage and Specialty Jewellery","date_due":null,"kanban_board_name":"F&G wedding"}]}
*/
