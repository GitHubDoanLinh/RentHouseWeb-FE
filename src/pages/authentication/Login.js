import { useDispatch } from "react-redux";
import { login } from "../../redux/services/UserService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Weather from "../extension/Weather";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = (value) => {
    dispatch(login(value)).then(() => {
      navigate("user/house");
    });
  };
  return (
    <>
      <div className="row ht-100v flex-row-reverse no-gutters">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="signup-form">
            <div className="auth-logo text-center mb-5">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src={require("../extension/img/logo_app.png")}
                    className="logo-img"
                    alt="Logo"
                  />
                </div>
                <div className="col-md-7">
                  <p>Login</p>
                  <span>Enjoy the sublime</span>
                </div>
              </div>
            </div>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={Yup.object({
                username: Yup.string().required("Required"),
                password: Yup.string()
                  .required("Required")
                  .min(8, "Password should be at least 8 characters long")
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character, with a minimum length of 8 characters."
                  ),
              })}
              onSubmit={loginUser}
            >
              <Form>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <Field
                        className="form-control"
                        type="text"
                        id="email"
                        name="username"
                        label="UserName"
                        as={TextField}
                        autoComplete="email"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <Field
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        as={TextField}
                        autoComplete="current-password"
                        variant="outlined"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <Link>Forgot password?</Link>
                  </div>
                  <div className="col-md-6 text-right">
                    <div className="form-group">
                      <center>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Sign In
                        </Button>
                      </center>
                    </div>
                  </div>
                  <div className="col-md-12 text-center mt-5">
                    <span className="go-login">
                      Not yet a member?{" "}
                      <Link to="/register">
                        <u>Sign Up</u>
                      </Link>
                    </span>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="col-md-6 auth-bg-image d-flex justify-content-center align-items-center">
          <div className="auth-left-content mt-5 mb-5 text-center">
            <Weather />
            <div className="text-white mt-5 mb-5">
              <h2 className="create-account mb-3">Welcome Back</h2>
              <p>
                Thank you for joining. Updates and new features are released
                daily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
