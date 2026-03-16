# 🇦🇱 Albania REST-API — Fluesse

A SvelteKit REST-API for rivers (`Fluesse`) in Albania. GET endpoints are public, write endpoints are protected via Basic Auth.

---

## 🚀 Setup

```bash
git clone https://github.com/suisashehi/Albania-REST-API.git
cd Albania-REST-API
npm install
npm run dev
```

---

## 🔐 Auth

Write endpoints require **HTTP Basic Auth**. Credentials are in `credentials.txt`.

---

## 📂 Data Model

| Field       | Type      | Description              |
|-------------|-----------|--------------------------|
| `id`        | `INT`     | Auto-increment primary key |
| `name`      | `VARCHAR` | Name of the river        |
| `laenge_km` | `INT`     | Length in kilometers     |
| `region`    | `VARCHAR` | Region(s) in Albania     |

---

## 🌐 Endpoints

| Method   | Endpoint            | Auth | Description          | Status Codes              |
|----------|---------------------|------|----------------------|---------------------------|
| `GET`    | `/api/fluesse`      | ❌   | Get all rivers       | `200`                     |
| `GET`    | `/api/fluesse/:id`  | ❌   | Get one river        | `200`, `404`              |
| `POST`   | `/api/fluesse`      | ✅   | Create a river       | `201`, `400`, `401`       |
| `PUT`    | `/api/fluesse/:id`  | ✅   | Update a river       | `200`, `400`, `401`, `404`|
| `DELETE` | `/api/fluesse/:id`  | ✅   | Delete a river       | `204`, `401`, `404`       |

---

## 📋 Examples

**GET all**
```http
GET /api/fluesse
```
```json
[
  { "id": 1, "name": "Drin", "laenge_km": 335, "region": "Nordalbanien (Shkodra, Kukës)" }
]
```

**POST** *(requires auth)*
```http
POST /api/fluesse
Authorization: Basic <base64>
Content-Type: application/json

{ "name": "Drin", "laenge_km": 335, "region": "Nordalbanien (Shkodra, Kukës)" }
```

**Error response format**
```json
{ "message": "River not found" }
```

---

## 🗃️ Sample Data (20 rivers)

| # | Name | Length (km) | Region |
|---|------|-------------|--------|
| 1 | Drin | 335 | Nordalbanien |
| 2 | Buna (Bojana) | 41 | Nordalbanien / Montenegro |
| 3 | Vjosa | 272 | Südalbanien |
| 4 | Seman | 281 | Mittel- und Südalbanien |
| 5 | Shkumbin | 181 | Zentralalbanien |
| 6 | Mat | 115 | Nordzentralalbanien |
| 7 | Erzen | 109 | Zentralalbanien |
| 8 | Devoll | 196 | Südost-Albanien |
| 9 | Osum | 161 | Südalbanien |
| 10 | Fan | 94 | Nordalbanien |
| 11 | Kir | 43 | Nordalbanien |
| 12 | Drino | 84 | Südalbanien |
| 13 | Ishëm | 74 | Zentralalbanien |
| 14 | Shala | 37 | Nordalbanien (Albanische Alpen) |
| 15 | Gjadër | 40 | Nordalbanien |
| 16 | Vjosë e Vogël | 40 | Südalbanien |
| 17 | Langarica | 29 | Südalbanien |
| 18 | Përroi i Thatë | 52 | Südost-Albanien |
| 19 | Bistrica | 25 | Südalbanien |
| 20 | Dukagjin | 25 | Nordalbanien |

---

## 📁 Project Structure

```
src/routes/api/fluesse/
├── +server.js        # GET all, POST
└── [id]/
    └── +server.js    # GET one, PUT, DELETE
```

---

## 🔗 Live URL

GET https://albania-rest-api-git-main-suisashehis-projects.vercel.app/api/fluesse
GET https://albania-rest-api-git-main-suisashehis-projects.vercel.app/api/fluesse/1