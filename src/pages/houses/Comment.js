import {Box, Rating, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteComment, getCommentById} from "../../redux/services/CommentService";
import "./comment.css"
import {getById} from "../../redux/services/HouseService";

export function Comment({id, house, userId}) {
    const dispatch = useDispatch();
    //comment
    const listComment = useSelector(({comments}) => {
        return comments.listComment;
    })
    useEffect(() => {
        dispatch(getCommentById(id))
    }, []);

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

    const deleteCommentById = (idComment) => {
        dispatch(deleteComment(idComment)).then(() => {
            dispatch(getCommentById(id))
        })
    }
    return (
        <>

            <h2>★{listComment && listComment.reduce((total, next) => total + next.star, 0) / listComment.length} · {listComment && listComment.length} Đánh
                giá</h2>
            <div className="container">
                <div className="row">
                    {listComment && listComment.map((item) => <div className={"row"}>
                        <div className={'containerComment col-12'}>
                            <div className="author">
                                <div className="author-image">
                                    <div className="background-image"><img
                                        src={item.user.imageUser ? item.user.imageUser : 'https://placehold.co/400'}
                                        alt=""/></div>
                                </div>
                                <div className="author-description">
                                    <p style={{color: 'darkred'}}>{item.user.fullName}</p>
                                    <a href="seller-detail-1.html" className="text-uppercase">{item.user.address}</a>
                                    <div className="rating" data-rating="4"></div>
                                </div>
                            </div>
                            <p>
                                <Box sx={{'& > legend': {mt: 2},}}>
                                    <Rating name="read-only" value={item.star} readOnly/>
                                </Box>
                                <span>{formatDate(item.createdAt)}</span>
                            </p>
                            <p> {item.content}</p>
                            {userId === house.userDTO.id ?
                                <div className={'centerButtonDeleteComment'}>
                                    <button className={'buttonDeleteComment btn btn-danger'} style={{float: 'right'}} onClick={() => deleteCommentById(item.id)}>del
                                    </button>
                                </div> : ''}

                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}