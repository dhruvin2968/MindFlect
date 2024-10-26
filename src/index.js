import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './App';
import { ScrollToTop } from './components/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Cursor = () => {
    useEffect(() => {
        
        const blrr = document.querySelector("#cursor-blur");

        const handleMouseMove = (dets) => {
            
            blrr.style.left = `${dets.clientX -40}px`;
            blrr.style.top = `${dets.clientY-40 }px`;
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return null;
};

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SkeletonTheme baseColor="lightblue" highlightColor="#2020">
                <ScrollToTop />
                <App />
                <Cursor />
            </SkeletonTheme>
        </BrowserRouter>
    </React.StrictMode>
);
