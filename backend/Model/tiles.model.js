const mongoose = require("mongoose");

const tilesSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String },
  name: { type: String, required: true },
  color: { type: String, required: true },
  type: { type: String },
  sku: { type: String, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
});

const tilesModel = mongoose.model("tilesImage", tilesSchema);
module.exports = tilesModel;
