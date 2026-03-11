# Albania REST API

This project is a **REST API built with SvelteKit** that provides information about locations in Albania (e.g. lakes, cities, mountains).

The API returns data in **JSON format** and follows standard **REST principles** with correct HTTP methods and status codes.

## Features

- Public **GET endpoints**
- Protected **POST, PUT and DELETE endpoints**
- **Basic Authentication** for write operations
- Proper **HTTP status codes**
- Tested using **Postman**

## Endpoints

### Public
- `GET /api/lakes` – Get all lakes  
- `GET /api/lakes/:id` – Get a specific lake

### Protected (Basic Auth required)
- `POST /api/lakes` – Create a new lake
- `PUT /api/lakes/:id` – Update a lake
- `DELETE /api/lakes/:id` – Delete a lake

## Data Model

Each lake contains:

- `id`
- `name`
- `location`
- `type`
- `area_km2`
- `max_depth_m`

Example:

```json
{
  "id": 1,
  "name": "Lake Shkodra",
  "location": "Shkoder",
  "type": "natural",
  "area_km2": 370,
  "max_depth_m": 44
}