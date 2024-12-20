import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllHouse} from "../../redux/services/HouseService";
import { getAllCategories } from "../../redux/services/CategoryService";
import House from "./House";
import { Navigate } from "react-router-dom";

function ListHouse() {
    const dispatch = useDispatch();
    const categories = useSelector(state=> state.categories.listCategories)
    const message= useSelector(state=>state.houses.message)
    const houses = useSelector(({houses}) => {
        return houses.list;
    })
    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllHouse());

    }, [])

    const currentUser = useSelector(({users}) => {
        return users.currentToken;
    });
    if (!currentUser) {
        return <Navigate to="/login"/>
    }
    return (
        <>
            <form className="hero-form form" style={{paddingTop:"50px"}}>
                <div style={{marginTop:"0px"}}>
                    <h2 style={{color:"#FF0000"}}>HÃY THUÊ VÀ CHO THUÊ THEO CÁCH CỦA BẠN ^^</h2>
                    {message && <h2 style={{color: 'green'}}> {message} </h2>}
                </div>
                <div className="container">
                    <div className="main-search-form">
                        <div className="form-row">
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <input name="keyword" type="text" className="form-control" id="what"
                                           placeholder="What are you looking for?"/>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <input name="location" type="text" className="form-control"
                                           id="input-location" placeholder="Enter Location"/>
                                    <span className="geo-location input-group-addon" data-toggle="tooltip"
                                          data-placement="top" title="Find My Position"><i
                                        className="fa fa-map-marker"></i></span>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <select name="category" id="category" data-placeholder="Select Category">
                                        <option value="">Select Category</option>
                                        {categories && categories.map((i)=><option value={i.id} >{i.name } </option>)
                                        }
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
                                    <div
                                        className="col-xl-6 col-lg-12 col-md-12 col-sm-12 d-xs-grid d-flex align-items-center justify-content-between">
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
                                                    <input name="min_price" type="text"
                                                           className="form-control small" id="min-price"
                                                           placeholder="Minimal Price"/>
                                                    <span className="input-group-addon small">$</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <input name="max_price" type="text"
                                                           className="form-control small" id="max-price"
                                                           placeholder="Maximal Price"/>
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
            <section className="content">
                <section className="block">
                    <div className="container">

                        <div className="section-title clearfix">
                            <div className="float-xl-left float-md-left float-sm-none">
                                <h2>Recent Listings</h2>
                            </div>
                            <div className="float-xl-right float-md-right float-sm-none">
                                <select name="categories" id="categories" className="small width-200px"
                                        data-placeholder="Category">
                                    <option value="">Category</option>
                                    {categories && categories.map((i)=><option value={i.id} >{i.name } </option>)
                                    }
                                </select>
                                <select name="sorting" id="sorting" className="small width-200px"
                                        data-placeholder="Default Sorting">
                                    <option value="">Default Sorting</option>
                                    <option value="1">Newest First</option>
                                    <option value="2">Oldest First</option>
                                    <option value="3">Lowest Price First</option>
                                    <option value="4">Highest Price First</option>
                                </select>
                            </div>
                        </div>

                        <div className="items masonry grid-xl-4-items grid-lg-3-items grid-md-2-items">

                        {houses && houses.map((item) => {
                                return (
                                    <House item={item}/>

                                )
                            })}

                            {/* <a href="submit.html" className="item call-to-action">
                                <div className="wrapper">
                                    <div className="title">
                                        <i className="fa fa-plus-square-o"></i>
                                        Submit Your Ad
                                    </div>
                                </div>
                            </a> */}


                        </div>
                        <div className="center">
                            <a href="#" className="btn btn-primary btn-framed btn-rounded">Load More</a>
                        </div>
                    </div>

                </section>

            </section>
        </>
    )
}

export default ListHouse
