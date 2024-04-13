const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Organization = require('../models/organizationModel')
const OrganizationUser = require('../models/organizationUserModel')

const createOrganizationUser = asyncHandler(async (req, res) => {
    const reqBody = req.body;
    const {UserName, UserEmail, UserPassword,UserPhone} = reqBody
    if (!UserEmail || !UserPassword) {
        return res.status(400).json({status:400, Message:'All Fields are required'})
    }
    const userEmail = await OrganizationUser.findOne({UserEmail})
    if(userEmail){
        return res.status(400).json({status:400, Message:'User email is already registered!'})
    }
    const hashedPassword = await bcrypt.hash(UserPassword, 10)
    const organizationUser = await OrganizationUser.create({
        ...reqBody,
        UserPassword : hashedPassword
    })
    console.log('organizationUser :', organizationUser);
    res.status(200).json({data : organizationUser, status:200, Message:'Organization is created successfully'})
})

module.exports = {createOrganizationUser}