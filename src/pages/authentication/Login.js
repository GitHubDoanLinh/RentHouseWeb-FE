import { useDispatch } from "react-redux";
import { login } from "../../reudux/services/UserService";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = (value) => {
    dispatch(
      login(value).then((data) => {
        console.log(data);
      })
    );
  };
  return (
    <> 
        <div className="page-title">
                <div className="container">
                    <h1>Sign In</h1>
                </div>
            </div>
            <section className="content">
                <section className="block">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <Formik className="form clearfix" 
                                initialValues={
                                    {
                                        username: "",
                                        password: ""
                                    }
                                }
                                onSubmit={loginUser}>
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-form-label required">UserName</label>
                                            <Field name="username" type="text" className="form-control" id="email"
                                                   placeholder="UserName" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password"
                                                   className="col-form-label required">Password</label>
                                            <Field name="password" type="password" className="form-control"
                                                   id="password"
                                                   placeholder="Password" required/>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-baseline">
                                            <label>
                                                <input type="checkbox" name="remember" value="1"/>
                                                Remember Me
                                            </label>
                                            <button type="submit" className="btn btn-danger">Sign In</button>
                                        </div>
                                    </Form>
                                </Formik>
                                <hr/>
                                <p>
                                    Troubles with signing? <a href="#" className="link">Click here.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
    </>
  );
}

export default Login;
