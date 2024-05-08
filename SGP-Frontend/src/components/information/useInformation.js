// import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { ADD_INFO } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const schema = yup
  .object({
    // image: yup.mixed().required("Please Enter image"),
    choice: yup.string().required("Please select an option"),
    cgpa: yup
      .string()
      .required("Please enter your CGPA")
      .matches("[-+]?[0-9].?[0-9]", "Please enter a numeric value"),
    personal_email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter your personal email"),
    age: yup
      .string()
      .required("Please enter your age")
      // .matches("^d+$", "Please enter a numeric value")
      .min(2, "Please enter minimum 2 characters")
      .max(2, "Please enter maximum 2 characters"),
    phone_no: yup
      .string()
      .required("Please enter your phone number")
      // .matches("^d+$", "Please enter a numeric value")
      .min(10, "Please enter minimum 10 characters")
      .max(10, "Please enter maximum 10 characters"),
    // skill: yup.string().required(),
    // domain: yup.string().required("Please enter your domain/technology"),
    linkedin: yup
      .string()
      .url("Please enter a valid url")
      .required("Please enter your linkedin link"),
    github: yup
      .string()
      .url("Please enter a valid url")
      .required("Please enter your github link"),
  })
  .required();

const useInformation = () => {
  const navigate = useNavigate();
  // const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      choice: "",
      personal_email: "",
      cgpa: "",
      age: "",
      phone_no: "",
      // skill: "",
      // domain: "",
      linkedin: "",
      github: "",

    },
  });

  const onSubmit = (data) => {
    console.log("data", data
    );
    axios.defaults.withCredentials = true;
    axios.post(ADD_INFO, {
      // avatar: data.image[0].path,
      age: data.age,
      carrear_option: data.choice,
      cgpa: data.cgpa,
      phone: data.phone_no,
      persnoal_email: data.personal_email,
      linkedin: data.linkedin,
      github: data.github
    }).then((res) => {
      console.log(res.status)
      if (res.status === 200) {
        navigate(routes.home)
      }
      else if (res.status === 202) {
        console.log(res.data)
      }
    })
      .catch((err) => {
        console.log(err)
      })
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
  };
};

export default useInformation;
