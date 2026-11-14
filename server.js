const express = require("express");

const app = express();
const PORT = 3000;

require("./db");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to BookNook Cafe API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});