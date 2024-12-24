import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getImageByHouseId } from "../../redux/services/ImageService";
import "./carousel.css";
import { getById } from "../../redux/services/HouseService";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  addBooking,
  getAllBookingByHouseId,
  getHistoryBooking,
} from "../../redux/services/BookingService";
import { date } from "yup";
import { toast } from "react-toastify";
import { Comment } from "./Comment";
import { Knock } from "@knocklabs/node";
import { getCommentById } from "../../redux/services/CommentService";
import { createHouseInWishlist } from "../../redux/services/WishlistService";
// import GoogleMap from "../extension/GoogleMap";

export default function HouseDetail() {
  const knockClient = new Knock(process.env.REACT_APP_KNOCK_API_KEY);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fetched, setFetched] = useState(false);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const imageList = useSelector(({ images }) => {
    return images.listImage;
  });
  const houseDetail = useSelector(({ houses }) => {
    return houses.houseUpdate;
  });
  const currentUser = useSelector(({ users }) => {
    return users.currentToken;
  });
  useEffect(() => {
    dispatch(getById(id)).then(() =>
      dispatch(getImageByHouseId(id)).then(() => setFetched(true))
    );
  }, []);
  const carouselItemStyle = {
    height: "720px",
  };
  //date time
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let startDate = year + "-" + month + "-" + day;
  let currentDate1 = new Date();
  let currentDay = currentDate1.getDate();
  currentDate1.setDate(currentDay + 5);
  let dayAfter5Days = currentDate1.getDate();
  let monthAfter5Days = currentDate1.getMonth() + 1;
  let yearAfter5Days = currentDate1.getFullYear();
  let endDate = yearAfter5Days + "-" + monthAfter5Days + "-" + dayAfter5Days;
  const [value, setValue] = useState([dayjs(startDate), dayjs(endDate)]);
  let betweentday = (value[1] - value[0]) / 86400000;
  // tăng giảm khách
  const [count, setCount] = useState(1);
  const increment = () => {
    if (count < 6) setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };
  //xử lí thêm hoa đơn
  let bookingInfo = {
    startDate: formatDate(value[0]),
    endDate: formatDate(value[1]),
    numberOfGuests: count,
    userId: currentUser.id,
    houseId: houseDetail.id,
    price:
      betweentday * houseDetail.price + betweentday * houseDetail.price * 0.05,
  };
  const navigate = useNavigate();
  
  const bookRoom = async (info) => {
    try {
      // Gọi API thêm booking
      const result = await dispatch(addBooking(info)).unwrap(); // unwrap để lấy giá trị thực từ thunk
      if (!result) {
        throw new Error("Không thể đặt phòng. Vui lòng thử lại.");
      }
  
      // Gửi thông báo qua Knock
      const recipientId = houseDetail.userDTO.id;
      const actorId = String(currentUser.id);
      const recipient = await knockClient.users.get(recipientId);
  
      if (!recipient || !recipient.id) {
        throw new Error("Không tìm thấy người nhận thông báo.");
      }
  
      await knockClient.notify("rent-a-house", {
        actor: actorId,
        recipients: [String(recipient.id)],
      });
  
      // Hiển thị thông báo thành công
      toast.success("Đặt phòng thành công!", {
        position: "top-right",
      });
  
      // Chuyển hướng đến lịch sử
      navigate(`/profile/history/${currentUser.id}`);
    } catch (error) {
      // Xử lý lỗi
      console.error("Lỗi khi đặt phòng:", error);
  
      toast.success("Đặt phòng thành công!. Hãy kiểm tra trong chuyến đi", {
        position: "top-right",
      });
    }
  };
  

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  // bắt list booking của house
  const listBookingHouse = useSelector(({ bookings }) => {
    return bookings.list;
  });
  useEffect(() => {
    dispatch(getAllBookingByHouseId(id));
  }, []);

  function generateDates(startDate, endDate) {
    let currentDate = new Date(startDate);
    const dates = [];
    while (currentDate <= endDate) {
      dates.push(formatDate(new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  let disabledDates = [];
  for (let i = 0; i < listBookingHouse.length; i++) {
    let generatedDates = generateDates(
      new Date(formatDate(listBookingHouse[i].startDate)),
      new Date(formatDate(listBookingHouse[i].endDate))
    );
    disabledDates = [...disabledDates, ...generatedDates];
  }
  const shouldDisableDate = (date) => {
    let dateString = date.toISOString().split("T")[0];
    const dateNow = new Date(dateString);
    dateNow.setDate(dateNow.getDate() + 1);
    const year = dateNow.getFullYear();
    const month = (dateNow.getMonth() + 1).toString().padStart(2, "0");
    const day = dateNow.getDate().toString().padStart(2, "0");
    dateString = `${year}-${month}-${day}`;
    return disabledDates.includes(dateString);
  };
  const dataAddWishlist = {
    userId: currentUser.id,
    houseId: houseDetail.id,
  };
  const handleAddWishlist = (data) => {
    dispatch(createHouseInWishlist(data)).then((data) => {
      if (data.error) {
        toast.error(`Thêm vào Bookmark (${data.error.message})!`, {
          position: "top-right",
        });
      } else {
        toast.success(`Thêm vào Bookmark Thành công!`, {
          position: "top-right",
        });
      }
    });
  };
  const formatPrice = (money) => {
    return money.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <>
      {fetched && (
        <div className="page sub-page">
          <div className="hero" style={{ backgroundColor: "#f2f2f2" }}>
            <div className="hero-wrapper">
              <div className="page-title">
                <div className="container clearfix">
                  <div className="float-left float-xs-none">
                    <h1>{houseDetail.name}</h1>
                    <h4 className="location">
                      <a href="#">{houseDetail.location}</a>
                    </h4>
                  </div>
                  <div className="float-right   price">
                    <div className="number">
                      {formatPrice(houseDetail.price)}
                    </div>
                    <div className="id opacity-70">
                      <button
                        className={"btnWishlist"}
                        style={{}}
                        onClick={() => handleAddWishlist(dataAddWishlist)}
                      >
                        <i className="fa fa-heart"></i> <u>Lưu</u>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="background"></div>
            </div>
          </div>
          <section className="content">
            <section className="block" style={{ paddingTop: "0" }}>
              <div className="container">
                <section>
                  {/* Main Carousel */}
                  <div
                    id="myCarousel"
                    className="carousel slide carousel-fade"
                    data-ride="carousel"
                    data-interval="false"
                  >
                    <div className="carousel-inner">
                      {imageList &&
                        imageList.map((item, index) => (
                          <div
                            key={index}
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                          >
                            <img
                              className="d-block"
                              src={item.image}
                              alt={`carousel_image_${index}`}
                              style={carouselItemStyle}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Thumbnail Slider */}
                  <div
                    id="thumbSlider"
                    className="carousel slide"
                    data-interval="false"
                  >
                    <div className="carousel-inner">
                      {imageList &&
                        imageList
                          .reduce((rows, item, index) => {
                            if (index % 3 === 0) rows.push([]);
                            rows[rows.length - 1].push(item);
                            return rows;
                          }, [])
                          .map((row, rowIndex) => (
                            <div
                              key={rowIndex}
                              className={`carousel-item ${
                                rowIndex === 0 ? "active" : ""
                              }`}
                            >
                              <div
                                className="row"
                                style={{ marginLeft: "0.1rem" }}
                              >
                                {row.map((thumb, thumbIndex) => (
                                  <div
                                    key={thumbIndex}
                                    data-target="#myCarousel"
                                    data-slide-to={rowIndex * 3 + thumbIndex}
                                    className={`thumb col-sm-4 ${
                                      activeIndex === rowIndex * 3 + thumbIndex
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleThumbnailClick(
                                        rowIndex * 3 + thumbIndex
                                      )
                                    }
                                    style={{
                                      maxWidth: "fit-content",
                                      marginTop: "12px",
                                    }}
                                  >
                                    <img
                                      src={thumb.image}
                                      alt={`thumbnail_${
                                        rowIndex * 3 + thumbIndex
                                      }`}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      <a
                        className="carousel-control-prev"
                        href="#thumbSlider"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#thumbSlider"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                </section>

                <div className="row flex-column-reverse flex-md-row">
                  <div className="col-md-8">
                    <div className="card mb-5">
                      <div className="card-body">
                        <section>
                          <h2>Mô tả</h2>{" "}
                          <p>
                            {" "}
                            {houseDetail.description}
                            <br />
                            <br />
                            CHECK IN : 14:00
                            <br />
                            CHECKOUT : 12:00
                          </p>
                        </section>
                        <hr />
                        <section>
                          <h2>Thông tin chi tiết</h2>
                          <dl className="columns-3">
                            <dt>Phòng ngủ</dt>
                            <dd>{houseDetail.bedRoom}</dd>
                            <dt>Phòng tắm</dt>
                            <dd>{houseDetail.bathRoom}</dd>
                            <dt>Phòng khách</dt>
                            <dd>{houseDetail.livingRoom}</dd>
                            <dt>Phòng bếp</dt>
                            <dd>{houseDetail.kitchen}</dd>
                            <dt>Danh mục</dt>
                            <dd>{houseDetail?.category?.name}</dd>
                          </dl>
                        </section>
                        <hr />
                        <section>
                          <h2>Tiện nghi</h2>
                          <ul className="features-checkboxes columns-3">
                            {houseDetail.convenients.map((item) => (
                              <li key={item.id}>{item.name}</li>
                            ))}
                          </ul>
                        </section>
                      </div>
                    </div>
                    {/* <section>
                      <h2>Địa điểm</h2>
                      <div className="map height-300px" id="map-small">
                        <GoogleMap place={houseDetail.location} />
                      </div>
                    </section> */}
                    <hr />
                    <Comment
                      house={houseDetail}
                      id={id}
                      userId={currentUser.id}
                    />
                  </div>

                  <div className="col-md-4">
                    <aside className="sidebar">
                      <section>
                        <div className="box">
                          <div className="author">
                            <div
                              className="number"
                              style={{
                                fontSize: "20px",
                                color: "red",
                                paddingBottom: "10px",
                              }}
                            >
                              {formatPrice(houseDetail.price)}/đêm
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={[
                                  "DateRangePicker",
                                  "DateRangePicker",
                                ]}
                              >
                                <DemoItem component="DateRangePicker">
                                  <DateRangePicker
                                    value={value}
                                    disablePast={true}
                                    shouldDisableDate={shouldDisableDate}
                                    onChange={(newValue) => setValue(newValue)}
                                  />
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                            <div
                              style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <div>
                                <span style={{ float: "left" }}>
                                  Khách: {count}
                                </span>
                                <span style={{ float: "right" }}>
                                  <button
                                    onClick={increment}
                                    style={{
                                      border: "none",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <i className="fa fa-plus" />
                                  </button>
                                  <button
                                    onClick={decrement}
                                    style={{
                                      border: "none",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <i className="fa fa-minus" />
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <dl>
                            <dt>Giá tiền</dt>
                            <dd>
                              {formatPrice(houseDetail.price)}x {betweentday}{" "}
                              đêm <br />={" "}
                              {formatPrice(houseDetail.price * betweentday)}
                            </dd>
                          </dl>
                          <dl>
                            <dt>Thuế</dt>
                            <dd>5%</dd>
                          </dl>
                          <hr />
                          <dl>
                            <dt>
                              <u>Tổng tiền</u>
                            </dt>
                            <dd>
                              {formatPrice(
                                betweentday * houseDetail.price +
                                  betweentday * houseDetail.price * 0.05
                              )}
                            </dd>
                          </dl>
                          <hr />
                          {currentUser.id === houseDetail.userDTO.id ? (
                            ""
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ width: "100%" }}
                              onClick={() => bookRoom(bookingInfo)}
                            >
                              ĐẶT PHÒNG
                            </button>
                          )}
                        </div>
                      </section>
                    </aside>
                    <aside className="sidebar">
                      <section>
                        <h2>Chủ nhà</h2>
                        <div className="box">
                          <div className="author">
                            <div className="author-image">
                              <div className="background-image">
                                <img
                                  src={
                                    houseDetail.userDTO.imageUser
                                      ? houseDetail.userDTO.imageUser
                                      : "https://placehold.co/400"
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="author-description">
                              <p style={{ color: "darkred" }}>
                                {houseDetail.userDTO.fullName}
                              </p>
                              <div className="rating" data-rating="4"></div>
                              <a
                                href="seller-detail-1.html"
                                className="text-uppercase"
                              >
                                Show My Listings{" "}
                                <span className="appendix">(12)</span>{" "}
                              </a>
                            </div>
                          </div>
                          <hr />
                          <dl>
                            <dt>Số điện thoại</dt>
                            <dd>{houseDetail.userDTO.phone}</dd>
                            <br />
                            <dt>Email</dt>
                            <dd>{houseDetail.userDTO.email}</dd>
                          </dl>
                          <form className="form email">
                            <div className="form-group">
                              <label
                                htmlFor="message"
                                className="col-form-label"
                              >
                                Liên hệ
                              </label>
                              <textarea
                                name="message"
                                id="message"
                                className="form-control"
                                rows="4"
                                placeholder="Hi there! I am interested in your offer ID 53951. Please give me more details."
                              ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Gửi
                            </button>
                          </form>
                        </div>
                      </section>
                    </aside>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      )}
    </>
  );
}
