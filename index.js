const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6681899',
    password: 'DcLhsiyM8b',
    database: 'sql6681899'
});
connection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.get('/', (req, res) => {
    const query = "DESC events;";

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500);
            res.send('Internal Server Error');
        } else {
            res.status(200);
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
