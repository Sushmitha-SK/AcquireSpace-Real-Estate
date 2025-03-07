const User = require("../models/User");
const Listing = require("../models/Listing")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userController = {

    updateUser: async (req, res) => {
        const { id: userId } = req.user; 
        const { password, avatar, name, username, contactNo, address } = req.body; 

        try {
            if (!userId) {
                return res.status(400).json({ msg: 'User ID is missing' });
            }

            let user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }
            if (avatar) {
                user.avatar = avatar;
            }
            if (name) user.name = name;
            if (contactNo) user.contactNo = contactNo;
            if (username) user.username = username;

            if (address) {
                user.address = {
                    street: address.street || '', 
                    apartmentSuiteNumber: address.apartmentSuiteNumber || '', 
                    city: address.city || '', 
                    state: address.state || '', 
                    stateCode: address.stateCode || '',
                    postalCode: address.postalCode || '', 
                    country: address.country || '', 
                    countryCode: address.countryCode || '',
                };
            }

            await user.save();
            res.json({ msg: 'User updated successfully', user });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to update user', error: error.message });
        }
    },

   
    deleteUser: async (req, res) => {
        const { id: userId } = req.user; 

        try {
            if (!userId) {
                return res.status(400).json({ msg: 'User ID is missing' });
            }

            const result = await User.deleteOne({ _id: userId });

            if (result.deletedCount === 0) {
                return res.status(404).json({ msg: 'User not found' });
            }

            res.json({ msg: 'User deleted successfully' });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to delete user', error: error.message });
        }
    },

    getUserListings: async (req, res) => {
        const { userId } = req.user; 

        try {
            const listings = await Listing.find({ userRef: userId });

            if (!listings) {
                return res.status(404).json({ msg: "No listings found for this user" });
            }

            res.json(listings);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send("Server Error");
        }
    },

   
    getUser: async (req, res) => {

        const { id: userId } = req.user; 

        try {
            const user = await User.findById(userId).select('-password');

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            res.json(user); 
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send("Server Error");
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params; 

        try {
            if (!id) {
                return res.status(400).json({ msg: 'User ID is required' });
            }

            const user = await User.findById(id).select('-password');

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            res.status(200).json(user); 
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to fetch user details', error: error.message });
        }
    },


    addFavorite: async (req, res) => {
        try {
            const userId = req.user.id; 
            const listingId = req.params.id; 

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            const listing = await Listing.findById(listingId);

            if (!listing) {
                return res.status(404).json({ msg: 'Listing not found' });
            }

            if (user.favorites.includes(listingId)) {
                return res.status(400).json({ msg: 'Listing is already in favorites' });
            }

            user.favorites.push(listingId);
            await user.save();

            res.status(200).json({ msg: 'Listing added to favorites', favorites: user.favorites });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to add listing to favorites' });
        }
    },

    removeFavorite: async (req, res) => {
        try {
            const userId = req.user.id;  
            const listingId = req.params.id; 

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            const listing = await Listing.findById(listingId);

            if (!listing) {
                return res.status(404).json({ msg: 'Listing not found' });
            }

            if (!user.favorites.includes(listingId)) {
                return res.status(400).json({ msg: 'Listing is not in favorites' });
            }

            user.favorites = user.favorites.filter(id => id.toString() !== listingId.toString());
            await user.save();

            res.status(200).json({ msg: 'Listing removed from favorites', favorites: user.favorites });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to remove listing from favorites' });
        }
    },

    getFavorites: async (req, res) => {
        try {
            const userId = req.user.id;  
            const user = await User.findById(userId).populate('favorites');

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            res.status(200).json(user.favorites); 
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ msg: 'Failed to get favorite listings' });
        }
    }
}


module.exports = userController;
