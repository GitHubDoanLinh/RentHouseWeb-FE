import {useDispatch, useSelector} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getUser, login} from "../../redux/services/UserService";
import {Link, Navigate, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Weather from "../extenstion/Weather";
import "./Login.css"
import {toast} from "react-toastify";
import { Knock } from "@knocklabs/node";
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loginUser = (value) => {
        dispatch(login(value)).then((data) => {
            if (data.error) {
                navigate("/login")
                toast.error(`Đăng nhập thất bại (${data.error.message})!`, {
                    position: "top-right"
                });
            }
            else {
                dispatch(getUser(data.payload.id)).then(async (res)=>{
                    const knockClient = new Knock(process.env.REACT_APP_KNOCK_API_KEY);
                    await knockClient.users.bulkIdentify(
                        [
                            {
                                id: String(res.payload.id),
                                name: String(res.payload.username),
                                email: String(res.payload.email),
                              },
                        ]);
                })
                navigate("/house");
                toast.success(`Đăng nhập thành công!`, {
                    position: "top-right"
                });

            }
            // TODO: Gọi API để lấy  thông tin user sau khi đăng nhập thành công
            // axios.get(`http://localhost:8080/users/${data.data.id}`).then(resp => {
            //     console.log(resp);
                // TODO: lưu vào localstorage trường role
            // });

        })
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
                        <div className="auth-logo text-center mb-5">
                            <div className="row title-website">
                                <div className="col-md-2">
                                    <img src={require("../extenstion/img/logo_app.png")} className="logo-img" alt="Logo"/>
                                </div>
                                <div className="col-md-7" style={{marginLeft:"10rem"}}>
                                    <p>Đăng Nhập</p>
                                    <p>Trải nghiệm và tận hưởng dịch vụ</p>
                                </div>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            validationSchema={Yup.object({
                                username: Yup.string()
                                    .required('Required')
                                ,
                                password: Yup.string()
                                    .required('Required')
                                    .min(8, 'Mật khẩu phải dài ít nhất 8 ký tự')
                                    .matches(
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d@$!%*?&]{8,}$/,
                                        'Mật khẩu phải có ít nhất một chữ thường, một chữ in hoa, một chữ số và một ký tự đặc biệt, có độ dài tối thiểu là 8 ký tự.'
                                    )
                            })}
                            onSubmit={loginUser}
                        >
                                <Form>
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <Field className="form-control"
                                                       type="text"
                                                       id="email"
                                                       name="username"
                                                       label="UserName"
                                                       as={TextField}
                                                       autoComplete="email"
                                                />
                                                <ErrorMessage name="username" component="div" className="error-message" style={{color:"red"}}/>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <Field className="form-control"
                                                       type="password"
                                                       id="password"
                                                       name="password"
                                                       label="Password"
                                                       as={TextField}
                                                       autoComplete="current-password"
                                                       variant="outlined"
                                                />
                                                <ErrorMessage name="password" component="div"
                                                              className="error-message" style={{color:"red"}}/>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <Link>Bạn quên mật khẩu?</Link>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <div className="form-group">
                                                <center>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        Đăng nhập
                                                    </Button>
                                                </center>
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-center mt-5">
                                          <span className="go-login">
                                              Bạn chưa là thành viên? <Link to="/register"><u>Đăng ký</u></Link>
                                          </span>
                                        </div>
                                    </div>
                                </Form>
                        </Formik>
                    </div>
                </div>
                <div className="col-md-6 auth-bg-image d-flex justify-content-center align-items-center">
                    <div className="auth-left-content mt-5 mb-5 text-center">
                        <Weather/>
                        {/*<div className="text-title mt-5 mb-5">*/}
                        {/*    <h1 className="create-account mb-3">Welcome Back</h1>*/}
                        {/*    <p>Thank you for joining. Updates and new features are released daily.</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}