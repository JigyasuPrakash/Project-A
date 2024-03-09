const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const { db } = require("./firebase");

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Welcome to my Project Alpha ☺️");
});

app.get('/venue', (req, res) => {
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

app.get('/event', (req, res) => {
    const event = db.collection('Event');
    event.get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, name: doc.get("name"), fee: doc.get("fee"), start_date: doc.get("start_date"), end_date: doc.get("end_date"), category_id: doc.get("category_id"), organizer_id: doc.get("organizer_id"), venue_id: doc.get("venue_id"), year: doc.get("year") }));
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

app.post('/organizer',(req,res)=> {
    let poc_name = req.body.poc_name;
    let poc_contact= req.body.poc_contact;
    let poc_email = req.body.poc_email;
    let comittee= req.body.comittee;

    let message="";

    if((poc_name != "") && (comittee != "") && (poc_email != "") && (poc_contact != null)){
        res.code=200;
        message="success";
    }
    
    else{
        res.code=400;
        message="incomplete";
    }

    if(res.code ==200){
        
        let organizer = db.collection("Organizer");
        organizer.add ({poc_name: poc_name , comittee:comittee,poc_contact:poc_contact,poc_email:poc_email});
    }
    res.send(message);
   
}) 

app.post('/category',(req,res)=> {
    let name = req.body.name;
    let sponser= req.body.sponser;
    let audience_size = req.body.audience_size;
    let duration= req.body.duration;

    let message="";

    if((name != "") && (sponser != null ) && (audience_size != "") && (duration != null)){
        res.code=200;
        message="success";
    }
    
    else{
        res.code=400;
        message="incomplete";
    }

    if(res.code ==200){
        
        let category = db.collection("Category");
        category.add ({name: name , sponser: sponser,audience_size:audience_size,duration:duration});
    }
    res.send(message);
   
}) 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
