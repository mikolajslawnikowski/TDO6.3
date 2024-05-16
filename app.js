const express = require('express');
const app = express();

const { Pool } = require('pg');

const pool = new Pool({
    user: 'dbuser',
    host: 'localhost',
    database: 'sample-db',
    password: 'secretpassword',
    port: 5432,
});

app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tabela');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/data/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM tabela WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/average', async (req, res) => {
    try {
        const result = await pool.query('SELECT AVG(nazwa_pola) AS average FROM tabela');
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Application listening at 0.0.0.0:3000');
});
