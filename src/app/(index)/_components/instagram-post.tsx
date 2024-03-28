import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getUserAuth } from "@/lib/auth/utils";
import { SVGProps } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export default async function InstagramPost() {
  const { session } = await getUserAuth();

  return (
    <div className="max-w-md">
      <div className="bg-card border rounded-lg">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                alt="Profile picture"
                src="/placeholder.svg?height=32&width=32"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm">
              {session?.user?.name || "usuario_desconhecido"}
            </span>
          </div>
          <MoreHorizontalIcon className="text-gray-500" />
        </div>

        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={`./examples/man-2-before.png`}
              alt="Imagem Antes de ser melhorada."
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={`./examples/man-2-after.png`}
              alt="Imagem Apos ser melhorada."
            />
          }
          className="w-[380px] h-[380px] aspect-square object-cover"
        />
        <div className="px-4 py-2">
          <div className="flex space-x-4">
            <HeartIcon className="text-gray-500" />
            <ReplyIcon className="text-gray-500" />
            <SendIcon className="text-gray-500" />
            <div className="flex-grow" />
            <BookmarkIcon className="text-gray-500" />
          </div>
          <p className="text-sm font-semibold mt-2">2000 curtidas</p>
          <p className="text-sm mt-1">
            <span className="font-semibold">
              {session?.user?.name || "usuario_desconhecido"}
            </span>{" "}
            Foto melhorada por photoshd
          </p>
          <div className="mt-2">
            <Input
              className="border-none"
              placeholder="Adicione um comentário..."
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BookmarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MoreHorizontalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function ReplyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
