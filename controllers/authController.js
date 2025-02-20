
const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken')


module.exports.registerUser = async function(req , res){

    try{
        let {email , username , password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'Username, email, and password are required!'
            });
        }

        let newUser = await userModel.findOne({email})
        if(newUser){
            return res.status(400).send(`Already have an account , please login`)
        }

        bcrypt.genSalt(10, function(err , salt){
            bcrypt.hash(password , salt , async function(err , hash){
                if(err){
                    return console.log(`Something went wrong during hashing`);
                }
                let user = await userModel.create({
                    username,
                    email,
                    password: hash,
                })

                let token = generateToken(user)
                res.cookie("token" , token)
                console.log(`Token generated: ${token}`);
                res.status(201).send(user)
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

        if(!email , !password){
            return res.status(400).json({
                error: 'Email, and password are required!'
            });
        }

        let existingUser = await userModel.findOne({email})
        if(!existingUser){
            return res.status(500).send('No account exist , please register')
        }

        bcrypt.compare(password , existingUser.password , function(err , result){
            if(err){
                return res.send(err.message)
            }
            if(result){
                let token  = generateToken(existingUser)
                res.cookie('token' , token)
                res.status(200).send(existingUser)
            }else{
                res.send('Password Wrong')
            }
        })
    }
    catch(error){
        console.error(error)
        res.status(500).send(`Internal Sever Error`)
    }
}