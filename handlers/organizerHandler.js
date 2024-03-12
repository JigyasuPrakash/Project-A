const express = require("express");
const router = express.Router();
const { db } = require("../firebase");

router.get("/", (req, res) => {
  const organizer = db.collection("Organizer");
  organizer
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        comittee: doc.get("comittee"),
        poc_name: doc.get("poc_name"),
        poc_email: doc.get("poc_email"),
        poc_contact: doc.get("poc_contact"),
      }));
      console.log(data);
      res.status(200);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.send("Something went wrong, please try again");
    });
});

router.post("/", (req, res) => {
  let poc_name = req.body.poc_name;
  let poc_contact = req.body.poc_contact;
  let poc_email = req.body.poc_email;
  let comittee = req.body.comittee;

  let message = "";

  if ( poc_name != "" && comittee != "" && poc_email != "" && poc_contact != "") {
    res.code = 200;
    message = "success";
  } 
  else {
    res.code = 400;
    message = "incomplete";
  }

  if (res.code == 200) {
    let organizer = db.collection("Organizer");
    organizer.add({poc_name: poc_name,comittee: comittee,poc_contact: poc_contact,poc_email: poc_email,
    });
  }
  res.send(message);
});
module.exports = router;
