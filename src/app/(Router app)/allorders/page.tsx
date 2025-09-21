"use server";

import getMyToken from "@/app/utitities/getMyToken";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { Order } from "@/Types/orderTypes"; // ✅ استدعاء الـ Types

interface TokenPayload {
  id: string;
}

export default async function AllOrdersPage() {
  const token = await getMyToken();
  if (!token) return <p>Please login first</p>;

  const { id }: TokenPayload = jwtDecode(token);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  );
  const payload: Order[] = await res.json(); // ✅ هنا بقى واضح إنه Array of Orders

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-8 text-sky-700 dark:text-sky-400">
        My Orders
      </h1>

      {payload.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No orders found.
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {payload.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Order #{order._id.slice(-6)}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Payment:</span>{" "}
                  {order.paymentMethodType}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Total:</span>{" "}
                  {order.totalOrderPrice} EGP
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Products:
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {order.cartItems.map((p) => (
                    <div
                      key={p._id}
                      className="flex gap-3 items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-sm"
                    >
                      <Image
                        src={p.product.imageCover}
                        alt={p.product.title}
                        height={80}
                        width={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {p.product.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Qty: {p.count} × {p.price} EGP
                        </p>
                        <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                          Total: {p.count * p.price} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
