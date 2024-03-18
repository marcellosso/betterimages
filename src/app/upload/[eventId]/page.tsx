"use client";
import { useEventRunStatuses } from "@trigger.dev/react";
import {
  ArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";

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
      <h2 className="mb-2 text-3xl font-bold">Thank you! 🌟</h2>
      <div className="flex flex-col gap-1">
        {fetchStatus === "loading" ? (
          <p>Loading...</p>
        ) : fetchStatus === "error" ? (
          <p>{error.message}</p>
        ) : (
          statuses.map((status) => (
            <div key={status.key} className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                {status.state === "failure" ? (
                  <ExternalLinkIcon className="text-red-500 h-4 w-4" />
                ) : status.state === "success" ? (
                  <CheckCircleIcon className="text-green-500 h-4 w-4" />
                ) : status.state === "loading" ? (
                  <ArrowUpIcon className="text-blue-500 h-4 w-4" />
                ) : (
                  <ClockIcon className="text-slate-500 h-4 w-4" />
                )}
                <div className="flex gap-1.5 items-center">
                  <h4 className="text-base">{status.label}</h4>
                </div>
              </div>
              {status.data && typeof status.data.url === "string" && (
                <img className="w-1/2" src={status.data.url} />
              )}
            </div>
          ))
        )}
        {run?.status === "FAILURE" &&
          run.output &&
          typeof run.output.message === "string" && (
            <p className="bg-red-200 text-red-600 border-red-300 border my-4 rounded p-2">
              Generation failed: {run.output.message}
            </p>
          )}
      </div>
      <p className="mb-4 text-center">
        Your image will be delivered to your email, once it is ready! 💫
      </p>
      <Link
        href="/"
        className="rounded bg-blue-500 px-4 py-3 text-white hover:bg-blue-600"
      >
        Generate another
      </Link>
    </div>
  );
}
