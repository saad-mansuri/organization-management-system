const mongoose = require('mongoose');
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

const viewOrganizationUsers = asyncHandler(async(req,res) => {
    const organizationUserID = req.params.id
    const organizations = await OrganizationUser.find({OrganizationID : organizationUserID})
    res.status(200).json({ data: organizations, status: 200, message: 'Organizations Users retrieved successfully' });
})

const deleteOrganizationUser = asyncHandler(async(req,res) => {
    const organizationID =new mongoose.Types.ObjectId(req.params.organizationID);
    const userID =new mongoose.Types.ObjectId(req.params.userID);
    try {
        const getSelectedDeleteUser = await OrganizationUser.findOne({ _id: userID, OrganizationID: organizationID });
        if (!getSelectedDeleteUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        const deletedUser = await OrganizationUser.deleteOne({_id:userID})
        res.status(200).json({ data: deletedUser, status: 200, message: 'Organization User has been deleted.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }   
})

const updateOrganizationUser = asyncHandler(async(req,res) => {
    const organizationID =new mongoose.Types.ObjectId(req.params.organizationID);
    const userID =new mongoose.Types.ObjectId(req.params.userID);
    try {
        const getSelectedUpdateUser = await OrganizationUser.findOne({ _id: userID, OrganizationID: organizationID });
        if (!getSelectedUpdateUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        const updatedUser = await OrganizationUser.findByIdAndUpdate(userID,req.body, {new:true})
        res.status(200).json({ data: updatedUser, status: 200, message: 'Organization User has been updated.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }   
})

module.exports = {createOrganizationUser, viewOrganizationUsers,deleteOrganizationUser,updateOrganizationUser }