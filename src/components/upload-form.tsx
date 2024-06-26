"use client";
import { toast } from "sonner";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { InboxIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { getBase64 } from "@/lib/file";

import { cn } from "@/lib/utils";

export function UploadForm({ bigInput = false }) {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [fileBase64, setFileBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { getRootProps, getInputProps } = useDropzone({
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
      const imageBase64 = await getBase64(file);
      setFileBase64(imageBase64 as string);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedFile) {
        toast.error("Por favor selecione uma imagem");
        return;
      }
      setLoading(true);

      const presignResponse = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          contentType: selectedFile.type,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (presignResponse.ok) {
        const { url, fields } = await presignResponse.json();
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("file", selectedFile);

        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error(
            "Falha ao fazer o upload da imagem, por favor tente novamente."
          );
        }

        const imageUrl = `${url}${fields.key}`;

        const generateRes = await fetch("/api/generate", {
          method: "POST",
          body: JSON.stringify({
            imageUrl,
          }),
        });

        const { eventId, error } = await generateRes.json();

        if (!generateRes.ok) {
          throw error;
        }

        router.push("/upload/" + eventId);
      } else {
        const { error } = await presignResponse.json();
        throw error;
      }
    } catch (err) {
      toast.error(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      method="POST"
      className="flex w-full flex-col"
      onSubmit={(e) => handleSubmit(e)}
    >
      {fileBase64 ? (
        <div className="relative">
          <Trash2Icon
            className="absolute top-2 right-2 rounded-lg bg-background w-8 h-8 p-1 text-foreground hover:text-primary transition-all duration-100 ml-auto cursor-pointer"
            onClick={() => {
              setSelectedFile(null);
              setFileBase64("");
            }}
            tabIndex={0}
            aria-description="Delete file"
          />
          <Image
            src={fileBase64}
            alt="Imagem do Usuario"
            width={350}
            height={50}
            className={cn("rounded-md h-[200px] md:h-[250px]", {
              "min-h-[400px] md:min-h-[500px]": bigInput,
            })}
            style={{ objectFit: "cover", width: "100%" }}
            priority
          />
        </div>
      ) : (
        <div
          {...getRootProps({
            className: cn(
              "gap-4  bg-background border-dashed border-2 rounded-xl  cursor-pointer py-4 sm:py-6 md:py-8 flex justify-center items-center flex-col hover:bg-card/50 hover:border-primary transition-all duration-200",
              {
                "min-h-[200px] md:min-h-[250px]": !bigInput,
                "min-h-[400px] md:min-h-[500px]": bigInput,
              }
            ),
          })}
        >
          <input {...getInputProps()} />
          <InboxIcon className="w-10 h-14 sm:w-14 sm:h-14 text-primary" />
          <div>
            <p className="mt-2 text-sm sm:text-base text-foreground/80 font-light">
              <span className="font-medium">Faça upload</span> ou arraste uma
              imagem
            </p>
            <p className="text-xs sm:text-sm font-light text-foreground/60 text-center">
              Formatos permitidos: .png, .jpeg, .jpg{" "}
            </p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="mt-2 px-6 py-4 text-lg"
        disabled={loading}
      >
        {loading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin stroke-primary-foreground w-5 h-5 mr-2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
        Melhorar imagem
      </Button>
    </form>
  );
}
