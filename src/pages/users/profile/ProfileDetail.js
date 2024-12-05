function ProfileDetail() {
    return (
        <>
            <div className="col-md-9">
                <form className="form">
                    <div className="row">
                        <div className="col-md-8">
                            <h2>Personal Information</h2>
                            <section>
                            <div className="form-group">
                                    <label htmlFor="location" className="col-form-label required">User Name</label>
                                    <input name="location" type="text" className="form-control"
                                           id="input-location2" placeholder="Your Location"
                                           value="Manhattan, NY" required/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="location" className="col-form-label required">Full Name</label>
                                    <input name="location" type="text" className="form-control"
                                           id="input-location2" placeholder="Your Location"
                                           value="Manhattan, NY" required/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="location" className="col-form-label required">Date Of Birth</label>
                                    <input name="location" type="text" className="form-control"
                                           id="input-location2" placeholder="Your Location"
                                           value="Manhattan, NY" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location" className="col-form-label required">Address</label>
                                    <input name="location" type="text" className="form-control"
                                           id="input-location2" placeholder="Your Location"
                                           value="Manhattan, NY" required/>
                                </div>
                            </section>
                            <section>
                                <h2>Contact</h2>
                                <div className="form-group">
                                    <label htmlFor="phone" className="col-form-label">Phone</label>
                                    <input name="phone" type="text" className="form-control" id="phone"
                                           placeholder="Your Phone" value="312-238-3329"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input name="email" type="email" className="form-control" id="email"
                                           placeholder="Your Email" value="jane.doe@example.com"/>
                                </div>
                            </section>

                            <section className="clearfix">
                                <button type="submit" className="btn btn-primary float-right">Save
                                    Changes
                                </button>
                            </section>
                        </div>
                        <div className="col-md-4">
                            <div className="profile-image">
                                <div className="image background-image">
                                    <img src="assets/img/author-09.jpg" alt=""/>
                                </div>
                                <div className="single-file-input">
                                    <input type="file" id="user_image" name="user_image"/>
                                    <div className="btn btn-framed btn-primary small">Upload a picture
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfileDetail
