// src/pages/Home.js
import React from 'react';
import { Container, VStack, Heading } from '@chakra-ui/react';
import PostList from '../components/PostList';

function Home() {
  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8}>
        <Heading>Welcome to Our Blog</Heading>
        <PostList />
      </VStack>
    </Container>
  );
}

export default Home;