import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllWishlist, removeHouseInWishlist} from "../../../redux/services/WishlistService";
import {useParams} from "react-router-dom";
import {ImageBookmark} from "./ImageBookmark";

export default function Bookmarks() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const listWishlist = useSelector(({wishlists}) => {
        return wishlists.listWishlist;
    })
    useEffect(() => {
        dispatch(getAllWishlist(id))
    }, []);
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    const deleteItemWishlist = (idBM)=>{
        dispatch(removeHouseInWishlist(idBM)).then(()=>{
            dispatch(getAllWishlist(id))
        })
    }
    const formatPrice = (money) =>{
        return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    }
    return (
        <>
            <div className="col-md-9">

                <div className="items list compact grid-xl-3-items grid-lg-3-items grid-md-2-items">
                    {listWishlist && listWishlist.map((item) => (
                            <div className="item" key={item.id}>
                                <div className="ribbon-vertical">
                                    <i className="fa fa-star"></i>
                                </div>

                                <div className="wrapper">
                                    <div className="image">
                                        <h3>
                                            <a href="#" className="tag category">{item.categoryName}</a>
                                            <a href="single-listing-1.html" className="title"
                                               style={{float: "left", marginTop: '-25px'}}>{item.name}</a>
                                        </h3>
                                        <ImageBookmark item={item.houseId}/>
                                    </div>

                                    <h4 className="location">
                                        <a href="#">{item.location}</a>
                                    </h4>
                                    <div className="price">{formatPrice(item.price)}</div>
                                    <div className="meta">
                                        <figure>
                                            <i className="fa fa-calendar-o"></i>{formatDate(item.createdAt)}
                                        </figure>
                                        <figure>
                                            <a href="#">
                                                <i className="fa fa-user"></i>Chủ nhà: {item.hostName}
                                            </a>
                                        </figure>
                                    </div>

                                    <div className="description">
                                        <p>{item.description}</p>
                                    </div>

                                    <a
                                       className="detail text-caps underline" type='submit' onClick={()=>deleteItemWishlist(item.id)}>Delete</a>
                                </div>
                            </div>
                    ))}
                </div>
                <div className="page-pagination">
                    <nav aria-label="Pagination">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">
                                            <i className="fa fa-chevron-left"></i>
                                        </span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link" href="#">1</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">2</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">
                                            <i className="fa fa-chevron-right"></i>
                                        </span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </>
    )
}