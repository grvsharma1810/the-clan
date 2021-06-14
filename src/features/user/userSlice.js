import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const login = createAsyncThunk('user/login', async (userCredentials) => {
    const response = await axios.post(
        'http://localhost:3001/login', userCredentials
    );
    return response.data;
})

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const response = await axios.get('http://localhost:3001/users');
    return response.data;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedInUser: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state, action) => {
            state.loggedInUser = null;
            state.status = 'idle';
            state.error = null;
        },
        updateUser: (state, action) => {
            const userUpdates = action.payload;
            Object.keys(userUpdates).forEach(key => {
                if (key in state.loggedInUser) {
                    state.loggedInUser[key] = userUpdates[key];
                }
            })
            console.log(state.loggedInUser);
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = 'loading';
        },
        [login.fulfilled]: (state, action) => {
            console.log("fulfilled", state, action);
            state.loggedInUser = action.payload.user;
            state.status = 'idle';
        },
        [login.rejected]: (state, action) => {
            console.log("rejected", state, action);
            state.status = 'error';
            state.error = action.error.message;
        },

        [fetchUserData.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchUserData.fulfilled]: (state, action) => {
            console.log("fulfilled", state, action);
            state.loggedInUser = action.payload.user;
            state.status = 'idle';
        },
        [fetchUserData.rejected]: (state, action) => {
            console.log("rejected", state, action);
            state.status = 'error';
            state.error = action.error.message;
        },
    }
});

export const { logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
