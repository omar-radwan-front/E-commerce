import type { Metadata } from "next";
import Register  from "./RegisterClient"

export const metadata: Metadata = {
  title: "E-Register ",
  description: "Login to your account",
};

export default function LoginPage() {
  return <Register />;
}
