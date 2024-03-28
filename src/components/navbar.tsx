"use server";
// import { simplifiedPluralize } from '@/utils/helpers';
import Link from "next/link";
import { Suspense } from "react";
// import Logo from '../Logo';
import { getUserAuth } from "@/lib/auth/utils";
import LinkButton from "./link-button";
import UserAvatar from "./user-avatar";
import { Separator } from "./ui/separator";
import { getUserCredits } from "@/lib/stripe/subscriptions";
import { simplifiedPluralize } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";
import { MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

const UserInfo = async () => {
  const { session } = await getUserAuth();
  const userCredits = await getUserCredits(session?.user?.id ?? "");

  if (!session || !session.user) {
    return (
      <div className="flex gap-2 items-center">
        <LinkButton
          buttonHref="/sign-in"
          buttonLabel="Login"
          buttonClasses="bg-secondary text-secondary-foreground"
        />
        <LinkButton buttonHref="/sign-up" buttonLabel="Crie uma conta" />
      </div>
    );
  }

  return (
    <>
      <div>
        <p className="block md:hidden font-bold text-xl">{session.user.name}</p>
        <Link href="/precos">
          <p className="hover:cursor-pointer hover:opacity-50 transition-all duration-300">
            {userCredits.credits}{" "}
            {simplifiedPluralize(
              "Crédito",
              userCredits.credits > 1 || userCredits.credits == 0
            )}
          </p>
        </Link>
      </div>
      <Separator orientation="vertical" />
      {/* <Separator orientation="" className="block md:hidden" /> */}
      <UserAvatar
        userName={session.user.name!}
        userPhoto={session.user.imageUrl!}
        userEmail={session.user.email!}
      />
    </>
  );
};

export default async function Navbar() {
  return (
    <>
      <header className="hidden md:block bg-background">
        <div className="container flex justify-between items-center sm:px-4 px-2 py-4 gap-2">
          <div className="flex gap-8 items-center">
            <Logo>
              <span className="text-2xl font-semibold">
                <span>photos</span>
                <span className="font-extrabold text-primary">hd</span>
              </span>
            </Logo>
            <Link href="/upload" className="group transition-all duration-200">
              Melhorar Imagem
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
            </Link>
            <Link href="/precos" className="group transition-all duration-200">
              Preços
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
            </Link>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex items-center justify-center gap-2 md:gap-4 relative min-w-fit h-10">
              <ModeToggle />
              <Suspense
                fallback={
                  <div className="h-full w-full bg-gray-500 animate-pulse rounded-lg" />
                }
              >
                <UserInfo />
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      <header className="md:hidden">
        <div className="flex justify-between items-center p-3">
          <Logo>
            <span className="text-2xl font-semibold">
              <span>photos</span>
              <span className="font-extrabold text-primary">hd</span>
            </span>
          </Logo>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Drawer direction="right">
              <DrawerTrigger>
                <MenuIcon />
              </DrawerTrigger>
              <DrawerContent className="mt-0 top-0 right-0 w-screen max-w-96 h-full p-6 pt-0">
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
                <DrawerFooter>
                  <div className="w-full self-center mb-2">
                    <Suspense
                      fallback={
                        <div className="h-full w-full bg-gray-500 animate-pulse rounded-lg" />
                      }
                    >
                      <div className="flex items-center justify-between w-full">
                        <UserInfo />
                      </div>
                    </Suspense>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>
    </>
  );
}
