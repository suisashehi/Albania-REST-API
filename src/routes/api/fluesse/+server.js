// Database connection pool for executing SQL queries
import pool from '$lib/server/database.js';
// API credentials from environment variables (never hardcoded)
import { API_USER, API_PASS } from '$env/static/private';

// Validates the Basic Auth header from the incoming request
function checkAuth(request) {
    // Get the Authorization header from the request
    const auth = request.headers.get('Authorization');
    // Reject if header is missing or not Basic Auth
    if (!auth?.startsWith('Basic ')) return false;
    // Extract the Base64 encoded part after "Basic "
    const base64 = auth.slice(6);
    // Decode Base64 to get "username:password"
    const decoded = atob(base64);
    // Split into username and password
    const [user, pass] = decoded.split(':');
    // Compare against stored credentials
    return user === API_USER && pass === API_PASS;
}

// GET /api/fluesse - public endpoint, returns all rivers
export async function GET() {
    // Fetch all rows from the Fluesse table
    const [rows] = await pool.query('SELECT * FROM Fluesse');
    // Return the results as JSON with status 200
    return Response.json(rows, { status: 200 });
}

// POST /api/fluesse - protected endpoint, creates a new river
export async function POST({ request }) {
    // Reject request if credentials are missing or incorrect
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // Parse the JSON body from the request
    const { name, laenge_km, region } = await request.json();
    // Validate that all required fields are provided
    if (!name || !laenge_km || !region) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }
    // Insert the new river into the database
    const [result] = await pool.query(
        'INSERT INTO Fluesse (name, laenge_km, region) VALUES (?, ?, ?)',
        [name, laenge_km, region]
    );
    // Return the new river's ID with status 201 Created
    return Response.json({ message: 'River created', id: result.insertId }, { status: 201 });
}