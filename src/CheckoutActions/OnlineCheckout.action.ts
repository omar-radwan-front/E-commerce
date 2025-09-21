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
  const callbackUrl = `${url}/allorders`;

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
  return payload;
}
