import { ApiError } from "../utils/ApiError.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from "../models/user.model.js";
// import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Project } from "../models/project.model.js";

const addProject = asyncHandler(async (req, res) => {
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
    const { project } = req.body;
    console.log(project)
    let newProject = [];
    project.forEach((object) => {
        console.log("obj",object)
        
      const project1 = {
            title: object.name,
            description: object.description,
            link: object.link
        }
        newProject.push(project1)
    });
    console.log("np",newProject)
    // console.log(user._id)
    const projectAdded = await Project.findOne({ user: user._id })
    console.log(projectAdded)
    if (projectAdded) {
        const DeletedProject = await Project.deleteOne(projectAdded._id)
        // console.log("updated");
    }

    const Projects = await Project.create({ user: user._id, project: newProject })    
    // console.log("created");

    const projects = await Project.find({ user: user._id })
    console.log(projects)
    return res.status(200).json(new ApiResponse(200, projects, "Project Added Successfully"))
})

const getProject = asyncHandler(async (req, res) => {
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
    const Projects = await Project.findOne({ user: user._id })
    if(!Projects){
        return res.status(200).json(new ApiResponse(200, [], "No Projects Found"))
    }

    return res.status(200).json(new ApiResponse(200, Projects.project, "Skills Fetched SuccessFully"))



})



export { addProject, getProject }