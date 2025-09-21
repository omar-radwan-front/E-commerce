"use server";

import getMyToken from "@/app/utitities/getMyToken";
import { CheckOutVSchemaType } from "@/Schema/checkout.valid";

export default async function onlinePayment(
  cartId: string,
  url = process.env.NEXTAUTH_URL,
  formValues: CheckOutVSchemaType
) {
  const token = await getMyToken();
  if (!token) throw new Error("Login first");

  // خلي الدفع يرجع على صفحة الطلبات
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://e-commerce-jet-ten-91.vercel.app"
      : "http://localhost:3000";

  const callbackUrl = `${baseUrl}`;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${callbackUrl}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: formValues,
      }),
    }
  );

  const payload = await res.json();
  console.log("Checkout API Response:", payload);
  return payload;
}
