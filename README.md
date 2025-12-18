# Weather Forecast App

A full-stack application for searching and tracking weather conditions across multiple cities. Built with a focus on type safety, responsive design, and efficient data fetching.

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, TanStack Query, Zod, CSS Modules.

**Backend:** Node.js, Express 5, Prisma ORM.

**Database:** SQLite.

**APIs:** Open-Meteo for weather data and Geoapify for geocoding.

## Key Features

- **Location Management:** Search for cities globally and save them to a local SQLite database for quick access.
- **Weather Insights:** Provides real-time weather data and hourly forecasts.
- **Efficient Data Fetching:** Utilizes TanStack Query for caching and synchronization, minimizing redundant API requests.
- **End-to-End Type Safety:** Full TypeScript implementation from the database schema to the UI components.
- **Responsive UI:** A clean, dark-themed interface optimized for both mobile and desktop.

## Project Structure

```
├── client/           # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # Scoped UI components
│   │   ├── hooks/       # React Query and logic hooks
│   │   └── services/    # API client definitions
├── server/           # Express backend
│   ├── prisma/       # Schema and migrations
│   └── src/
│       ├── controllers/ # Request handlers
│       └── routes/      # API endpoint definitions
```

## Setup & Installation

### 1. Clone & Install

```bash
git clone <repository-url>
cd zadanieTide

# Install dependencies for both parts
cd server && npm install
cd ../client && npm install
```

### 2. Database Setup

Inside the server directory, initialize your SQLite database and generate the Prisma client:

```bash
npx prisma migrate dev --name init
```

### 3. Environment Variables

You will need a Geoapify API key for the city search functionality.

**Server** (`server/.env`):

```env
PORT=4000
DATABASE_URL="file:./prisma/dev.db"
CLIENT_ORIGIN="http://localhost:5173"
```

**Client** (`client/.env`):

```env
VITE_API_BASE_URL=http://localhost:4000
VITE_SEARCH_API_KEY=your_geoapify_key
VITE_SEARCH_BASE_ORIGIN=https://api.geoapify.com/v1/geocode/search
VITE_WEATHER_API_BASE_URL=https://api.open-meteo.com/v1/forecast
```

## Running the Application

### Development Mode

You will need to run the server and the client in separate terminals:

**Start Server:**

```bash
cd server && npm run dev
```

**Start Client:**

```bash
cd client && npm run dev
```

The app will be available at http://localhost:5173.

## Testing

Run backend integration tests (CRUD operations and validation):

```bash
cd server && npm test
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cities` | Fetch all saved cities. |
| POST | `/cities` | Save a new city (requires name, lat, long). |
| GET | `/cities/:id` | Get details for a specific city. |
| PATCH | `/cities/:id` | Update city details. |
| DELETE | `/cities/:id` | Remove a city from the database. |
