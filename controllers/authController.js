
const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken')


module.exports.registerUser = async function(req , res){

    try{
        let {email , username , password} = req.body;

        let newUser = await userModel.findOne({email})
        if(newUser){
            req.flash("error" , "Already have an account , please login")
            return res.redirect('/')
        }

        bcrypt.genSalt(10, function(err , salt){
            bcrypt.hash(password , salt , async function(err , hash){
                if(err){
                    req.flash("error" , "Something went wrong")
                    return res.redirect('/')
                }
                let user = await userModel.create({
                    username,
                    email,
                    password: hash,
                })

                let token = generateToken(user)
                res.cookie("token" , token)
                console.log(`Token generated: ${token}`);
                res.status(201).redirect("/shop")
            })
        })
    } catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.loginUser = async function(req , res){

    try{
        let {email , password} = req.body;

        let existingUser = await userModel.findOne({email})
        if(!existingUser){
            req.flash("error" , "Email or Password is Incorrect")
            return res.redirect('/')
        }

        bcrypt.compare(password , existingUser.password , function(err , result){
            if(err){
                return res.send(err.message)
            }
            if(result){
                let token  = generateToken(existingUser)
                res.cookie('token' , token)
                res.status(200).redirect("/shop")
            }else{
                req.flash("error" , "Email or Password is Incorrect")
                return res.redirect('/')
            }
        })
    }
    catch(error){
        console.error(error)
        res.status(500).send(`Internal Sever Error`)
    }
}

module.exports.logoutUser = async function(req , res){
    res.cookie("token" , "")
    res.redirect('/')
}