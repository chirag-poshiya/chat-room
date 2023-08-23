import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';
import { ThemeProvider } from '@material-tailwind/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
        <BrowserRouter>
      <ChatProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
      </ChatProvider>
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

