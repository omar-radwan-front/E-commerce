// forgetPasswordAction.ts
export default async function forgetPasswordAction(email: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const payload = await res.json();
    return payload;
  } catch (err) {
    console.error("❌ Forget Password Error:", err);
    return { status: "error", message: "Something went wrong" };
  }
}
