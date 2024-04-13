const mongoose = require('mongoose')

const organizationSchema = mongoose.Schema({
    OrganizationName: {
        type: String,
        require: true
    },
    OrganizationEmail: {
        type: String,
        require: true,
        unique: true
    },
    OrganizationPassword: {
        type: String,
        require: true,
    },
    OrganizationPhone: {
        type: Number,
        require: true
    },
    OrganizationWebsite: {
        type: String,
        require: true
    },
    OrganizationStatus: {
        type: String,
        require: true
    }
}, {timestamps : true})

module.exports = mongoose.model('Organization', organizationSchema)