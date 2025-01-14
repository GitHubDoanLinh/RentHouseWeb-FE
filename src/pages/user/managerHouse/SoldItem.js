import "./SoldItem.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookingByHostId, setCheckInStatus } from "../../../redux/services/BookingService";
import { ImageSoldItem } from "./ImageSoldItem";
import { toast } from "react-toastify";

export default function SoldItem() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const listBookingHost = useSelector(({ bookings }) => bookings.list || []);

    useEffect(() => {
        dispatch(getAllBookingByHostId(id))
            .then((data) => {
                if (data.error) {
                    console.error('Lỗi khi lấy danh sách booking:', data.error.message);
                    toast.error('Không thể tải danh sách booking!', { position: 'top-right' });
                }
            });
    }, [dispatch, id]);

    // Đảo ngược danh sách booking
    let listBookingHostReverse = [...listBookingHost].reverse();

    // Kiểm tra dữ liệu trước khi render
    if (!Array.isArray(listBookingHostReverse) || listBookingHostReverse.length === 0) {
        return <div>Không có dữ liệu đặt phòng</div>;
    }

    // Hàm định dạng ngày tháng
    function formatDate(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return [year, month, day].join('-');
    }

    // Hàm xử lý Check In
    const setCheckIn = (idBooking) => {
        dispatch(setCheckInStatus(idBooking)).then((data) => {
            if (data.error) {
                toast.error(`Check In Thất Bại! (${data.error.message})`, { position: "top-right" });
            } else {
                toast.success(`Check In Thành Công!`, { position: "top-right" });
                dispatch(getAllBookingByHostId(id));
            }
        });
    };

    // Render trạng thái booking
    const statusInfo = (status) => {
        const statusStyles = {
            CHECK_IN: { color: 'white', backgroundColor: 'steelblue', label: 'Nhận phòng' },
            IN_PROGRESS: { color: 'white', backgroundColor: 'orange', label: 'Chờ nhận phòng' },
            COMPLETED: { color: 'white', backgroundColor: 'green', label: 'Hoàn thành' },
            CANCELLED: { color: 'white', backgroundColor: 'red', label: 'Đã hủy' },
        };
        const style = statusStyles[status] || {};
        return (
            <aside style={{ border: `1px solid ${style.backgroundColor}`, borderRadius: '3px', padding: '3px', ...style }}>
                {style.label}
            </aside>
        );
    };

    // Hàm định dạng giá tiền
    const formatPrice = (money) => money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    return (
        <div className="col-md-9" style={{ marginLeft: "32px" }}>
            <div className="section-title clearfix"></div>
            {listBookingHostReverse.map((item) => (
                <div key={item.id} className="items list grid-xl-3-items grid-lg-3-items grid-md-2-items">
                    <div className="item">
                        <div className="wrapper">
                            <div className="image">
                                <h3>
                                    {item?.house?.category?.name ? (
                                        <a href="#" className="tag category">{item.house.category.name}</a>
                                    ) : (
                                        <span className="tag category">Không xác định</span>
                                    )}
                                    <a href="single-listing-1.html" className="title" style={{ float: 'left', marginTop: '-20px' }}>
                                        {item?.house?.name || 'Không rõ'}
                                    </a>
                                </h3>
                                <ImageSoldItem item={item?.house || {}} />
                            </div>
                            <h4 className="location one-line-text" style={{ width: '380px', cursor: 'pointer' }}>
                                <a href="#" title={item?.house?.location || 'Không rõ'}>{item?.house?.location || 'Không rõ'}</a>
                            </h4>
                            <div className="price">{formatPrice(item.price)} VND</div>
                            <div className="meta">
                                <figure>
                                    <i className="fa fa-calendar-o"></i>Ngày đặt: {formatDate(item.createAt)}
                                </figure>
                                <figure>
                                    <a href="#">
                                        <i className="fa fa-user"></i>Người đặt: {item?.user?.fullName || 'Không rõ'}
                                    </a>
                                </figure>
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
                            {item.status === "IN_PROGRESS" ? (
                                <a className="detail text-caps underline" id="buttonCheckIn" onClick={() => setCheckIn(item.id)}>Nhận phòng</a>
                            ) : (
                                <a className="detail text-caps underline" id="buttonCheckIn" style={{ pointerEvents: 'none', color: 'gray', textDecoration: 'none', cursor: 'not-allowed', borderColor: 'gray' }}>Nhận phòng</a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
