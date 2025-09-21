"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckOutValid, CheckOutVSchemaType } from "@/Schema/checkout.valid";
import onlinePayment from "@/CheckoutActions/OnlineCheckout.action";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";

export default function CheckOut() {
  const { id }: { id: string } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckOutVSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(CheckOutValid),
    mode: "onChange", // عشان يغير الـ input styling مع كل تغيير
  });

  async function handleCheckout(values: CheckOutVSchemaType) {
    try {
      setIsSubmitting(true);
      toast.loading("Processing your payment...",{position:"top-center", duration:3000});

      const res = await onlinePayment(id, "", values);

      toast.dismiss();
            console.log(res);
            
      if (res.status === "success") {
        toast.success("Redirecting to payment...",{position:"top-center", duration:3000});
        window.location.href = res.session.url;
      } else {
        toast.error("Payment failed, please try again!",{position:"top-center", duration:3000});
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong, please try again later!",{position:"top-center", duration:3000});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Checkout
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCheckout)}
            className="space-y-5"
          >
            {/* Address */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Address Details
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your address"
                      className={`dark:bg-gray-800 dark:text-gray-200 ${
                        form.formState.errors.details
                          ? "border-red-500 focus:ring-red-500"
                          : form.getValues("details")
                          ? "border-green-500 focus:ring-green-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your phone number"
                      className={`dark:bg-gray-800 dark:text-gray-200 ${
                        form.formState.errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : form.getValues("phone")
                          ? "border-green-500 focus:ring-green-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your city"
                      className={`dark:bg-gray-800 dark:text-gray-200 ${
                        form.formState.errors.city
                          ? "border-red-500 focus:ring-red-500"
                          : form.getValues("city")
                          ? "border-green-500 focus:ring-green-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" />
                </FormItem>
              )}
            />

            {/* Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay Now
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
