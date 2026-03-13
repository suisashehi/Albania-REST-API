// Database connection pool for executing SQL queries
import pool from '$lib/server/database.js';
// API credentials loaded securely from environment variables
import { API_USER, API_PASS } from '$env/static/private';

// Validates Basic Auth credentials from the request header
function checkAuth(request) {
    // Read the Authorization header from the request
    const auth = request.headers.get('Authorization');
    // Reject if header is missing or does not use Basic scheme
    if (!auth?.startsWith('Basic ')) return false;
    // Extract the Base64 encoded string after "Basic "
    const base64 = auth.slice(6);
    // Decode Base64 to plain text "username:password"
    const decoded = atob(base64);
    // Split decoded string into username and password
    const [user, pass] = decoded.split(':');
    // Compare against credentials from environment variables
    return user === API_USER && pass === API_PASS;
}

// GET /api/fluesse/:id - public endpoint, returns a single river by ID
export async function GET({ params }) {
    // Extract the id from the URL parameters
    const { id } = params;
    // Query the database for the river with the given ID
    const [rows] = await pool.query('SELECT * FROM Fluesse WHERE id = ?', [id]);
    // Return 404 if no river was found with that ID
    if (rows.length === 0) {
        return Response.json({ message: 'River not found' }, { status: 404 });
    }
    // Return the single river object with status 200
    return Response.json(rows[0], { status: 200 });
}

// PUT /api/fluesse/:id - protected endpoint, updates an existing river
export async function PUT({ params, request }) {
    // Reject request if credentials are missing or incorrect
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // Extract the id from the URL parameters
    const { id } = params;
    // Parse the JSON body from the request
    const { name, laenge_km, region } = await request.json();
    // Validate that all required fields are present
    if (!name || !laenge_km || !region) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }
    // Update the river in the database
    const [result] = await pool.query(
        'UPDATE Fluesse SET name = ?, laenge_km = ?, region = ? WHERE id = ?',
        [name, laenge_km, region, id]
    );
    // Return 404 if no river with that ID exists
    if (result.affectedRows === 0) {
        return Response.json({ message: 'River not found' }, { status: 404 });
    }
    // Return success message with status 200
    return Response.json({ message: 'River updated' }, { status: 200 });
}

// DELETE /api/fluesse/:id - protected endpoint, deletes a river by ID
export async function DELETE({ params, request }) {
    // Reject request if credentials are missing or incorrect
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // Extract the id from the URL parameters
    const { id } = params;
    // Delete the river with the given ID from the database
    const [result] = await pool.query('DELETE FROM Fluesse WHERE id = ?', [id]);
    // Return 404 if no river with that ID exists
    if (result.affectedRows === 0) {
        return Response.json({ message: 'River not found' }, { status: 404 });
    }
    // Return 204 No Content on successful deletion
    return new Response(null, { status: 204 });
}