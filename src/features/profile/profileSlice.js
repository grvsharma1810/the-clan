import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProfilePosts = createAsyncThunk('profile/fetchProfilePosts', async (userId) => {
    const response = await axios.get(`http://localhost:3001/posts?userId=${userId}`);
    return response.data;
})

export const fetchUser = createAsyncThunk('profile/fetchUser', async (userId) => {
    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    return response.data;
})

export const createLikeOnProfilePost = createAsyncThunk('profile/createLikeOnProfilePost', async (postId) => {
    const response = await axios.post(`http://localhost:3001/posts/${postId}/likes`);
    return response.data;
})

export const removeLikeFromProfilePost = createAsyncThunk('profile/removeLikeFromProfilePost', async (postId) => {
    const response = await axios.delete(`http://localhost:3001/posts/${postId}/likes`);
    return response.data;
})

export const createCommentOnProfilePost = createAsyncThunk('profile/createCommentOnProfilePost', async (requestData) => {
    const response = await axios.post(`http://localhost:3001/posts/${requestData.postId}/comments`, requestData.comment);
    return response.data;
})

export const follow = createAsyncThunk('profile/follow', async (requestData) => {
    const response = await axios.post(`http://localhost:3001/user-links`, requestData);
    return response.data;
})

export const unFollow = createAsyncThunk('profile/unFollow', async (_, { getState }) => {
    const response = await axios.delete(`http://localhost:3001/user-links/${getState().profile.following._id}`);
    return response.data;
})

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: null,
        following: null,
        posts: [],
    },
    reducers: {
        resetProfile(state, action) {
            state.user = null
            state.following = false
            state.posts = []
        }
    },
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            // console.log("Pending", action.payload);

        },
        [fetchUser.fulfilled]: (state, action) => {
            console.log("Payload", action.payload);
            state.user = action.payload.user;
            state.following = action.payload.following;
        },
        [fetchUser.rejected]: (state, action) => {
            // console.log("Rejected", action.payload);            
        },

        [fetchProfilePosts.pending]: (state, action) => {
            // console.log("Pending", action.payload);

        },
        [fetchProfilePosts.fulfilled]: (state, action) => {
            console.log("Payload", action.payload);
            state.posts = action.payload.posts;

        },
        [fetchProfilePosts.rejected]: (state, action) => {
            // console.log("Rejected", action.payload);            
        },
        [createLikeOnProfilePost.fulfilled]: (state, action) => {
            console.log("LIKEDD", action.payload);
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);
            console.log(postIndex);
            state.posts[postIndex] = action.payload.post;
        },
        [removeLikeFromProfilePost.fulfilled]: (state, action) => {
            console.log("UN-LIKEDD", action.payload);
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);
            console.log(postIndex);
            state.posts[postIndex] = action.payload.post;
        },
        [createCommentOnProfilePost.fulfilled]: (state, action) => {
            console.log("Commented", action.payload);
            const postIndex = state.posts.findIndex(post => action.payload.post._id === post._id);
            console.log(postIndex);
            state.posts[postIndex] = action.payload.post;
        },
        [follow.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.following = action.payload.following;
            state.user.followerCount = state.user.followerCount + 1;
        },
        [unFollow.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.following = null;
            state.user.followerCount = state.user.followerCount - 1;
        },
        [unFollow.rejected]: (state, action) => {
            console.log(action)
            state.following = null;
            state.user.followerCount = state.user.followerCount - 1;
        }
    }
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
