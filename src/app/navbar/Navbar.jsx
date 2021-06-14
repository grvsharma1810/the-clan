import { Button, IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { FaBell, FaHome } from 'react-icons/fa';
import { Box, Circle, Flex, Heading, HStack, Spacer } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import logo from '../../logo.svg';
import { Avatar } from '@chakra-ui/avatar';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchNotifications } from '../../features/notification/notificationSlice';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/popover';
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
            <UserAccountDrawer/>
          </>
        )}
        <ColorModeSwitcher justifySelf="flex-end" />
      </HStack>
    </Flex>
  );
}

export default Navbar;
