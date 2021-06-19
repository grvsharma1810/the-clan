import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { API_URL } from '../../config';

function SuggestedUsers() {
  const [suggestedUsers, setSuggestUsers] = useState([]);
  const { loggedInUser } = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        const response = await axios.get(
          `${API_URL}/users/suggested-users`
        );        
        setSuggestUsers(response.data.users);
      })();
    }
  }, [loggedInUser]);

  return (
    <>
      {suggestedUsers.length > 0 && (
        <Box
          position="relative"
          width="full"
          display={isOpen ? 'block' : 'none'}
        >
          <IconButton
            onClick={() => setIsOpen(false)}
            position="absolute"
            top={5}
            right={2}
            aria-label="Search database"
            icon={<FaWindowClose />}
          />
          <Heading as="h3" size="sm" textAlign="center" mt={6} mb={4}>
            Suggested Users To Follow
          </Heading>
          <Flex
            justifyContent="center"
            direction="row"
            gridGap={4}
            width="full"
            flexWrap="wrap"
          >
            {suggestedUsers?.map(user => {
              return (
                <Box
                  onClick={() =>
                    navigate('/profile', { state: { userId: user._id } })
                  }
                  key={user._id}
                  textAlign="center"
                  boxShadow="md"
                  p={4}
                  cursor="pointer"
                >
                  <Avatar size="md" name={user.name} src={user.photo} />
                  <Text mt={2} fontWeight="medium" fontSize={18}>{user.name}</Text>
                  <Text>{user.username}</Text>
                </Box>
              );
            })}
          </Flex>
        </Box>
      )}
    </>
  );
}

export default SuggestedUsers;
