import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import UserSignInPage from './features/user/UserSignInPage';
import UserSignUpPage from './features/user/UserSignUpPage';
import PageNotFound from './app/PageNotFound';
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import { setupAuthExceptionHandler, setupAuthHeaderForServiceCalls } from './features/user/utils';
import { fetchUserData, logout } from './features/user/userSlice';
import Navbar from './app/navbar/Navbar';
import Profile from './features/profile/Profile';
import HomePage from './app/homepage/HomePage';
import FollowingUsersList from './features/profile/FollowingUsersList';
import FollowersLists from './features/profile/FollowersLists';
import EditProfile from './features/profile/EditProfile';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    (async function () {
      const userDataFromLocalStorageData = JSON.parse(localStorage.getItem('user'));
      if (userDataFromLocalStorageData) {
        setupAuthHeaderForServiceCalls(userDataFromLocalStorageData.token);
        setupAuthExceptionHandler(dispatch, logout, navigate, toast);        
        await dispatch(fetchUserData());        
      } else {
        navigate("signin")
      }
    })()
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/following" element={<FollowingUsersList />} />
        <Route path="/followers" element={<FollowersLists />} />
        <Route path="/signin" element={<UserSignInPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
