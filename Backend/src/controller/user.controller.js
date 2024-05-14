import asyncHandler from 'express-async-handler';
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Otp } from '../models/otp.model.js';
import nodemailer from "nodemailer";
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Skill } from '../models/skill.model.js';
import { Project } from '../models/project.model.js';
import { Info } from '../models/info.model.js';
import { Post } from '../models/post.model.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})
transporter.verify(function (error, success) {
    if (error) {
        console.error('Error verifying transporter:', error);
    } else {
        console.log('Transporter is ready to send emails');
    }
});

const twoMinutesExpiry = async (otpTime) => {
    try {
        const c_time = new Date();
        var timediffrence = (otpTime - c_time.getTime()) / 1000;
        timediffrence /= 60

        if (Math.abs(timediffrence) > 2) {
            return true;
        }
        return false;

    } catch (error) {
        throw new ApiError(500, "something went wrong during expiry time")
    }
}

const fiveMinutesExpiryForgot = async (otpTime, email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(500, "user not found while otp expiry")
        }
        const c_time = new Date();
        var timediffrence = (otpTime - c_time.getTime()) / 1000;
        timediffrence /= 60

        if (Math.abs(timediffrence) > 5) {
            // const user = await User.findOneAndUpdate({ email: email },
            //     {
            //         $set: {
            //             forgotPassword: true
            //         }
            //     });
            return true;
        }
        return false;


    } catch (error) {
        throw new ApiError(500, "something went wrong during expiry time in forgot")
    }
}

const fiveMinutesExpiry = async (otpTime) => {
    try {
        const c_time = new Date();
        var timediffrence = (otpTime - c_time.getTime()) / 1000;
        timediffrence /= 60

        if (Math.abs(timediffrence) > 5) {
            return true;
        }
        return false;

    } catch (error) {
        throw new ApiError(500, "something went wrong during expiry time")
    }
}

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "something went wrong during generating access token and refresh token")
    }
}

// const genrateRandom = async () => {
//     return Math.floor(1000 + Math.random() * 9000)
// }


const registerUser = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, c_id, dob, passingYear, password } = req.body;

    if ([firstName, lastName, email, c_id, dob, passingYear, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please fill all the fields");
    }


    const existedUser = await User.findOne({
        $or: [{ c_id }, { email }]
    })
    console.log(existedUser)
    if (existedUser) {
        throw new ApiError(409, "User with email address or charusat id is already exists ");
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        c_id,
        dob,
        passingYear,
        password
    });
    console.log(user)

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    // console.log(createdUser)

    if (!createdUser) {
        throw new ApiError(500, "something went wrong");
    }

    return res.status(200).json(new ApiResponse(200, createdUser, "user registered Successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please fill all the fields");
    }
    const user = await User.findOne({ email });
    const isverified = user.isVerified
    if (!isverified) {
        throw new ApiError(401, "please verify your email")
    }

    if (!user) {
        throw new ApiError(404, "user not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3000000
    }

    const user_info = await Info.findOne({ user: user._id })
    if (!user_info) {
        return res.status(202).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken).json(new ApiResponse(202, { user: loggedInUser, accessToken, refreshToken }, "Add Information"))
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken).json(
        new ApiResponse(200,
            {
                user: loggedInUser, accessToken, refreshToken
            }, "loggedin Successfully")
    )

})

const sendOtp = asyncHandler(async (req, res) => {


    const { email } = req.body;
    const genratedOtp = Math.floor(1000 + Math.random() * 9000);
    // console.log(genratedOtp)
    const oldOtpData = await Otp.findOne({ email: email })

    if (oldOtpData) {

        const sendnextOtp = await twoMinutesExpiry(oldOtpData.timestamp);
        if (!sendnextOtp) {
            throw new ApiError(401, "please try after some time")
        }
    }
    const currentDate = new Date()

    const otp = await Otp.findOneAndUpdate(
        { email: email },
        { otp: genratedOtp, timestamp: new Date(currentDate.getTime()) },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    // const otp = await Otp.create({
    //     email: email,
    //     otp: genratedOtp
    // })
    if (!otp) {
        throw new ApiError(500, "something went wrong")
    }
    const mailConfigurations = {

        // It should be a string of sender/server email 
        from: process.env.EMAIL,

        to: email,

        // Subject of Email 
        subject: 'Email Verification',

        // This would be the text of email body 
        text: ` Hii ,this is otp for verification ${genratedOtp}`

    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.error(error)
        }
        console.log('Email Sent Successfully');
        console.log(info);
    });
    // const msg = '<p> Hii ,</br>this is otp for verification <b><h4>' + genratedOtp + '</h4></b></p>'
    // transporter.sendMail(email, 'Otp Verification', msg)
    return res.status(200).json(new ApiResponse(200, otp, "OTP sent successfully"))

})

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const otpData = await Otp.findOne({ email, otp });
    if (!otpData) {
        throw new ApiError(401, "invalid otp")
    }
    const isOtpExpires = fiveMinutesExpiry(otpData.timestamp)
    if (!isOtpExpires) {
        throw new ApiError(401, "Your Otp is Expires");
    }
    const user = await User.findOneAndUpdate({ email: email },
        {
            $set: {
                isVerified: true
            }
        }).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, user, "Accont Verified Successfully "))
})

const logoutUser = asyncHandler(async (req, res) => {
    //remove cookies
    //reset refresh token
    await User.findById(
        req.user._id,
        {
            unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    // console.log(hii)
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unothorized Request")

        try {
            const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

            const user = await User.findById(decodedToken?._id)
            if (!user) {
                throw new ApiError(401, "invalid refresh token")

            }
            if (incomingRefreshToken !== user.refreshToken) {
                throw new ApiError(401, "Refersh token is expired or use")
            }

            const options = {
                httpOnly: true,
                secure: true
            }
            const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)


            return res.status(200).cookie("accessToken", options).cookie("newRefreshToken", options).json(
                new ApiResponse(200, {
                    accessToken,
                    refreshToken: newRefreshToken
                }, "Refersh token refreshed successfully")
            )
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid refresh token");
        }
    }
});

const sendOtpforForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "user not found");
    }
    const genratedOtp = Math.floor(1000 + Math.random() * 9000);
    // console.log(genratedOtp)
    const oldOtpData = await Otp.findOne({ email: email })

    if (oldOtpData) {

        const sendnextOtp = await twoMinutesExpiry(oldOtpData.timestamp);
        if (!sendnextOtp) {
            throw new ApiError(401, "please try after some time")
        }
    }
    const currentDate = new Date()

    const otp = await Otp.findOneAndUpdate(
        { email: email },
        { otp: genratedOtp, timestamp: new Date(currentDate.getTime()) },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    // const otp = await Otp.create({
    //     email: email,
    //     otp: genratedOtp
    // })
    if (!otp) {
        throw new ApiError(500, "something went wrong")
    }
    const mailConfigurations = {

        // It should be a string of sender/server email 
        from: process.env.EMAIL,

        to: email,

        // Subject of Email 
        subject: 'Email Verification',

        // This would be the text of email body 
        text: ` Hii ,this is otp for verification ${genratedOtp}`

    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.error(error)
        }
        console.log('Email Sent Successfully');
        console.log(info);
    });
    // const msg = '<p> Hii ,</br>this is otp for verification <b><h4>' + genratedOtp + '</h4></b></p>'
    // transporter.sendMail(email, 'Otp Verification', msg)
    return res.status(200).json(new ApiResponse(200, otp, "OTP sent successfully"))


})

const verifyOtpForForgotPassword = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const otpData = await Otp.findOne({ email, otp });
    if (!otpData) {
        throw new ApiError(401, "invalid otp")
    }
    const isOtpExpires = fiveMinutesExpiry(otpData.timestamp)
    if (!isOtpExpires) {
        throw new ApiError(401, "Your Otp is Expires");
    }
    const user = await User.findOneAndUpdate({ email: email },
        {
            $set: {
                forgotPassword: true
            }
        }).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, user, "Account Verified Successfully "))
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "user not found");
    }
    // const verify = await user.verifyPassword
    // if (!verify) {
    //     throw new ApiError(401, "Verification Failed");
    // }
    const verify = await user.forgotPassword
    if (!verify) {
        throw new ApiError(401, "Verification Failed");
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError(401, "Passwords do not match");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false })
    // user.forgotPassword = false
    // console.log(user)
    const ruser = await User.findOneAndUpdate({ email },
        {
            $set: {
                forgotPassword: false
            }
        }).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200, ruser, "Password updated successfully"))
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password")
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200).json(new ApiResponse(200, {}, "Password updated successfully"))

})



const getUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id)
    const post = await Post.findById(id)
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    const user = post.user
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const infos = await Info.findOne({ user: user._id })
    if (!infos) {
        throw new ApiError(404, "User information not found")
    }
    const skill = await Skill.findOne({ user: user._id})
    if (!skill) {
        throw new ApiError(404, "User has no skill added")
    }
    const project = await Project.findOne({ user: user._id})
    if (!project) {
        throw new ApiError(404, "User has no project added")
    }


    return res.status(200).json(new ApiResponse(200, { user, skill, project, infos }, "User Details"))

})

const userProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(
        req.user._id,
        {
            unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")
    // console.log(user._id)
    const nuser = await User.findById(user._id).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(401, "Invalid Access Token")
    }
    const info = await Info.findOne({ user: user._id })
    if (!info) {
        throw new ApiError(404, "User information not found")
    }
    console.log(user)
    const skill = await Skill.findOne({ user: user._id })
    // if(!skill){

    // }
    const project = await Project.findOne({ user: user._id })

    return res.status(200).json(new ApiResponse(200, { user: nuser, info, skill, project }, "User Profile"))

})


export {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp,
    logoutUser,
    refreshAccessToken,
    sendOtpforForgotPassword,
    verifyOtpForForgotPassword,
    forgotPassword,
    changePassword,
    getUserDetails,
    userProfile
}



