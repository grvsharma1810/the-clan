import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { IconButton } from '@chakra-ui/button';
import { Center } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/layout';
import { Box, Circle, Divider, Flex, Text } from '@chakra-ui/layout';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/popover';
import { Portal } from '@chakra-ui/portal';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { resetFeed } from '../../features/feed/feedSlice';
import { resetNotification } from '../../features/notification/notificationSlice';
import { resetProfile } from '../../features/profile/profileSlice';
import { logout } from '../../features/user/userSlice';

function UserAccountDrawer() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {    
    localStorage.removeItem('user');    
    dispatch(logout());
    dispatch(resetProfile());
    dispatch(resetNotification());
    dispatch(resetFeed())
    navigate('/signin');
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar name={user.loggedInUser.name} src={user.loggedInUser.photo} cursor="pointer" size="sm" />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Account</PopoverHeader>
          <PopoverBody maxHeight="70vh">
            <Button
              onClick={() =>
                navigate('/profile', {
                  state: { userId: user.loggedInUser._id },
                })
              }
              variant="ghost"
              width="full"
            >
              Profile
            </Button>
            <Divider />
            <Button
              onClick={() =>
                navigate('/edit-profile', {
                  state: { userId: user.loggedInUser._id },
                })
              }
              variant="ghost"
              width="full"
            >
              Edit Profile
            </Button>
            <Button onClick={() => handleLogout()} variant="ghost" width="full">
              Log Out
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default UserAccountDrawer;
