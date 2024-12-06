import * as React from "react";
import "./headerStyle.css";
import { Link } from "react-router-dom";

function Header() {
  const logoutScreen = () => {
    sessionStorage.removeItem("currrentToken");
  };
  return (
    <>
      <header className="hero">
        <div className="hero-wrapper">
          <div className="secondary-navigation">
            <div className="container">
              <ul className="left">
                <li>
                  <span>
                    <i className="fa fa-phone"></i> +1 123 456 789
                  </span>
                </li>
              </ul>

              <ul className="right">
                <li>
                  <a href="my-ads.html">
                    <Link to={"/home"} className="fa fa-heart">
                      Wishlist
                    </Link>
                  </a>
                </li>
                <li>
                  <a href="sign-in.html">
                    <Link to={"/login"}>
                      <i className="fa fa-sign-in"></i>Login
                    </Link>
                  </a>
                </li>
                <li>
                  <a href="register.html">
                    <Link to={"/register"}>
                      <i className="fa fa-pencil-square-o"></i>Register
                    </Link>
                  </a>
                </li>
                <li>
                  <a href="register.html">
                    <Link to={"/login"} onClick={logoutScreen}>
                      <i className="fa fa-pencil-square-o"></i>Logout
                    </Link>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-navigation">
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
                <a className="navbar-brand" href="index.html">
                  <img src="assets/img/logo.png" alt="" />
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
                    <li className="nav-item active"></li>

                    <li className="nav-item active has-child">
                      <a className="nav-link" href="#">
                        Your Profile
                      </a>
                      <ul className="child">
                        <li className="nav-item">
                          <a href="sellers.html" className="nav-link">
                            <Link to={"/home/profile/profile-detail"}>
                              Profile
                            </Link>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="blog.html" className="nav-link">
                            Up to Seller
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="blog-post.html" className="nav-link">
                            Your House
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
