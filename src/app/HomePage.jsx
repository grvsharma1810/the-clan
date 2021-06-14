import { Container } from '@chakra-ui/layout';
import React from 'react';
import Feed from '../features/feed/Feed';
import NewPostForm from '../features/feed/NewPostForm';
import SuggestedUsers from './SuggestedUsers';

function HomePage() {
  return (
    <Container maxW="container.sm" centerContent>
      <NewPostForm />
      <SuggestedUsers />
      <Feed />
    </Container>
  );
}

export default HomePage;
