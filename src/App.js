// src/App.js
/*import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import theme from './styles/theme';
import 'react-quill/dist/quill.snow.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          
          <AppRoutes />
          
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;*/

///
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Header />
          <AppRoutes />
          <Footer />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;