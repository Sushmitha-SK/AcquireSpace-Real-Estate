const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
        area: {
            type: Number,
            required: true,
        },
        available: {
            type: Boolean,
            required: true,
            default: true, 
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        category: {
            type: String,
            required: true,
            enum: ['residential', 'commercial', 'land', 'industrial', 'retail'],
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Listing', listingSchema);