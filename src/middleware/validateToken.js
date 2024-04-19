const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async(req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    // console.log('authHeader :', authHeader);
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]
        console.log('token :', token);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRETKEY, (err,decoded) => {
            if(err){
                return res.status(401).json({status:401, Message:'User is Not Authorized'})
            }
            console.log('decoded :', decoded);
            req.organization = decoded.organization
            next()
        })
        if(!token){
            return res.status(401).json({status:401, Message:'User is not authorized or Token is missing'})
        }
    }
})

module.exports = validateToken