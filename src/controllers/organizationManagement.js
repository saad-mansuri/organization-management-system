const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Organization = require('../models/organizationModel')

const createOrganization = asyncHandler(async (req, res) => {
    const reqBody = req.body;
    const {OrganizationName, OrganizationEmail, OrganizationPhone,OrganizationPassword, OrganizationWebsite, OrganizationStatus} = reqBody
    if (!OrganizationName || !OrganizationEmail || !OrganizationPhone || !OrganizationPassword || !OrganizationWebsite || !OrganizationStatus) { 
        return res.status(400).json({status:400, Message:'All Fields are required'})
    }
    const organizationEmail = await Organization.findOne({OrganizationEmail})
    if(organizationEmail){
        return res.status(400).json({status:400, Message:'Organization email already registered!'})
    }
    const hashedPassword = await bcrypt.hash(OrganizationPassword, 10)
    const organization = await Organization.create({
        ...reqBody,
        OrganizationPassword : hashedPassword
    })
    res.status(200).json({data : organization, status:200, Message:'Organization is created successfully'})
})

const viewOrganizations = asyncHandler(async(req,res) => {
    const organizations = await Organization.find({})
    res.status(200).json({ data: organizations, status: 200, message: 'Organizations retrieved successfully' });
})

const loginOrganization = asyncHandler(async(req,res) => {
    const reqBody = req.body
    const {OrganizationEmail, OrganizationPassword} = reqBody
    if(!OrganizationEmail || !OrganizationPassword){
        return res.status(400).json({ status: 400, message: 'All fields are mandotery' });
    }
    const organization = await Organization.findOne({OrganizationEmail})
    if(organization && (await bcrypt.compare(OrganizationPassword, organization.OrganizationPassword))){
        const accessWebToken = jwt.sign({
            organization:{
                OrganizationName: organization.OrganizationName,
                OrganizationEmail: organization.OrganizationEmail,
                OrganizationID:organization._id
            }
        }, process.env.ACCESS_TOKEN_SECRETKEY, {expiresIn:'1h'})
        res.status(200).json({ token: accessWebToken, status: 200, message: 'Organizations retrieved successfully' });
    }
})

module.exports = {createOrganization, viewOrganizations, loginOrganization}