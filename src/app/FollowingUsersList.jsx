import { Avatar } from '@chakra-ui/avatar';
import { VStack } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { Stack } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../config';

function FollowingUsersList() {
  const { loggedInUser } = useSelector(state => state.user);
  const [followingList, setFollowingList] = useState([]);
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();
  const {state:{userId}} = useLocation();


  useEffect(() => {
    (async function () {
      setStatus('loading');
      const response = await axios.get(
        `${API_URL}/user-links?userId=${userId}&&type=following`
      );
      console.log(response.data);
      setFollowingList(response.data.followings);
      setStatus('idle');
    })();
  }, []);

  return (
    <>
      {status === 'loading' && (
        <Center>
          <Spinner />
        </Center>
      )}
      {status === 'idle' && (
        <Container maxW="container.sm">
          <VStack>
            {followingList.map(following => {
              return (
                <Box key={following._id} width="full">
                  <Flex
                    onClick={() =>
                      navigate('/profile', {
                        state: { userId: following.follows._id },
                      })
                    }
                    width="full"
                    cursor="pointer"
                    mb={2}
                  >
                    <Avatar
                      size="md"
                      name={following.follows.name}
                      src={following.follows.photo}
                    />
                    <Stack ml={4} direction="column" spacing={1}>
                      <Text fontSize={18} fontWeight="medium">
                        {following.follows.name}
                      </Text>
                      <Text>{following.follows.username}</Text>
                    </Stack>
                  </Flex>
                  <Divider />
                </Box>
              );
            })}
          </VStack>
        </Container>
      )}
    </>
  );
}

export default FollowingUsersList;
