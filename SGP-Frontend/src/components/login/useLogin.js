import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import axios from "axios";
import { LOGIN , PROFILEDATA } from "../../constants/api";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
// import { Global } from "@emotion/react";
const clearCookie = () => {
  localStorage.removeItem("user");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

}
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter a email address")
      .matches(
        "^(?=.*ce)(?=.*charusat)(?=.*in).*$",
        "Please enter a charusat email address"
      ),
    password: yup
      .string()
      .required("Please enter a password")
      .matches(
        "^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$",
        "Password must have at least 8 characters and one special character"
      ),
  })
  .required();

const useLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    // clearCookie();
    axios.defaults.withCredentials = true;
    console.log("data", data);
    axios
      .post(LOGIN, data, { withCredentials: true })
      .then((res) => {
        console.log(res.status, res.data);
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data?.data.user));
          toast.success("Login Successful")
          // console.log(res.data.data)
          navigate(routes.home);
        }
        else if (res.status === 202) {
          localStorage.setItem("user", JSON.stringify(res.data?.data.user));
          console.log(res.data.data)

          console.log(res.data)
          navigate(routes.information);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 404) {
          // Display specific error message based on the response data
          if (err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error("User not Found");
          }
        } else if (err.response && err.response.status === 400) {
          // Display specific error message based on the response data
          if (err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Please fill all the fields");
          }
        } else if (err.response && err.response.status === 401) {
          // Display specific error message based on the response data
          if (err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
            navigate(routes.login)
          } else {
            toast.error("Invalid password");
          }
        } else {
          // Handle other types of errors (e.g., network issues)
          toast.error("An error occurred. Please try again later.");
        }
      });
    await axios.get(PROFILEDATA, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.status)
          // console.log(res.data.data)
          localStorage.setItem("info", JSON.stringify(res.data?.data.info))
          localStorage.setItem("skill", JSON.stringify(res.data?.data.skill))
          localStorage.setItem("project", JSON.stringify(res.data?.data.project))
        }
      }).catch((err) => {
        if (err.response.status === 401) {
          toast.error("Session Timeout")
          navigate(routes.login)
        }
        else
          toast.error(err.response.message)
      })
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
  };
};

export default useLogin;
