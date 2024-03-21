import ExampleSection from "./_components/example-section";
import MainSection from "./_components/main-section";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:p-8 container">
      <MainSection />
      <ExampleSection />
    </main>
  );
}
