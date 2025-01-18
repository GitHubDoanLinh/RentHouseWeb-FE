import { Link } from "react-router-dom";
import * as React from "react";
import { useSelector } from "react-redux";

export default function NavbarUser() {
  const currentUser = useSelector(({ users }) => {
    return users?.currentToken;
  });
  console.log("currentUser", currentUser);
  const decodedToken = JSON.parse(atob(currentUser.accessToken.split(".")[1]));
  const isOwner = decodedToken.isOwner;

  return (
    <>
      <div className="main-navigation">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
            <a className="navbar-brand" href="/house">
              <img src="../assets/img/logo.png" alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar"
              aria-controls="navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav">
                {currentUser?.roles &&
                currentUser?.roles[0]?.authority === "ROLE_ADMIN" ? (
                  <li>
                    <Link
                      to={`/admin/${currentUser.id}/users`}
                      href="#"
                      className="nav-link"
                    >
                      Quản Lí
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {isOwner === 0 &&
                currentUser?.roles &&
                currentUser?.roles[0]?.authority === "ROLE_USER" ? (
                  <li>
                    <Link
                      to={`/register-host/${currentUser.id}`}
                      href="#"
                      className="nav-link"
                    >
                      Đăng kí làm chủ nhà
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <Link to={"house"} href="#" className="nav-link">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  {/* <Link
                    to={`/profile/bookmarks/${currentUser.id}`}
                    href="#"
                    className="nav-link"
                  >
                    Yêu thích
                  </Link> */}
                </li>
                <li className="nav-item has-child">
                  <Link
                    to={`profile/profile-detail/${currentUser.id}`}
                    className="nav-link"
                    href="#"
                  >
                    Tài khoản
                  </Link>

                  <ul className="child">
                    <li className="nav-item has-child">
                      <Link
                        to={`profile/profile-detail/${currentUser.id}`}
                        href="#"
                        className="nav-link"
                      >
                        Thông tin cá nhân
                      </Link>
                    </li>
                    {isOwner && isOwner === 2 ? (
                      <li className="nav-item has-child">
                        <Link
                          to={`manager-house/list-house-user/${currentUser.id}`}
                          href="#"
                          className="nav-link"
                        >
                          Quản lý nhà
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    <li className="nav-item has-child">
                      {/* <Link to={""} href="#" className="nav-link">
                        Tin nhắn
                      </Link> */}
                    </li>

                    <li className="nav-item has-child">
                      <Link
                        to={`/profile/history/${currentUser?.id}`}
                        href="#"
                        className="nav-link"
                      >
                        Chuyến đi
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
