import Button from './_components/ui/button';

export default function Home() {
  return (
    <section className="w-full">
      <Button
        type="button"
        className="block mx-auto rounded-full w-1/2"
        variants="outlined"
      >
        Add Note
      </Button>
    </section>
  );
}
