"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import downloadPhoto from "@/lib/file";
import { useEventRunStatuses } from "@trigger.dev/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { toast } from "sonner";

function LoadingState() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 rounded-md min-h-[400px] md:min-h-[500px] bg-secondary border border-primary border-dashed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin stroke-primary w-16 h-16"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <p className="mb-4 text-center">
        Voce também receberá sua imagem no seu email assim que ela estiver
        pronta! 💫
      </p>
    </div>
  );
}

export default function UploadPage({
  params,
}: {
  params: { eventId: string };
}) {
  const router = useRouter();

  const { fetchStatus, error, statuses, run } = useEventRunStatuses(
    params.eventId
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (imageUrl: string) => {
    try {
      setLoading(true);
      const generateRes = await fetch("/api/remove", {
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
    } catch (err) {
      toast.error(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="max-w-3xl w-full flex flex-col items-center justify-center px-4">
        <div className="flex flex-col gap-1 w-full">
          {fetchStatus === "loading" ? (
            <LoadingState />
          ) : fetchStatus === "error" ? (
            <p>{error.message}</p>
          ) : (
            statuses.map((status) => (
              <>
                <div key={status.key} className="flex flex-col gap-1 w-full">
                  {status.state === "loading" && <LoadingState />}
                  {status.data && typeof status.data.url === "string" && (
                    <div className="relative">
                      <div className="absolute top-2 right-2 flex items-center justify-end gap-x-2 mb-2 z-20">
                        {status.key !== "remove-bg-image" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="secondary"
                                  className="px6 py-2 text-sm"
                                  onClick={() =>
                                    handleSubmit(status?.data?.url as string)
                                  }
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
                                  Remover Fundo
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>1 Crédito</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <ReactCompareSlider
                        itemOne={
                          <ReactCompareSliderImage
                            src={status.data.originalUrl as string}
                            alt="Image one"
                          />
                        }
                        itemTwo={
                          <ReactCompareSliderImage
                            src={status.data.url}
                            alt="Image two"
                            style={
                              status.key === "remove-bg-image"
                                ? {
                                    backgroundColor: "white",
                                    backgroundImage: `
                                        linear-gradient(45deg, #ccc 25%, transparent 25%),
                                        linear-gradient(-45deg, #ccc 25%, transparent 25%),
                                        linear-gradient(45deg, transparent 75%, #ccc 75%),
                                        linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                                    backgroundSize: `20px 20px`,
                                    backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
                                  }
                                : {}
                            }
                          />
                        }
                        className="rounded-md h-[400px] md:h-[500px]"
                      />
                      <div className="mt-5 flex w-full justify-center gap-4 items-center">
                        <Button className="px-6 py-4 text-lg">
                          <Link href="/upload">Melhorar outra</Link>
                        </Button>
                        <Button
                          className="px-6 py-4 text-lg"
                          variant="secondary"
                          onClick={() => {
                            downloadPhoto(
                              (status.data?.url as string) || "",
                              `photohd-${params.eventId}`
                            );
                          }}
                        >
                          Baixar Imagem
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ))
          )}
          {run?.status === "FAILURE" &&
            run.output &&
            typeof run.output.message === "string" && (
              <p className="bg-red-200 text-red-600 border-red-300 border my-4 rounded p-2">
                Upscaling falhou: {run.output.message}
              </p>
            )}
        </div>

        {/* <Button
                  onClick={() => {
                    downloadPhoto(
                      generatedImages[selectedRoomImageIndex],
                      `novo-${toSnakeCase(room)}-${toSnakeCase(
                        roomStyle[selectedRoomImageIndex]
                      )}`
                    );
                  }}
                  className="bg-transparent border border-primary rounded-lg text-text shadow-sm font-medium p-2 px-3 mt-12 hover:shadow-lg hover:opacity-75 transition-all duration-300"
                >
                  Baixe a Imagem
                </Button> */}
      </div>
    </div>
  );
}
