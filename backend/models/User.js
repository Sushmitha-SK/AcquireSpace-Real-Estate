const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String }, 
    otpExpires: { type: Date }, 
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing' 
    }],
    name: String,
    contactNo: String,
    usertype: String,
    avatar: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    address: {
        street: { type: String, default: '' },
        apartmentSuiteNumber: { type: String, default: '' }, 
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        stateCode: { type: String, default: '' },
        postalCode: { type: String, default: '' },
        country: { type: String, default: '' },
        countryCode: { type: String, default: '' }
    },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
