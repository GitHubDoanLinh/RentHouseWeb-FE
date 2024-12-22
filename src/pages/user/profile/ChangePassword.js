import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changePass = (values) => {
    dispatch(changePassword(values)).then((data) => {
      if (data.error) {
        toast.error(`Change Password Failure (${data.error.message})!`, {
          position: "top-right",
        });
      } else {
        toast.success(`Change Password   Successfully!`, {
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
              onSubmit={changePass}
            >
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
                        className="form-control"
                        id="current_password"
                        placeholder="Nhập mật khẩu hiện tại"
                        required
                      />
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
                        className="form-control"
                        id="new_current_password"
                        placeholder="Nhập mật khẩu mới"
                        required
                      />
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
                        className="form-control"
                        id="repeat_new_current_password"
                        placeholder="Xác nhận mật khẩu mới"
                        required
                      />
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
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
