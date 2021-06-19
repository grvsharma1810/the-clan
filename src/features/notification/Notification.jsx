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
import { FaBell } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import TimeAgo from '../../common/TimeAgo';
import { fetchNotifications } from './notificationSlice';

function Notification() {
  const { loggedInUser } = useSelector(state => state.user);
  const { notifications } = useSelector(state => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();    

  useEffect(() => {
    if (loggedInUser) {
      (async function () {                
        console.log('notifications fetched started', loggedInUser);
        await dispatch(fetchNotifications());
        console.log('notifications fetched');
      })();
    }
  }, [dispatch, loggedInUser]);

  return (
    <Popover>
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            size="md"
            fontSize="2xl"
            aria-label="notifications"
            variant="ghost"
            color="current"
            icon={<FaBell />}
          />
          <Circle
            cursor="pointer"
            fontSize={10}
            size="20px"
            bg="pink.500"
            color="white"
            position="absolute"
            top="0"
            right="0"
          >
            {notifications.length}
          </Circle>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Notifications</PopoverHeader>
          {notifications.length === 0 && (
            <Center mt={2} mb={2} fontWeight="bold">
              No New Notifications
            </Center>
          )}
          {notifications.length > 0 && (
            <PopoverBody maxHeight="70vh" overflowY="auto">
              {notifications.map(notification => {
                return (
                  <div key={notification._id}>
                    <Box width="full" mb={2} mt={2}>
                      <Flex>
                        <Avatar
                          size="sm"
                          name={notification.sourceUser.name}
                          src={notification.sourceUser.photo}
                        />
                        <Box width="full" ml={2}>
                          {notification.notificationType === 'NEW POST' && (
                            <>
                              <Link
                                fontWeight="bold"
                                onClick={() =>
                                  navigate('/profile', {
                                    state: {
                                      userId: notification.sourceUser._id,
                                    },
                                  })
                                }
                              >
                                {notification.sourceUser.name}
                              </Link>
                              <span>&nbsp;posted recently.</span>
                            </>
                          )}
                          {notification.notificationType === 'NEW FOLLOWER' && (
                            <>
                              <Link
                                fontWeight="bold"
                                onClick={() =>
                                  navigate('/profile', {
                                    state: {
                                      userId: notification.sourceUser._id,
                                    },
                                  })
                                }
                              >
                                {notification.sourceUser.name}
                              </Link>
                              <span>&nbsp;followed you.</span>
                            </>
                          )}
                          {notification.notificationType === 'LIKE' && (
                            <>
                              <Link
                                fontWeight="bold"
                                onClick={() =>
                                  navigate('/profile', {
                                    state: {
                                      userId: notification.sourceUser._id,
                                    },
                                  })
                                }
                              >
                                {notification.sourceUser.name}
                              </Link>
                              <span>&nbsp;liked Your post.</span>
                            </>
                          )}
                          {notification.notificationType === 'COMMENT' && (
                            <>
                              <Link
                                fontWeight="bold"
                                onClick={() =>
                                  navigate('/profile', {
                                    state: {
                                      userId: notification.sourceUser._id,
                                    },
                                  })
                                }
                              >
                                {notification.sourceUser.name}
                              </Link>
                              <span>&nbsp;commented on your post.</span>
                            </>
                          )}
                          <TimeAgo timestamp={notification.time} />
                        </Box>
                      </Flex>
                    </Box>
                    <Divider />
                  </div>
                );
              })}
            </PopoverBody>
          )}
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default Notification;
