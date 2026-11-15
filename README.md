# BookNook Cafe Backend API

A RESTful backend application for managing guests, games, and bookings at BookNook Cafe. Built using Node.js, Express.js, and SQLite.

## Tech Stack

- Node.js
- Express.js
- SQLite
- sqlite3
- Postman

## Features

- Retrieve all bookings and bookings by ID.
- Create new bookings.
- Retrieve booking details using SQL JOIN.
- Update booking status with transition validation.
- Perform CRUD operations on games.
- Validate booking and game inputs.
- Maintain database relationships using foreign keys.

## Project Structure

```text
BookNook-Cafe/
├── postman/
│   └── BookNook-Cafe.postman_collection.json
├── routes/
│   ├── bookings.js
│   └── games.js
├── screenshots/
│   ├── 01-create-booking.png
│   ├── 02-get-all-bookings.png
│   └── ... (additional API screenshots)
├── .gitignore
├── db.js
├── package.json
├── package-lock.json
├── README.md
├── seed.js
├── server.js
└── validation.js
```

## Installation

### Prerequisites

- Node.js
- npm

### Setup

Clone the repository:

```bash
git clone https://github.com/shanmuk8314/BookNook-Cafe.git
cd BookNook-Cafe
```

Install dependencies:

```bash
npm install
```

Initialize the database and insert sample data:

```bash
node seed.js
```

Start the server:

```bash
npm start
```

For development with automatic server restarts:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:3000
```

## API Endpoints

### Server

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| GET    | `/`      | Welcome message |

### Bookings

| Method | Endpoint               | Description                             |
| ------ | ---------------------- | --------------------------------------- |
| GET    | `/bookings`            | Retrieve all bookings                   |
| GET    | `/bookings/:id`        | Retrieve a booking by ID                |
| GET    | `/bookings/details`    | Retrieve booking details using SQL JOIN |
| POST   | `/bookings`            | Create a new booking                    |
| PATCH  | `/bookings/:id/status` | Update booking status                   |

### Games

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/games`     | Retrieve all games      |
| GET    | `/games/:id` | Retrieve a game by ID   |
| POST   | `/games`     | Create a new game       |
| PUT    | `/games/:id` | Update an existing game |
| DELETE | `/games/:id` | Delete a game           |

## Request Examples

### 1. Create Booking

**POST** `/bookings`

Request body:

```json
{
  "guest_id": 1,
  "game_id": 1
}
```

### 2. Create Game

**POST** `/games`

Request body:

```json
{
  "name": "Chess",
  "players": 2
}
```

### 3. Update Game

**PUT** `/games/1`

Request body:

```json
{
  "name": "Updated Chess",
  "players": 2
}
```

### 4. Update Booking Status

**PATCH** `/bookings/8/status`

Request body:

```json
{
  "status": "approved"
}
```

## Booking Status Transitions

The application supports three booking statuses:

- `pending`
- `approved`
- `done`

Allowed status transitions:

```text
pending → approved → done
```

Invalid status transitions are rejected by the application.

## Database Structure

The application uses an SQLite database with three tables:

### 1. Guests

Stores guest information, including name and email.

### 2. Games

Stores game information, including game name and number of players.

### 3. Bookings

Stores booking information and references guests and games through foreign key relationships.

The database file is generated locally and excluded from Git through `.gitignore`.

## Postman Testing

A Postman collection is included in the project.

To import and test the APIs:

1. Open Postman.
2. Select **Import**.
3. Choose `postman/BookNook-Cafe.postman_collection.json`.
4. Import the collection.
5. Use the configured base URL: `http://localhost:3000`.
6. Execute the requests to test the available endpoints.

## Screenshots

The `screenshots` directory contains screenshots demonstrating API functionality, including:

- Booking creation and retrieval.
- Booking validation and error handling.
- Booking status transitions.
- Game creation, retrieval, updating, and deletion.
- SQL JOIN booking details.

## Testing

Run the configured test command:

```bash
npm test
```

The project includes a Node.js test-runner script. Automated test coverage depends on test files being added.

## Team Contributions

The BookNook Cafe Backend project was developed collaboratively by five team members. Development responsibilities were divided into five stages.

| Team Member | Development Stage                          | Contributions                                                                                                      |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Thrisha     | Stage 1 – Database and Server Setup        | Express server initialization, SQLite database connection, database table creation, and sample data seeding.       |
| Kaveri      | Stage 2 – Booking APIs                     | Development of booking endpoints for creating and retrieving bookings.                                             |
| Shiva       | Stage 3 – Games APIs                       | Implementation of game CRUD operations, including retrieving, creating, updating, and deleting games.              |
| Shanmuk     | Stage 4 – Validation and Status Management | Input validation, booking status validation, and controlled booking status transitions.                            |
| Jaisai      | Stage 5 – Integration and Documentation    | SQL JOIN implementation, API testing, Postman collection preparation, README documentation, and final integration. |

Each team member contributed to their assigned development stage to build the complete BookNook Cafe backend application.

## Author

**Shanmuk Shahith**

GitHub: [shanmuk8314](https://github.com/shanmuk8314)
