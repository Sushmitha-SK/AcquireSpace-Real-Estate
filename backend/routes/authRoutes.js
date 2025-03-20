const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/google', authController.google);
router.post('/signout', authController.signOut);
router.post('/resendOtp', authController.resendOtp);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/changePassword', authMiddleware, authController.changePassword);

module.exports = router;
