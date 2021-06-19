import { IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { FaHome } from 'react-icons/fa';
import { Flex, Heading, HStack, Spacer } from '@chakra-ui/layout';
import React from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import logo from '../../logo.svg';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Notification from '../../features/notification/Notification';
import UserAccountDrawer from './UserAccountDrawer';

function Navbar() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <Flex
      p={2}
      mb={4}
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <HStack
        p="2"
        onClick={() => user.loggedInUser && navigate('/')}
        cursor="pointer"
      >
        <Image boxSize="9" src={logo} alt="The Clan" />
        <Heading size="md">The Clan</Heading>
      </HStack>
      <Spacer />
      <HStack spacing={2}>
        {user.loggedInUser && (
          <>
            <Notification />
            <IconButton
              onClick={() => navigate('/')}
              size="md"
              fontSize="2xl"
              aria-label="home"
              variant="ghost"
              color="current"
              icon={<FaHome />}
            />
            <UserAccountDrawer />
          </>
        )}
        <ColorModeSwitcher justifySelf="flex-end" />
      </HStack>
    </Flex>
  );
}

export default Navbar;
