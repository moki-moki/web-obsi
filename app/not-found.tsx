import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <main className="min-h-screen text-accent-color flex justify-center items-center flex-col w-full">
      <div>
        <div className="flex items-center">
          <h2>404</h2>
          <span className="block mx-2">|</span>
          <h3 className="mr-2">Page Not found!</h3>
        </div>
        <Link
          href="/"
          className="border border-border-color-color rounded-full py-2 px-4 block my-2 w-fit"
        >
          Go back
        </Link>
      </div>
    </main>
  );
}
