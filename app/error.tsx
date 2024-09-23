'use client';
import Button from '@/components/ui/button';
import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-color">
      <h1 className="text-4xl font-bold text-accent-color">Something went wrong</h1>
      <p className="mt-4 text-xl text-text-color">{error.message}</p>
      <Button
        type="button"
        onClick={reset}
        variants="ghost-outlined"
        className="mt-6 px-4 py-2 text-accent-color bg-blue-500 rounded hover:bg-blue-700"
      >
        Try again
      </Button>
    </div>
  );
}
