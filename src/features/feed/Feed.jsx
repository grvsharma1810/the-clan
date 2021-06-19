import { Button } from '@chakra-ui/button';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Box, Container, VStack } from '@chakra-ui/layout';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedPosts, initPosts } from './feedSlice';
import { FaCheckCircle } from 'react-icons/fa';
import Post from '../../common/post/Post';
import { Center } from '@chakra-ui/layout';
import NewPostForm from './NewPostForm';

function Feed() {
  const feed = useSelector(state => state.feed);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.loggedInUser !== null) {      
      (async function () {        
        await dispatch(initPosts());        
      })();
    }
  }, [user.loggedInUser]);

  return (
         
    <>
      <VStack width="full" spacing={8} mt={8}>
        {feed.posts.map(post => {
          return (
            <Post
              post={post}
              key={post._id}
              type="FEED POST"
            />
          );
        })}
      </VStack>
      <Center pb={4} mt={4}>
        {feed.next !== 0 && feed.next !== null && feed.status !== 'loading' && (
          <Button onClick={() => dispatch(fetchFeedPosts())}>Show More</Button>
        )}
        {feed.next === null && (
          <HStack mt={4}>
            <FaCheckCircle color="purple" />
            <Text>You are all caught up. No more posts to show.</Text>
          </HStack>
        )}
      </Center>
      {(feed.status === 'loading' || user.status === 'loading') && (
        <>
          <VStack width="full" spacing={8}>
            <Box width="full">
              <Skeleton height="200px" mt={4} />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
            <Box width="full">
              <Skeleton height="200px" mt={4} />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
          </VStack>
        </>
      )}
    </>
  );
}

export default Feed;
