import React from "react";
import { Formik } from "formik";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./FireBaseConfig";
import ImagePreview from "../components/UI/ImagePreview";
import "./uploadImageStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/services/HouseService";
import { toast } from "react-toastify";

const ImageUploadForm = () => {
  const location = useLocation();
  const propsReceived = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserId = useSelector(({ users }) => {
    return users.currentToken.id;
  });

  return (
    <Formik
      initialValues={{
        images: [],
      }}
      onSubmit={async (values) => {
        const imagesToUpload = values.images;
        if (imagesToUpload.length === 0) {
          console.warn("No images selected");
          return;
        }
        console.log(imagesToUpload);
        const images = [];
        for (const image of imagesToUpload) {
          const imageRef = ref(storage, `images/${image.name + uuidv4()}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          images.push(imageUrl);
        }
        let data = { ...propsReceived, images };
        await dispatch(add(data)).then((data) => {
          if (data.error) {
            console.log(data.error);
            toast.error(`Create House Failure (${data.error.message})!`, {
              position: "top-right",
            });
          } else {
            toast.success(`Đăng nhà cho thuê thành công!`, {
              position: "top-right",
            });
            navigate(`house`);
            navigate(`/manager-house/list-house-user/${currentUserId}`);
          }
        });
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <div className="col-md-9 image-div">
          <form onSubmit={handleSubmit}>
            <div className="card mb-5">
              <div className="card-body">
                <div className={"title-formAddImage"}>
                  <h3>
                    Để hoàn tất việc thêm mới vui lòng thêm ảnh cho ngôi nhà của
                    bạn
                  </h3>
                </div>
                <div className="images_upload">
                  <label
                    htmlFor="input-file"
                    className="style-label-uploadImage"
                  >
                    Select image
                    <input
                      id="input-file"
                      type="file"
                      onChange={(e) => {
                        const newImages = [
                          ...values.images,
                          ...Array.from(e.target.files),
                        ];
                        setFieldValue("images", newImages);
                      }}
                      multiple
                    />
                  </label>
                  <button
                    type="submit"
                    className="style-label-uploadImage btn-save"
                  >
                    Upload
                  </button>
                </div>

                <div className="row" style={{ display: "flex" }}>
                  <div className="col-8">
                    <div className="row">
                      {values.images.map((image, index) => (
                        <div className="col-4 preview-container" key={index}>
                          <ImagePreview
                            image={image}
                            onRemove={async () => {
                              const updatedImages = values.images.filter(
                                (_, i) => i !== index
                              );
                              await setFieldValue("images", updatedImages);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default ImageUploadForm;