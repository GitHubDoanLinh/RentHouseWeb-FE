import { ErrorMessage, Field, Form, Formik } from "formik";
import "./FormAdd.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  CustomSelectField,
  CustomTextField,
} from "../../../components/UI/FormField";
import { getAllCategories } from "../../../redux/services/CategoryService";
import * as Yup from "yup";

export default function CreateHouse() {
  const addSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập đủ thông tin!"),
    price: Yup.number()
      .positive("Số phải lớn hơn 0!")
      .integer("Số phải là số nguyên!")
      .required("Vui lòng nhập đủ thông tin!"),
    location: Yup.string().required("Vui lòng nhập đủ thông tin!"),
    description: Yup.string().required("Vui lòng nhập đủ thông tin!"),
  });
  const currentUserId = useSelector(({ users }) => {
    return users.currentToken.id;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = (values) => {
    const propsToPass = {
      data: values,
    };
    navigate("convenient", {
      state: propsToPass,
      replace: true,
    });
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const categories = useSelector(({ categories }) => {
    return categories.listCategories;
  });

  return (
    <>
      <h2>ADD HOUSE</h2>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: 0.0,
            location: "",
            bedRoom: 0,
            bathRoom: 0,
            livingRoom: 0,
            kitchen: 0,
            category: {
              id: 0,
            },
            user: {
              id: 0,
            },
          }}
          onSubmit={handleNext}
          validationSchema={addSchema}
        >
          <div className="main-formAdd">
            <Form>
              <div className="formAdd">
                <div className="row">
                  <div className="col-4">
                    <CustomTextField name="name" label={"Name"} type={"text"} />
                    <div className="validateNamePro">
                      <p style={{ color: "red" }}>
                        <ErrorMessage name={"name"} />
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <CustomTextField
                      name="price"
                      label={"Price"}
                      type={"text"}
                    />
                    <div className="validateNamePro">
                      <p style={{ color: "red" }}>
                        <ErrorMessage name={"price"} />
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <CustomTextField
                      name="location"
                      label={"Location"}
                      type={"text"}
                    />
                    <div className="validateNamePro">
                      <p style={{ color: "red" }}>
                        <ErrorMessage name={"location"} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <CustomTextField
                      name="description"
                      label={"Description"}
                      type={"text"}
                    />
                    <div className="validateNamePro">
                      <p style={{ color: "red" }}>
                        <ErrorMessage name={"description"} />
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <CustomSelectField
                      name="category.id"
                      label="Select Category"
                      options={categories}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <CustomTextField
                      name="bedRoom"
                      label={"Bed Room"}
                      type={"text"}
                    />
                  </div>
                  <div className="col-3">
                    <CustomTextField
                      name="bathRoom"
                      label={"Bath Room"}
                      type={"text"}
                    />
                  </div>
                  <div className="col-3">
                    <CustomTextField
                      name="livingRoom"
                      label={"Living Room"}
                      type={"text"}
                    />
                  </div>
                  <div className="col-3">
                    <CustomTextField
                      name="kitchen"
                      label={"Kitchen"}
                      type={"text"}
                    />
                  </div>
                </div>

                <div className="row">
                  <Field name="user.id" type="hidden" value={currentUserId} />
                  <button className="btn btn-success" type={"submit"}>
                    Next
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Formik>
      </LocalizationProvider>
    </>
  );
}
