// src/components/Footer.js
import React from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" py={4} bg="gray.100" mt={8}>
      <Container maxW="container.xl">
        <Text textAlign="center" fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} Simple Blog. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;