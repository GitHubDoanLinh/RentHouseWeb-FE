import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Mật khẩu hiện tại không được để trống"),
    password: Yup.string()
      .required("Mật khẩu mới không được để trống")
      .min(8, "Mật khẩu phải có tối thiểu 8 ký tự")
      .matches(/\d/, "Mật khẩu phải có ít nhất 1 số")
      .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ in hoa")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
    confirmPassword: Yup.string()
      .required("Xác nhận mật khẩu không được để trống")
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
  });

  const changePass = (values) => {
    dispatch(changePassword(values)).then((data) => {
      if (data.error) {
        toast.error(`Change Password Failure (${data.error.message})!`, {
          position: "top-right",
        });
      } else {
        toast.success(`Change Password Successfully!`, {
          position: "top-right",
        });
        navigate("/login");
        localStorage.clear();
      }
    });
  };

  return (
    <>
      <div className="col-md-9">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Formik
              initialValues={{
                oldPassword: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema} // Áp dụng Yup schema
              onSubmit={changePass}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="card mb-5">
                    <div className="card-body">
                      <div className="form-group">
                        <label
                          htmlFor="current_password"
                          className="col-form-label required"
                        >
                          Mật khẩu hiện tại
                        </label>
                        <Field
                          name={"oldPassword"}
                          type="password"
                          className={`form-control ${
                            errors.oldPassword && touched.oldPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          id="current_password"
                          placeholder="Nhập mật khẩu hiện tại"
                          required
                        />
                        {errors.oldPassword && touched.oldPassword && (
                          <div className="invalid-feedback">{errors.oldPassword}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="new_current_password"
                          className="col-form-label required"
                        >
                          Mật khẩu mới
                        </label>
                        <Field
                          name={"password"}
                          type="password"
                          className={`form-control ${
                            errors.password && touched.password ? "is-invalid" : ""
                          }`}
                          id="new_current_password"
                          placeholder="Nhập mật khẩu mới"
                          required
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="repeat_new_current_password"
                          className="col-form-label required"
                        >
                          Xác nhận mật khẩu mới
                        </label>
                        <Field
                          name={"confirmPassword"}
                          type="password"
                          className={`form-control ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          id="repeat_new_current_password"
                          placeholder="Xác nhận mật khẩu mới"
                          required
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="invalid-feedback">{errors.confirmPassword}</div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary float-right"
                      >
                        Thay đổi
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
