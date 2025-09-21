// app/verify-code/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function VerifyCode() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode: code }),
      });

      const data = await res.json();
      if (data.status === "Success") {
        toast.success("Code verified successfully",{position:"top-center",duration:3000});
        router.push("/reset-password");
      } else {
        toast.error(data.message || "Invalid code",{position:"top-center",duration:3000});
      }
    } catch (err) {
      toast.error("err");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Verify Code</h1>

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Button disabled={loading} className="w-full">
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </div>
    </div>
  );
}
