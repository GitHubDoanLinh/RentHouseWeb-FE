import { Modal, Rating, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getHistoryBooking,
  removeBooking,
} from "../../../redux/services/BookingService";
import { ImageHistory } from "./ImageHistory";
import { toast } from "react-toastify";
import "./HistoryBuy.css";
import { Field, Form, Formik } from "formik";
import { addComment } from "../../../redux/services/CommentService";
import { Knock } from "@knocklabs/node";
import { getById } from "../../../redux/services/HouseService";
export default function HistoryBuy() {
  const knockClient = new Knock(process.env.REACT_APP_KNOCK_API_KEY);

  const currentUser = useSelector(({ users }) => {
    return users.currentToken;
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const listBookingUser = useSelector(({ bookings }) => {
    return bookings.list;
  });
  useEffect(() => {
    dispatch(getHistoryBooking(id));
  }, []);
//   let listBookingUserReverse = [...listBookingUser].reverse();
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const [localListBooking, setLocalListBooking] = useState([]);

  useEffect(() => {
    // Khởi tạo state cục bộ với dữ liệu từ Redux
    setLocalListBooking([...listBookingUser].reverse());
  }, [listBookingUser]);

  function statusInfo(status) {
    switch (status) {
      case "CHECK_IN":
        return (
          <>
            <aside
              style={{
                border: "1px solid steelblue",
                borderRadius: "3px",
                padding: "3px",
                backgroundColor: "steelblue",
                color: "white",
              }}
            >
              Nhận phòng
            </aside>
          </>
        );
      case "IN_PROGRESS":
        return (
          <>
            <aside
              style={{
                border: "1px solid orange",
                borderRadius: "3px",
                padding: "3px",
                backgroundColor: "orange",
                color: "white",
              }}
            >
              Chờ nhận phòng
            </aside>
          </>
        );
      case "COMPLETED":
        return (
          <>
            <aside
              style={{
                border: "1px solid green",
                borderRadius: "3px",
                padding: "3px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Hoàn thành
            </aside>
          </>
        );
      case "CANCELLED":
        return (
          <>
            <aside
              style={{
                border: "1px solid red",
                borderRadius: "3px",
                padding: "3px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Đã hủy
            </aside>
          </>
        );
      default:
        break;
    }
  }

  const deleteBooking = async (idBooking, idHost, name) => {
    try {
        const result = await dispatch(removeBooking(idBooking));

        if (result.error) {
            toast.error(`Huỷ Phòng Thất Bại! Bạn Không Thể Huỷ Trước 1 Ngày Checkin!`, {
                position: "top-right",
            });
            return;
        }

        // Gửi thông báo qua Knock
        try {
            const recipient = await knockClient.users.get(idHost);
            await knockClient.notify('cancel-rent', {
                actor: String(currentUser.id),
                recipients: [String(recipient.id)],
                data: {
                    name: name,
                },
            });
        } catch (notificationError) {
            console.error("Error sending notification:", notificationError);
        }

        // Cập nhật danh sách đặt phòng trong Redux Store
        dispatch(getHistoryBooking(id)); 

        // Hoặc cập nhật danh sách hiển thị ngay lập tức
        setLocalListBooking((prev) =>
            prev.filter((booking) => booking.bookingId !== idBooking)
        );

        toast.success(`Huỷ Phòng Thành Công!`, {
            position: "top-right",
        });
    } catch (error) {
        console.error("Error in deleteBooking:", error);
        toast.error(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau!`, {
            position: "top-right",
        });
    }
};


  //danh gia
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setIdSelected(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const styleComment = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    padding: "35px",
  };
  const [idSelected, setIdSelected] = useState(0);
  const [rating, setRating] = useState(5);
  const handleComment = async (values, { setSubmitting }) => {
    try {
      // Kiểm tra dữ liệu trước khi gửi
      if (!values.content.trim()) {
        toast.error("Vui lòng nhập nội dung đánh giá!", { position: "top-right" });
        return;
      }
      if (!rating) {
        toast.error("Vui lòng chọn số sao đánh giá!", { position: "top-right" });
        return;
      }
  
      // Gán giá trị sao
      values.star = rating;
  
      // Gửi dữ liệu tới backend
      const response = await dispatch(addComment(values));
  
      if (response.error) {
        toast.error(
          `Không thể gửi đánh giá: ${response.error.message || "Dữ liệu không hợp lệ."}`,
          { position: "top-right" }
        );
        return;
      }
  
      // Cập nhật giao diện và thông báo
      toast.success("Đánh giá đã được gửi thành công!", { position: "top-right" });
      handleClose();
      dispatch(getHistoryBooking(id));
    } catch (error) {
      console.error("Error in handleComment:", error);
      toast.error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau!", { position: "top-right" });
    } finally {
      setSubmitting(false); // Kết thúc trạng thái submit
    }
  };
  
  const formatPrice = (money) => {
    return money.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <>
      <div className="col-md-9">
        {localListBooking &&
          localListBooking.map((item) => (
            <div
              key={item.bookingId}
              className="items list grid-xl-3-items grid-lg-3-items grid-md-2-items"
            >
              <div className="item">
                <div className="wrapper">
                  <div className="image">
                    <h3>
                      <a className="tag category">{item.categoryName}</a>
                      <a
                        href="single-listing-1.html"
                        className="title"
                        style={{ float: "left", marginTop: "-20px" }}
                      >
                        {item.name}
                      </a>
                    </h3>
                    {item.houseId && <ImageHistory item={item.houseId} />}
                  </div>

                  <h4
                    className="location  one-line-text"
                    style={{ width: "380px", cursor: "pointer" }}
                  >
                    <a title={item.location}>{item.location}</a>
                  </h4>
                  <div className="price">{formatPrice(item.price)}</div>
                  <div className="meta">
                    <figure>
                      <i className="fa fa-calendar-o"></i>Ngày đặt:{" "}
                      {formatDate(item.createAt)}
                    </figure>
                    <figure>
                      <a>
                        <i className="fa fa-user"></i>Chủ nhà: {item.hostName}
                      </a>
                    </figure>
                  </div>

                  <div className="description">
                    <p>
                      Nếu quý khách đặt sai hoặc không muốn đặt nữa. Vui lòng
                      bấm hủy trong thời gian trước{" "}
                      <b style={{ color: "red" }}>1 ngày</b>
                    </p>
                  </div>

                  <div className="additional-info">
                    <ul>
                      <li>
                        <figure>Ngày bắt đầu</figure>
                        <aside>{formatDate(item.startDate)}</aside>
                      </li>
                      <li>
                        <figure>Ngày kết thúc</figure>
                        <aside>{formatDate(item.endDate)}</aside>
                      </li>
                      <li>
                        <figure>Số khách</figure>
                        <aside>{item.numberOfGuests}</aside>
                      </li>
                      <li>
                        <figure>Trạng thái</figure>
                        {statusInfo(item.status)}
                      </li>
                    </ul>
                  </div>
                  {item.status && item.status === "IN_PROGRESS" ? (
                    <button
                      onClick={() =>
                        deleteBooking(item.bookingId, item.idHost, item.name)
                      }
                      className="detail text-caps underline"
                    >
                      Hủy
                    </button>
                  ) : item.status === "COMPLETED" &&
                    item.commented === false ? (
                    <button
                      onClick={() => handleOpen(item.houseId)}
                      className="detail text-caps underline"
                      id="commentRating"
                    >
                      Đánh giá
                    </button>
                  ) : item.status === "COMPLETED" && item.commented === true ? (
                    <button
                      onClick={() => handleOpen(item.houseId)}
                      className="detail text-caps underline"
                      id="commentRating"
                      style={{
                        pointerEvents: "none",
                        color: "gray",
                        textDecoration: "none",
                        cursor: "not-allowed",
                        borderColor: "gray",
                      }}
                    >
                      Đánh giá
                    </button>
                  ) : (
                    <button
                      onClick={() => deleteBooking(item.id)}
                      className="detail text-caps underline isDis"
                      style={{
                        pointerEvents: "none",
                        color: "gray",
                        textDecoration: "none",
                        cursor: "not-allowed",
                        borderColor: "gray",
                      }}
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <Formik
              initialValues={{
                content: "",
                star: 0,
                userId: id,
                houseId: idSelected,
              }}
              onSubmit={handleComment}
              enableReinitialize={true}
            >
              <Form>
                <div style={styleComment}>
                  <center>
                    <h1> Đánh giá nhà thuê</h1>
                  </center>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h1"
                    style={{ paddingBottom: "5px" }}
                  >
                    <strong>Xếp hạng</strong>
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h1"
                    style={{ paddingBottom: "5px" }}
                  >
                    <strong>Đánh giá</strong>
                  </Typography>
                  <Field
                    as="textarea"
                    id="myTextarea"
                    name="content"
                    rows="8" // Optional: Specify the number of visible text lines
                    cols="80"
                  ></Field>
                  <br />
                  <button
                    type={"submit"}
                    className="btn btn-info"
                    style={{
                      width: "70px",
                      height: "40px",
                      marginTop: "10px",
                      paddingTop: "10px",
                      float: "right",
                    }}
                  >
                    Gửi
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </Modal>
      </div>
    </>
  );
}
