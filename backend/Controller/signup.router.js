const express = require("express");
const signup = require("../Model/user.model");

const signupRouter = express.Router();

signupRouter.post("/", async(req, res) => {
    // console.log(req.body)
    try{
        const data = await signup.create(req.body);
        return res.send({ message: "Data added", data: data });
    }
    catch(error){
        return res.status(500).send(`Error: ${error.message}`)
    }
})

module.exports = signupRouter;



