import React from "react";
// import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { routes } from "../../constants/routes";
// import { Link } from "react-router-dom";
import styles from "./ConfirmRegistration.module.css";
import useConfirmRegister from "./useConfirmRegister";

const ConfirmRegistration = () => {
  const { handleSubmit, onSubmit, register, errors } = useConfirmRegister();
  return (
    <div className={styles.container}>
      <div className={styles.ConfirmRegistration}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>Confirm Registration</h4>
          <Form.Group className="mb-3" controlId="confirm_register">
            <Form.Label>Verify OTP</Form.Label>
            <Form.Control
              placeholder="Enter OTP"
              {...register("confirm_register")}
              isInvalid={!!errors.confirm_register?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirm_register && errors.confirm_register.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Verify
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default ConfirmRegistration;
