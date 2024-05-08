import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import axios from "axios";
import { FORGOT_SEND_OTP } from "../../constants/api";
import { toast } from "react-toastify";


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
  })
  .required();

const useForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => {
    console.log("data", data);
    axios
      .post(FORGOT_SEND_OTP, data)
      .then((res) => {
        console.log(res.status, res.data);
        if (res.status === 200) {
          navigate(routes.forgotverify, {
            state: {
              email: data.email,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response && err.response.status === 401) {
          if (err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error("User with email address or charusat id is already exists.");
          }
        } else {
          // Handle other types of errors (e.g., network issues)
          toast.error("An error occurred. Please try again later.");
        }
      });
    navigate(routes.forgotverify);
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
  };
};

export default useForgotPassword;
