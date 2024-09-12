// File: src/components/post/CategoryInput.js
import React from 'react';
import { FormControl, FormLabel, Input, Button, Box, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

function CategoryInput({ categories, setCategories, newCategory, setNewCategory }) {
  const handleAddCategory = () => {
    if (newCategory && !categories.find(cat => cat.name === newCategory)) {
      setCategories([...categories, { name: newCategory }]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat.name !== categoryToRemove));
  };

  return (
    <FormControl>
      <FormLabel>Categories</FormLabel>
      <HStack>
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add a category"
        />
        <Button onClick={handleAddCategory}>Add</Button>
      </HStack>
      <Box mt={2}>
        {categories.map((category, index) => (
          <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="green" mr={2} mb={2}>
            <TagLabel>{category.name}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveCategory(category.name)} />
          </Tag>
        ))}
      </Box>
    </FormControl>
  );
}

export default CategoryInput;