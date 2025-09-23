"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { LoginSchemaType, LoginValid } from '@/Schema/Login.valid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import type { Metadata } from "next";
import Link from "next/link";
 
export default function LoginClient() {
   const [loading, setLoading] = useState(false);
  const form = useForm<LoginSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginValid),
    mode: "onChange" // عشان يلون input وهو بيكتب
  });

  async function handleLogin(values: LoginSchemaType) {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: values?.email,
        password: values?.password,
        redirect: false,
        callbackUrl: "/"
      });

      if (res?.ok) {
        toast.success("You logged in successfully", { position: 'top-center', duration: 3000 });
        window.location.href = "/";
      } else {
        toast.error("Invalid email or password", { position: 'top-center', duration: 3000 });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-sky-700 dark:text-sky-400 mb-6">Login</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">

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
                        ${fieldState.error ? "border-red-500 focus:ring-red-500" : fieldState.isDirty ? "border-green-500 focus:ring-green-500" : ""}
                      `}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className={`
                        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200
                        ${fieldState.error ? "border-red-500 focus:ring-red-500" : fieldState.isDirty ? "border-green-500 focus:ring-green-500" : ""}
                      `}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
            <Link href={`/forgetPassword`}><span className=' text-black font-bold hover:text-green-500 cursor-pointer'>forget your password ?</span></Link>      
            {/* Button */}
            <Button
              disabled={loading}
              className="mt-4 w-full bg-sky-600 hover:bg-sky-700 disabled:opacity-70 text-white dark:bg-sky-500 dark:hover:bg-sky-400"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </div>
              ) : "Login Now"}
            </Button>
           
            {/* Register Link */}
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Don’t have an account?{" "}
              <Link href="/Register" className="text-sky-600 dark:text-sky-400 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}
