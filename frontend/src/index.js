import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "@material-tailwind/react";
import { RoleProvider } from './context/roleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <staffProvider>
      <RoleProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
        </RoleProvider>  
    </staffProvider>
  </React.StrictMode>
);
