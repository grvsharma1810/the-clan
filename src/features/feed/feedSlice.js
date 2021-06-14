import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

export const initPosts = createAsyncThunk('feed/initPosts', async (_, { getState }) => {
    const response = await axios.get(`${API_URL}/home/feed?current=${getState().feed.next}&&size=10`);
    return response.data;
})

export const fetchFeedPosts = createAsyncThunk('feed/fetchFeedPosts', async (_, { getState }) => {
    const response = await axios.get(`${API_URL}/home/feed?current=${getState().feed.next}&&size=10`);
    return response.data;
})

export const addNewPost = createAsyncThunk('feed/addNewPost', async (requestData) => {
    const response = await axios.post(`${API_URL}/posts/`, requestData);
    return response.data;
})

export const createLikeOnFeedPost = createAsyncThunk('feed/createLikeOnFeedPost', async (postId) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/likes`);
    return response.data;
})

export const removeLikeFromFeedPost = createAsyncThunk('feed/removeLikeFromFeedPost', async (postId) => {
    const response = await axios.delete(`${API_URL}/posts/${postId}/likes`);
    return response.data;
})

export const createCommentOnFeedPost = createAsyncThunk('feed/createCommentOnFeedPost', async (requestData) => {
    console.log({ requestData });
    const response = await axios.post(`${API_URL}/posts/${requestData.postId}/comments`, requestData.comment);
    return response.data;
})

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
        next: 0
    },
    reducers: {        
        resetFeed(state, action) {
            state.posts = [];
            state.status = 'idle';
            state.error = null;
            state.next = 0;
        }
    },
    extraReducers: {
        [initPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.posts;
            if (action.payload.next) {
                state.next = action.payload.next;
            } else {
                state.next = null;
            }
            state.status = 'idle';
        },
        [fetchFeedPosts.pending]: (state, action) => {
            // console.log("Pending", action.payload);
            state.status = 'loading';
        },
        [fetchFeedPosts.fulfilled]: (state, action) => {
            console.log("Payload", action.payload);
            state.posts = state.posts.concat(action.payload.posts);
            if (action.payload.next) {
                state.next = action.payload.next;
            } else {
                state.next = null;
            }
            state.status = 'idle';
        },
        [fetchFeedPosts.rejected]: (state, action) => {
            // console.log("Rejected", action.payload);
            state.status = 'error';
            state.error = action.error.message;
        },
        [addNewPost.fulfilled]: (state, action) => {
            console.log("Fullfiledddddd", action.payload);
            state.posts.unshift(action.payload.post);
        },
        [createLikeOnFeedPost.fulfilled]: (state, action) => {
            console.log("LIKEDD", action.payload);
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);
            console.log(postIndex);
            state.posts[postIndex] = action.payload.post;
        },
        [removeLikeFromFeedPost.fulfilled]: (state, action) => {
            console.log("UN-LIKEDD", action.payload);
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);
            console.log(postIndex);
            state.posts[postIndex] = action.payload.post;
        },
        [createCommentOnFeedPost.fulfilled]: (state, action) => {
            console.log("Commented", action.payload);
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);
            console.log(postIndex);
            state.posts[postIndex] = action.payload.post;
        },
    }
})

export const { resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
