// File: src/components/post/TagInput.js
import React from 'react';
import { FormControl, FormLabel, Input, Button, Box, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

function TagInput({ tags, setTags, newTag, setNewTag }) {
  const handleAddTag = () => {
    if (newTag && !tags.find(tag => tag.name === newTag)) {
      setTags([...tags, { name: newTag }]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag.name !== tagToRemove));
  };

  return (
    <FormControl>
      <FormLabel>Tags</FormLabel>
      <HStack>
        <Input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
        />
        <Button onClick={handleAddTag}>Add</Button>
      </HStack>
      <Box mt={2}>
        {tags.map((tag, index) => (
          <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="blue" mr={2} mb={2}>
            <TagLabel>{tag.name}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveTag(tag.name)} />
          </Tag>
        ))}
      </Box>
    </FormControl>
  );
}

export default TagInput;