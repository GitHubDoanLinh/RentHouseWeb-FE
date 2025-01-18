import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {showImage} from "../../redux/services/ImageService";
import {createHouseInWishlist} from "../../redux/services/WishlistService";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";

export function House ({item}) {
    const [images,setImages]= useState([]);
    useEffect(() => {
        showImage(item.id).then((response)=>{
            setImages(response.data)
        })
    }, [item]);
    console.log("item",item)
    const formatPrice = (money) =>{
        return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    }
    const dispatch = useDispatch();
    const currentUser = useSelector(({users}) => {
        return users.currentToken;
    })
    const handleAddWishlist = (data) => {
        dispatch(createHouseInWishlist(data)).then((data) => {
            if (data.error) {
                toast.error(`Thêm vào Bookmark (${data.error.message})!`, {
                    position: "top-right"
                });
            } else {
                toast.success(`Thêm vào Bookmark Thành công!`, {
                    position: "top-right"
                });
            }
        })
    }
    return (
        <>
            <div className="item" key={item.id}>
                {/*<div className="ribbon-featured">Featured</div>*/}
                <div className="wrapper">
                    <div className="image">
                        <h3>
                            <a href="#" className="tag category" >{item?.category?.name}</a>
                            <Link to={`${item.id}`} className="title">
                                {item.name}</Link>
                        </h3>
                        <Link to={`${item.id}`}
                              className="image-wrapper background-image">
                            <img src={images && images.length > 0 ? images[0].image : "https://placehold.co/400"} alt=""/>

                        </Link>
                    </div>

                    <h4 className="location one-line-text">
                        <a href="#" title={item.location}>{item.location}</a>
                    </h4>
                    <div className="price">{formatPrice(item.price)}</div>
                    <div className="meta">
                        {/* <figure>
                            <div><button className={'btnWishlist'} style={{border: 'none'}}
                                                               onClick={() => handleAddWishlist({
                                                                   userId: currentUser.id,
                                                                   houseId: item.id
                                                               })}><i className="fa fa-heart"></i></button>
                            </div>
                        </figure> */}
                        <figure>
                            <a href="#">
                                <i className="fa fa-user"></i>{item.userDTO.fullName}
                            </a>
                        </figure>
                    </div>

                    <div className="description">
                        <p>{item.description}</p>
                    </div>

                    <Link to={`${item.id}`} href="single-listing-1.html"
                          className="detail text-caps underline">Chi tiết</Link>
                </div>
            </div>
        </>
    )
}