
// Validate guest details
const validateGuest = (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            error: "Invalid email address"
        });
    }

    next();
};

// Validate game details
const validateGame = (req, res, next) => {
    const { name, players } = req.body;

    if (!name || players === undefined) {
        return res.status(400).json({
            error: "Game name and number of players are required"
        });
    }

    if (!Number.isInteger(Number(players)) || Number(players) <= 0) {
        return res.status(400).json({
            error: "Players must be a positive integer"
        });
    }

    next();
};

// Validate booking details
const validateBooking = (req, res, next) => {
    const { guest_id, game_id } = req.body;

    if (!Number.isInteger(Number(guest_id)) ||
        Number(guest_id) <= 0 ||
        !Number.isInteger(Number(game_id)) ||
        Number(game_id) <= 0) {
        return res.status(400).json({
            error: "Valid guest_id and game_id are required"
        });
    }

    next();
};

// Validate booking status
const validateStatus = (req, res, next) => {
    const { status } = req.body;
    const allowedStatuses = ["pending", "approved", "done"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            error: "Status must be pending, approved, or done"
        });
    }

    next();
};

module.exports = {
    validateGuest,
    validateGame,
    validateBooking,
    validateStatus
};
