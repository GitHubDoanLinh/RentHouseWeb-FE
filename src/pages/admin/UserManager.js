import * as React from 'react';
import './tableStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {acceptToHost, deleteUser, getAllUserByAdmin} from "../../redux/services/UserService";
import {Box, Modal, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {getImageByHouseId} from "../../redux/services/ImageService";

export default function UserManager() {
    const dispatch = useDispatch();
    const listUser = useSelector(({users}) => {
        return users.list
    })
    const {id} = useParams()
    console.log("listUser", listUser)
    useEffect(() => {
        dispatch(getAllUserByAdmin(id))
    }, [dispatch, id]);
    const [open, setOpen] = React.useState(false);
    let [value, setValue] = useState(null)
    console.log("value", value)
    const handleOpen = (item) => {
        setValue(item)
        setOpen(true);
    }
    const handleClose = () => {
        setValue(null)
        setOpen(false);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleIsOwner = (idUser) => {
        dispatch(acceptToHost(idUser)).then((data) => {
            if (data.error) {
                toast.error(`Cập nhật thất bại (${data.error.message})!`, {
                    position: "top-right"
                });
            } else {
                toast.success(`Cập nhật thành công người dùng lên chủ nhà !`, {
                    position: "top-right"
                });
                dispatch(getAllUserByAdmin())
            }

        })
    }
    const deleteUserById = (idUser) => {
        dispatch(deleteUser(idUser)).then(() => {
            dispatch(getAllUserByAdmin(id))
        })
    }
    return (
        <>
            <div className="table-users">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ảnh đại diện</th>
                        <th scope="col">Tên đăng nhập</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col" colSpan={3}>Hành động</th>
                    </tr>
                    </thead>

                    <tbody>
                    {listUser && listUser.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td><img src={item.imageUser ? item.imageUser : "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png"} alt=""
                                         style={{height: '80px', width: '80px', borderRadius: '20%'}}/></td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.address}</td>
                                <td style={{width: '100px'}}>
                                    <button className="btn btn-primary text-caps btn-rounded btn-framed"
                                            id={'buttonUserInfo'} onClick={() => handleOpen(item)}>Thông tin
                                    </button>
                                </td>
                                {item.isOwner === 1 ?
                                    <td className="button-user-accept" style={{width: '100px'}}>
                                        <button className="btn btn-outline-success text-caps btn-rounded "
                                                id={'buttonUserAccept'}
                                                onClick={() =>
                                                    handleIsOwner(item.id)}
                                        >Xác nhận
                                            chủ nhà
                                        </button>
                                    </td>
                                    : item.isOwner === 2 ? <td style={{width: '100px'}}>
                                            <button className="btn btn-outline-success text-caps btn-rounded " style={{
                                                pointerEvents: 'none',
                                                color: 'gray',
                                                textDecoration: 'none',
                                                cursor: 'not-allowed',
                                                borderColor: 'gray',
                                                backgroundColor: 'transparent'
                                            }}>Xác nhận
                                                chủ nhà
                                            </button>
                                        </td> :
                                        <td style={{width: '100px'}}>
                                        </td>
                                }

                                <td style={{width: '100px'}}>
                                    <button className="btn btn-primary text-caps btn-rounded btn-framed"
                                            onClick={() => deleteUserById(item.id)}>Xóa
                                    </button>
                                </td>

                            </tr>
                        )
                    )}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>

                            <h1>Thông tin cá nhân </h1>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Họ tên: {value && value.fullName}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Email: {value && value.email}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Tuổi: {value && value.age}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Địa chỉ: {value && value.address}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Ngày tháng năm sinh: {value && value.dateOfBirth}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Số điện thoại: {value && value.phone}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Vai trò: {value && value.roles[0].name}
                            </Typography>
                        </Box>
                    </Modal>
                    </tbody>
                </table>
            </div>
            <hr/>
        </>
    )
}