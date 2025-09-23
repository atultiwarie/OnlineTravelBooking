const jwt = require('jsonwebtoken')
const User= require('../models/postgres/userModel')

const generateToken=(user) => jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:'3d'})

const authController={
    register:async (req,res) => {
        try {
            const {name,email,password}=req.body
            if(!name || !email || !password)return res.status(400).json({message:"All fields are required"})
            const existingUser= await User.findOne({where:{email}})
        if(existingUser) return res.status(400).json({message:"User already exists"})
        const newUser = await User.create({name,email,password_hash:password})
        const token=generateToken(newUser)
        res.status(201).json({id:newUser.id,name:newUser.name,email:newUser.email,token})
            
        } catch (error) {
            res.status(500).json({message:error.message})
        }
        
    },

    login:async (req,res) => {
        try {
            const {email,password}=req.body
            const user = await User.findOne({where:{email}})
            if(!user || !(await user.checkPassword(password))) return res.status(401).json({message:"Invalid credentials"})
            const token=generateToken(user)
            res.status(200).json({id:user.id,name:user.name,email:user.email,token})    
            
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },

    logout:async (req,res) => {
        try {
            res.clearCookie("token")
            res.status(200).json({message:"Logged out successfully"})
            
        } catch (error) {
            res.status(500).json({message:error.message})
        }
        
    }
}

module.exports= authController