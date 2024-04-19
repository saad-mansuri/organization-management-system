const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const OrganizationUser = require('../models/organizationUserModel')

const createOrganizationUser = asyncHandler(async (req, res) => {
    const reqBody = req.body;
    let {UserName, UserEmail, UserPassword,UserPhone} = reqBody
    if (!UserEmail || !UserPassword) {
        return res.status(400).json({status:400, Message:'All Fields are required'})
    }
    const emailExisted = await OrganizationUser.findOne({UserEmail})
    if(emailExisted){
        return res.status(400).json({status:400, Message:'User email is already registered!'})
    }
    const hashedPassword = await bcrypt.hash(UserPassword, 10)
    try{
        const organizationUser = await OrganizationUser.create({
            UserName: req.body.UserName,
            UserEmail: req.body.UserEmail,
            UserPassword: hashedPassword,
            UserPhone: req.body.UserPhone,
            OrganizationID:req.organization.OrganizationID
        })
        res.status(200).json({data : organizationUser, status:200, Message:'Organization User is created successfully'})
    }catch(e){
        console.error(e);
        res.status(500).json({ status: 500, message: 'Internal Server Error test' });
    }
})

module.exports = {createOrganizationUser}