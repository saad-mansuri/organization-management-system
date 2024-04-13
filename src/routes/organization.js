const express = require('express')
const {createOrganization, viewOrganizations, loginOrganization} = require('../controllers/organizationManagement')
const {createOrganizationUser} = require('../controllers/organizationUser')
const organizationRoute = express.Router()

organizationRoute.post('/organization/create', createOrganization).get('/organization/view', viewOrganizations)
organizationRoute.post('/organization/login', loginOrganization)
organizationRoute.post('/organization/user/create', createOrganizationUser)

module.exports = organizationRoute