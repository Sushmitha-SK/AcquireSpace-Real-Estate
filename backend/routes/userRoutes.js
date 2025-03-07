const express = require('express');
const router = express.Router(); 
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.put('/update', authMiddleware, userController.updateUser);
router.delete('/delete', authMiddleware, userController.deleteUser);
router.get('/listings', authMiddleware, userController.getUserListings);
router.get('/profile', authMiddleware, userController.getUser);
router.get('/profile/:id', authMiddleware, userController.getUserById);
router.post('/favorites/:id', authMiddleware, userController.addFavorite);
router.delete('/favorites/:id', authMiddleware, userController.removeFavorite);
router.get('/favorites', authMiddleware, userController.getFavorites);

module.exports = router;
