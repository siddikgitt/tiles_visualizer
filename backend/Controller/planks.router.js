const express = require("express");
const planks = require("../Model/planks.model");
const multer = require("multer");
const planksRouter = express.Router();
const fs = require("fs");
const path = require("path");
// const { log } = require("console");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

planksRouter.post("/", upload.single("testImage"), async (req, res) => {
  try {
    let obj = {
      name: req.body.name,
      color: req.body.color,
      type: req.body.type,
      sku: req.body.sku,
      length: req.body.length,
      width: req.body.width,
      img: {
        data: fs.readFileSync(
          path.join(__dirname, "../uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    };
    // console.log(11);
    const data = await planks.create(obj);

    return res.status(200).send({ message: "Date Added", data: data });
  } catch (e) {
    return res.status(500).send(`Error: ${e.message}`);
  }
});

planksRouter.get("/", async (req, res) => {
  try {
    let data = await planks.find();
    return res.status(200).send({ message: "successful", data: data });
  } catch (e) {
    return res.status(500).send(`Error: ${e.messagge}`);
  }
});

module.exports = planksRouter;
