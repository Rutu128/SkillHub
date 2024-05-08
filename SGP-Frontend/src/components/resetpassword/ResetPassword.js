import React from "react";
// import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { routes } from "../../constants/routes";
// import { Link } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import useResetPassword from "./useResetPassword";

const ResetPassword = () => {
  const { handleSubmit, onSubmit, register, errors } = useResetPassword();
  return (
    <div className={styles.container}>
      <div className={styles.ResetPassword}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>Reset Password</h4>
          <Form.Group className="mb-3" controlId="new_password">
            <Form.Label>Reset Password</Form.Label>
            <Form.Control
              placeholder="Reset Password"
              type="password"
              {...register("new_password")}
              isInvalid={!!errors.new_password?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.new_password && errors.new_password.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm_password">
            <Form.Label>Confirm new Password</Form.Label>
            <Form.Control
              placeholder="Confirm Password"
              type="password"
              {...register("confirm_password")}
              isInvalid={!!errors.confirm_password?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirm_password && errors.confirm_password.message}
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
export default ResetPassword;
