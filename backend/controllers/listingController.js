const Listing = require('../models/Listing');
const User = require("../models/User");

const listingController = {

    //Create Listing
    createListing: async (req, res) => {
        const { name, description, bedrooms, bathrooms, discountPrice, regularPrice, address, userRef, furnished, parking, type, offer, imageUrls, area, category } = req.body;
        if (
            name == null || description == null || bedrooms == null || bathrooms == null ||
            discountPrice == null || regularPrice == null || address == null || userRef == null ||
            furnished == null || parking == null || type == null || offer == null || imageUrls == null || area == null || category == null
        ) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        try {
            const listing = await Listing.create(req.body);
            return res.status(201).json(listing);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ msg: 'Validation Error', error: error.message });
            }
            console.error('Error creating listing:', error);
            res.status(500).json({ msg: 'Failed to create listing', error: error.message });
        }
    },


    //Delete Listing
    deleteListing: async (req, res) => {
        try {
            const listing = await Listing.findById(req.params.id);

            if (!listing) {
                return res.status(404).json({ msg: 'Listing not found!' });
            }

            if (req.user.id !== listing.userRef.toString()) {
                return res.status(401).json({ msg: 'You can only delete your own listings!' });
            }

            await Listing.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: 'Listing has been deleted!' });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to delete listing' });
        }
    },

    //Update Listing
    updateListing: async (req, res) => {
        try {
            const listing = await Listing.findById(req.params.id);
            if (!listing) {
                return res.status(404).json({ msg: 'Listing not found!' });
            }
            if (req.user.id !== listing.userRef) {
                return res.status(401).json({ msg: 'You can only update your own listings!' });
            }

            const updatedListing = await Listing.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.status(200).json(updatedListing);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to update listing' });
        }
    },


    //Get Listing
    getListing: async (req, res) => {
        try {
            const listing = await Listing.findById(req.params.id);
            if (!listing) {
                return res.status(404).json({ msg: 'Listing not found!' });
            }
            res.status(200).json(listing);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to retrieve listing' });
        }
    },


    //Get all listings
    getAllListings: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 1000;
            const startIndex = parseInt(req.query.startIndex) || 0;

            const listings = await Listing.find()
                .limit(limit)
                .skip(startIndex);

            res.status(200).json(listings);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to retrieve listings' });
        }
    },


    getListings: async (req, res) => {
        try {
            let offer = req.query.offer;

            if (offer === undefined || offer === 'false') {
                offer = { $in: [false, true] };
            }

            let furnished = req.query.furnished;

            if (furnished === undefined || furnished === 'false') {
                furnished = { $in: [false, true] };
            }

            let parking = req.query.parking;

            if (parking === undefined || parking === 'false') {
                parking = { $in: [false, true] };
            }

            let type = req.query.type;

            if (type === undefined || type === 'all') {
                type = { $in: ['sale', 'rent'] };
            }

            const searchTerm = req.query.searchTerm || '';
            const sort = req.query.sort || 'createdAt';
            const order = req.query.order || 'desc';

            const minArea = parseInt(req.query.minArea) || 0; 
            const maxArea = parseInt(req.query.maxArea) || Number.MAX_SAFE_INTEGER; 

            const listings = await Listing.find({
                name: { $regex: searchTerm, $options: 'i' },
                offer,
                furnished,
                parking,
                type,
                area: { $gte: minArea, $lte: maxArea }, 
            })
                .sort({ [sort]: order });

            return res.status(200).json(listings);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to retrieve listings' });
        }
    },


    getListingDetailsById: async (req, res) => {
        try {
            const listing = await Listing.findById(req.params.id);
            if (!listing) {
                return res.status(404).json({ msg: 'Listing not found!' });
            }

            const user = await User.findById(req.user.id); 
            if (!user) {
                return res.status(404).json({ msg: 'User not found!' });
            }

            res.status(200).json({
                listing,
                favorites: user.favorites 
            });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to retrieve listing details', error: error.message });
        }
    },


    getAllListingsPublic: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 1000;
            const startIndex = parseInt(req.query.startIndex) || 0; 

            const listings = await Listing.find()
                .limit(limit)
                .skip(startIndex);

            res.status(200).json(listings);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to retrieve listings' });
        }
    },

    getTopRecommendedListings: async (req, res) => {
        try {
            const topListings = await Listing.find()
                .sort({ createdAt: -1 }) 
                .limit(3); 

            res.status(200).json(topListings);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to retrieve recommended listings' });
        }
    },

    getMostRecentListings: async (req, res) => {
        try {
            const listings = await Listing.find()
                .sort({ createdAt: -1 })  
                .limit(3);               
            res.status(200).json(listings);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to retrieve recent listings' });
        }
    },

    checkAvailability: async (req, res) => {
        try {
            const listingId = req.params.id;
            const listing = await Listing.findById(listingId);

            if (!listing) {
                return res.status(404).json({ msg: 'Listing not found!' });
            }

            const isAvailable = listing.available;

            res.status(200).json({
                available: isAvailable,
                msg: isAvailable ? 'Listing is available!' : 'Listing is not available.',
            });
        } catch (error) {
            console.error('Error checking availability:', error);
            res.status(500).json({ msg: 'Failed to check availability', error: error.message });
        }
    },

    //get listing by growth
    getListingsGrowth: async (req, res) => {
        try {
            const listingsGrowth = await Listing.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } }, 
            ]);
            res.status(200).json(listingsGrowth);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to retrieve listings growth' });
        }
    },

    // Get Recently Added Listings by Logged-In User
    getRecentListingsByUser: async (req, res) => {
        try {
            const userId = req.user.id; 
            const listings = await Listing.find({ userRef: userId })
                .sort({ createdAt: -1 }) 
                .limit(3); 

            res.status(200).json(listings);
        } catch (error) {
            console.error('Error fetching recent listings by user:', error);
            res.status(500).json({ msg: 'Failed to retrieve recent listings by user', error: error.message });
        }
    },

    //getListingsByCategory
    getListingsByCategory: async (req, res) => {
        try {
            const categoryCounts = await Listing.aggregate([
                {
                    $group: {
                        _id: '$category',
                        count: { $sum: 1 },
                    },
                },
                { $sort: { count: -1 } }, 
            ]);
            res.status(200).json(categoryCounts);
        } catch (error) {
            console.error('Error fetching category data:', error);
            res.status(500).json({ msg: 'Failed to fetch category data', error: error.message });
        }
    },

    // getTopContributors
    getTopContributors: async (req, res) => {
        try {
            const topContributors = await Listing.aggregate([
                {
                    $group: {
                        _id: '$userRef',
                        count: { $sum: 1 },
                    },
                },
                { $sort: { count: -1 } },
                { $limit: 5 },
            ]);
            res.status(200).json(topContributors);
        } catch (error) {
            console.error('Error fetching top contributors:', error);
            res.status(500).json({ msg: 'Failed to fetch top contributors', error: error.message });
        }
    },

    //getListingsByType
    getListingsByType: async (req, res) => {
        try {
            const typeCounts = await Listing.aggregate([
                {
                    $group: {
                        _id: '$type',
                        count: { $sum: 1 },
                    },
                },
            ]);
            res.status(200).json(typeCounts);
        } catch (error) {
            console.error('Error fetching type data:', error);
            res.status(500).json({ msg: 'Failed to fetch type data', error: error.message });
        }
    },

    getListingsByOffer: async (req, res) => {
        try {
            const offerCounts = await Listing.aggregate([
                {
                    $group: {
                        _id: '$offer',
                        count: { $sum: 1 },
                    },
                },
            ]);
            res.status(200).json(offerCounts);
        } catch (error) {
            console.error('Error fetching offer data:', error);
            res.status(500).json({ msg: 'Failed to fetch offer data', error: error.message });
        }
    },

    getListingsAvailability: async (req, res) => {
        try {
            const availabilityCounts = await Listing.aggregate([
                {
                    $group: {
                        _id: '$available',
                        count: { $sum: 1 },
                    },
                },
            ]);
            res.status(200).json(availabilityCounts);
        } catch (error) {
            console.error('Error fetching availability data:', error);
            res.status(500).json({ msg: 'Failed to fetch availability data', error: error.message });
        }
    }

};

module.exports = listingController;
