const express = require("express");
const login = require("../Model/user.model");

const loginRouter = express.Router();

loginRouter.post("/", async(req, res) => {
    const {email, password} = req.body;
    // console.log(req.body);
    try{
        const user = await login.findOne({email, password});
        if(!user){
            return res.status(401).send({message: "Invalid_Credential"});
        }
        return res.status(200).send({ message: "Login_Successfull" , data: user});
    }
    catch(e){
        return res.status(404).send({message: "Invalid_Credential", Error: e.message});
    }
})

loginRouter.get("/", async(req, res) => {
    try{
        const user = await login.find();
        return res.status(200).send({message: "Data Fetched Successfully" , data: user});
    }
    catch(e){
        return res.status(500).send({message: `Error: ${e.message}`});
    }
})

module.exports = loginRouter