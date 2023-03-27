const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token, 'masai');
        if(decoded){
            req.body.userID = decoded.userID;
            next()
        }
        else if(!decoded){
            res.status(400).send({msg:"Authorization failed"})
        }
    }
    else{
        res.status(400).send({msg:"Please login first"})
    }
   
};

module.exports ={auth}