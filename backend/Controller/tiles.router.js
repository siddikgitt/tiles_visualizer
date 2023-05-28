const express = require("express");
const tiles = require("../Model/tiles.model");
const tilesRouter = express.Router();
const multer = require("multer");
const fs = require("fs");
var path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

tilesRouter.post("/", upload.single("testImage"), async (req, res) => {
  try {
    // console.log(req.file.filename);
    let obj = {
      name: req.body.name,
      color: req.body.color,
      type: req.body.type,
      sku: req.body.sku,
      img: {
        data: fs.readFileSync(
          path.join(__dirname , "../uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
      length: req.body.length,
      width: req.body.width
    };

    const data = await tiles.create(obj);
    
    return res.status(200).send({message: "Data added:", data: data});
  
  } catch (e) {
    return res.status(500).send(`Error: ${e.message}`);
  }
});

tilesRouter.get("/", async (req, res) => {
  try {
    let data = await tiles.find();
    // console.log(data);
    return res.status(200).send({ message: "successful", data: data });
  } catch (e) {
    return res.status(500).send(`Error: ${e.message}`);
  }
});

module.exports = tilesRouter;
