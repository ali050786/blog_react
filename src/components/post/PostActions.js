// File: src/components/post/PostActions.js
import React from 'react';
import { Flex, Button, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function PostActions({ postId, isLoggedIn }) {
  return (
    <Flex>
      <Button as={RouterLink} to="/" colorScheme="teal">
        Back to Posts
      </Button>
      <Spacer />
      {isLoggedIn && (
        <Button as={RouterLink} to={`/edit/${postId}`} colorScheme="blue">
          Edit Post
        </Button>
      )}
    </Flex>
  );
}

export default PostActions;