import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

export default function ManagerHouse() {
    const currentUser = useSelector(({users}) => {
        return users.currentToken;
    })

    return (
        <>
            <section className="content">
                <section className="block set-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2" style={{marginTop:"20px"}}>
                                <nav className="nav flex-column side-nav">
                                    <a className="nav-link icon" href="">
                                        <i className="fa fa-star"></i>
                                        <Link to={`/manager-house/list-house-user/${currentUser.id}`}>My Ads Listing</Link>
                                    </a>
                                    <a className="nav-link icon" href="">
                                        <i className="fa fa-star"></i>
                                        <Link to={`/manager-house/create`}>Add House</Link>
                                    </a>
                                    <a className="nav-link icon" href="">
                                        <i className="fa fa-check"></i>
                                        <Link to={"/manager-house"}>Sold Items</Link>
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