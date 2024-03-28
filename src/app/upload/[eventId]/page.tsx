"use client";
import { Button } from "@/components/ui/button";
import downloadPhoto from "@/lib/file";
import { useEventRunStatuses } from "@trigger.dev/react";
import Link from "next/link";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

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
      {/* <p className="mb-4 text-center">
                Voce também receberá sua imagem no seu email assim que ela estiver
                pronta! 💫
              </p> */}
    </div>
  );
}

export default function UploadPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { fetchStatus, error, statuses, run } = useEventRunStatuses(
    params.eventId
  );

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
                    <>
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
                    </>
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
