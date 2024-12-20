import { useEffect, useState } from "react";
import { showImage } from "../../redux/services/ImageService";
import { Link } from "react-router-dom";

function House({item}) {
    const [images,setImages]= useState([]);
    useEffect(() => {
        showImage(item.id).then((response)=>{
            // console.log(response)
            setImages(response.data)
        })
    }, []);
    return (
        <>
            <div className="item" key={item.id}>
                {/*<div className="ribbon-featured">Featured</div>*/}
                <div className="wrapper">
                    <div className="image">
                        <h3>
                            <a href="#" className="tag category">{item?.category?.name}</a>
                            <Link to={`${item.id}`} className="title">
                                {item.name}</Link>
                            <span className="tag">Offer</span>
                        </h3>
                        <Link to={`${item.id}`}
                              className="image-wrapper background-image">
                            {/*<img src={images.length>0 ? images[0].image : ""} alt=""/>*/}
                            <img src={images && images.length > 0 ? images[0].image : ""} alt=""/>
                        </Link>
                    </div>
                    <h4 className="location">
                        <a href="#">{item.location}</a>
                    </h4>
                    <div className="price">${item.price}</div>
                    <div className="meta">
                        <figure>
                            <i className="fa fa-calendar-o"></i>02.05.2017
                        </figure>
                        <figure>
                            <a href="#">
                                <i className="fa fa-user"></i>Jane Doe
                            </a>
                        </figure>
                    </div>
                    <div className="description">
                        <p>{item.description}</p>
                    </div>
                    <Link to={`${item.id}`} href="single-listing-1.html"
                          className="detail text-caps underline">Detail</Link>
                </div>
            </div>
        </>
    )
}

export default House
