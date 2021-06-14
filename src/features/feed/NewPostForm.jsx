import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { IconButton } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { HStack } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { FaFileUpload, FaImages, FaVideo } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './feedSlice';
import { uploadImage, uploadVideo, validateFileSize } from './utils';

function NewPostForm() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState('idle');
  const toast = useToast();
  const imageUploadRef = useRef(null);
  const videoUploadRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [formValues, setFormValues] = useState({
    content: '',
    time: null,
    media: [],
  });

  const handleFormValueChange = event => {
    setFormValues(formValues => {
      formValues[event.target.name] = event.target.value;
      return { ...formValues };
    });
  };

  const validateFormData = formValues => {
    if (formValues.content === '' && formValues.media.length === 0) {
      return false;
    }
    return true;
  };

  const handlePost = async event => {
    if (!validateFormData(formValues)) {
      toast({
        position: 'bottom-right',
        title: `Empty Post`,
        description: `Can't do empty post`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (!validateFileSize(imageFiles) || !validateFileSize(videoFiles)) {
      toast({
        position: 'bottom-right',
        title: `Upload Error`,
        description: `Only files of size below 5MB are allowed to be uploaded`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setStatus('loading');
    let imagesMedia = await uploadImage(imageFiles);
    let videosMedia = await uploadVideo(videoFiles);
    imagesMedia = imagesMedia.map(source => ({
      mediaType: 'IMAGE',
      source,
    }));
    videosMedia = videosMedia.map(source => ({
      mediaType: 'VIDEO',
      source,
    }));
    console.log(imagesMedia);
    console.log(videosMedia);
    formValues.time = new Date();
    await dispatch(
      addNewPost({ ...formValues, media: [...imagesMedia, ...videosMedia] })
    );
    setStatus('idle');
    setFormValues({ content: '', time: null, media: [] });
    setImageFiles([]);
    setVideoFiles([]);
  };

  return (
    <Box width="full">
      <Flex>
        <Avatar
          size="md"
          name={user?.loggedInUser?.name}
          src={user?.loggedInUser?.photo}
        />
        <Textarea
          ml={4}
          name="content"
          value={formValues.content}
          onChange={event => handleFormValueChange(event)}
          placeholder="Write your thoughts.."
        />{' '}
      </Flex>
      <Flex justifyContent="flex-end" mt={4}>
        <Button ml={4} onClick={() => imageUploadRef.current.click()}>
          <FaImages />
          <Text ml={2}>Photo</Text>
        </Button>
        <Button ml={4} onClick={() => videoUploadRef.current.click()}>
          <FaVideo />
          <Text ml={2}>Video</Text>
        </Button>
        <Button
          isDisabled={status === 'loading'}
          onClick={handlePost}
          ml={4}
          colorScheme="purple"
        >
          {status === 'idle' && <Text>Post</Text>}
          {status === 'loading' && <Text>Posting..</Text>}
        </Button>
      </Flex>

      <input
        type="file"
        id="file"
        ref={imageUploadRef}
        onChange={event => setImageFiles(event.target.files)}
        name="images"
        accept="image/*"
        style={{ display: 'none' }}
        multiple
      />
      <input
        type="file"
        id="file"
        ref={videoUploadRef}
        onChange={event => setVideoFiles(event.target.files)}
        name="videos"
        accept="video/mp4,video/x-m4v,video/*"
        style={{ display: 'none' }}
        multiple
      />
    </Box>
  );
}

export default NewPostForm;
