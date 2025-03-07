const express = require('express');
const router = express.Router(); 
const authMiddleware = require('../middleware/authMiddleware');
const listingController = require('../controllers/listingController');

router.get('/public', listingController.getAllListingsPublic); 
router.get('/public/recommended', listingController.getTopRecommendedListings); 
router.get('/public/recent', listingController.getMostRecentListings); 

router.post('/', authMiddleware, listingController.createListing); 
router.delete('/:id', authMiddleware, listingController.deleteListing);
router.put('/:id', authMiddleware, listingController.updateListing);
router.get('/recent-by-user', authMiddleware, listingController.getRecentListingsByUser);

router.get('/:id', authMiddleware, listingController.getListing); 
router.get('/:id/details', authMiddleware, listingController.getListingDetailsById); 
router.get('/', authMiddleware, listingController.getListings); 
router.get('/stats/availability', listingController.getListingsAvailability);

router.get('/:id/availability', listingController.checkAvailability);
router.get('/stats/listings-growth', listingController.getListingsGrowth); 

router.get('/stats/category', listingController.getListingsByCategory); 
router.get('/stats/top-contributors', authMiddleware, listingController.getTopContributors);
router.get('/stats/type', listingController.getListingsByType); 
router.get('/stats/offer', listingController.getListingsByOffer);

module.exports = router;
