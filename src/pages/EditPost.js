// src/pages/EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, VStack, Heading } from '@chakra-ui/react';
import PostForm from '../components/PostForm';
import { getPost } from '../services/api';

function EditPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        // Handle error (e.g., show error message or redirect)
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <Container maxW="container.xl" py={5}>Loading...</Container>;
  }

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8}>
        <Heading>Edit Post</Heading>
        <PostForm initialValues={post} isEditing={true} />
      </VStack>
    </Container>
  );
}

export default EditPost;