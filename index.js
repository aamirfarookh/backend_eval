const express = require("express");
const { connection } = require("./dbConnect");
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/posts.route")
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())

app.use("/users",userRouter)
app.use("/posts",postRouter)



app.listen(4500, async()=>{
    try {
       await connection 
       console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    
    console.log("Server is running on port 4500")
})