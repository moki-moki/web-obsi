'use client';
import React from 'react';

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 flex space-x-2 justify-center items-center">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-primary-color rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-primary-color rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-primary-color rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
