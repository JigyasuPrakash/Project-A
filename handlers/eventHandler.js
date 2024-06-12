const express = require('express');
const router = express.Router();
const { db, Timestamp } = require("../firebase");

router.get('/', (req, res) => {
    const event = db.collection('Event');
    event.get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.get("name"),
                fee: doc.get("fee"),
                start_date: new Date(doc.get("start_date").toDate()),
                end_date: new Date(doc.get("end_date").toDate()),
                category_id: doc.get("category_id"),
                organizer_id: doc.get("organizer_id"),
                venue_id: doc.get("venue_id"),
                year: doc.get("year").join(", "),
                day: new Date(doc.get("start_date").toDate()).toLocaleDateString("en-US", {weekday: 'short'}),
            }));
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

router.post('/', (req, res) => {
    let name = req.body.name;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let fee = req.body.fee;
    let year = req.body.year;
    let message = "";

    if (name !== "" && start_date && end_date && fee) {
        if (isValidDate(start_date) && isValidDate(end_date)) {
            start_date = Timestamp.fromDate(new Date(start_date));
            end_date = Timestamp.fromDate(new Date(end_date));
            res.code = 200;
            message = "success";
        } else {
            res.code = 400;
            message = "Invalid date format";
        }
    }
    else {
        res.code = 400;
        message = "incomplete";
    }
    function isValidDate(dateString) {
        return !isNaN(Date.parse(dateString));
    }

    if (res.code == 200) {
        let event = db.collection("Event");
        event.add({ name: name, start_date: start_date, end_date: end_date, fee: fee, year: year });
    }
    res.send(message);
})

module.exports = router;