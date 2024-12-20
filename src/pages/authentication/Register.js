import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {register} from "../../redux/services/UserService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Weather from "../extenstion/Weather";

export default function Register() {
    const dipatch = useDispatch();
    const navigate = useNavigate();
    let handleRegister = (values, setSubmitting) => {
        dipatch(register(values)).then(
            (data) => {
                if (data.error) {
                    console.log(data.error);
                    toast.error(`Đăng ký thất bại (${data.error.message})!`, {
                        position: "top-right"
                    });
                } else {
                    toast.success(`Đăng ký thành công!`, {
                        position: "top-right"
                    });
                    navigate("/login")
                }
            }).catch(() => {
            toast.error("Đăng ký thất bại !", {
                position: "top-left"
            });
        }).finally(() => setSubmitting(false));
    }

    const currentUser = useSelector(({users}) => {
        return users.currentToken;
    });

    if (currentUser) {
        return <Navigate to="/house"/>
    }

    return (
        <>
            <div className="row ht-100v flex-row-reverse no-gutters">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="signup-form">
                        <div className="auth-logo text-center mb-2">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src={require("../extenstion/img/logo_app.png")} className="logo-img"
                                         alt="Logo"/>
                                </div>
                                <div className="col-md-7" style={{marginLeft:"10rem"}}>
                                    <p>Đăng Nhập</p>
                                    <p>Trải nghiệm và tận hưởng dịch vụ</p>
                                </div>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                username: "",
                                password: "",
                                confirmPassword: "",
                                email: ""
                            }}
                            validationSchema={Yup.object({
                                username: Yup.string()
                                    .required('Required')
                                    .matches(
                                        /^\S+$/,
                                        "Yêu cầu tên không có dấu cách"
                                    )
                                ,
                                email: Yup.string()
                                    .required('Required')
                                    .matches(
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail\.com|example\.com\.vn|microsoft\.com\.vn)$/,
                                        'Định dạng email không hợp lệ. Nên kết thúc bằng @gmail.com, @example.com.vn hoặc @microsoft.com.vn'
                                    ),
                                password: Yup.string()
                                    .required('Required')
                                    .min(8, 'Password should be at least 8 characters long')
                                    .matches(
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/,
                                        'Mật khẩu phải có ít nhất một chữ thường, một chữ in hoa, một chữ số và một ký tự đặc biệt, có độ dài tối thiểu là 8 ký tự.'
                                    ),
                                confirmPassword: Yup.string()
                                    .required('Required')
                                    .oneOf([Yup.ref('password')], 'Mật khẩu phải trùng khớp'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                handleRegister(values, setSubmitting)
                            }}
                        >
                            {({ isSubmitting }) => (
                            <Form className="pt-5">
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <Field type="text" name="username"
                                                   className="w-100" as={TextField} label="Username"
                                                   placeholder="Enter username"
                                                   variant="outlined"/>
                                        </div>
                                        <ErrorMessage name="username" component="div" className="error-message"
                                                      style={{color: "red"}}/>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <Field type="text" name="email" placeholder="Enter email" className="w-100"
                                                   as={TextField} label="Email" variant="outlined"/>
                                            <ErrorMessage name="email" component="div" className="error-message"
                                                          style={{color: "red"}}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="form-group">
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                className="w-100" autoComplete="new-password"
                                                as={TextField} label="Password" variant="outlined"
                                            />
                                            <ErrorMessage name="password" component="div" className="error-message"
                                                          style={{color: "red"}}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Enter confirm password" autoComplete="new-password"
                                                className="w-100"
                                                as={TextField} label="ConfirmPassword" variant="outlined"
                                            />
                                            <ErrorMessage name="confirmPassword" component="div"
                                                          className="error-message" style={{color: "red"}}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <p className="agree-privacy" style={{marginBottom:"24px",color:"red"}}>Bằng cách nhấp vào nút Đăng ký bên dưới, bạn đã đồng ý với chính sách bảo mật và điều khoản sử dụng trang web của chúng tôi.</p>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="go-login">Bạn đã là thành viên?<br/> <Link
                                            to="/login"><u>Đăng nhập</u></Link></span>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <div className="form-group">
                                            <Button type="submit" variant="contained" disabled={isSubmitting}>
                                                Đăng ký
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="col-md-6 auth-bg-image d-flex justify-content-center align-items-center">
                    <div className="auth-left-content mt-5 mb-5 text-center">
                        <Weather/>
                        {/*<div className="text-black-50 mt-5 mb-5">*/}
                        {/*    <h2 className="create-account mb-3">Create Account</h2>*/}
                        {/*    <p>Enter your personal details and start journey with us.</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}