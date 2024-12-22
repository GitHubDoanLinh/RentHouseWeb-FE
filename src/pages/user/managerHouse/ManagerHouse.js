import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./managerHouse.css";

export default function ManagerHouse() {
  const currentUser = useSelector(({ users }) => {
    return users.currentToken;
  });
  return (
    <>
      <section className="content">
        <section className="block set-block">
          <div className="container">
            <div className="row">
              <div className="col-md-2" style={{ marginTop: "20px" }}>
                <nav className="nav flex-column side-nav">
                  <Link
                    className="nav-link icon"
                    to={`/manager-house/list-house-user/${currentUser.id}`}
                  >
                    <i className="fa fa-star"></i>
                    Danh sách nhà
                  </Link>
                  <Link className="nav-link icon" to={`/manager-house/create`}>
                    <i className="fa fa-star"></i>
                    Thêm nhà
                  </Link>
                  <Link
                    className="nav-link icon"
                    to={`/manager-house/sold-item/${currentUser.id}`}
                  >
                    <i className="fa fa-check"></i>
                    Nhà đã cho thuê
                  </Link>
                  <Link
                    className="nav-link icon"
                    to={`/manager-house/money/${currentUser.id}`}
                  >
                    <i className="fa fa-check"></i>
                    Biểu đồ doanh thu
                  </Link>
                </nav>
              </div>
              <Outlet />
            </div>
          </div>
        </section>
      </section>
    </>
  );
}