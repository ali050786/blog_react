// File: src/components/post/CoverImageUpload.js
import React from 'react';
import { FormControl, FormLabel, Input, Image } from '@chakra-ui/react';

function CoverImageUpload({ handleImageChange, previewImage }) {
  return (
    <FormControl>
      <FormLabel>Cover Image</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {previewImage && (
        <Image src={previewImage} alt="Cover preview" maxHeight="200px" mt={2} />
      )}
    </FormControl>
  );
}

export default CoverImageUpload;