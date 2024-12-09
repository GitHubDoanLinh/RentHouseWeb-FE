import React from 'react';
import {Formik} from 'formik';
import {ref, uploadBytes} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {storage} from "./FireBaseConfig";
import ImagePreview from "../components/UI/ImagePreview";
import './uploadImageStyle.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addImages} from "../redux/services/ImageService";
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
            navigate('/home');
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
                        <h4>Vui long them anh ngoi nha cua ban</h4>
                    </div>
                    <div className="images_upload">
                        <input
                            type="file"
                            onChange={(e) => {
                                const newImages = [...values.images, ...Array.from(e.target.files)];
                                setFieldValue('images', newImages);
                            }}
                            multiple
                        />
                            <button type="button" className="btn-delete">
                                Clear Images
                            </button>
                        <button type="submit" className="btn-save">Upload</button>
                    </div>
                    <div className="row" style={{display: 'flex'}}>
                        {values.images.map((image, index) => (
                            <div className="col-4">
                                {/*<ImagePreview*/}
                                {/*    key={index}*/}
                                {/*    imageUrl={image.name}*/}
                                {/*    onRemove={() => {*/}
                                {/*        const updatedImages = values.images.filter((_, i) => i !== index);*/}
                                {/*        setFieldValue('images', updatedImages);*/}
                                {/*    }}*/}
                                {/*/>*/}
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
                </form>
            )}
        </Formik>
    );
};
export default ImageUploadForm;