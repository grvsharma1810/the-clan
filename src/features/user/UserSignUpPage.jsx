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
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { API_URL } from '../../config';

function UserSignUpPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [status, setStatus] = useState('idle');
  const [formValues, setFormValues] = useState({
    name: null,
    email: null,
    password: null,
    username: null,
  });

  const handleFormSubmit = async event => {    
    event.preventDefault();    
    try {            
      setStatus('loading');
      const response = await axios.post(
        `${API_URL}/signup`,
        formValues
      );
      setStatus('idle');
      if (response.data.success) {
        toast({
          position: 'top-right',
          title: `Account Created Successfully.`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        navigate('/signin');
      }
    } catch (error) {
      setStatus('idle');
      console.log(error.response);
      toast({
        position: 'top-right',
        title: error.response?.data?.message ? error.response?.data?.message : "Something Went Wrong",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleInput = event => {
    setFormValues(formValues => {
      formValues[event.target.name] = event.target.value;
      return {...formValues};
    });
  };

  return (
    <>
      <Center pb={10}>
        <Box
          boxShadow="2xl"
          minWidth={['90vw', '500']}
          p={6}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Box mb={5} textAlign="center">
            <Heading as="h2" size="lg">
              Sign Up
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
                <FormLabel>Name</FormLabel>
                <Input
                  size="md"
                  type="text"
                  name="name"
                  values={formValues['name']}
                  onChange={handleInput}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  size="md"
                  type="text"
                  name="username"
                  values={formValues['username']}
                  onChange={handleInput}
                  placeholder="Enter your username"
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
                {status === 'idle' && <span>Sign Up</span>}
                {status === 'loading' && <Spinner />}
              </Button>
            </VStack>
          </form>
          <Text m={4} width="100%" textAlign="center">
            Already Have an account ?{' '}
            <Button
              onClick={() => navigate('/signin')}
              variant="link"
              colorScheme="purple"
            >
              Log In
            </Button>{' '}
          </Text>
        </Box>
      </Center>
    </>
  );
}

export default UserSignUpPage;
