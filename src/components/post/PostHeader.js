// File: src/components/post/PostHeader.js
import React from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';

function PostHeader({ title, coverImage }) {
  return (
    <Box>
      {coverImage && (
        <Image 
          src={`http://localhost:5000/uploads/${coverImage}`} 
          alt={title} 
          maxHeight="400px" 
          objectFit="cover" 
          width="100%"
          mb={4}
        />
      )}
      <Heading>{title}</Heading>
    </Box>
  );
}

export default PostHeader;
