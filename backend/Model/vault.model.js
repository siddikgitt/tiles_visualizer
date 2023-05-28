const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: { type: String, required: true },
    tileImgID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tilesImage",
    },
    plankImgID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "planksImage",
    },
    rugImgID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rugsImage",
    },
  },
  { timestamps: true }
);

const vaultModel = mongoose.model("vault", vaultSchema);

module.exports = vaultModel;
