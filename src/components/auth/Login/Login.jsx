/* eslint-disable react/no-unescaped-entities */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword } from "../authConfig";
import { UserContext } from "../../../context/user_context";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: " ",
    passwordError: " ",
  });

  const navigator = useNavigate();

  const [isPassHidden, setTogglePassword] = useState(true);

  const togglePasswordVisablity = () => {
    console.log(isPassHidden);
    setTogglePassword(!isPassHidden);
  };

  const onInputChange = (event) => {
    let emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (event.target.name == "email") {
      setUser({ ...user, email: event.target.value });
      setErrors({
        ...errors,
        emailError:
          event.target.value.length == 0
            ? "Email Is Required"
            : emailRegEx.test(event.target.value)
            ? ""
            : "Invalid Email",
      });
    } else if (event.target.name == "password") {
      setUser({ ...user, password: event.target.value });
      setErrors({
        ...errors,
        passwordError:
          event.target.value.length == 0
            ? "Password is required"
            : event.target.value.length < 8
            ? "Password Should be more than 8 characters."
            : "",
      });
    }
  };
  const { uid, setUid } = useContext(UserContext);
  const userLogin = async (event) => {
    event.preventDefault();
    if (!errors.emailError && !errors.passwordError) {
      console.log(user);
      const userData = await loginWithEmailAndPassword(
        user.email,
        user.password
      );
      console.log(userData);
      if (userData.uid) {
        setUid(userData.uid);
        console.log('uid after login :', uid);
        navigator("/todo");
      }
    }
  };
  const goToRegister = () => {
    navigator("/register");
  };
  return (
    <>
      <div className="container">
        <div className="row m-5 d-flex justify-content-center  bg-secondary-subtle rounded ">
          <h1 className="text-center my-5">Login</h1>
          <Form className="col-5" onSubmit={(e) => userLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
              <p className="text-danger">{errors.emailError}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="row">
                <div className="col-10">
                  <Form.Control
                    type={isPassHidden ? "password" : "text"}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      onInputChange(e);
                    }}
                  />
                </div>
                <div className="col-2 d-flex align-items-center fs-5">
                  {isPassHidden == true ? (
                    <FaRegEyeSlash onClick={() => togglePasswordVisablity()} />
                  ) : (
                    <FaRegEye onClick={() => togglePasswordVisablity()} />
                  )}
                </div>
              </div>
              <p className="text-danger">{errors.passwordError}</p>
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <p className="text-center text-secondary p-0 m-0  my-5">
            don't have an account?{" "}
            <span
              className="text-primary btn p-0 m-0"
              onClick={() => goToRegister()}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
