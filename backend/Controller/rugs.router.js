const express = require("express");
const rugs = require("../Model/rugs.model");
const multer = require("multer");
const rugsRouter = express.Router();
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage: storage});

rugsRouter.post("/", upload.single("testImage"), async(req, res)=> {
    let {name, color, type, sku, width, length} = req.body;
    // console.log(name);
    try{
        let obj = {
            name: name,
            color: color, 
            type: type, 
            sku: sku, 
            img: {
                data: fs.readFileSync(
                    path.join(__dirname, "../uploads/" + req.file.filename)
                ),
                contentType: "image/png"
            },
            width: width,
            length: length
        }

        const data = await rugs.create(obj);
        // console.log(data);
        return res.status(200).send({message: "Data Added", data: data});
    }
    catch(e){
        return res.status(500).send(`Error: ${e.message}`);
    }
})

rugsRouter.get("/", async (req, res) => {
    try{
        let data = await rugs.find();
        return res.status(200).send({message: "successful", data: data});
    }
    catch(e){
        return res.status(500).send(`Error: ${e.message}`);
    }
})


module.exports = rugsRouter;