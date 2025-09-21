"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import forgetPasswordAction from '@/forgetPasswordAction/forgetPassword';
import * as z from "zod";

// ✅ Schema خاص بالـ Forget Password
const ForgetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});
type ForgetPasswordSchemaType = z.infer<typeof ForgetPasswordSchema>;

export default function ForgetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgetPasswordSchemaType>({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgetPasswordSchema),
    mode: "onChange"
  });

  async function handlePassword(values: ForgetPasswordSchemaType) {
    setLoading(true);
    try {
      const res = await forgetPasswordAction(values.email);
      console.log(res);

      if (res?.statusMsg === "success") {
        toast.success("Verification code sent to your email", {
          position: 'top-center',
          duration: 3000,
        })
        // ✅ التوجيه الصحيح لصفحة التحقق من الكود
        router.push('/verify-code');
      } else {
        toast.error(res?.message || "Something went wrong", {
          position: 'top-center',
          duration: 3000,
        });
      }
    } catch (err) {
      toast.error("Server error. Please try again.", {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-sky-700 dark:text-sky-400 mb-6">
          Please enter your email
        </h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePassword)} className="space-y-5">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className={`
                        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200
                        ${fieldState.error ? "border-red-500 focus:ring-red-500" : fieldState.isDirty && !fieldState.error ? "border-green-500 focus:ring-green-500" : ""}
                      `}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              className="mt-4 w-full bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white dark:bg-sky-500 dark:hover:bg-sky-400"
              type="submit"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </div>
              ) : "Send Verification Code"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}