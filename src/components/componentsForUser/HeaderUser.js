import NavbarUser from "./NavbarUser";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { logout } from "../../redux/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import {
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react-notification-feed";
import "@knocklabs/react-notification-feed/dist/index.css";

export default function HeaderUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutScreen = () => {
    dispatch(logout()).then(() => {
      navigate("/login");
    });
  };
  const currentUser = useSelector(({ users }) => {
    return users.currentToken;
  });

  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  return (
    <>
      <header className="hero">
        <div className="hero-wrapper">
          <div className="secondary-navigation">
            <div className="container">
              <ul className="left">
                <li>
                  <span>
                    <i className="fa fa-phone"></i> +84 868 86 68 86
                  </span>
                </li>
              </ul>

              <ul className="right">
                {!currentUser ? (
                  <>
                    <li>
                      <Link to={"/login"}>
                        <i className="fa fa-sign-in"></i>Đăng nhập
                      </Link>
                    </li>
                    <li>
                      <Link to={"/register"}>
                        <i className="fa fa-pencil-square-o"></i>Đăng ký
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <KnockFeedProvider
                        apiKey={process.env.REACT_APP_KNOCK_PUBLIC_API_KEY}
                        feedId={process.env.REACT_APP_KNOCK_FEED_CHANNEL_ID}
                        userId={String(currentUser.id)}
                      >
                        <>
                          <NotificationIconButton
                            ref={notifButtonRef}
                            onClick={(e) => setIsVisible(!isVisible)}
                          />
                          <NotificationFeedPopover
                            buttonRef={notifButtonRef}
                            isVisible={isVisible}
                            onClose={() => setIsVisible(false)}
                          />
                        </>
                      </KnockFeedProvider>
                    </li>
                    <li style={{ padding: "8px" }}>
                      <button
                        onClick={logoutScreen}
                        style={{
                          background: "transparent",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <i className="fa fa-pencil-square-o"></i>Đăng xuất
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <NavbarUser />
          <div className="background">
            <div className="background-image original-size">
              <img src="assets/img/hero-background-icons.jpg" alt="" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
