// File: src/pages/FullPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, VStack } from '@chakra-ui/react';
import useApi from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import PostHeader from '../components/post/PostHeader';
import PostMetadata from '../components/post/PostMetadata';
import PostContent from '../components/post/PostContent';
import PostActions from '../components/post/PostActions';

function FullPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const { request } = useApi();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await request({ method: 'get', url: `http://localhost:5000/api/posts/${id}` });
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id, request]);

  if (!post) {
    return <Container maxW="container.xl" py={5}>Loading...</Container>;
  }

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8} align="stretch">
        <PostHeader title={post.title} coverImage={post.cover_image} />
        <PostMetadata 
          categories={post.categories} 
          tags={post.tags} 
          createdAt={post.created_at} 
        />
        <PostContent content={post.content} />
        <PostActions postId={post.id} isLoggedIn={!!user} />
      </VStack>
    </Container>
  );
}

export default FullPost;