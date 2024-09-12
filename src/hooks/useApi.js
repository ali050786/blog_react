import { useState, useCallback } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useAuth } from './useAuth';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const { user } = useAuth();

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      if (user && user.username && user.password) {
        config.auth = {
          username: user.username,
          password: user.password
        };
      }
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error('API request failed:', error.response || error);
      let errorMessage = 'An unexpected error occurred';
      if (error.response) {
        errorMessage = error.response.data.message || error.response.data.error || error.message;
      } else if (error.request) {
        errorMessage = 'No response received from the server';
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  return { loading, error, request };
};

export default useApi;