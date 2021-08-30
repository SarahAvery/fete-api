const express = require("express");
const router = express.Router();

// Get all to-do items for a specific event
module.exports = (db) => {
  router.get("/board/:id", (req, res) => {
    db.query(
      `
      SELECT 
      swimlane.id AS swim_id,
      swimlane.name AS swim_title,
      JSON_AGG( 
        json_build_object(
          'item_id', do_item.id, 
          'item_title', do_item.title, 
          'item_content', do_item.description
        )
      ) AS items
      FROM do_item
      INNER JOIN swimlane
      ON swimlane_id = swimlane.id
      INNER JOIN kanban_board
      ON board_id = kanban_board.id
      WHERE event_id = $1
      GROUP BY swimlane.id, swimlane.name
      ORDER BY swimlane.id;
      `,
      [req.params.id]
    )
      .then((data) => {
        const event_items = data.rows;
        res.json(event_items);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  return router;
};




// Returns this:
/*
[{"swim_id":1,"swim_title":"To Do","items":[{"item_id":1,"item_title":"Choose Flowers","item_content":"Floras Flowers"},{"item_id":2,"item_title":"Buy Dress","item_content":"Dress Barn - 123 Discount Wedding Way, Brantford"},{"item_id":3,"item_title":"Call Grandma","item_content":"Tell her not to die before the big day"}]},{"swim_id":2,"swim_title":"Follow Up","items":[{"item_id":4,"item_title":"Confirm with bridesmaids","item_content":"Make sure they all accept"},{"item_id":5,"item_title":"Confirm Photographer","item_content":"Marianne Rothbauer"}]},{"swim_id":3,"swim_title":"Pending Approval","items":[{"item_id":6,"item_title":"Venue Booking","item_content":"The Country House Hotel"}]},{"swim_id":4,"swim_title":"Approved","items":[{"item_id":7,"item_title":"Invitations","item_content":"Design and cost"}]},{"swim_id":5,"swim_title":"Booked","items":[{"item_id":8,"item_title":"DJ","item_content":"The Beatmeister Wedding DJ - 416-459-3579"}]},{"swim_id":7,"swim_title":"Paid","items":[{"item_id":9,"item_title":"Deposit for rings","item_content":"Vaughan Vintage and Specialty Jewellery"}]}]
*/
