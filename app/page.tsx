"use client";

import Button from "./_components/ui/button";

export default function Home() {
  return (
    <main id="test" className="w-full p-2">
      <Button
        type="button"
        className="block mx-auto rounded-full w-1/2"
        variants="outlined"
      >
        Add Note
      </Button>
    </main>
  );
}
