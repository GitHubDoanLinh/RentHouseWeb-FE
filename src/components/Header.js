import * as React from "react";
import "./headerStyle.css";

function Header() {
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
                    <i className="fa fa-heart"></i>My Ads
                  </a>
                </li>
                <li>
                  <a href="sign-in.html">
                    <i className="fa fa-sign-in"></i>Sign In
                  </a>
                </li>
                <li>
                  <a href="register.html">
                    <i className="fa fa-pencil-square-o"></i>Register
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
                    <li className="nav-item active">
                      <a className="nav-link" href="#">
                        Home
                      </a>
                    </li>

                    <li className="nav-item active has-child">
                      <a className="nav-link" href="#">
                        Your Profile
                      </a>
                      <ul className="child">
                        <li className="nav-item">
                          <a href="sellers.html" className="nav-link">
                            Change Password
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
