export const API_BASE_URL = "http://localhost:8000/api/v1/";

export const LOGIN = `${API_BASE_URL}users/login`;
export const REGISTER = `${API_BASE_URL}users/register`;
export const SEND_OTP = `${API_BASE_URL}users/send-otp`;
export const VERIFY_OTP = `${API_BASE_URL}users/verify-otp`;
export const FORGOT_SEND_OTP = `${API_BASE_URL}users/forgot-send-otp`;
export const FORGOT_VERIFY_OTP = `${API_BASE_URL}users/forgot-verify-otp`;
export const FORGOT_PASSWORD = `${API_BASE_URL}users/forgot-password`;
export const GET_POSTS = `${API_BASE_URL}users/get-posts`;
export const ADD_INFO = `${API_BASE_URL}users/add-info`;
export const LOGOUT = `${API_BASE_URL}users/logout`;
export const PROFILEDATA = `${API_BASE_URL}users/user-profile`
export const GETSKILLS = `${API_BASE_URL}users/get-skill`
export const GETPROJECTS = `${API_BASE_URL}users/get-projects`
export const ADDSKILL = `${API_BASE_URL}users/add-skill`
export const ADDPROJECT = `${API_BASE_URL}users/add-project`
export const CHANGECGPA = `${API_BASE_URL}users/change-cgpa`
