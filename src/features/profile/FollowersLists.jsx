import { Avatar } from '@chakra-ui/avatar';
import { Box } from '@chakra-ui/layout';
import { VStack } from '@chakra-ui/layout';
import { HStack } from '@chakra-ui/layout';
import { Stack } from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../../config';

function FollowersLists() {
  const [followersList, setFollowersList] = useState([]);
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();
  const {state:{userId}} = useLocation();

  useEffect(() => {
    (async function () {
      setStatus('loading');
      const response = await axios.get(
        `${API_URL}/user-links?userId=${userId}&&type=follower`
      );
      console.log(response.data);
      setFollowersList(response.data.followers);
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
            {followersList.map(follower => {
              return (
                <Box key={follower._id} width="full">
                  <Flex
                    onClick={() =>
                      navigate('/profile', {
                        state: { userId: follower.user._id },
                      })
                    }
                    width="full"                    
                    cursor="pointer"
                    mb={2}
                  >
                    <Avatar
                      size="md"
                      name={follower.user.name}
                      src={follower.user.photo}
                    />
                    <Stack ml={4} direction="column" spacing={1}>
                      <Text fontSize={18} fontWeight="medium">
                        {follower.user.name}
                      </Text>
                      <Text>{follower.user.username}</Text>
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

export default FollowersLists;
