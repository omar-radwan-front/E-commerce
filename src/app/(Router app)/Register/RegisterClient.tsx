"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValid } from "@/Schema/register.valid";

// ✅ تعريف نوع البيانات للـ form
export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

// ✅ تعريف نوع البيانات للـ response من API
interface RegisterResponse {
  message: string;
}

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValid),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: "onChange",
  });

  async function handleRegister(values: RegisterFormValues) {
    try {
      setServerError(null);
      setLoading(true);

      const res = await axios.post<RegisterResponse>(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (res.data.message === "success") {
        toast.success("Register success", { position: "top-center", duration: 4000 });
        router.push("/Login");
      } else {
        toast.error(res.data.message || "Register failed", { position: "top-center" });
      }
    } catch (err: unknown) {
      let msg = "Register failed";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setServerError(msg);
      toast.error(msg, { position: "top-center", duration: 5000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 transition-colors">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-sky-700 dark:text-sky-400 mb-4">Register Now</h1>

        {serverError && (
          <div className="mb-4 text-red-700 bg-red-100 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-md p-3">
            {serverError}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">

            {/** اسم المستخدم **/}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your full name" disabled={loading} />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/** الايميل **/}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="example@mail.com" disabled={loading} />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/** كلمة المرور **/}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type={showPassword ? "text" : "password"} placeholder="Create a password" disabled={loading} />
                  </FormControl>
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/** تأكيد كلمة المرور **/}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type={showPassword ? "text" : "password"} placeholder="Repeat your password" disabled={loading} />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/** الهاتف **/}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="01012345678" disabled={loading} />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 font-semibold transition"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register Now"
                )}
              </button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}

