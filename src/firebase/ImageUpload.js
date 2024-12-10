import React from 'react';
import {Formik} from 'formik';
import {ref, uploadBytes} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {storage} from "./FireBaseConfig";
import ImagePreview from "../components/UI/ImagePreview";
import './uploadImageStyle.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {add} from "../redux/services/HouseService";
const ImageUploadForm = () => {
    const location = useLocation();
    const propsReceived = location.state;
    console.log(propsReceived);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const uploadImage = async (image) => {
        let images = [];
        images.push(image.name);
        let data = {...propsReceived.data, images}
        console.log(data);
        const storageRef = ref(storage, `images/${image.name + uuidv4()}`);
        await uploadBytes(storageRef, image);
        await  dispatch(add(data)).then(() =>{
            navigate('/user');
        })
    };
    return (
        <Formik
            initialValues={{
                images: []
            }}
            onSubmit={async (values) => {
                for (const image of values.images) {
                    await uploadImage(image);
                }
            }}
        >
            {({values, setFieldValue, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div className={"title-formAddImage"}>
                    <h3>Để hoàn tất việc thêm mới vui lòng thêm ảnh cho ngôi nhà của bạn</h3>
                    </div>
                    <div className="images_upload">
                    <label htmlFor={"input-file"} className={"style-label-uploadImage"}>
                            Select image
                            <input
                                id={"input-file"}
                                type="file"
                                onChange={(e) => {
                                    const newImages = [...values.images, ...Array.from(e.target.files)];
                                    setFieldValue('images', newImages);
                                }}
                                multiple
                            />
                        </label>
                        {/*<button type="button" className={"style-label-uploadImage"}>*/}
                        {/*    Clear Images*/}
                        {/*</button>*/}
                        <button type="submit" className="style-label-uploadImage btn-save">Upload</button>
                    </div>
                    <div className="row" style={{display: 'flex'}}>
                    <div className="col-8">
                            <div className="row">
                                {values.images.map((image, index) => (
                                    <div className="col-4 preview-container">
                                        <ImagePreview
                                            key={index}
                                            image={image}
                                            onRemove={async () => {
                                                const updatedImages = values.images.filter((_, i) => i !== index);
                                                console.log(updatedImages);
                                                await setFieldValue('images', updatedImages);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                    </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};
export default ImageUploadForm;