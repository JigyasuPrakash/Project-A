const express = require("express");
const router = express.Router();
const { db } = require("../firebase");

router.get("/", (req, res) => {
  const category = db.collection("Category");
  category
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.get("name"),
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

router.post('/', (req, res) => {
  let name = req.body.name;
  let sponser = req.body.sponser;
  let audience_size = req.body.audience_size;
  let duration = req.body.duration;

  let message = "";

  if (name != "" && sponser != null && audience_size != "" && duration != "") {
    res.code = 200;
    message = "success";
  } else {
    res.code = 400;
    message = "incomplete";
  }

  if (res.code == 200) {
    let category = db.collection("Category");
    category.add({
      name: name,
      sponser: sponser,
      audience_size: audience_size,
      duration: duration,
    });
  }
  res.send(message);
});
module.exports = router;
