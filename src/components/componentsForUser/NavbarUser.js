function NavbarUser() {
    return (
        <>
            <header className="hero">
                <div className="hero-wrapper">
                    {/*<div className="page-title">*/}
                    {/*    <div className="container">*/}
                    {/*        <h1 className="opacity-40 center">*/}
                    {/*            <a href="#">Buy</a>, <a href="#">Sell</a> or <a href="#">Find</a> What You need*/}
                    {/*        </h1>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <form className="hero-form form">
                        <div className="container">
                            <div className="main-search-form">
                                <div className="form-row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            {/*<label htmlFor="what" className="col-form-label">What?</label>*/}
                                            <input name="keyword" type="text" className="form-control" id="what"
                                                   placeholder="What are you looking for?"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-3">
                                        <div className="form-group">
                                            {/*<label htmlFor="category" className="col-form-label">Category?</label>*/}
                                            <select name="category" id="category" data-placeholder="Select Category">
                                                <option value="">Select Category</option>
                                                <option value="1">Computers</option>
                                                <option value="2">Real Estate</option>
                                                <option value="3">Cars & Motorcycles</option>
                                                <option value="4">Furniture</option>
                                                <option value="5">Pets & Animals</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-3">
                                        <button type="submit" className="btn btn-primary width-100">Search</button>
                                    </div>
                                </div>
                            </div>
                            <div className="alternative-search-form">
                                <a href="#collapseAlternativeSearchForm" className="icon" data-toggle="collapse"
                                   aria-expanded="false" aria-controls="collapseAlternativeSearchForm"><i
                                    className="fa fa-plus"></i>More Options</a>
                                <div className="collapse" id="collapseAlternativeSearchForm">
                                    <div className="wrapper">
                                        <div className="form-row">
                                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 d-xs-grid d-flex align-items-center justify-content-between">
                                                <label>
                                                    <input type="checkbox" name="new"/>
                                                    New
                                                </label>
                                                <label>
                                                    <input type="checkbox" name="used"/>
                                                    Used
                                                </label>
                                                <label>
                                                    <input type="checkbox" name="with_photo"/>
                                                    With Photo
                                                </label>
                                                <label>
                                                    <input type="checkbox" name="featured"/>
                                                    Featured
                                                </label>
                                            </div>
                                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                                <div className="form-row">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <input name="min_price" type="text" className="form-control small"
                                                                   id="min-price" placeholder="Minimal Price"/>
                                                            <span className="input-group-addon small">$</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <input name="max_price" type="text" className="form-control small"
                                                                   id="max-price" placeholder="Maximal Price"/>
                                                            <span className="input-group-addon small">$</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <select name="distance" id="distance" className="small"
                                                                    data-placeholder="Distance">
                                                                <option value="">Distance</option>
                                                                <option value="1">1km</option>
                                                                <option value="2">5km</option>
                                                                <option value="3">10km</option>
                                                                <option value="4">50km</option>
                                                                <option value="5">100km</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="background">
                        <div className="background-image original-size">
                            <img src="assets/img/hero-background-icons.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavbarUser
