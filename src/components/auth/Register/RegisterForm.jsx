/* eslint-disable react/no-unescaped-entities */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../authConfig";
import { useContext } from "react";
import { UserContext } from "../../../context/user_context";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const userNameRegEx = /^\S*$/;
  const passwordReqEx =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;


      const { uid, setUid } = useContext(UserContext);
  const userRegister = async (user) => {
    const userData = await registerWithEmailAndPassword(
      user.email,
      user.password
    );
    console.log(userData);
    if (userData.uid) {
      setUid(userData.uid);
      console.log("uid after register :", uid);
      navigator("/todo");
    }
  };

  const navigator = useNavigate();
  const goToLogin = () => {
    navigator("/");
  };
  return (
    <>
      <div className="container">
        <div className="row m-5 p-5 d-flex justify-content-center bg-secondary-subtle rounded ">
          <h1 className="text-center my-3">Register</h1>
          <Form className="col-5" onSubmit={handleSubmit(userRegister)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-danger">Name is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", { required: true, pattern: emailRegEx })}
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">Email is required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-danger">Invalid email format</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                {...register("userName", {
                  required: true,
                  pattern: userNameRegEx,
                })}
              />
              {errors.userName?.type === "required" && (
                <p className="text-danger">User Name is required</p>
              )}
              {errors.userName?.type === "pattern" && (
                <p className="text-danger">
                  User Name should not contain spaces
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  pattern: passwordReqEx,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-danger">Password is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-danger">
                  Password must be 8-16 characters long, include at least one
                  number and one special character
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return "Your passwords don't match!";
                    }
                  },
                })}
              />
              {errors.confirmPassword?.type === "required" && (
                <p className="text-danger">Confirm Password is required</p>
              )}
              {errors.confirmPassword?.type === "validate" && (
                <p className="text-danger">Your passwords don't match!</p>
              )}
            </Form.Group>

            <Button className="w-100" variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <p className="text-center p-0 text-muted   m-3">
            Already have an account?{" "}
            <span
              className="text-primary btn p-0 m-0"
              onClick={() => goToLogin()}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
