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
                                        <Link to={`/user/profile/profile-detail/${currentUser.id}`}>My Profile</Link>
                                    </a>
                                    <a className="nav-link active icon" href="change-password.html">
                                        <i className="fa fa-recycle"></i>
                                        <Link to={"/user/profile/change-password"}>Change Password</Link>
                                    </a>
                                    <a className="nav-link icon" href="my-ads.html">
                                        <i className="fa fa-heart"></i>
                                        <Link to={"/user/profile/bookmarks"}>Bookmarks</Link>
                                    </a>
                                    <a className="nav-link icon" href="sold-items.html">
                                        <i className="fa fa-check"></i>History Buy (Order)
                                    </a>
                                    <a className="nav-link icon" href="bookmarks.html">
                                        <i className="fa fa-star"></i>
                                        <Link to={`/user/profile/list-house-user/${currentUser.id}`}>My Ads Listing</Link>                                    </a>
                                    <a className="nav-link icon" href="bookmarks.html">
                                        <i className="fa fa-star"></i>
                                        <Link to={"/user/create"}>Add House</Link>
                                    </a>
                                    <a className="nav-link icon" href="sold-items.html">
                                        <i className="fa fa-check"></i>
                                        <Link to={"/user/addImage"}>Sold Items</Link>
                                    </a>
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
