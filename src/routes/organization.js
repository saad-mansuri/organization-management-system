const express = require('express')
const {createOrganization, viewOrganizations, loginOrganization} = require('../controllers/organizationManagement')
const {createOrganizationUser,viewOrganizationUsers, deleteOrganizationUser, updateOrganizationUser} = require('../controllers/organizationUser')
const validateToken = require('../middleware/validateToken')
const organizationRoute = express.Router()

organizationRoute.post('/organization/create', createOrganization).get('/organization/view', viewOrganizations)
organizationRoute.post('/organization/login', loginOrganization)
organizationRoute.post('/organization/user/create', validateToken, createOrganizationUser)
organizationRoute.get('/organization/user/view/:id', validateToken, viewOrganizationUsers)
organizationRoute.delete('/organization/user/delete/:organizationID/:userID',validateToken, deleteOrganizationUser)
organizationRoute.put('/organization/user/update/:organizationID/:userID',validateToken, updateOrganizationUser)

module.exports = organizationRoute