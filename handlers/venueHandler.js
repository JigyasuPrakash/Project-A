app.post('/venue',(req,res)=> {
    let poc_name = req.body.poc_name;
    let approval_required= req.body.approval_required;
    let capacity = req.body.capacity;
    let location= req.body.location;

    let message="";

    if((poc_name != "") && (approval_required != null) && (capacity != null) && (location !="")){
        res.code=200;
        message="success";
    }
    
    
    else{
        res.code=400;
        message="incomplete";
    }

    if(res.code ==200){
        
        let venue = db.collection("Venue");
        venue.add ({poc_name: poc_name , approval_required: approval_required,capacity:capacity,location:location});
    }
    res.send(message);
   
})
