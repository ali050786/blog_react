// File: src/components/post/PostMetadata.js
import React from 'react';
import { Box, HStack, Tag, Text } from '@chakra-ui/react';

function PostMetadata({ categories, tags, createdAt }) {
  return (
    <Box>
      <HStack spacing={2} mb={2}>
        {categories.map((category, index) => (
          <Tag key={index} size="md" colorScheme="green">
            {category.name}
          </Tag>
        ))}
      </HStack>
      <HStack spacing={2} mb={2}>
        {tags.map((tag, index) => (
          <Tag key={index} size="md" colorScheme="blue">
            {tag.name}
          </Tag>
        ))}
      </HStack>
      <Text fontSize="sm" color="gray.500">
        Posted on: {new Date(createdAt).toLocaleDateString()}
      </Text>
    </Box>
  );
}

export default PostMetadata;