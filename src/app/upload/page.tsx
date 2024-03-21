import { UploadForm } from "@/components/upload-form";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:p-8">
      <header className="mb-8 flex w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Deixe sua Foto em HD</h1>
        <p className="opacity-60">Deixe sua foto com uma qualidade impecavel</p>
      </header>

      <UploadForm />
    </main>
  );
}
