const jwt = require('jsonwebtoken');
const User = require('../models/postgres/userModel')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith('Bearer')? authHeader.split(" ")[1] : null;
    if(!token) return res.status(401).json({message:"Unauthorized Access"})
    
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
          attributes: { exclude: ["password_hash"] },
        });

        if (!user) return res.status(404).json({ message: "Not Authorized" });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid Token"})       
    }
}

module.exports=authMiddleware