import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getById, getHouseByUser, removeById} from "../../../redux/services/HouseService";
import {Link, useParams} from "react-router-dom";
import {HouseOfUser} from "./HouseOfUser";
import "./houses_user.css"

export default function ListHouseOfUser() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const listHouseByUserId = useSelector(({houses}) => {
        return houses.listByUser;
    })
    useEffect(() => {
        dispatch(getHouseByUser(id))
    }, []);
    let listHouseByUserIdReverser = [...listHouseByUserId].reverse();
    function handleDelete(idHouse) {
        // eslint-disable-next-line no-restricted-globals
        // let isConfirmed = confirm("Are you sure you want to delete");
        if (true)    {
            dispatch(removeById(idHouse)).then(()=> {
                dispatch(getHouseByUser(id))
            })
        }
        else {
            alert("Oke la")
        }
    }
    return (
        <>
            <div className="col-md-9 houses-user">



                <div className="items list compact grid-xl-3-items grid-lg-2-items grid-md-2-items">
                    {listHouseByUserIdReverser && listHouseByUserIdReverser.map((item) =>
                        {
                            return (
                                <HouseOfUser key={item.id} item={item} handleDelete={()=>handleDelete(item.id)}/>
                            )
                        }

                    )}
                </div>

            </div>
        </>
    )
}