import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Skill } from "../models/skill.model.js";


const addSkill = asyncHandler(async (req, res) => {
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
    // console.log(user._id)
    const { skill } = req.body;
    // console.log(skill);

    let newSkills = [];
    skill.forEach(skill_name => {
        let skill1 = {};
        skill1 = {
            name: skill_name,
        };
        newSkills.push(skill1);
    });

    // console.log(newSkills);

    const s = await Skill.findOne({ user: user._id })
    // console.log(s);
    let s1;
    if (s) {
        s1 = await Skill.deleteOne(s._id)
        // console.log("Deleted");
    }
  
        s1 = await Skill.create({ user: user._id, skill: newSkills })
        // console.log("Created");


    // console.log(skill)
    const skills = await Skill.findOne({ user: user._id })
    // console.log(skills)
    return res.status(200).json(new ApiResponse(200, skills, "Skill Added Successfully"))


})

const getSkill = asyncHandler(async (req, res) => {
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
    const u = await User.findById(user._id)
    const Skills = await Skill.findOne({ user: user._id });
    if(!Skills){
        return res.status(200).json(new ApiResponse(200, [], "No Skills Found"))
    }
    // console.log(Skills.skill);

    return res.status(200).json(new ApiResponse(200, Skills.skill, "Skills Fetched SuccessFully"))



})



export { addSkill, getSkill }