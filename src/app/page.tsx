"use client";
import { toast } from "sonner";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { FileCheck2Icon, InboxIcon, Trash2Icon } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const router = useRouter();

  const { getRootProps, getInputProps } = useDropzone({
    // accept: { "application/pdf": [".pdf"] },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File is too big - Max 10mb");
        return;
      }

      setSelectedFile(file);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedFile) {
        toast.error("Please select an image");
        return;
      }
      const formData = new FormData();
      formData.append("image", selectedFile);
      //👇🏻 post data to server's endpoint
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (body.error) throw body.error;
      router.push("/upload/" + body.eventId);
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:p-8">
      <header className="mb-8 flex w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Deixe sua Foto em HD</h1>
        <p className="opacity-60">Deixe sua foto com uma qualidade impecavel</p>
      </header>

      <SignInButton />
      <UserButton />

      <form
        method="POST"
        className="flex w-full flex-col md:w-[60%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        {selectedFile ? (
          <div className="flex gap-2 items-center shadow-2xl">
            <FileCheck2Icon className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-foreground/80 font-light">
                {selectedFile.name}
              </p>
              <p className="text-xs font-light text-foreground/60">
                {(selectedFile.size / 1024 / 1024).toFixed(3)} mbs
              </p>
            </div>
            <Trash2Icon
              className="w-5 h-5 text-foreground hover:text-primary transition-all duration-100 ml-auto cursor-pointer"
              onClick={() => setSelectedFile(null)}
              tabIndex={0}
              aria-description="Delete file"
            />
          </div>
        ) : (
          <div
            {...getRootProps({
              className:
                "border-dashed border-2 rounded-xl cursor-pointer bg-transparent py-8 flex justify-center items-center flex-col hover:bg-card/50 hover:border-primary transition-all duration-200",
            })}
          >
            <input {...getInputProps()} />
            <InboxIcon className="w-10 h-10 text-primary" />
            <p className="mt-2 text-sm text-foreground/80 font-light">
              <span className="font-medium">Faca upload</span> ou arraste uma
              imagem
            </p>
            <p className="text-xs font-light text-foreground/60">
              Supported formats: .png, .jpeg, .jpg{" "}
            </p>
          </div>
        )}
        <button
          type="submit"
          className="mt-5 rounded bg-blue-500 px-6 py-4 text-lg text-white hover:bg-blue-700"
        >
          Melhorar imagem
        </button>
      </form>
    </main>
  );
}
