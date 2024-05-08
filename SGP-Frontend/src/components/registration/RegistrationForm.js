import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./RegistrationForm.module.css";
import useRegister from "./useRegister";

const RegistrationForm = () => {
  const { handleSubmit, onSubmit, register, errors } = useRegister();
  return (
    <div className={styles.container}>
      <div className={styles.RegistrationForm}>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>REGISTER</h4>
          <Form.Group className="mb-3" controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="First name"
              {...register("first_name")}
              isInvalid={!!errors.first_name?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.first_name && errors.first_name.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Last name"
              {...register("last_name")}
              isInvalid={!!errors.last_name?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.last_name && errors.last_name.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="charusat_id">
            <Form.Label>Charusat Id</Form.Label>
            <Form.Control
              placeholder="Charusat ID"
              {...register("charusat_id")}
              isInvalid={!!errors.charusat_id?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.charusat_id && errors.charusat_id.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              placeholder="Charusat email address"
              {...register("email")}
              isInvalid={!!errors.email?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="dob">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter DOB"
              {...register("dob")}
              isInvalid={!!errors.dob?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dob && errors.dob.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="passing_year">
            <Form.Label>Passing Year</Form.Label>
            <Form.Control
              placeholder="Passing year"
              {...register("passing_year")}
              isInvalid={!!errors.passing_year?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.passing_year && errors.passing_year.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
              isInvalid={!!errors.password?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="reconfirm_password">
            <Form.Label>Reconfirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Reconfirm password"
              {...register("reconfirm_password")}
              isInvalid={!!errors.reconfirm_password?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.reconfirm_password && errors.reconfirm_password.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Submit
          </Button>
          <Link className={styles.loginLink} to={routes.login}>
            Already have an account?
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
