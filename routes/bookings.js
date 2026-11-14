const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all bookings
router.get("/", (req, res) => {
    db.all("SELECT * FROM bookings", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// GET booking by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get(
        "SELECT * FROM bookings WHERE id = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({ message: "Booking not found" });
            }

            res.json(row);
        }
    );
});

// POST create booking
router.post("/", (req, res) => {
    const { guest_id, game_id } = req.body;

    db.run(
        "INSERT INTO bookings (guest_id, game_id) VALUES (?, ?)",
        [guest_id, game_id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            res.status(201).json({
                message: "Booking created successfully",
                bookingId: this.lastID
            });
        }
    );
});

module.exports = router;
