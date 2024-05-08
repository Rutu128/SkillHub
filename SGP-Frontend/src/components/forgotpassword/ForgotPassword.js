import React from "react";
// import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { routes } from "../../constants/routes";
// import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import useForgotPassword from "./useForgotPassword";

const ForgotPassword = () => {
  const { handleSubmit, onSubmit, register, errors } = useForgotPassword();
  return (
    <div className={styles.container}>
      <div className={styles.ForgotPassword}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>Reset Password</h4>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              placeholder="Enter email"
              {...register("email")}
              isInvalid={!!errors.email?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default ForgotPassword;
