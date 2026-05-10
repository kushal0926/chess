import { Button } from "@/_components/ui/Button";

export default function Home() {
  return (
    <section className="flex items-center justify-center align-middle p-10">
      {/* <h1 className="text-8xl font-bold ">this is the home section</h1> */}

      <Button variant="primary" size="md">
        Sign In
      </Button>
    </section>
  );
}
