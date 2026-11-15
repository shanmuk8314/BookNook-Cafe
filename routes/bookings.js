
const express = require("express");
const router = express.Router();
const db = require("../db");

const {
    validateBooking,
    validateStatus
} = require("../validation");

// GET booking details using SQL JOIN
router.get("/details", (req, res) => {
    const query = `
        SELECT
            bookings.id AS booking_id,
            guests.name AS guest_name,
            guests.email AS guest_email,
            games.name AS game_name,
            games.players AS players,
            bookings.status AS booking_status
        FROM bookings
        JOIN guests ON bookings.guest_id = guests.id
        JOIN games ON bookings.game_id = games.id
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});

// GET all bookings
router.get("/", (req, res) => {
    db.all("SELECT * FROM bookings", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// UPDATE booking status
router.patch("/:id/status", validateStatus, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.get(
        "SELECT * FROM bookings WHERE id = ?",
        [id],
        (err, booking) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            const allowedTransitions = {
                pending: "approved",
                approved: "done"
            };

            if (allowedTransitions[booking.status] !== status) {
                return res.status(400).json({
                    error: `Invalid status transition from ${booking.status} to ${status}`
                });
            }

            db.run(
                "UPDATE bookings SET status = ? WHERE id = ?",
                [status, id],
                function (err) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.json({
                        message: "Booking status updated successfully",
                        bookingId: Number(id),
                        status: status
                    });
                }
            );
        }
    );
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
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            res.json(row);
        }
    );
});

// POST create booking
router.post("/", validateBooking, (req, res) => {
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
