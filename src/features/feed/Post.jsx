import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from './TimeAgo';
import { isPostLikedByLoggedInUser } from './utils';
import { useNavigate } from 'react-router';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import PostMedia from './PostMedia';
import {
  createCommentOnFeedPost,
  createLikeOnFeedPost,
  removeLikeFromFeedPost,
} from './feedSlice';
import {
  createCommentOnProfilePost,
  createLikeOnProfilePost,
  removeLikeFromProfilePost,
} from '../profile/profileSlice';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { Textarea } from '@chakra-ui/textarea';
import { useToast } from '@chakra-ui/toast';

function Post({ post, type, userId }) {
  // const { content, media, user, time } = post;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const feed = useSelector(state => state.feed);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const isPostLiked = isPostLikedByLoggedInUser(post, loggedInUser);

  const handleCreateLike = async () => {
    if (type === 'FEED POST') {
      dispatch(createLikeOnFeedPost(post._id));
    } else if (type === 'PROFILE POST') {      
      dispatch(createLikeOnProfilePost(post._id))      
    }
  };

  const handleRemoveLike = async () => {
    if (type === 'FEED POST') {
      dispatch(removeLikeFromFeedPost(post._id));
    } else if (type === 'PROFILE POST') {
      dispatch(removeLikeFromProfilePost(post._id));      
    }
  };

  const createComment = async commentData => {
    if (type === 'FEED POST') {
      dispatch(createCommentOnFeedPost(commentData));
    } else if (type === 'PROFILE POST') {
      dispatch(createCommentOnProfilePost(commentData))      
    }
  };

  const handleComment = event => {
    if (content === '') {
      toast({
        position: 'bottom-right',
        title: `Can't post empty comment`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    createComment({
      postId: post._id,
      comment: { content, time: new Date() },
    });
    setContent('');
  };

  return (
    <Box width="full">
      <HStack spacing={3}>
        <Avatar
          onClick={() =>
            navigate('/profile', {
              state: {
                userId: post.user._id,
              },
            })
          }
          cursor="pointer"
          name={post.user.name}
          src={post.user.photo}
        />
        <Box
          onClick={() =>
            navigate('/profile', {
              state: {
                userId: post.user._id,
              },
            })
          }
          cursor="pointer"
        >
          <HStack>
            <Text fontWeight="medium" fontSize={20}>
              {post.user.name}
            </Text>
            <Text>&bull; {post.user.username}</Text>
          </HStack>
          <TimeAgo timestamp={post.time} />
        </Box>
      </HStack>
      {post?.media?.length > 0 && <PostMedia media={post.media} />}
      <Text mt={2} mb={3}>
        {post.content}
      </Text>
      <HStack>
        {!isPostLiked && (
          <Button
            onClick={() => handleCreateLike()}
            variant="solid"
            colorScheme="gray"
            width="full"
          >
            <FaRegThumbsUp />
            <Text ml={2}>{post.likes.length}</Text>
          </Button>
        )}
        {isPostLiked && (
          <Button
            onClick={() => handleRemoveLike()}
            colorScheme="purple"
            width="full"
          >
            <FaThumbsUp />
            <Text ml={2}>{post.likes.length}</Text>
          </Button>
        )}
        <Button onClick={onOpen} colorScheme="gray" width="full">
          {post.comments.length} Comments
        </Button>
      </HStack>

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Comments</DrawerHeader>
          <DrawerBody maxHeight="70vh">
            <Textarea
              value={content}
              onChange={event => setContent(() => event.target.value)}
              name="content"
              placeholder="Write your comments.."
            />

            <Flex justifyContent="flex-end" mt={4}>
              <Button onClick={event => handleComment(event)}>Comment</Button>
            </Flex>

            <Box width="full">
              {post?.comments.map(comment => {
                return (
                  <Flex mb={8} key={comment._id}>
                    <Avatar
                      size="md"
                      name={comment.user.name}
                      src={comment.user.photo}
                    />
                    <Box
                      ml={4}
                      p={2}
                      width="full"
                      borderRadius="md"
                      boxShadow="md"
                    >
                      <HStack>
                        <Heading as="h4" size="sm">
                          {comment.user.username} &bull;{' '}
                        </Heading>
                        <TimeAgo timestamp={comment.time} />
                      </HStack>
                      <Box mt={1}>{comment.content}</Box>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Post;
