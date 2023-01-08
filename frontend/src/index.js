import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AlbumContextProvider } from './context/AlbumContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlbumContextProvider>
      <App />
    </AlbumContextProvider>
  </React.StrictMode>
);
