import React, { useState, useEffect } from 'react';
import { VStack, Box, Heading, Button, Flex, Link, Text, Tag, HStack, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useApi from '../hooks/useApi';

function PostList() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const { request } = useApi();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await request({ method: 'get', url: 'http://localhost:5000/api/posts' });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await request({ method: 'delete', url: `http://localhost:5000/api/posts/${id}` });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <VStack spacing={4} align="stretch">
      {posts.map((post) => (
        <Box key={post.id} p={5} shadow="md" borderWidth="1px">
          {post.cover_image && (
            <Image src={`http://localhost:5000/uploads/${post.cover_image}`} alt={post.title} mb={4} maxHeight="200px" objectFit="cover" />
          )}
          <Heading fontSize="xl">
            <Link as={RouterLink} to={`/post/${post.id}`} color="teal.500">
              {post.title}
            </Link>
          </Heading>
          <Text mt={4} noOfLines={3}>
            {stripHtml(post.content)}
          </Text>
          <HStack mt={2} spacing={2}>
            {post.categories.map((category, index) => (
              <Tag key={index} size="sm" colorScheme="green">
                {category.name}
              </Tag>
            ))}
          </HStack>
          <HStack mt={2} spacing={2}>
            {post.tags.map((tag, index) => (
              <Tag key={index} size="sm" colorScheme="blue">
                {tag.name}
              </Tag>
            ))}
          </HStack>
          <Flex mt={4}>
            <Button as={RouterLink} to={`/post/${post.id}`} size="sm" colorScheme="teal">
              Read More
            </Button>
            {user && (
              <>
                <Button as={RouterLink} to={`/edit/${post.id}`} size="sm" ml={2}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
              </>
            )}
          </Flex>
        </Box>
      ))}
    </VStack>
  );
}

export default PostList;