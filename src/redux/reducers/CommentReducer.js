import {createSlice} from "@reduxjs/toolkit";
import {addComment, deleteComment, getCommentById} from "../services/CommentService";

const initialState = {
    listComment: [],
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers: builder => {
        builder.addCase(getCommentById.fulfilled, (state, {payload}) => {
            state.listComment = payload;
        })
        builder.addCase(addComment.fulfilled, (state, {payload}) => {
        })
        builder.addCase(deleteComment.fulfilled,(state, action) => {

        })
    }

})
export default commentSlice.reducer;