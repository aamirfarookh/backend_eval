const express = require("express");
const { UserModel } = require("../models/user.model");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken")
const userRouter = express.Router();


userRouter.post("/register", async(req,res)=>{
    const {name,email,password,gender,age,city,is_married} = req.body
    try {
        const user = await UserModel.findOne({email});
        if(!user){
                bcrypt.hash(password, 5, async(err, hash)=> {
                    if(!err){
                        const newUser = new UserModel({name,email,password:hash,gender,age,city,is_married});
                        await newUser.save();
                        res.status(201).send({msg:"New user registered successfully"})
                    }
                });
        }
        else{
            res.status(400).send({msg:"User already exists, please login"})
        }
    } catch (error) {
        res.status(400).send({msg:error.message});
    }
});

userRouter.post("/login", async(req,res)=>{
   const {email,password} = req.body;
   try {
    const user = await UserModel.findOne({email});
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                res.status(200).send({msg:"Login Success", token:jwt.sign({userID:user._id},"masai",{ expiresIn: '1h' })})
            } 
            else{
                res.status(400).send({msg:"Wrong Credentials"})
            }
        });
    }
    else{
        res.status(404).send({msg:"No user Found"})
    }
   } catch (error) {
    res.status(400).send({msg:error.message})
   }
})


module.exports = {userRouter}