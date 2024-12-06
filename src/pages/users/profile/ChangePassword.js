import { useDispatch } from "react-redux"
import { changePassword } from "../../../reudux/services/UserService";
import { Form, Formik, Field } from "formik";

function ChangePassword() {
    const dispatch = useDispatch();
    const changePass = (value) => {
        console.log("CHANGEPASS : " + value)
        dispatch(changePassword(value))
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
                                    {/*<div className="form-group">*/}
                                    {/*    <label htmlFor="current_password" className="col-form-label required">Current*/}
                                    {/*        Password</label>*/}
                                    {/*    <Field name={"oldPassword"} type="password" className="form-control"*/}
                                    {/*           id="current_password" placeholder="Current Password" required/>*/}
                                    {/*</div>*/}
                                    {/*<div className="form-group">*/}
                                    {/*    <label htmlFor="new_current_password"*/}
                                    {/*           className="col-form-label required">New Password</label>*/}
                                    {/*    <Field name={"password"} type="password"*/}
                                    {/*           className="form-control" id="new_current_password"*/}
                                    {/*           placeholder="New Password" required/>*/}
                                    {/*</div>*/}
                                    {/*<div className="form-group">*/}
                                    {/*    <label htmlFor="repeat_new_current_password"*/}
                                    {/*           className="col-form-label required">Repeat Password</label>*/}
                                    {/*    <Field name={"confirmPassword"} type="password"*/}
                                    {/*           className="form-control" id="repeat_new_current_password"*/}
                                    {/*           placeholder="Repeat New Password" required/>*/}
                                    {/*</div>*/}
                                    {/*<button type="submit" className="btn btn-primary float-right">Change*/}
                                    {/*    Password*/}
                                    {/*</button>*/}
                                    <Field name={"oldPassword"} placeholder={"oldPassword"} type={'text'}/>
                                    <Field name={"password"} placeholder={"password"} type={'text'}/>
                                    <Field name={"confirmPassword"} placeholder={"confirmPassword"} type={'text'}/>
                                    <button type={"submit"}> submit</button>
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
