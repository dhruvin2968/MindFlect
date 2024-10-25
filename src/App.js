import React, { useEffect, useState } from 'react';
import Preloaders from './Preloaders';
import { Header, Footer } from './components';
import { AllRoutes } from './routes/AllRoutes';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading && <Preloaders />}
      <main className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
        <Header />
        <AllRoutes />
        <Footer />
      </main>
    </div>
  );
};

export default App;
