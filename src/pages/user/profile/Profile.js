import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom"

function Profile() {
    const currentUser = useSelector(({users}) => {
        return users.currentToken;
    })
    return (
        <>
            <section className="content">
                <section className="block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <nav className="nav flex-column side-nav">
                                    <a className="nav-link icon" href="my-profile.html">
                                        <i className="fa fa-user"></i>
                                        <Link to={`/profile/profile-detail/${currentUser.id}`}>My Profile</Link>
                                    </a>
                                    <a className="nav-link active icon" href="change-password.html">
                                        <i className="fa fa-recycle"></i>
                                        <Link to={"/profile/change-password"}>Change Password</Link>
                                    </a>
                                    <a className="nav-link icon" href="my-ads.html">
                                        <i className="fa fa-heart"></i>
                                        <Link to={"/profile/bookmarks"}>Bookmarks</Link>
                                    </a>
                                    <Link to={"/profile/history"} className="nav-link icon" href="">
                                        <i className="fa fa-check"></i>History Buy (Order)
                                    </Link>
                                    
                                </nav>
                            </div>
                            <Outlet/>
                        </div>
                    </div>
                </section>
            </section>   
        </>
    )
}

export default Profile
