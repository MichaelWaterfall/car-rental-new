//import React from 'react';
import ReactDOM from 'react-dom/client';
//import { ReactDOM } from '';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BlockchainProvider } from './context/BlockchainContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlockchainProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BlockchainProvider>
);
