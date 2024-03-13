const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const { db } = require("./firebase");
const eventHandler = require('./handlers/eventHandler');
const organizerHandler = require('./handlers/organizerHandler');
const venueHandler= require('./handlers/venueHandler');
const categoryHandler =require('./handlers/categoryHandler');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to my Project Alpha ☺️");
});

app.use('/venue', venueHandler );

app.use('/organizer', organizerHandler);

app.use('/category', categoryHandler);

app.use('/event', eventHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
