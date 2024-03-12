const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const { db } = require("./firebase");
const venueHandler= require('./handlers/venueHandler');
const eventHandler = require('./handlers/eventHandler');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to my Project Alpha ☺️");
});


app.get('/organizer', (req, res) => {
    const organizer = db.collection('Organizer');
    organizer.get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, comittee: doc.get("comittee"), poc_name: doc.get("poc_name"), poc_email: doc.get("poc_email"), poc_contact: doc.get("poc_contact") }));
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

app.get('/category', (req, res) => {
    const category = db.collection('Category');
    category.get()
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
app.use('/venue', venueHandler);
app.use('/event', eventHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
