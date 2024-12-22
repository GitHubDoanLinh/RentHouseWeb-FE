import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllHouse, searchHouse } from "../../redux/services/HouseService";
import { getAllCategories } from "../../redux/services/CategoryService";
import { House } from "./House";
import { getAllConvenient } from "../../redux/services/ConvenientService";
import Select from "react-select";
import { useFormik } from "formik";

export default function ListHouse() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.listCategories);
  const houses = useSelector(({ houses }) => {
    return houses.list;
  });

  let listHouseReverse = [...houses].reverse();
  const convenients = useSelector(({ convenients }) => {
    if (convenients.listConvenient) {
      return convenients.listConvenient.map((convenient) => ({
        value: convenient.id,
        label: convenient.name,
      }));
    } else {
      return [];
    }
  });
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "500px",
    }),
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      kitchen: 0,
      minPrice: null,
      maxPrice: null,
      categoryId: 0,
      convenientIds: [0],
    },
    onSubmit: (values) => {
      dispatch(searchHouse(values));
    },
  });
  const handleSelectChange = (selectedOptions) => {
    formik.setFieldValue(
      "convenientIds",
      selectedOptions.map((option) => option.value)
    );
  };
  useEffect(() => {
    dispatch(getAllConvenient());
    dispatch(getAllCategories());
    dispatch(getAllHouse());
  }, []);

  return (
    <>
      <form className="hero-form form pt-5" onSubmit={formik.handleSubmit}>
        <h2
          className="text-danger text-center "
          style={{ marginBottom: "32px !important" }}
        >
          HÃY THUÊ VÀ BÁN NHÀ THEO CÁCH CỦA BẠN
        </h2>
        <div className="container">
          <div className="main-search-form">
            <div className="form-row">
              <div className="col-md-3 col-sm-3">
                <div className="form-group">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="what"
                    placeholder="Nhập tên chỗ nghỉ mà bạn muốn tìm"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="form-group">
                  <input
                    name="location"
                    type="text"
                    className="form-control"
                    id="input-location"
                    placeholder="Nhập vị trí"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                  />
                  <span
                    className="geo-location input-group-addon"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Find My Position"
                  >
                    <i className="fa fa-map-marker"></i>
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div
                  className="form-group"
                  style={{ marginBottom: "0px", height: "100%" }}
                >
                  <select
                    style={{ height: "80%" }}
                    className=""
                    name="categoryId"
                    id="category"
                    placeholder="Chọn danh mục"
                    onChange={formik.handleChange}
                    value={formik.values.categoryId}
                  >
                    <option value="" label="Chọn danh mục" />
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="col-md-3 col-sm-3">
                <button type="submit" className="btn btn-primary width-100">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
          <div className="alternative-search-form">
            <a
              href="#collapseAlternativeSearchForm"
              className="icon"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="collapseAlternativeSearchForm"
            >
              <i className="fa fa-plus"></i>Lựa chọn khác
            </a>
            <div className="collapse" id="collapseAlternativeSearchForm">
              <div className="wrapper">
                <div className="form-row">
                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 d-xs-grid d-flex align-items-center justify-content-between">
                    <label>
                      <Select
                        styles={customStyles}
                        isMulti
                        options={convenients}
                        value={convenients.filter((option) =>
                          formik.values.convenientIds.includes(option.value)
                        )}
                        onChange={handleSelectChange}
                        placeholder="Chọn các tiện nghi"
                        name="convenientIds"
                      />
                    </label>
                  </div>
                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-row">
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <input
                            name="minPrice"
                            type="text"
                            className="form-control small"
                            id="min-price"
                            placeholder="Minimal Price"
                            onChange={formik.handleChange}
                            value={
                              formik.values.minPrice
                                ? formik.values.minPrice
                                : 0
                            }
                          />
                          <span className="input-group-addon small">$</span>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <input
                            name="maxPrice"
                            type="text"
                            className="form-control small"
                            id="max-price"
                            placeholder="Maximal Price"
                            onChange={formik.handleChange}
                            value={
                              formik.values.maxPrice
                                ? formik.values.maxPrice
                                : 0
                            }
                          />
                          <span className="input-group-addon small">$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <section className="content">
        <section className="block">
          <div className="container">
            <div className="section-title clearfix">
              <div className="float-xl-left float-md-left float-sm-none">
                <h2>Danh sách gần đây</h2>
              </div>
            </div>

            <div className="items masonry grid-xl-4-items grid-lg-3-items grid-md-2-items">
              {listHouseReverse &&
                listHouseReverse.map((item) => {
                  return <House key={item.id} item={item} />;
                })}
            </div>
            <div className="center">
              <a href="#" className="btn btn-primary btn-framed btn-rounded">
                Tải thêm
              </a>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
