import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { editDetailUser, getUser } from "../../../redux/services/UserService";
import { useState } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { storage } from "../../../firebase/FireBaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {v4 as uuidv4} from "uuid";

function ProfileDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams();

    useEffect(()=>{
        dispatch(getUser(id))
    },[dispatch, id])

    const personalInfo = useSelector(({users}) => {
        return users.currentUser;
    })

    const [user, setUser] = useState(personalInfo)

    useEffect(() => {
        setUser(personalInfo)
    }, [personalInfo]);

    const handleSaveChanges = (values, setSubmitting) => {
        const request = {...values, user}
        dispatch(editDetailUser(request))
            .then(
                (data) => {
                    if (data.error) {
                        toast.error(`Cập nhật thông tin thất bại (${data.error.message})!`, {
                            position: "top-right"
                        });
                    } else {
                        toast.success(`Cập nhật thông tin thành công!`, {
                            position: "top-right"
                        });
                    }
                }
            ).catch(() => {
                toast.error("Cập nhật thông tin thất bại !", {
                    position: "top-right"
                });
            }).finally(() => setSubmitting(false));
    };

    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        setLoading(true)
        const files = e.target.files;
        if (files[0]) {
            const imageRef = ref(storage, `images/${files[0].name + uuidv4()}`);
            await uploadBytes(imageRef, files[0]);
            const imageUrl = await getDownloadURL(imageRef);
            setUser((prevUser) => ({...prevUser, imageUser: imageUrl}))
            setLoading(false)
        }
        setLoading(false)
    }
    
    if (!user && !user.imageUser) {
        return (
            <>
                loading
            </>
        )
    }
    return (
        <>
            <div className="col-md-9">
                {user && <Formik className="form" initialValues={user} onSubmit={(values, { setSubmitting }) => {
                    handleSaveChanges(values, setSubmitting)
                }}
                                 enableReinitialize={true}>
                    {({ isSubmitting }) => (
                    <Form>
                        <div className="card mb-5">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h2 className="mb-1 border-bottom">Thông tin cá nhân</h2>
                                        <section className="mb-1">
                                            <div className="form-group">
                                                <label htmlFor="location" className="col-form-label required">Tên đăng nhập</label>
                                                <Field name="username" type="text" className="form-control" id="input-location2"
                                                       placeholder="Your UserName" required disabled/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="location" className="col-form-label required">Họ và tên</label>
                                                <Field name="fullName" type="text" className="w-100" id="input-location2"
                                                       placeholder="Nhập tên đầy đủ của bạn" required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="location" className="col-form-label required">Địa chỉ</label>
                                                <Field name="address" type="text" className="w-100" id="input-location2"
                                                       placeholder="Nhập địa chỉ của bạn" required/>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="location" className="col-form-label required">Tuổi</label>
                                                        <Field name="age" type="number" className="w-100" id="input-location2"
                                                               placeholder="Nhập tuổi của bạn" required/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="location" className="col-form-label required">Ngày tháng năm sinh</label>
                                                        <Field name="dateOfBirth" type="date" className="w-100"
                                                               id="input-location2"
                                                               placeholder="Nhập ngày tháng năm sinh của bạn" required/>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section className="mb-1">
                                            <h2 className="mb-1 border-bottom">Liên hệ</h2>
                                            <div className="form-group">
                                                <label htmlFor="phone" className="col-form-label">Số điện thoại</label>
                                                <Field name="phone" type="text" className="w-100" id="phone"
                                                       placeholder="Nhập số điện thoại của bạn"/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email" className="col-form-label">Email</label>
                                                <Field name="email" type="email" className="form-control" id="email"
                                                       placeholder="Nhập địa chỉ email của bạn" disabled/>
                                            </div>
                                        </section>
                                        <section className="text-center">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Lưu</button>
                                        </section>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="">
                                            <img className="img-fluid rounded border shadow" src={user.imageUser ?? ''} alt=""/>
                                            <div className="single-file-input">
                                                <label className="btn btn-framed btn-primary small" htmlFor={"user_image"}>

                                                    <input type="file" id="user_image" name="user_image" onChange={(e) => {
                                                        handleUpload(e)
                                                    }}/>

                                                    {loading ? 'Uploading...' : 'Tải ảnh lên'}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                    )}
                </Formik>
                }
            </div>
        </>
    )
}

export default ProfileDetail
