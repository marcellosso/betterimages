import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          © 2024 photoshd
        </p>
        <Link
          href="mailto:contato@photoshd.com.br"
          className="group transition-all duration-200 text-xs text-neutral-500 dark:text-neutral-400"
        >
          contato@photoshd.com.br
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-px bg-primary"></span>
        </Link>
      </div>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/legal"
        >
          Termos de Serviço
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/legal"
        >
          Política de Privacidade
        </Link>
      </nav>
    </footer>
  );
}
