import {createAsyncThunk} from "@reduxjs/toolkit";
import getAxios from "./customAxios";

export const getCommentById = createAsyncThunk(
    'comment/getCommentById',
    async (idHouse) => {
        let response = await getAxios().get(`/comment/${idHouse}`);
        return response.data;
    }
)
export const addComment = createAsyncThunk(
    'comment/addComment',
    async (comment) => {
        let response = await getAxios().post(`/comment`, comment);
        return response.data;
    }
)
export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async (id) => {
        let response = await getAxios().delete(`/comment/${id}`)
        return response.data;
    }
)