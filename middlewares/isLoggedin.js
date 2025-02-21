const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

module.exports = async function(req , res , next){
    if(!req.cookies.token || req.cookies.token === ""){
        req.flash("error" , "you need to login first");
        return res.redirect("/")
    }

    try{
        let decoded = jwt.verify(req.cookies.token , process.env.SECRET_KEY);
        let user = await userModel.findOne({email: decoded.email}).select("-password")
        if (!user) {
            req.flash("error", "User not found. Please log in again.");
            return res.redirect("/");
        }
        req.user = user
        next();
    }
    catch(error){
        console.error("Error verifying token:", error.message);
        req.flash("error", "Invalid or expired token. Please log in again.");
        return res.redirect("/");
    }
}