"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { MenuIcon } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

export default function NavbarDrawer({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="mt-0 top-0 right-0 w-screen max-w-80 sm:max-w-96 h-full p-6 pt-0">
        <DrawerHeader className="flex items-center justify-center">
          <Logo>
            <span className="text-2xl font-semibold">
              <span>photos</span>
              <span className="font-extrabold text-primary">hd</span>
            </span>
          </Logo>
        </DrawerHeader>
        <Link href="/upload" className="py-4 text-lg">
          Melhorar Imagem
        </Link>
        <Separator />
        <Link href="/precos" className="py-4 text-lg">
          Preços
        </Link>
        <Separator />
        <Link href="/conta" className="py-4 text-lg">
          Minha Conta
        </Link>
        <Separator />
        <DrawerFooter>{children}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
