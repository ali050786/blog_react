import React from 'react';
import { Box, Flex, Heading, Button, Text, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginModal from './LoginModal';

function Header() {
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Heading size="md">
          <RouterLink to="/">Simple Blog</RouterLink>
        </Heading>
        <Flex alignItems={'center'}>
          {user ? (
            <>
              <Text mr={4}>Welcome, {user.username}!</Text>
              <Button as={RouterLink} to="/create" colorScheme="teal" mr={4}>
                Create Post
              </Button>
              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={onOpen} colorScheme="blue">Login</Button>
          )}
        </Flex>
      </Flex>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Header;