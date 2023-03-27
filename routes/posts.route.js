const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { PostsModel } = require("../models/posts.model");

const postRouter = express.Router();

postRouter.post("/add",auth, async(req,res)=>{
    try {
      const newPost = new PostsModel(req.body);
      await newPost.save();
      res.status(200).send({msg:"Post created successfully"})  
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
});

postRouter.get("/",auth, async(req,res)=>{
    const userID = req.body.userID;
    try {
        let posts = await PostsModel.find({userID});
        if(posts.length>0){
            res.status(200).send(posts)
        }
        else{
            res.status(404).send({msg:"No posts yet!! Create one"})
        }
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
});

postRouter.patch("/update/:id",auth,async(req,res)=>{
    let postId = req.params.id;
    try {
       let updatedPost =await  PostsModel.findByIdAndUpdate(postId,req.body);
       res.status(200).send({msg:`Post with ID ${postId} update success`});
    } catch (error) {
       res.status(400).send({msg:error.message}) 
    }
});

postRouter.delete("/delete/:id",auth,async(req,res)=>{
    let postId = req.params.id;
    try {
       let updatedPost =await  PostsModel.findByIdAndDelete(postId);
       res.status(200).send({msg:`Post with ID ${postId} delete success`});
    } catch (error) {
       res.status(400).send({msg:error.message}) 
    }
})

module.exports = {postRouter}


// {
//     "title":"My first post",
//     "body":"This is my first post on this app",
//     "device":"Laptop",
//     "no_of_comments":13
//   }