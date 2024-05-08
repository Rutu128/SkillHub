import { Info } from "../models/info.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';





const information = asyncHandler(async (req, res) => {
    const { age,carrear_option,cgpa, phone, persnoal_email, linkedin, github } = req.body;
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
    )
    if (!user) {
        throw new ApiError(401, "Invalid Access Token")
    }
    console.log(user._id)
    const user_exist = await Info.findOne({ user: user._id })
    // console.log(user_exist);
    if (user_exist) {
       return res.status(202).json(new ApiResponse(202, {user}, "Information already added"))
    }

    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // if (!avatarLocalPath) {
    //     throw new ApiError(400, "Please upload an image or avtar localpath is not found")
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // console.log(avatar.url);
    // if (!avatar) {
    //     throw new ApiError(400, "avtaar not upload on server")
    // }

    const user_info = await Info.create({
        user: user._id,
        // avatar: avatar.url,
        age,
        carrear_option,
        cgpa,
        phone,
        persnoal_email,
        linkedin,
        github
    })


    const created_info = await Info.findById(user_info._id);
    if (!created_info) {
        throw new ApiError(500, "something went wrong during information add");
    }
    const userid = await user_info.user

    const finduser = await User.findById(userid)
    console.log(finduser)

    return res.status(200).json(new ApiResponse(200, {}, "Information Added Successfully"))

}) 

const changeCgpa = asyncHandler(async(req, res)=>{
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
    )
    if (!user) {
        throw new ApiError(401, "Invalid Access Token")
    }
    const {cgpa} = req.body;
    const info = await Info.findOneAndUpdate({user:user._id},
        {
            cgpa
        },
        {
            new:true
        }

    )
    return res.status(200).json(new ApiResponse(200,info,"Cgpa changed Successfully"))
})



export {
    information,changeCgpa
}




