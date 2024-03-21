"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
const LINK_BEFORE_CSS =
  "before:absolute before:bottom-0 before:left-0 before:bg-letter before:h-px before:w-1/3 before:translate-x-full";

interface IUserAvatar {
  userName: string;
  userEmail: string;
  userPhoto: string;
}

const UserAvatar: FC<IUserAvatar> = ({ userName, userEmail, userPhoto }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { signOut } = useClerk();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Link href="/conta">
        <Image
          alt="Foto de Perfil"
          src={userPhoto}
          className="rounded-full hover:cursor-pointer"
          width={48}
          height={48}
        />
      </Link>
    );
  }

  return (
    <>
      <div
        tabIndex={-1}
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
      >
        <Image
          alt="Foto de Perfil"
          src={userPhoto}
          className="rounded-full hover:cursor-pointer"
          width={48}
          height={48}
        />
      </div>

      <div className="hidden md:block">
        {isUserDropdownOpen && (
          <div
            className="fixed top-0 left-0 bottom-0 right-0"
            onClick={() => setIsUserDropdownOpen(false)}
          />
        )}
        <div
          id="userDropdown"
          className={cn(
            "z-50 right-2 top-12 min-w-max absolute mt-2 max-sm:right-2 md:max-lg:ml-12 rounded-md shadow bg-secondary transition-all duration-150",
            {
              visible: isUserDropdownOpen,
              invisible: !isUserDropdownOpen,
              "opacity-100": isUserDropdownOpen,
              "opacity-0": !isUserDropdownOpen,
            }
          )}
        >
          <div className="overflow-hidden p-1">
            <div className="px-2 py-1.5 text-sm font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none">{userEmail}</p>
              </div>
            </div>
            <div
              role="separator"
              aria-orientation="horizontal"
              className="-mx-1 my-1 h-px bg-slate-200"
            />
            <ul className="text-sm text-letter" aria-labelledby="userAvatar">
              <li className="relative">
                <Link
                  href="/perfil"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className={cn(
                    "px-2 py-1.5 text-letter hover:bg-gray-100  flex items-center",
                    LINK_BEFORE_CSS
                  )}
                >
                  <div className="h-6 w-6 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  Minha Conta
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/precos"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className={cn(
                    "px-2 py-1.5 text-letter hover:bg-gray-100  flex items-center",
                    LINK_BEFORE_CSS
                  )}
                >
                  <div className="h-6 w-6 mr-2">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      height={24}
                      width={24}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                  Comprar Créditos
                </Link>
              </li>

              <li className="relative">
                <button
                  onClick={() => {
                    setIsUserDropdownOpen(false);
                    signOut();
                  }}
                  className={cn(
                    "px-2 py-1.5  w-full text-letter hover:bg-gray-100 flex items-center",
                    LINK_BEFORE_CSS
                  )}
                >
                  <div className="h-6 w-6 mr-2">
                    <svg
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
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </div>
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAvatar;
