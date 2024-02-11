const express = require('express')
const app = express()
const port = 3000
const { db } = require("./firebase");

app.get('/', (req, res) => {
    const venue = db.collection('Venue');
    venue.get()
    .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, name: doc.get("name") }));
        console.log(data);
        res.status(200);
        res.send(data);
    })
    .catch((error) => {
        console.error(error);
        res.status(500);
        res.send("Something went wrong, please try again");
    })
});

app.get('/event', (req, res) => {
    const venue = db.collection('Venue');
    venue.where("name", "=", "Main Audi")
    .get()
    .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, name: doc.get("name") }));
        console.log(data);
        res.status(200);
        res.send(data);
    })
    .catch((error) => {
        console.error(error);
        res.status(500);
        res.send("Something went wrong, please try again");
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
