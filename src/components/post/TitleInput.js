// File: src/components/post/TitleInput.js
import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function TitleInput({ title, setTitle }) {
  return (
    <FormControl isRequired>
      <FormLabel>Title</FormLabel>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
      />
    </FormControl>
  );
}

export default TitleInput;