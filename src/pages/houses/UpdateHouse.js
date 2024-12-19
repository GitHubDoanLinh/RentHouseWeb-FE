import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getAllCategories} from "../../../redux/services/CategoryService";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {CustomCheckboxField, CustomSelectField, CustomTextField} from "../../../components/UI/FormField";
import {getById, update} from "../../../redux/services/HouseService";
import {getAllConvenient} from "../../../redux/services/ConvenientService";
import * as Yup from "yup";
import {toast} from "react-toastify";

export function UpdateHouse() {
    const addSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng nhập đủ thông tin!'),
        price: Yup.number()
            .positive('Số phải lớn hơn 0!')
            .integer('Số phải là số nguyên!')
            .required('Vui lòng nhập đủ thông tin!'),
        location: Yup.string()
            .required('Vui lòng nhập đủ thông tin!'),
        description: Yup.string()
            .required('Vui lòng nhập đủ thông tin!'),
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [fetched, setFetched] = useState(false);
    const {id} = useParams();
    const currentUserId = useSelector(({users}) => {
        return users.currentToken.id;
    })
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
    const save = (values) => {
        let user = {id: currentUserId}
        let convenientIds = values.convenients.map(Number)
        values = (({convenients,userDTO, ...value}) => value)(values)
        values = {...values, convenientIds, user}
        dispatch(update(values)).then((data) => {
            if (data.error) {
                toast.error(`Update House Failure (${data.error.message})!`, {
                    position: "top-right"
                });
            } else {
                toast.success(`Update House  Successfully!`, {
                    position: "top-right"
                });
                navigate(`/manager-house/list-house-user/${currentUserId}`);
            }
        })
    }
    const houses = useSelector(({houses}) => {
        return houses.houseUpdate;
    })
    const categories = useSelector(({categories}) => {
        return categories.listCategories;
    })

    return (
        <>
            <div className="col-md-9 image-div">
            {fetched ? <>
                <h2 style={{textAlign:"center",color:"red"}}>UPDATE YOUR HOUSE</h2>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Formik initialValues={{...houses, convenients: houses.convenients.map(item => item.id)}}
                            enableReinitialize={true}
                            onSubmit={save}
                            validationSchema={addSchema}>
                        <div className="main-formAdd">
                            <Form>
                                <div className="card mb-5">
                                    <div className="card-body">
                                <div className="formAdd">
                                    <div className="row">
                                        <div className="col-4"><CustomTextField name="name" label={"Name"}
                                                                                type={"text"}/>
                                            <div className="validateNamePro">
                                                <p style={{color: "red"}}><ErrorMessage name={"name"}/></p>
                                            </div>
                                        </div>
                                        <div className="col-4"><CustomTextField name="price" label={"Price"}
                                                                                type={"text"}/>
                                            <div className="validateNamePro">
                                                <p style={{color: "red"}}><ErrorMessage name={"price"}/></p>
                                            </div>
                                        </div>
                                        <div className="col-4"><CustomTextField name="location" label={"Location"}
                                                                                type={"text"}/>
                                            <div className="validateNamePro">
                                                <p style={{color: "red"}}><ErrorMessage name={"location"}/></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <CustomTextField name="description" label={"Description"} type={"text"}/>
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
                                    <div className="row input-checkbox">
                                        {
                                            convenients.map((convenient) => {
                                                return (
                                                    <CustomCheckboxField
                                                        defaultChecked={houses.convenients.map(item=>item.id).includes(convenient.id)}
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
                                </div>
                                </div>

                            </Form>
                        </div>

                    </Formik>
                </LocalizationProvider></> : <></>}
            </div>
        </>
    )
}