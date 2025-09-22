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
import { useParams, useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckOutValid, CheckOutVSchemaType } from "@/Schema/checkout.valid";
import cashOrder from "@/CheckoutActions/CashOrder.action";
import { cartContext } from "@/Context/CartContext";

export default function CashOrder() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const { setNumberOfCartItem } = useContext(cartContext);
  const [loading, setLoading] = useState(false);

  const form = useForm<CheckOutVSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(CheckOutValid),
  });

  async function handleCashOrder(values: CheckOutVSchemaType) {
    try {
      setLoading(true);
      const res = await cashOrder(id, values);

      if (res.status === "success") {
        // 🔹 تفريغ السلة
        setNumberOfCartItem(0);

        // 🔹 رسالة نجاح
        toast.success("Order successfully placed!", {
          position: "top-center",
          duration: 3000,
        });

        // 🔹 تحويل المستخدم للصفحة بدون full reload
        router.push("/allorders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Cash Order Now
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCashOrder)}
            className="space-y-5"
          >
            {/* DETAILS */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Details
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your address details"
                      className={`rounded-lg ${
                        form.formState.errors.details
                          ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:border-sky-500 focus:ring-sky-300"
                      } dark:bg-gray-700 dark:text-white`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm font-medium" />
                </FormItem>
              )}
            />

            {/* PHONE */}
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
                      placeholder="Enter your phone number"
                      className={`rounded-lg ${
                        form.formState.errors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:border-sky-500 focus:ring-sky-300"
                      } dark:bg-gray-700 dark:text-white`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm font-medium" />
                </FormItem>
              )}
            />

            {/* CITY */}
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
                      placeholder="Enter your city"
                      className={`rounded-lg ${
                        form.formState.errors.city
                          ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:border-sky-500 focus:ring-sky-300"
                      } dark:bg-gray-700 dark:text-white`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm font-medium" />
                </FormItem>
              )}
            />

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg py-2 transition"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Processing...
                </div>
              ) : (
                "Pay Now"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
