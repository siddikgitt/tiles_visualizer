const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 8080;

const mongoose = require("mongoose");
const multer = require("multer")
const connect = require("./Connect/connect");

mongoose.set("strictQuery", true);
const server = express();
server.use(express.json());

// import Routers
const signupRouter = require("./Controller/signup.router");
const loginRouter = require("./Controller/login.router");
const tilesRouter = require("./Controller/tiles.router");
const vaultRouter = require("./Controller/vault.router");
const rugsRouter = require("./Controller/rugs.router");
const plankRouter = require("./Controller/planks.router");


// signup
app.use("/signup", signupRouter);

// login
app.use("/login", loginRouter);

// tiles
app.use("/tiles", tilesRouter);

// rug
app.use("/rug", rugsRouter);

// planks
app.use("/plank", plankRouter);

//vault
app.use("/vault", vaultRouter);

// checking
app.get("/", (req, res) => res.send("Hello"));

app.listen(PORT, async () => {
  await connect();
  console.log(`http://localhost:${PORT}/`);
});
