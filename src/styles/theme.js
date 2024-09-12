// src/styles/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e0f2ff',
      100: '#b1d8ff',
      200: '#81beff',
      300: '#51a3ff',
      400: '#2289ff',
      500: '#0070f3',
      600: '#0057c0',
      700: '#003e8e',
      800: '#00255c',
      900: '#000c2b',
    },
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
          },
        }),
      },
    },
  },
});

export default theme;