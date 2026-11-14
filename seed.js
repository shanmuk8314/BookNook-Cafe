const db = require("./db");

db.serialize(() => {
    db.run(`
        INSERT OR IGNORE INTO guests (name, email)
        VALUES
            ('Rahul Sharma', 'rahul@gmail.com'),
            ('Priya Reddy', 'priya@gmail.com'),
            ('Arjun Kumar', 'arjun@gmail.com'),
            ('Sneha Rao', 'sneha@gmail.com'),
            ('Kiran Patel', 'kiran@gmail.com')
    `);

    const games = [
        ["Chess", 2],
        ["Monopoly", 4],
        ["Scrabble", 4],
        ["Ludo", 4],
        ["Uno", 4]
    ];

    const stmt = db.prepare(`
        INSERT INTO games (name, players)
        SELECT ?, ?
        WHERE NOT EXISTS (
            SELECT 1 FROM games WHERE name = ?
        )
    `);

    games.forEach(([name, players]) => {
        stmt.run(name, players, name);
    });

    stmt.finalize((err) => {
        if (err) {
            console.error("Error inserting games:", err.message);
        } else {
            console.log("Sample guests and games inserted successfully");
        }

        db.close();
    });
});
