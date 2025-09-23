import type { Metadata } from "next";
import WishlistPage  from "./wishListClient"

export const metadata: Metadata = {
  title: "E-Wishlist ",
  description: "Login to your account",
};

export default function LoginPage() {
  return <WishlistPage />;
}
