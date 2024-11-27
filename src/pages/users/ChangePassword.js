function ChangePassword() {
    return (
        <>
            <section className="content">
                <section className="block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <nav className="nav flex-column side-nav">
                                    <a className="nav-link icon" href="my-profile.html">
                                        <i className="fa fa-user"></i>My Profile
                                    </a>
                                    <a className="nav-link icon" href="my-ads.html">
                                        <i className="fa fa-heart"></i>My Ads Listing
                                    </a>
                                    <a className="nav-link icon" href="bookmarks.html">
                                        <i className="fa fa-star"></i>Bookmarks
                                    </a>
                                    <a className="nav-link active icon" href="change-password.html">
                                        <i className="fa fa-recycle"></i>Change Password
                                    </a>
                                    <a className="nav-link icon" href="sold-items.html">
                                        <i className="fa fa-check"></i>Sold Items
                                    </a>
                                </nav>
                            </div>
                            <div className="col-md-9">
                                <form className="form">
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="current_password" className="col-form-label required">Current
                                                    Password</label>
                                                <input name="current_password" type="password" className="form-control"
                                                       id="current_password" placeholder="Current Password" required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="new_current_password"
                                                       className="col-form-label required">New Password</label>
                                                <input name="new_current_password" type="password"
                                                       className="form-control" id="new_current_password"
                                                       placeholder="New Password" required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="repeat_new_current_password"
                                                       className="col-form-label required">Repeat Password</label>
                                                <input name="repeat_new_current_password" type="password"
                                                       className="form-control" id="repeat_new_current_password"
                                                       placeholder="Repeat New Password" required/>
                                            </div>
                                            <button type="submit" className="btn btn-primary float-right">Change
                                                Password
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default ChangePassword
