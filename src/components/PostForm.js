import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import useApi from '../hooks/useApi';
import RichTextEditor from './richpost/RichTextEditor';
import CoverImageUpload from './post/CoverImageUpload';
import CategoryInput from './post/CategoryInput';
import TagInput from './post/TagInput';

function PostForm({ initialValues, isEditing }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  const navigate = useNavigate();
  const toast = useToast();
  const { request, loading } = useApi();

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || '');
      setContent(initialValues.content || '');
      setCategories(initialValues.categories || []);
      setTags(initialValues.tags || []);
      if (initialValues.cover_image) {
        setPreviewImage(`http://localhost:5000/uploads/${initialValues.cover_image}`);
      }
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    categories.forEach(cat => formData.append('categories', cat.name));
    tags.forEach(tag => formData.append('tags', tag.name));
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    try {
      if (isEditing) {
        await request({
          method: 'put',
          url: `http://localhost:5000/api/posts/${initialValues.id}`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({
          title: "Post updated",
          description: "Your post has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await request({
          method: 'post',
          url: 'http://localhost:5000/api/posts',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({
          title: "Post created",
          description: "Your new post has been successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your post. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </FormControl>

        <CoverImageUpload
          handleImageChange={handleImageChange}
          previewImage={previewImage}
        />

        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <RichTextEditor
            initialContent={content}
            onChange={setContent}
          />
        </FormControl>

        <CategoryInput
          categories={categories}
          setCategories={setCategories}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
        />

        <TagInput
          tags={tags}
          setTags={setTags}
          newTag={newTag}
          setNewTag={setNewTag}
        />

        <Button type="submit" colorScheme="blue" isLoading={loading}>
          {isEditing ? 'Update Post' : 'Create Post'}
        </Button>
      </VStack>
    </form>
  );
}

export default PostForm;