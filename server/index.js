const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Get paginated domain data with optional search filter
app.get("/api/domains", async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = "domain", sortOrder = "asc", search = "" } = req.query;
        const offset = (page - 1) * limit;

        // Sanitize sortBy and sortOrder to prevent SQL injection
        const validColumns = ["domain", "niche1", "traffic", "dr", "da", "language", "price", "spam_score"];
        const validOrders = ["asc", "desc"];
        
        if (!validColumns.includes(sortBy)) {
            return res.status(400).send("Invalid sortBy column");
        }
        if (!validOrders.includes(sortOrder)) {
            return res.status(400).send("Invalid sortOrder");
        }

        // Build the search pattern if search query exists
        const searchPattern = search ? `%${search}%` : "%";  // If search is provided, use like search; otherwise, return all results

        // Query to get paginated data with optional search
        const query = `
            SELECT * FROM DomainsAnalytics
            WHERE domain ILIKE $1  -- Case-insensitive search
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT $2 OFFSET $3;
        `;
        const result = await pool.query(query, [searchPattern, parseInt(limit), parseInt(offset)]);

        // Get total count for pagination metadata with search filter applied
        const countQuery = `
            SELECT COUNT(*) FROM DomainsAnalytics
            WHERE domain ILIKE $1;
        `;
        const countResult = await pool.query(countQuery, [searchPattern]);
        const totalRecords = parseInt(countResult.rows[0].count);

        res.json({
            data: result.rows,
            meta: {
                totalRecords,
                totalPages: Math.ceil(totalRecords / limit),
                currentPage: parseInt(page),
                perPage: parseInt(limit),
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

