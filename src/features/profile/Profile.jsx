import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import {
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Post from '../feed/Post';
import { fetchUser, fetchProfilePosts, resetProfile } from './profileSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useToast } from '@chakra-ui/toast';
import ProfileHeader from './ProfileHeader';

function Profile() {
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const [status, setStatus] = useState('idle');
  const toast = useToast();
  const { state } = useLocation();
  console.log(state);
  const {
    state: { userId },
  } = useLocation();
  const { posts, user, following } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        try {
          setStatus('loading');
          unwrapResult(await dispatch(fetchProfilePosts(userId)));
          unwrapResult(await dispatch(fetchUser(userId)));
          setStatus('idle');
        } catch (error) {
          toast({
            position: 'bottom-right',
            title: error.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      })();
    }
    return () => {
      dispatch(resetProfile());
    };
  }, [loggedInUser, dispatch, userId]);

  return (
    <>
      {status === 'loading' && (
        <Container maxW="container.sm" centerContent>
          <Spinner />
        </Container>
      )}

      {status === 'idle' && (
        <Container maxW="container.sm">
          <ProfileHeader user={user} following={following}/>
          <Heading as="h3" size="lg" mt={4}>
            Timeline
          </Heading>
          {posts.length === 0 && <Center fontSize={25} mt={20}>No Posts Yet</Center>}
          {posts.length > 0 && <VStack width="full" spacing={8} mt={8}>
            {posts.map(post => {
              return (
                <Post
                  post={post}
                  key={post._id}
                  type="PROFILE POST"
                  userId={userId}
                />
              );
            })}
          </VStack>}
        </Container>
      )}
    </>
  );
}

export default Profile;
