import {Field} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerToHost} from "../../redux/services/UserService";
import {toast} from "react-toastify";

export default function RegisterHost() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const registerHost = (id) => {
        dispatch(registerToHost(id)).then(async (data) => {
            if (data.error) {
                toast.error(`Đăng kí thất bại (${data.error.message})!`, {
                    position: "top-right"
                });
            } else {
                toast.success(`Đã gửi yêu cầu đăng kí của bạn!`, {
                    position: "top-right"
                });
                navigate(`/house`);
            }
        })
    }
    return (<>
        <div className="card mb-5" style={{width: '80%', left: '10%'}}>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="mb-1 border-bottom">Đăng kí làm chủ nhà</h2>
                        <h4 style={{marginTop: '10px'}}>Công việc chuẩn bị Set up tài khoản</h4>
                        <p style={{opacity: '80%', marginTop: '10px'}}>
                            1. Căn cước công dân/ hộ chiếu<br/>
                            2. Bộ ảnh về chỗ ở của bạn<br/>
                            3. Tài khoản/ thẻ bank có visa/ Mastercard.<br/>
                            4. Số phone<br/>
                            5. Email.<br/>
                            6. Khuôn mặt tươi tỉnh của bạn.<br/>
                            <Link to={`/profile/profile-detail/${id}`} style={{color: 'blue'}}>--Cập nhật thông tin cá
                                nhân tại đây--</Link></p>
                        <h4>6 bước cần thực hiện</h4>
                        <p style={{opacity: '80%', marginTop: '10px'}}>
                            1. Bạn cần set up tài khoản thật chi tiết theo các bước trên. Bạn đừng bỏ qua chi tiết
                            nào.<br/>
                            2. Bộ ảnh cần sống động, chân thực để mô tả được căn hộ của bạn<br/>
                            3. Bạn cần có chính sách giá tốt cho giai đoạn đầu tiên và nhận được đánh giá tốt của
                            khách<br/>
                            4. Bạn cần dọn phòng và set up phòng sạch sẽ và đẹp mắt.<br/>
                            5. Tự động check in/ out bằng khoá thông minh là lợi thế lắm đó<br/>
                            6. Bạn đừng lo ngại về việc mất đồ, vì chúng tôi đã xác thực khách và bảo hiểm cho bạn. Đại
                            đa số khách là khách lịch sự và giữ gìn đồ đạc.<br/>
                            Chúc bạn thành công !!!!</p>
                        <h4>Kinh nghiệm chụp hình phòng</h4>
                        <p style={{opacity: '80%', marginTop: '10px'}}>
                            Bạn cần chuẩn bị căn hộ/ phòng của bạn tốt nhất. Bạn nên chụp vào thời gian, khoảng 5-6h pm,
                            mùa này để có ánh sáng xanh cho view. Bạn cần bật đèn/ hỗ trợ đèn đủ sáng để chụp không gian
                            căn hộ của bạn. Bạn cần chụp các hình mô tả được toàn cảnh căn hộ, từng góc chức năng và các
                            ảnh chi tiết.<br/>
                            Tại sao lại phải tạo nhiều mục, vì:<br/>
                            - Larente coi mỗi phòng hotel của chúng ta là 1 chỗ ở độc lập, khi có khách book là chỗ ở đó
                            bị khoá lại.<br/>
                            - Chúng ta cần phải bán hết số phòng mà hotel có, chứ không phải chỉ bán 1 phòng<br/>
                            - Hotel của chúng ta có 3 hạng phòng khác nhau, giá bán khác nhau.</p>
                        <section className="text-center">
                            <button type="submit" className="btn btn-primary" onClick={() => registerHost(id)}>Đăng kí
                                làm chủ nhà
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </>)
}