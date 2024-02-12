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

// app.get('/sql', (req, res) => {
    
//     const query1 = "SELECT * FROM events WHERE id=2;";
//     const query2 = "SELECT * FROM events;";

//     connection.query(query1, (err, results) => {
//         if (err) {
//             console.error('Error executing MySQL query:', err);
//             res.status(500);
//             res.send('Internal Server Error');
//         } else {
//             res.status(200);
//             res.json(results);
//         }
    
//     });
        
// });

// app.get('/',(req, res) => {
//     connection.connect();
//     var sql = 'SELECT * FROM investors?; SELECT * FROM member_info?;'
//     connection.query(sql, function(err, results, fields){
//         if (!err) {
//             // res.send(JSON.stringify(results[0]));
//             // res.send(JSON.stringify(results[1]));
//             console.log('hey');
//             //console.log(results);
//             console.log(results[0]);
//             console.log(results[1]);
//         }   else{
//             console.log('Error while performing query.');
//         }
//     });
//     connection.end();
// })
// //app.listen(port, () => console.log('Server Started pn port ${port}'));
// app.listen(3002);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
