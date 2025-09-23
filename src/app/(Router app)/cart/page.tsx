import type { Metadata } from "next";
import Cart  from "./CartClient"

export const metadata: Metadata = {
  title: "E-Cart ",
  description: "Login to your account",
};

export default function LoginPage() {
  return <Cart />;
}
