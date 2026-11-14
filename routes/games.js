
const express = require("express");
const router = express.Router();
const db = require("../db");
const { validateGame } = require("../validation");

// GET all games
router.get("/", (req, res) => {
    db.all("SELECT * FROM games", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// GET game by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get(
        "SELECT * FROM games WHERE id = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({ message: "Game not found" });
            }

            res.json(row);
        }
    );
});

// POST create a game
router.post("/", validateGame, (req, res) => {
    const { name, players } = req.body;

    db.run(
        "INSERT INTO games (name, players) VALUES (?, ?)",
        [name, players],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            res.status(201).json({
                message: "Game created successfully",
                gameId: this.lastID
            });
        }
    );
});

// PUT update a game
router.put("/:id", validateGame, (req, res) => {
    const { id } = req.params;
    const { name, players } = req.body;

    db.run(
        "UPDATE games SET name = ?, players = ? WHERE id = ?",
        [name, players, id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Game not found" });
            }

            res.json({ message: "Game updated successfully" });
        }
    );
});

// DELETE a game
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM games WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Game not found" });
            }

            res.json({ message: "Game deleted successfully" });
        }
    );
});

module.exports = router;
