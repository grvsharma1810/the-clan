import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Flex, HStack, Spacer, Stack, Text } from '@chakra-ui/layout';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { follow, unFollow } from './profileSlice';

function ProfileHeader({ user, following }) {
  const { loggedInUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user);

  return (    
      <Flex>
        <Avatar size="xl" name={user?.name} src={user?.photo} />
        <Spacer maxW="10px" />
        <Stack direction="column" ml={3} spacing={2}>
          <Text fontSize="2xl" justifySelf="start">
            {user?.username}
          </Text>
          <HStack spacing={2}>
            <Text
              cursor="pointer"
              display="inline-block"
              onClick={() => navigate('/following')}
            >
              {user?.followingCount} following
            </Text>
            <Text
              cursor="pointer"
              display="inline-block"
              onClick={() => navigate('/followers')}
            >
              {user?.followerCount} followers
            </Text>
          </HStack>
          <Text fontWeight="medium">{user?.name}</Text>
          {!user?.bio && <Text>No Bio Yet</Text>}
          {user?.bio && <Text>{user?.bio}</Text>}
          {loggedInUser?._id !== user?._id && !following && (
            <Button
              mt={5}
              onClick={() =>
                dispatch(
                  follow({
                    user: loggedInUser._id,
                    follows: user._id,
                  })
                )
              }
            >
              Follow
            </Button>
          )}
          {loggedInUser?._id !== user?._id && following && (
            <Button
              colorScheme="purple"
              mt={5}
              onClick={() =>
                dispatch(
                  unFollow({
                    user: loggedInUser._id,
                    follows: user._id,
                  })
                )
              }
            >
              Following
            </Button>
          )}
        </Stack>
      </Flex>          
  );
}

export default ProfileHeader;
