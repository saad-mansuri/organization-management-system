const mongoose = require('mongoose')

const organizationUserSchema = mongoose.Schema({
    OrganizationID:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'Organizations'
    },
    UserName: {
        type: String,
        require: true
    },
    UserEmail: {
        type: String,
        require: true,
        unique: true
    },
    UserPassword: {
        type: String,
        require: true,
    },
    UserPhone: {
        type: Number,
        require: true
    }
}, {timestamps : true})

module.exports = mongoose.model('OrganizationUser', organizationUserSchema)