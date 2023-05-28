const express = require("express");
const vault = require("../Model/vault.model");
const vaultRouter = express.Router();

const multer = require("multer");
const fs = require("fs");
var path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// let multipleUpload = upload.fields([
//   { name: "thumbnail" },
//   { name: "tiles" },
//   { name: "planks" },
//   { name: "rugs" },
// ]);

vaultRouter.post("/", async (req, res) => {
  const { userID, name, tileImgID, rugImgID } = req.body;
  try {
    let data = await vault.create(req.body);
    return res
      .status(200)
      .send({ message: "Data Added Successfully", data: data });
  } catch (e) {
    return res.send({ message: `Error: ${e.message}` });
  }
});

// vaultRouter.post("/", upload.single("thumbnail"), async (req, res) => {
//   //   const { userID, thumbnail, name, tile_img, plank_img, rug_img } = req.body;
//   try {
//     // if (req.files) {
//       let obj = {
//         userID: req.body.userID,
//         thumbnail: {
//           data: fs.readFileSync(
//             path.join(__dirname, "../uploads/" + req.file.filename)
//           ),
//           contentType: "image/png",
//         },
//         name: req.body.name,
//         tile_img: `${req.body.tile_img}`,
//         // plank_img: `${req.body.plank_img}`,
//         // rug_img: `${req.body.rug_img}`,
//       };
//       // console.log(obj);
//       let data = await vault.create(obj);
//       return res.status(200).send({message: "Data Added Successfully", data: data});

//     // }
//     // return res.send({ message: "No files detected" });
//   } catch (e) {
//     return res.send({ message: `Error: ${e.message}` });
//   }
// });

vaultRouter.post("/get", async (req, res) => {
  
  let data = await vault.find({ userID: req.body.userID}).populate(["tileImgID", "plankImgID", "rugImgID"]);
  return res.send({ message: "Successful", data: data });
});

vaultRouter.get("/:id", async (req, res) => {
  let id = req.params.id;  
  let data = await vault.findOne({ _id: id}).populate(["tileImgID", "plankImgID", "rugImgID"]);
  return res.send({ message: "Successful", data: data });
});

vaultRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try{
    let temp = await vault.findByIdAndDelete({_id: id});
    return res.status(200).send({message: "Vault deleted successfully"})
  }
  catch(e){
    console.log(e.message);
    return res.status(500).send(e.message);
  }
})

vaultRouter.patch("/:id", async(req, res) => {
  let id = req.params.id;
  // console.log(req.body.tileImgID)
  try{
    if(req.body.tileImgID){
      // await vault.findById(id, {tileImgID})
      let data = await vault.updateOne({_id: id}, {$unset: {plankImgID: ""}})
    }
    else if(req.body.plankImgID){
      // await vault.update({_id: id}, {$unset: {plankImgID:1}})
      let data = await vault.updateOne({_id: id}, {$unset: {tileImgID: ""}})
    }

    let updatedData = await vault.findByIdAndUpdate(id, req.body);
    return res.status(200).send({message: "Data Updated Successfully", data: updatedData});
  }
  catch(e){
    return res.status(500).send(e.message);
  }
})

module.exports = vaultRouter;
