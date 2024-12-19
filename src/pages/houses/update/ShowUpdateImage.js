import ImagePreview from "../../../components/UI/ImagePreview";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {addImages, getImageByHouseId, removeImageById} from "../../../redux/services/ImageService";
import FormUpdate from "./ImageUpdate";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../firebase/FireBaseConfig";
import {v4 as uuidv4} from "uuid";
import {Formik} from "formik";
import {id} from "date-fns/locale";
import {toast} from "react-toastify";

export default function ShowFormImageUpdate () {
    const currentUserId = useSelector(({users}) => {
        return users.currentToken.id;
    })
    const navigate = useNavigate();
    const {id} = useParams()
    const dispatch = useDispatch();
    const images = useSelector(({images}) => {
        return images.listImage;
    })
    useEffect(() => {
        dispatch(getImageByHouseId(id))
    }, []);
    function handleDelete(idImage) {
        // eslint-disable-next-line no-restricted-globals
        let isConfirmed = confirm("Are you sure you want to delete this image ?");
        // eslint-disable-next-line no-restricted-globals
        if (isConfirmed)    {
            dispatch(removeImageById(idImage)).then((data)=> {
                if (data.error) {
                    toast.error(`Delete Image Failure (${data.error.message})!`, {
                        position: "top-right"
                    });
                } else {
                    toast.success(`Delete Image Successfully!`, {
                        position: "top-right"
                    });
                    dispatch(getImageByHouseId(id))
                }

            })
        }
        else {
            alert("Oke la")
        }
    }
    return (
        <>
            <div className="col-md-9 image-div">
            <div><h3>Click vào góc phải ảnh để xoá ảnh</h3></div>
            <div className="row" style={{display: 'flex'}}>
                <div className="col-8">
                    <div className="row">
                        {images.map((image, index) => (
                            <div className="col-4 preview-container" key={index}>
                                <FormUpdate
                                    image={image.image}
                                    onRemove={ () => {
                                        handleDelete(image.id)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Formik
                initialValues={{
                    images: []
                }}
                onSubmit={async (values) => {
                    const imagesToUpload = values.images;
                    if (imagesToUpload.length === 0) {
                        console.warn('No images selected');
                        return;
                    }
                    const imageList = [];
                    for (const image of imagesToUpload) {
                        const imageRef = ref(storage, `images/${image.name + uuidv4()}`);
                        await uploadBytes(imageRef, image);
                        const imageUrl = await getDownloadURL(imageRef);
                        imageList.push(imageUrl);
                    }
                    const data =[];
                    data.push(id);
                    data.push(imageList)
                    await dispatch(addImages(data)).then((data) => {
                        if (data.error) {
                            toast.error(`Add Image Failure (${data.error.message})!`, {
                                position: "top-right"
                            });
                        } else {
                            toast.success(`Add Image Successfully!`, {
                                position: "top-right"
                            });
                            navigate(`/manager-house/list-house-user/${currentUserId}`);
                        }

                    });
                }}
            >
                {({values, setFieldValue, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div className={"title-formAddImage"}>
                            <h3>Thêm ảnh mới vào album</h3>
                        </div>
                        <div className="images_upload">
                            <label htmlFor="input-file" className="style-label-uploadImage">
                                Select image
                                <input
                                    id="input-file"
                                    type="file"
                                    onChange={(e) => {
                                        const newImages = [...values.images, ...Array.from(e.target.files)];
                                        setFieldValue('images', newImages);
                                    }}
                                    multiple
                                />
                            </label>
                            <button type="submit" className="style-label-uploadImage btn-save">
                                Upload
                            </button>
                        </div>


                        <div className="row" style={{display: 'flex'}}>
                            <div className="col-8">
                                <div className="row">
                                    {values.images.map((image, index) => (
                                        <div className="col-4 preview-container" key={index}>
                                            <ImagePreview
                                                image={image}
                                                onRemove={async () => {
                                                    const updatedImages = values.images.filter((_, i) => i !== index);
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
            </div>

        </>
    )
}