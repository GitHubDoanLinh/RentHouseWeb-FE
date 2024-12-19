import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllConvenient } from "../../../redux/services/ConvenientService";
import { getAllCategories } from "../../../redux/services/CategoryService";
import { getById, update } from "../../../redux/services/HouseService";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  CustomCheckboxField,
  CustomSelectField,
  CustomTextField,
} from "../../../components/UI/FormField";
import * as Yup from "yup";

export function UpdateHouse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập đủ thông tin!"),
    price: Yup.number()
      .positive("Số phải lớn hơn 0!")
      .integer("Số phải là số nguyên!")
      .required("Vui lòng nhập đủ thông tin!"),
    location: Yup.string().required("Vui lòng nhập đủ thông tin!"),
    description: Yup.string().required("Vui lòng nhập đủ thông tin!"),
  });
  const [fetched, setFetched] = useState(false);
  const { id } = useParams();
  const currentUserId = useSelector(({users}) => {
    return users.currentToken.id;
})
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllConvenient());
      await dispatch(getAllCategories());
      await dispatch(getById(id));
      setFetched(true);
    };
    fetchData();
  }, []);
  const convenients = useSelector(({ convenients }) => {
    return convenients.listConvenient;
  });

  const save = (values) => {
    // values.convenients.map(Number)
    let convenientIds = values.convenients.map(item => item.id);
    values = (({ convenients, ...value }) => value)(values);
    values = { ...values, convenientIds };
    dispatch(update(values)).then(() => {
      navigate("/user");
    });
  };
  const houses = useSelector(({ houses }) => {
    return houses.houseUpdate;
  });

  const categories = useSelector(({ categories }) => {
    return categories.listCategories;
  });

  return (
    <>
      {fetched ? (
        <>
          <h2>UPDATE YOUR HOUSE</h2>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Formik
              initialValues={houses}
              enableReinitialize={true}
              onSubmit={save}
              validationSchema={addSchema}
            >
              <div className="main-formAdd">
                <Form>
                  <div className="formAdd">
                    <div className="row">
                      <div className="col-4">
                        <CustomTextField
                          name="name"
                          label={"Name"}
                          type={"text"}
                        />
                        <div className="validateNamePro">
                            <p style={{color: "red"}}><ErrorMessage name={"name"}/></p>
                        </div>
                      </div>
                      <div className="col-4">
                        <CustomTextField
                          name="price"
                          label={"Price"}
                          type={"text"}
                        />
                        <div className="validateNamePro">
                          <p style={{color: "red"}}><ErrorMessage name={"price"}/></p>
                        </div>
                      </div>
                      <div className="col-4">
                        <CustomTextField
                          name="location"
                          label={"Location"}
                          type={"text"}
                        />
                        <div className="validateNamePro">
                              <p style={{color: "red"}}><ErrorMessage name={"location"}/></p>
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
                            <p style={{color: "red"}}><ErrorMessage name={"description"}/></p>
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
                      <Field name="user.id" type="hidden" value={currentUserId}/>
                    </div>
                    <div className="row input-checkbox">
                      {convenients.map((convenient) => {
                        return (
                          <CustomCheckboxField
                            defaultChecked={houses.convenients.map(item=>item.id).includes(convenient.id)}
                            key={convenient.id}
                            name="convenients"
                            value={convenient.id}
                            label={convenient.name}
                          />
                        );
                      })}
                    </div>
                    <div className="row btn-checkbox">
                      <button type="submit" className="btn btn-success">
                        UPDATE
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </Formik>
          </LocalizationProvider>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
