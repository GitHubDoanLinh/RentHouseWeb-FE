import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getImageByHouseId} from "../../redux/services/ImageService";
import './carousel.css'
import {getById} from "../../redux/services/HouseService";
import {DateRangePicker} from "@mui/x-date-pickers-pro";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import {addBooking} from "../../redux/services/BookingService";

export default function HouseDetail() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fetched, setFetched] = useState(false);

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };
    const {id} = useParams()
    const dispatch = useDispatch();
    const imageList = useSelector(({images}) => {
        return images.listImage;
    })
    const houseDetail = useSelector(({houses}) => {
        return houses.houseUpdate
    })
    const currentUser = useSelector(({users}) => {
        return users.currentToken;
    })
    useEffect(() => {
        dispatch(getById(id)).then(() => dispatch(getImageByHouseId(id)).then(() => setFetched(true)))
    }, []);
    const carouselItemStyle = {
        height: '720px',
    };
        //date time
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let startDate = year + '-' + month + '-' + day;
        let currentDate1 = new Date();
        let currentDay = currentDate1.getDate();
        currentDate1.setDate(currentDay + 5);
        let dayAfter5Days = currentDate1.getDate();
        let monthAfter5Days = currentDate1.getMonth() + 1;
        let yearAfter5Days = currentDate1.getFullYear();
        let endDate = yearAfter5Days + '-' + monthAfter5Days + '-' + dayAfter5Days;
        const [value, setValue] = useState([
            dayjs(startDate),
            dayjs(endDate),
        ]);
        let betweentday = (value[1] - value[0]) / 86400000;
        // tăng giảm khách
        const [count, setCount] = useState(0);
        const increment = () => {
            if (count < 6)
                setCount(count + 1);
        };
        const decrement = () => {
            if (count > 1)
                setCount(count - 1);
        };
        //xử lí thêm hoa đơn
            let bookingInfo = {
                startDate: formatDate(value[0]),
                endDate: formatDate(value[1]),
                numberOfGuests: count,
                userId: currentUser.id,
                houseId: houseDetail.id,
                price: betweentday * houseDetail.price + betweentday * houseDetail.price * 0.05
            }
        const bookRoom = (info) => {
            dispatch(addBooking(info)).then(() => {
            })
        }
        function formatDate(date) {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
    
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            return [year, month, day].join('-');
        }

    return (
        <>{fetched &&
            <div className="page sub-page" >
                <div className="hero" style={{backgroundColor: "#f2f2f2"}}>
                    <div className="hero-wrapper">
                        <div className="page-title">
                            <div className="container clearfix">
                                <div className="float-left float-xs-none"><h1>{houseDetail.name}<span
                                    className="tag">Offer</span></h1> <h4 className="location"><a
                                    href="#">{houseDetail.location}</a></h4></div>
                                <div className="float-right float-xs-none price">
                                    <div className="number">{houseDetail.price} VND</div>
                                    <div className="id opacity-50"><strong>ID: </strong>3479</div>
                                </div>
                            </div>
                        </div>
                        <div className="background"></div>
                    </div>
                </div>
                <section className="content">
                    <section className="block" style={{paddingTop:"0"}}>
                        <div className="container">
                            <section>
                                {/* Main Carousel */}
                                <div id="myCarousel" className="carousel slide carousel-fade" data-ride="carousel"
                                     data-interval="false">
                                    <div className="carousel-inner">
                                        {imageList && imageList.map((item, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                <img className="d-block" src={item.image}
                                                     alt={`carousel_image_${index}`} style={carouselItemStyle}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Thumbnail Slider */}
                                <div id="thumbSlider" className="carousel slide" data-interval="false">
                                    <div className="carousel-inner">
                                        {imageList && imageList.reduce((rows, item, index) => {
                                            if (index % 3 === 0) rows.push([]);
                                            rows[rows.length - 1].push(item);
                                            return rows;
                                        }, []).map((row, rowIndex) => (
                                            <div key={rowIndex}
                                                className={`carousel-item ${rowIndex === 0 ? 'active' : ''}`}>
                                                <div className="row" style={{marginLeft: "0.1rem"}}>
                                                    {row.map((thumb, thumbIndex) => (
                                                        <div
                                                            key={thumbIndex}
                                                            data-target="#myCarousel"
                                                            data-slide-to={(rowIndex * 3) + thumbIndex}
                                                            className={`thumb col-sm-4 ${activeIndex === (rowIndex * 3) + thumbIndex ? 'active' : ''}`}
                                                            onClick={() => handleThumbnailClick((rowIndex * 3) + thumbIndex)}                                                
                                                            style={{maxWidth:"fit-content",marginTop:"12px"}}
                                                        >
                                                            <img src={thumb.image}
                                                                 alt={`thumbnail_${(rowIndex * 3) + thumbIndex}`}/>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        <a className="carousel-control-prev" href="#thumbSlider" role="button"
                                           data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#thumbSlider" role="button"
                                           data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>


                            </section>
                            <div className="row flex-column-reverse flex-md-row">
                                <div className="col-md-8">
                                    <section><h2>Description</h2> <p> {houseDetail.description} </p></section>
                                    <section><h2>Details</h2>
                                        <dl className="columns-3">
                                            <dt>BedRoom</dt>
                                            <dd>{houseDetail.bedRoom}</dd>
                                            <dt>BathRoom</dt>
                                            <dd>{houseDetail.bathRoom}</dd>
                                            <dt>LivingRoom</dt>
                                            <dd>{houseDetail.livingRoom}</dd>
                                            <dt>Kitchen</dt>
                                            <dd>{houseDetail.kitchen}</dd>
                                            <dt>Category</dt>
                                            <dd>{houseDetail?.category?.name}</dd>
                                        </dl>
                                    </section>
                                    <section><h2>Convenients</h2>
                                        <ul className="features-checkboxes columns-3">
                                            {houseDetail.convenients.map((item) =>
                                                <li>{item.name}</li>
                                            )}

                                        </ul>
                                    </section>
                                    <section><h2>Location</h2>
                                        <div className="map height-300px" id="map-small"></div>
                                    </section>
                                    <hr/>
                                </div>
                                <div className="col-md-4">
                                <aside className="sidebar">
                                        <section>
                                            <div className="box">
                                                <div className="author">
                                                    <div className="number" style={{
                                                        fontSize: '20px',
                                                        color: 'red',
                                                        paddingBottom: '10px'
                                                    }}>{houseDetail.price} VND/đêm
                                                    </div>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer
                                                            components={['DateRangePicker', 'DateRangePicker']}>
                                                            <DemoItem
                                                                component="DateRangePicker">
                                                                <DateRangePicker
                                                                    value={value}
                                                                    onChange={(newValue) => setValue(newValue)}
                                                                />
                                                            </DemoItem>
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                    <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                                                        <div>
                                                            <span style={{float: 'left'}}>Khách: {count}</span>
                                                            <span style={{float: 'right'}}><button
                                                                onClick={increment}
                                                                style={{
                                                                    border: 'none',
                                                                    backgroundColor: 'white'
                                                                }}>
                                                                <i className="fa fa-plus"/></button>
                                                            <button onClick={decrement}
                                                                    style={{border: 'none', backgroundColor: 'white'}}>
                                                            <i className="fa fa-minus"/></button></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <dl>
                                                    <dt>Giá tiền</dt>
                                                    <dd>{betweentday * houseDetail.price} VND</dd>
                                                </dl>
                                                <dl>
                                                    <dt>Thuế</dt>
                                                    <dd>5%</dd>
                                                </dl>
                                                <hr/>
                                                <dl>
                                                    <dt><u>Tổng tiền</u></dt>
                                                    <dd>{betweentday * houseDetail.price + betweentday * houseDetail.price * 0.05} VND</dd>
                                                </dl>
                                                <hr/>
                                                <button type="submit" className="btn btn-primary"
                                                        style={{width: '100%'}} onClick={()=>bookRoom(bookingInfo)}>Đặt phòng
                                                </button>
                                            </div>
                                        </section>
                                    </aside>
                                    <aside className="sidebar">
                                        <section><h2>Author</h2>
                                            <div className="box">
                                                <div className="author">
                                                    <div className="author-image">
                                                        <div className="background-image"><img                                                   
                                                            src={houseDetail.userDTO.imageUser} alt=""/></div>
                                                    </div>
                                                    <div className="author-description">
                                                        <h3>{houseDetail.userDTO.fullName}</h3>
                                                        <div className="rating" data-rating="4"></div>
                                                        <a href="seller-detail-1.html" className="text-uppercase">Show
                                                            My Listings <span className="appendix">(12)</span> </a>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <dl>
                                                    <dt>Phone</dt>
                                                    <dd>{houseDetail.userDTO.phone}</dd>
                                                    <dt>Email</dt>
                                                    <dd>{houseDetail.userDTO.email}</dd>
                                                </dl>
                                                <form className="form email">
                                                    <div className="form-group"><label htmlFor="message"
                                                                                       className="col-form-label">Message</label>
                                                        <textarea name="message" id="message" className="form-control"
                                                                  rows="4"
                                                                  placeholder="Hi there! I am interested in your offer ID 53951. Please give me more details."></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Send</button>
                                                </form>
                                            </div>
                                        </section>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>}
        </>
    )
}