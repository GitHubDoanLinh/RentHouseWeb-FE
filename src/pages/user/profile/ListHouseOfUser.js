import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getById, getHouseByUser } from "../../../redux/services/HouseService";
import { Link, useParams } from "react-router-dom";
export default function ListHouseOfUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const listHouseByUserId = useSelector(({ houses }) => {
    console.log("+++++++", houses.listByUser);
    return houses.listByUser;
  });
  useEffect(() => {
    dispatch(getHouseByUser(id));
  }, []);
  return (
    <>
      <div className="col-md-9">
        <div className="section-title clearfix">
          <div className="float-left float-xs-none">
            <label className="mr-3 align-text-bottom">Sort by: </label>
            <select
              name="sorting"
              id="sorting"
              className="small width-200px"
              data-placeholder="Default Sorting"
            >
              <option value="">Default Sorting</option>
              <option value="1">Newest First</option>
              <option value="2">Oldest First</option>
              <option value="3">Lowest Price First</option>
              <option value="4">Highest Price First</option>
            </select>
          </div>
          <div className="float-right d-xs-none thumbnail-toggle">
            <a
              href="#"
              className="change-class"
              data-change-from-class="list"
              data-change-to-class="grid"
              data-parent-class="items"
            >
              <i className="fa fa-th"></i>
            </a>
            <a
              href="#"
              className="change-class active"
              data-change-from-class="grid"
              data-change-to-class="list"
              data-parent-class="items"
            >
              <i className="fa fa-th-list"></i>
            </a>
          </div>
        </div>

        <div className="items list compact grid-xl-3-items grid-lg-2-items grid-md-2-items">
          {listHouseByUserId &&
            listHouseByUserId.map((item) => (
              <div className="item">
                <div className="wrapper">
                  <div className="image">
                    <h3>
                      <a href="#" className="tag category">
                        {item.category.name}
                      </a>
                      <a href="single-listing-1.html" className="title">
                        {item.name}
                      </a>
                      <span className="tag">Offer</span>
                    </h3>
                    <a
                      href="single-listing-1.html"
                      className="image-wrapper background-image"
                    >
                      <img src="assets/img/image-01.jpg" alt="" />
                    </a>
                  </div>

                  <h4 className="location">
                    <a href="#">{item.location}</a>
                  </h4>
                  <div className="price">{item.price} VND</div>
                  <div className="admin-controls">
                    <Link to={"/"} href="edit-ad.html">
                      <i className="fa fa-pencil"></i>Edit
                    </Link>
                    <a href="#" className="ad-hide">
                      <i className="fa fa-eye-slash"></i>Hide
                    </a>
                    <a href="#" className="ad-remove">
                      <i className="fa fa-trash"></i>Remove
                    </a>
                  </div>

                  <div className="description">
                    <p>{item.description}</p>
                  </div>

                  <Link to={`http://localhost:3000/user/house/${item.id}`} href="single-listing-1.html"
                                   className="detail text-caps underline">Detail</Link>
                  
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
