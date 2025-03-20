const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const authController = {

    signup: async (req, res) => {
        const { username, email, password, name, contactNo, usertype, avatar } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }

            const userAvatar = avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

            user = new User({
                username,
                email,
                password,
                name,
                contactNo,
                usertype,
                avatar: userAvatar,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({
                    userId: user.id,
                    username: user.username,
                    avatar: user.avatar,
                    token,
                });
            });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send("Server Error");
        }
    },


    signin: async (req, res) => {
        const { email, password, otp } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            if (user.otp && user.otpExpires > Date.now()) {
                if (otp !== user.otp) {
                    return res.status(400).json({ msg: "Invalid OTP" });
                }

                const payload = {
                    user: {
                        id: user.id,
                    },
                };

                user.otp = undefined;
                user.otpExpires = undefined;
                await user.save();

                jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        userId: user.id,
                        token,
                    });
                });

            } else {
                const otp = crypto.randomInt(100000, 999999).toString();
                const otpExpires = Date.now() + 1 * 60 * 1000;

                user.otp = otp;
                user.otpExpires = otpExpires;
                await user.save();

                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const htmlContent = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h1 style="font-family: 'Kanit', sans-serif; font-size: 1.5rem; font-weight: 600; display: flex; flex-wrap: wrap; margin-bottom: 20px;">
                        <span style="color: #69B99D;">Acquire</span>
                        <span style="color: #555;">Space</span>
                    </h1>
                    <h2 style="color: #69B99D;">Your One-Time Password (OTP)</h2>
                    <p>Dear ${user.name || "User"},</p>
                    <p>Your One-Time Password (OTP) is:</p>
                    <h3 style="color: #69B99D; font-size: 24px; text-align: center;">${otp}</h3>
                    <p>This code is valid for the next <strong>1 minute</strong>. Please use it promptly to complete your sign-in process.</p>
                    <p>If you did not request this code, please ignore this email or contact our support team immediately.</p>
                    <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;" />
                    <p style="font-size: 14px; color: #888;">Best regards,</p>
                    <p style="font-size: 14px; color: #888;">The AcquireSpace Team</p>
                </div>
            `;


                await transporter.sendMail({
                    to: user.email,
                    from: 'noreply@example.com',
                    subject: 'Your One-Time Password (OTP)',
                    html: htmlContent,
                });

                res.json({
                    msg: "An OTP has been sent to your email. Please enter the OTP to complete your sign-in.",
                });
            }

        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send("Server Error");
        }
    },


    resendOtp: async (req, res) => {
        const { email } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: "User not found" });
            }

            const otp = crypto.randomInt(100000, 999999).toString();
            const otpExpires = Date.now() + 1 * 60 * 1000;
            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                to: user.email,
                from: 'noreply@example.com',
                subject: 'Your OTP for 2FA',
                text: `Your OTP is: ${otp}. It will expire in 1 minute.`,
            });

            res.json({
                msg: "A new OTP has been sent to your email. Please enter the OTP to complete your sign-in.",
            });

        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send("Server Error");
        }
    },

    signOut: (req, res) => {
        res.clearCookie("token");
        res.json({ msg: "Signed out successfully" });
    },


    google: async (req, res, next) => {
        try {
            const { email, name, photo } = req.body;

            let user = await User.findOne({ email });

            if (user) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
                const { password: pass, ...rest } = user._doc;
                res
                    .cookie('access_token', token, { httpOnly: true })
                    .status(200)
                    .json({ ...rest, userId: user._id, token });
            } else {
                const generatedPassword =
                    Math.random().toString(36).slice(-8) +
                    Math.random().toString(36).slice(-8);
                const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

                const newUser = new User({
                    username: name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                    email,
                    password: hashedPassword,
                    avatar: photo,
                });

                await newUser.save();

                const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
                const { password: pass, ...rest } = newUser._doc;
                res
                    .cookie('access_token', token, { httpOnly: true })
                    .status(200)
                    .json({ ...rest, userId: newUser._id, token });
            }
        } catch (error) {
            next(error);
        }
    },

    forgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'User with this email does not exist' });
            }

            const resetToken = crypto.randomBytes(20).toString('hex');
            const resetExpires = Date.now() + 3600000; // 1 hour

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = resetExpires;
            await user.save();

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                }
            });

            const resetUrl = `https://acquirespace-real-estate.vercel.app/resetPassword/${resetToken}`;

            const htmlContent = `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                    <h1 style="font-family: 'Kanit', sans-serif; font-size: 1.5rem; font-weight: 600; display: flex; flex-wrap: wrap; margin-bottom: 20px;">
                        <span style="color: #69B99D;">Acquire</span>
                        <span style="color: #555;">Space</span>
                    </h1>
                    <h2 style="color: #69B99D;">Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>You requested a password reset for your account. Please click the button below to reset your password:</p>
                    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: #fff; background-color: #69B99D; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p>If you did not request this, please ignore this email. The link will expire in 1 hour.</p>
                    <p>Thank you,<br/>The AcquireSpace Team</p>
                </div>
            `;

            await transporter.sendMail({
                to: user.email,
                from: 'noreply@example.com',
                subject: 'Password Reset',
                html: htmlContent,
            });

            res.json({ msg: 'Password reset email sent' });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Server Error');
        }
    },

    resetPassword: async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;

        try {
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!user) {
                return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.json({ msg: 'Password has been reset successfully' });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Server Error');
        }
    },

     changePassword: async (req, res) => {
        const { currentPassword, newPassword } = req.body;

        try {
            const userId = req.user.id; 
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Current password is incorrect" });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);

            await user.save();

            res.json({ msg: "Password changed successfully" });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send("Server Error");
        }
    }
};

module.exports = authController;

