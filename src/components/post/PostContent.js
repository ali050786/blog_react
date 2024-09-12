import React from 'react';
import { Box } from '@chakra-ui/react';

function PostContent({ content }) {
  return (
    <Box 
      className="ql-editor" 
      dangerouslySetInnerHTML={{ __html: content }} 
      sx={{
        '& img': {
          maxWidth: '100%',
          height: 'auto',
        },
      }}
    />
  );
}

export default PostContent;