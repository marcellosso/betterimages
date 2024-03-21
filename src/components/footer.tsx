import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        © 2024 Acme Inc. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Termos de Serviço
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacidade
        </Link>
      </nav>
    </footer>
  );
}