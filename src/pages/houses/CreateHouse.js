import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../reudux/services/HouseService";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Field, Form, Formik } from "formik";
import FormField from "../../components/UI/FormField";
function CreateHouse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addHouse = (values) => {
    dispatch(add(values)).then(() => {
      navigate("home/houses");
    });
  };
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
          }} onSubmit={addHouse}
        >
          <div className="main-formAdd">
            <Form>
              <div className="formAdd">
                <div className="row">
                  <div className="col-4"><FormField name="title" label={"Name"}  type={"text"} /></div>
                  <div className="col-4"><FormField name="price" label={"Price"}  type={"text"}/></div>
                  <div className="col-4"><FormField name="location" label={"Location"}  type={"text"}/></div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <FormField name="description" label={"Description"}  type={"text"}/>
                </div>
                <div className="col-4"><FormField name="category" label={"Category"}  type={"text"}/></div>
              </div>
              <div className="row">
                <div className="col-3"><FormField name="bedRoom" label={"Bed Room"}  type={"text"}/></div>
                <div className="col-3"> <FormField name="bathRoom" label={"Bath Room"}  type={"text"}/></div>
                <div className="col-3"><FormField name="livingRoom" label={"Living Room"}  type={"text"}/></div>
                <div className="col-3"><FormField name="kitchen" label={"Kitchen"}  type={"text"}/></div>
              </div>
              <div className="row">
                <Field name="user" type="hidden" value={"defaultValue"} />
                <button className="btn btn-success" type={"submit"}>Next</button>
              </div>
            </Form>
          </div>
        </Formik>
      </LocalizationProvider>
    </>
  );
}

export default CreateHouse;
