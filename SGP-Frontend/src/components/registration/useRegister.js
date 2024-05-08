import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { REGISTER, SEND_OTP } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import {toast} from "react-toastify"
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid charusat email address")
      .required("Please enter a charusat email address")
      .matches(
        "^(?=.*ce)(?=.*charusat)(?=.*in).*$",
        "Please enter a charusat email address"
      ),
    password: yup
      .string()
      .required("Please enter a password")
      .matches(
        "^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$",
        "Password must have at least 8 characters and one special character."
      ),
    reconfirm_password: yup
      .string()
      .required("Please reconfirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    first_name: yup.string().required("Please enter a first name"),
    last_name: yup.string().required("Please enter a last name"),
    dob: yup.string().required("Please enter a date of birth"),
    passing_year: yup
      .string()
      .required("Please enter a passing year")
      .min(4, "Please enter minimum 4 characters")
      .max(4, "Please enter maximum 4 characters"),
    charusat_id: yup
      .string()
      .required("Please enter a charusat id")
      .matches("^(?=.*[ce]*[CE]*[Ce]).*$", "Please enter a valid charusat id"),
  })
  .required();

const useRegister = () => {
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
      first_name: "",
      last_name: "",
      charusat_id: "",
      dob: "",
      passing_year: "",
      reconfirm_password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      c_id: data.charusat_id,
      dob: data.dob,
      passingYear: data.passing_year,
      password: data.password,
    };
    axios
      .post(REGISTER, payload)
      .then((res) => {
        console.log(res.status, res.data, "resgister res");
        axios.post(SEND_OTP, { email: data.email }).then((res) => {
          console.log(res.status, res.data, "send otp res");
          navigate(routes.confirmregister, {
            state: {
              email: data.email,
            },
          });
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 409) {
          // Display specific error message based on the response data
          if (err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error("User with email address or charusat id already exists.");
          }
        } 
         else {
          // Handle other types of errors (e.g., network issues)
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
  };
};

export default useRegister;
