import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <main className="min-h-screen text-accent-color flex justify-center items-center flex-col w-full">
      <div>
        <div className="flex items-center">
          <h3 className="mr-2">Uh oh! Not found!</h3>
          <p>This edit page cound not be found. Please try again.</p>
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
