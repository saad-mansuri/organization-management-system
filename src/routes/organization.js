const express = require('express')
const {createOrganization, viewOrganizations, loginOrganization, viewOrganizationsUsers} = require('../controllers/organizationManagement')
const {createOrganizationUser} = require('../controllers/organizationUser')
const validateToken = require('../middleware/validateToken')
const organizationRoute = express.Router()

organizationRoute.post('/organization/create', createOrganization).get('/organization/view', viewOrganizations)
organizationRoute.post('/organization/login', loginOrganization)
organizationRoute.post('/organization/user/create', validateToken , createOrganizationUser)
organizationRoute.get('/organization/user/view/:id', viewOrganizationsUsers)

module.exports = organizationRoute