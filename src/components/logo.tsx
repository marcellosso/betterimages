import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Logo({ children }: PropsWithChildren) {
  return (
    <Link className="flex items-center gap-2" href="/">
      <Image
        src="/icon.svg"
        alt="PhotosHD Logo - Camera com bordas pretas e fundo alaranjado"
        width={34}
        height={34}
        priority
      />
      {children}
    </Link>
  );
}
