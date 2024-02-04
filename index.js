const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6681899',
    password: 'DcLhsiyM8b',
    database: 'sql6681899'
})

connection.connect();
const str = "SELECT * FROM events;"
connection.query(str, (err, rows, fields) => {
    if (err) {
        console.error(err.message)
    }
    console.log(rows)
})
connection.end()

// app.get('/', (req, res) => {
//     connection.connect()
//     const str = "DESC events;"
//     connection.query(str, (err, rows, fields) => {
//         if (err) {
//             console.error(err.message)
//         }
//         res.send(rows)
//     })
//     connection.end()
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
