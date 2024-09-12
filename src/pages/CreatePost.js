// src/pages/CreatePost.js
import React from 'react';
import { Container, VStack, Heading } from '@chakra-ui/react';
import PostForm from '../components/PostForm';

function CreatePost() {
  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8}>
        <Heading>Create a New Post</Heading>
        <PostForm />
      </VStack>
    </Container>
  );
}

export default CreatePost;