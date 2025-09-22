"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/Context/CartContext";
import img1 from "../../../public/images/freshcart-logo.svg";

export default function Navbar() {
  const { NumberOfCartItem } = useContext(cartContext);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const path = usePathname();

  function logout() {
    signOut({ callbackUrl: "/Login" });
  }

  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/Products", label: "Products" },
    { href: "/Categories", label: "Categories" },
    { href: "/Brands", label: "Brands" },
  ];

  const protectedLinks = [
    { href: "/allorders", label: "Orders" },
    { href: "/wishList", label: "Wishlist" },
  ];

  return (
    <nav className="w-full bg-emerald-600 shadow-md sticky top-0 z-50 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo + Desktop Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src={img1} alt="logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            {baseLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative ${
                  path === href
                    ? "text-yellow-300 font-semibold"
                    : "text-white hover:text-yellow-200"
                }`}
              >
                {label}
              </Link>
            ))}

            {session &&
              protectedLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative ${
                    path === href
                      ? "text-yellow-300 font-semibold"
                      : "text-white hover:text-yellow-200"
                  }`}
                >
                  {label}
                </Link>
              ))}

            {session && (
              <Link
                href="/cart"
                className={`relative ${
                  path === "/cart"
                    ? "text-yellow-300 font-semibold"
                    : "text-white hover:text-yellow-200"
                }`}
              >
                Cart
                {NumberOfCartItem > 0 && (
                  <span className="absolute -top-2 -right-3 bg-sky-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {NumberOfCartItem}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>

        {/* Right Section Desktop */}
        <div className="hidden md:flex items-center md:gap-2 lg:gap-6">
          {!session ? (
            <>
              <Link href="/Register" className="text-white hover:text-yellow-200">Register</Link>
              <Link href="/Login" className="text-white hover:text-yellow-200">Login</Link>
            </>
          ) : (
            <>
              <span className="text-white ">Hi  {session?.user.name}</span> 
              <button
                onClick={logout}
                className="text-white hover:text-yellow-200 cursor-pointer"
              >
                Signout
              </button>
              <Link href="/cart" className="relative">
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
                {NumberOfCartItem > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {NumberOfCartItem}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 p-4 flex flex-col gap-4">
          {baseLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`${
                path === href
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:text-emerald-500"
              }`}
            >
              {label}
            </Link>
          ))}

          {session &&
            protectedLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`${
                  path === href
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-emerald-500"
                }`}
              >
                {label}
              </Link>
            ))}

          {session && (
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className={`relative ${
                path === "/cart"
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:text-emerald-500"
              }`}
            >
              Cart
              {NumberOfCartItem > 0 && (
                <span className="absolute -top-2 -right-3 bg-sky-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {NumberOfCartItem}
                </span>
              )}
            </Link>
          )}

          {!session ? (
            <>
              <Link href="/Register" className="text-gray-700 dark:text-gray-200 hover:text-emerald-500">Register</Link>
              <Link href="/Login" className="text-gray-700 dark:text-gray-200 hover:text-emerald-500">Login</Link>
            </>
          ) : (
            <>
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="text-gray-700 dark:text-gray-200 hover:text-red-500 text-left"
            >
              Signout
            </button>
              <span className="text-emerald-600">Hi <span className="text-2xl text-black">{session?.user.name}</span></span>

            </>
            
          )}
        </div>
      )}
    </nav>
  );
}
