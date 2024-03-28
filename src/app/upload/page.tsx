import { UploadForm } from "@/components/upload-form";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:p-8 ">
      <div className="max-w-3xl w-full">
        <header className="mb-8 flex w-full flex-col items-center justify-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Transforme sua Foto em HD
          </h1>
          <p className="opacity-60 text-sm md:text-base">
            Deixe sua foto com uma qualidade impecável
          </p>
        </header>

        <UploadForm bigInput />
      </div>
    </main>
  );
}
