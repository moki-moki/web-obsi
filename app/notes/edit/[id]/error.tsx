'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen text-white flex justify-center items-center flex-col w-full">
      <div>
        <div className="flex items-center">
          <h3 className="mr-2">Uh oh! Not found!</h3>
          <p>This edit page cound not be found</p>
        </div>
        <Link href="/" className="border border-gray rounded-full py-2 px-4 block my-2 w-fit">
          Go back
        </Link>
      </div>
    </main>
  );
}
