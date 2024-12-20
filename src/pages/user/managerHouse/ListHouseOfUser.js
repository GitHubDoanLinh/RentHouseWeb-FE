import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getById,
  getHouseByUser,
  removeById,
} from "../../../redux/services/HouseService";
import { Link, useParams } from "react-router-dom";
import HouseOfUser from "./HouseOfUser";
import "./houses_user.css"

export default function ListHouseOfUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const listHouseByUserId = useSelector(({ houses }) => {
    return houses.listByUser;
  });
  useEffect(() => {
    dispatch(getHouseByUser(id));
  }, []);

  function handleDelete(idHouse) {
    // eslint-disable-next-line no-restricted-globals
    // let isConfirmed = confirm("Are you sure you want to delete");
    if (true) {
      dispatch(removeById(idHouse)).then(() => {
        dispatch(getHouseByUser(id));
      });
    } else {
      alert("Oke la");
    }
  }

  return (
    <>
      <div className="col-md-9 houses-user">
        <div className="section-title clearfix">
          <div className="float-left float-xs-none">
            {/* <label className="mr-3 align-text-bottom">Sort by: </label> */}
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
          
        </div>

        <div className="items list compact grid-xl-3-items grid-lg-2-items grid-md-2-items">
          {listHouseByUserId &&
            listHouseByUserId.map((item) => {
              return (
                <HouseOfUser
                  item={item}
                  handleDelete={() => handleDelete(item.id)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
