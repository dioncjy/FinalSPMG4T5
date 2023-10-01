import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import { StaffProvider } from './context/staffContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <staffProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>  
    </staffProvider>
  </React.StrictMode>
);
