import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { FormLabel } from '@chakra-ui/form-control';
import { FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { Box, Container, Flex, Heading } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../config';
import { uploadImage } from '../feed/utils';
import { updateUser } from '../user/userSlice';

function EditProfile() {
  const { loggedInUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const [formValues, setFormValues] = useState({
    username: '',
    bio: '',
    photo: null,
  });
  

  useEffect(() => {
    if (loggedInUser) {
      setFormValues(() => ({
        username: loggedInUser.username || '',
        bio: loggedInUser.bio || '',
        photo: null,
      }));
    }
  }, [loggedInUser]);

  const handleInputChange = event => {
    if (event.target.name === 'photo') {
      setFormValues(formValues => {
        return { ...formValues, [event.target.name]: event.target.files };
      });
    } else {
      setFormValues(formValues => {
        return { ...formValues, [event.target.name]: event.target.value };
      });
    }
  };

  const save = async () => {
    try {
      let uploadedImageUrl = null;      
      let requestBody = {};
      if (formValues.photo && formValues.photo.length > 0) {
        uploadedImageUrl = await uploadImage(formValues.photo);
        requestBody.photo = uploadedImageUrl[0];
      }
      if (formValues.username !== '' || formValues.username !== null) {
        requestBody.username = formValues.username;
      }
      if (formValues.bio !== '' || formValues.bio !== null) {
        requestBody.bio = formValues.bio;
      }      
      const response = await axios.post(
        `${API_URL}/users`,
        requestBody
      );
      dispatch(updateUser(response.data.user));
      toast({
        position: 'bottom-right',
        title: `Saved`,
        description: `Your details have been saved successfully`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        position: 'bottom-right',
        title: `Failed`,
        description: `Something went wrong. Please try again later`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm">
      <Box>
        <Heading as="h4" size="md" mb={4}>
          Profile Photo
        </Heading>
        <input
          type="file"
          id="file"
          onChange={event => handleInputChange(event)}
          name="photo"
          accept="image/*"
        />
        <VStack spacing={5} mt={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              width="full"
              size="md"
              type="text"
              name="username"
              value={formValues.username}
              onChange={event => handleInputChange(event)}
              placeholder="Enter username here"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              width="full"
              name="bio"
              value={formValues.bio}
              onChange={event => handleInputChange(event)}
              placeholder="Enter bio here"
            />
          </FormControl>
        </VStack>
        <Flex justifyContent="flex-end" mt={4}>
          <Button onClick={() => save()} colorScheme="purple">
            Save
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}

export default EditProfile;
