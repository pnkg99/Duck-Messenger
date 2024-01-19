import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EncryptionContextProvider } from './config/EncryptionContext';
import { UserContextProvider } from './config/UserContext';
import { BrowserRouter } from "react-router-dom"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <EncryptionContextProvider>
        <App />
      </EncryptionContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
