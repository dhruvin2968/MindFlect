import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import  { SkeletonTheme } from 'react-loading-skeleton';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './App';
import { ScrollToTop } from './components/ScrollToTop';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SkeletonTheme baseColor="lightblue" highlightColor="#2020">
      <ScrollToTop />
      <App />
      </SkeletonTheme>
    </BrowserRouter>
  </React.StrictMode>
);