// import React from 'react';


// const Preloaders = () => (
//   <div className="preloader flex justify-center items-center fixed inset-0 bg-white z-50">
//     <div className="relative flex items-center justify-center">
//       <div className="animate-spin rounded-full h-32 w-32 border-4 border-blue-500 border-t-transparent"></div>
//       <span className="loader-text absolute text-xl font-semibold text-blue-500 animate-text-pulse">MindFlect</span>
//     </div>
//   </div>
// );

// export default Preloaders;

// Preloader.js
import React from 'react';

const Preloaders = () => (
  <div className="preloader flex justify-center items-center fixed inset-0 bg-white z-50">
    <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500"></div>
    <span className="loader-text absolute text-l font-semibold text-blue-500 animate-text-pulse">MindFlect</span>
  </div>
);

export default Preloaders;
