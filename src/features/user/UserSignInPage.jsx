import { Button } from '@chakra-ui/button';
import { FormLabel } from '@chakra-ui/form-control';
import { FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Center, Text } from '@chakra-ui/layout';
import { VStack } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login, logout } from './userSlice';
import {
  saveUserDataToLocalStorage,
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from './utils';

function UserSignInPage() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  // const [status, setStatus] = useState('idle');
  const [formValues, setFormValues] = useState({
    email: null,
    password: null,
  });

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      let result = await dispatch(login(formValues));
      result = unwrapResult(result);
      setupAuthExceptionHandler(dispatch, logout, navigate, toast);
      toast({
        position: 'bottom-right',
        title: `Logged In Successfully.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.log(error.response);      
      toast({
        position: 'bottom-right',
        title: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleInput = event => {
    setFormValues(formValues => {
      formValues[event.target.name] = event.target.value;
      return { ...formValues };
    });
  };

  return (
    <>
      <Center alignItems="center" padding={4}>
        <Box
          boxShadow="2xl"
          minWidth={['90vw', '500']}
          p={6}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Box mb={5} textAlign="center">
            <Heading as="h2" size="lg">
              Login To The Clan
            </Heading>
          </Box>
          <form onSubmit={handleFormSubmit}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  size="md"
                  type="email"
                  name="email"
                  values={formValues['email']}
                  onChange={handleInput}
                  placeholder="Enter email here"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  size="md"
                  type="password"
                  name="password"
                  values={formValues['password']}
                  onChange={handleInput}
                  placeholder="Enter password here"
                />
              </FormControl>
              <Button width="full" colorScheme="purple" type="submit">
                {(user.status === 'idle' || user.status === 'error') && (
                  <span>Log In</span>
                )}
                {user.status === 'loading' && <Spinner />}
              </Button>
            </VStack>
          </form>
          <Text m={4} width="100%" textAlign="center">
            Don't have an account ?{' '}
            <Button
              onClick={() => navigate('/signup')}
              variant="link"
              colorScheme="purple"
            >
              Sign Up
            </Button>{' '}
          </Text>
        </Box>
      </Center>
    </>
  );
}

export default UserSignInPage;
