'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const Error = ({ error }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center flex-col items-center w-full">
      <h2 className="text-gray font-bold text-4xl">Looks like note wasn't found!</h2>
      <Link
        className="border border-gray rounded-full py-2 px-4 block my-2 w-fit text-gray transition-colors ease-in hover:text-white"
        href="/"
      >
        Home Page
      </Link>
    </div>
  );
};

export default Error;
