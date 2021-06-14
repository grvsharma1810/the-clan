import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../config";

export const fetchNotifications = createAsyncThunk('user/fetchNotifications', async () => {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
})

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        status: 'idle',
        error: null
    },
    reducers: {
        resetNotification(state, action) {
            state.notifications = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchNotifications.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchNotifications.fulfilled]: (state, action) => {
            console.log("fulfilled", state, action);
            state.notifications = action.payload.notifications;
            state.status = 'idle';
        },
        [fetchNotifications.rejected]: (state, action) => {
            console.log("rejected", state, action);
            state.status = 'error';
            state.error = action.error.message;
        }
    }
});

export const { resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;