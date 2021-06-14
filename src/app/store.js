import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/user/userSlice"
import feedReducer from "../features/feed/feedSlice"
import notificationReducer from "../features/notification/notificationSlice"
import profileReducer from "../features/profile/profileSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        notification: notificationReducer,
        profile: profileReducer
    },
});
