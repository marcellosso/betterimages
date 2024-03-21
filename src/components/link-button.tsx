import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

type LinkButtonType = {
  buttonLabel: string;
  buttonHref: string;
  buttonClasses?: string;
};

const LinkButton: FC<LinkButtonType> = ({
  buttonLabel,
  buttonHref,
  buttonClasses,
}) => {
  return (
    <Link
      className={cn(
        "flex min-w-fit items-center justify-center space-x-2 rounded-lg bg-primary hover:opacity-75 text-secondary px-5 py-2 text-lg font-medium transition focus:border-none",
        buttonClasses
      )}
      href={buttonHref}
    >
      {buttonLabel}
    </Link>
  );
};

export default LinkButton;
