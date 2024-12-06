import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../reudux/services/UserService";
import { Field, Form, Formik } from "formik";

export default function Register() {
    const dipatch = useDispatch();
    const navigate = useNavigate();
    let registerUser = (value) => {
        dipatch(register(value)).then((data) => {
            navigate("/home/login")
        })
    }
    return (
        <>
            <div className="page-title">
                <div className="container">
                    <h1>Register</h1>
                </div>
            </div>
            <section className="content">
                <section className="block">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8">
                                <Formik className="form clearfix" initialValues={{
                                    username: "",
                                    password: "",
                                    confirmPassword: "",
                                    email: ""
                                }} onSubmit={registerUser}>
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="name" className="col-form-label required">User Name</label>
                                            <Field name="username" type="text" className="form-control" id="name"
                                                   placeholder="User Name" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-form-label required">Email</label>
                                            <Field name="email" type="email" className="form-control" id="email"
                                                   placeholder="Your Email" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password"
                                                   className="col-form-label required">Password</label>
                                            <Field name="password" type="password" className="form-control"
                                                   id="password"
                                                   placeholder="Password" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="repeat_password" className="col-form-label required">Repeat
                                                Password</label>
                                            <Field name="confirmPassword" type="password" className="form-control"
                                                   id="repeat_password" placeholder="Repeat Password" required/>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-baseline">
                                            <label>
                                                <input type="checkbox" name="newsletter" value="1"/>
                                                Receive Newsletter
                                            </label>
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </Form>
                                </Formik>
                                <hr/>
                                <p>
                                    By clicking "Register" button, you agree with our <Link to={"/login"}>Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}
