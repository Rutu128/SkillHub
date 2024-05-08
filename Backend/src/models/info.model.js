import mongoose, { Schema } from "mongoose";


const infoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    age: {
        type: Number,
        default: 18,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dgz8lnzir/image/upload/v1712634587/profile_zku1dm.jpg"
    },
    carrear_option: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    persnoal_email: {
        type: String,
        required: true
    },
    // tech: {
    //     type: String,
    //     required: true
    // },
    linkedin: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    }


}, { timestamps: true })



export const Info = mongoose.model("Info", infoSchema)