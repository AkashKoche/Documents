const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodejsdb',
  password: 'postgres',
  port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Registration route
app.post('/register', async (req, res) => {
    const { first_name, last_name, date_of_birth, username, password } = req.body;
    
    try {
      const result = await pool.query(
        'INSERT INTO users (first_name, last_name, date_of_birth, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [first_name, last_name, date_of_birth, username, password]
      );
      res.status(201).send(`
        <h1>Registration successful</h1>
        <p>You have successfully registered. Click <a href="/index.html">here</a> to login.</p>
      `);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
