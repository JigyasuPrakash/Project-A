const express = require('express');
const router = express.Router();
const { db } = require("../firebase");

router.get('/', (req, res) => {
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

router.post('/',(req,res)=> {
    let name = req.body.name;
    let approval_required= req.body.approval_required;
    let capacity = req.body.capacity;
    let location= req.body.location;

    let message="";

    if((name != "") && (approval_required != "") && (capacity !="") && (location != "")){
        res.code=200;
        message="success";
    }
    
    
    else{
        res.code=400;
        message="incomplete";
    }

    if(res.code ==200){
        
        let venue = db.collection("Venue");
        venue.add ({ name: name , approval_required: approval_required,capacity:capacity,location:location});
    }
    res.send(message);
   
})


module.exports = router;