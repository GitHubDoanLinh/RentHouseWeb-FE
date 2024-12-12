import { useDispatch } from "react-redux"
import { changePassword } from "../../../redux/services/UserService";
import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changePass = (values) => {
       dispatch(changePassword(values)).then(()=>{
            navigate("/login")
            localStorage.clear();
       })
    }
    return (
        <>
            <div className="col-md-9">
                <form className="form">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Formik 
                                initialValues={
                                    {
                                        oldPassword: "",
                                        password: "",
                                        confirmPassword: ""
                                    }
                            } onSubmit={changePass}>
                                <Form>
                                   <div className="form-group">
                                        <label htmlFor="current_password" className="col-form-label required">Current
                                            Password</label>
                                        <Field name={"oldPassword"} type="password" className="form-control"
                                               id="current_password" placeholder="Current Password" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="new_current_password"
                                               className="col-form-label required">New Password</label>
                                        <Field name={"password"} type="password"
                                               className="form-control" id="new_current_password"
                                               placeholder="New Password" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="repeat_new_current_password"
                                               className="col-form-label required">Repeat Password</label>
                                        <Field name={"confirmPassword"} type="password"
                                               className="form-control" id="repeat_new_current_password"
                                               placeholder="Repeat New Password" required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary float-right">Change
                                        Password
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword
