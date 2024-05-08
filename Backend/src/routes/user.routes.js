import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { changePassword, forgotPassword, getUserDetails, loginUser, logoutUser, refreshAccessToken, registerUser, sendOtp, sendOtpforForgotPassword, userProfile, verifyOtp, verifyOtpForForgotPassword } from "../controller/user.controller.js";
import { changeCgpa, information } from "../controller/info.controller.js"
import { addSkill, getSkill } from "../controller/skill.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { addProject, getProject } from "../controller/project.controller.js";
import { addPost, getPosts } from "../controller/post.controller.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-send-otp").post(sendOtpforForgotPassword);
router.route("/forgot-verify-otp").post(verifyOtpForForgotPassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/change-password").post(verifyJWT, changePassword);

router.route("/add-info").post(verifyJWT,information)
router.route("/add-skill").post(verifyJWT, addSkill)
router.route("/add-project").post(verifyJWT, addProject)
router.route("/add-post").post(verifyJWT,addPost)
router.route("/user/:id").get(verifyJWT, getUserDetails)
router.route("/get-posts").get( getPosts)
router.route("/user-profile").get(verifyJWT, userProfile)
router.route("/get-skill").get(verifyJWT, getSkill)
router.route("/get-projects").get(verifyJWT, getProject)
router.route("/change-cgpa").get(verifyJWT,changeCgpa )


export default router;