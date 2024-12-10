import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllConvenient } from "../../../reudux/services/ConvenientService";
import { getAllCategories } from "../../../reudux/services/CategoryService";
import { getById, update } from "../../../reudux/services/HouseService";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Field, Form, Formik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CustomCheckboxField, CustomSelectField, CustomTextField } from "../../../components/UI/FormField";

export function UpdateHouse() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [fetched, setFetched] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllConvenient());
            await dispatch(getAllCategories());
            await dispatch(getById(id));
            setFetched(true)
        }
        fetchData();
    }, []);
    const convenients = useSelector(({convenients}) => {
        return convenients.listConvenient;
    })
    console.log(convenients);

    const save = (values) => {
        // values.convenients.map(Number)
        let convenientIds = values.convenients.map(Number)
        values = (({convenients, ...value}) => value)(values)
        values = {...values, convenientIds}
        console.log(values)
        dispatch(update(values)).then(() => {
            navigate('/user');
        })
    }
    const houses = useSelector(({houses}) => {
        return houses.houseUpdate;
    })
    console.log(houses)

    const categories = useSelector(({categories}) => {
        return categories.listCategories;
    })

    return(
        <>
           {fetched ? <><h2>UPDATE YOUR HOUSE</h2>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Formik initialValues={houses}
                            enableReinitialize={true}
                            onSubmit={save}>
                        <div className="main-formAdd">
                            <Form>
                                <div className="formAdd">
                                    <div className="row">
                                        <div className="col-4"><CustomTextField name="name" label={"Name"}
                                                                                type={"text"}/>
                                        </div>
                                        <div className="col-4"><CustomTextField name="price" label={"Price"}
                                                                                type={"text"}/>
                                        </div>
                                        <div className="col-4"><CustomTextField name="location" label={"Location"}
                                                                                type={"text"}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <CustomTextField name="description" label={"Description"} type={"text"}/>
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
                                        <div className="col-3"><CustomTextField name="bedRoom" label={"Bed Room"}
                                                                                type={"text"}/></div>
                                        <div className="col-3"><CustomTextField name="bathRoom" label={"Bath Room"}
                                                                                type={"text"}/></div>
                                        <div className="col-3"><CustomTextField name="livingRoom" label={"Living Room"}
                                                                                type={"text"}/></div>
                                        <div className="col-3"><CustomTextField name="kitchen" label={"Kitchen"}
                                                                                type={"text"}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <Field name="user.id" type="hidden" value={1}/>
                                    </div>
                                    <div className="row input-checkbox">
                                        {
                                            convenients.map((convenient) => {
                                                return (
                                                    <CustomCheckboxField
                                                        defaultChecked={houses.convenients.includes("" + convenient.id)}
                                                        key={convenient.id}
                                                        name="convenients"
                                                        value={convenient.id}
                                                        label={convenient.name}
                                                    />
                                                )
                                            })}
                                    </div>
                                    <div className="row btn-checkbox">
                                        <button type="submit" className="btn btn-success">UPDATE</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Formik>
                </LocalizationProvider></> : <></>}
        </>
    )
}