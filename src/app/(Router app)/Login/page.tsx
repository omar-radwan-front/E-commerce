import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login | E-commerce",
  description: "Login to your account",
};

export default function LoginPage() {
  return <LoginClient />;
}
