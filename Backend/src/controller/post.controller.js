import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Post } from "../models/post.model.js";

const addPost = asyncHandler(async (req, res) => {
    let user = await User.findById(
        req.user._id,
        {
            unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );
    const userp = await User.findById(user._id)
    let fname = userp.firstName
    console.log(fname);
    let lname = userp.lastName
    console.log(lname);
    let name = fname + ' ' + lname
    console.log(name);
    const { title,description,imgurl} = req.body
    // const postLocalPath = req.files?.postphoto[0]?.path;
    // if (!postLocalPath) {
    //     throw new ApiError(400, "Please upload post localpath is not found")
    // }

    // const uploadPost = await uploadOnCloudinary(postLocalPath)
    // // console.log(avatar.url);
    // if (!uploadPost) {
    //     throw new ApiError(400, "Post not upload on server")
    // }
    const post = await Post.create({
        title,
        description,
        postphoto:imgurl,
        owner: name,
        user: user._id,
    });
    res.status(200).json(new ApiResponse(200, { post, userp }, "Post uploaded successfully"))
})

const getPosts = asyncHandler(async (req, res) => {
    try {
        var page = Number(req.query.page)
        var post_data;
        post_data = await Post.find().sort({ "updatedAt": 1 }).limit(7)
        res.status(200).json(new ApiResponse(200, { post_data }, "Posts fetched successfully"))
    } catch (error) {
        res.status(404).json(new ApiError(400, { "error": error }, "Something Went Worong"));
    }
})

export { addPost, getPosts }