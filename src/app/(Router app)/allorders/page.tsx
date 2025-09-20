"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
 
interface Order {
  _id: string;
  totalPrice: number;
  createdAt: string;
  status: string;
  products: {
    productId: string;
    title: string;
    quantity: number;
    price: number;
  }[];
}

interface TokenPayload {
  id: string;
}

export default async function AllOrdersPage() {
  const cookieStore = await cookies(); // لازم await
  const token = cookieStore.get("token")?.value;

  if (!token) return <p>Please login first</p>;

  const { id }: TokenPayload = jwtDecode(token);

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return <p>Failed to fetch orders</p>;

  const orders: Order[] = await res.json();

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center mb-6 text-sky-700 dark:text-sky-400">
        All Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Order ID: {order._id}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.createdAt).toISOString().split("T")[0]}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Status: <span className="font-medium">{order.status}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Total Price: <span className="font-medium">${order.totalPrice}</span>
              </p>

              <div className="mt-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Products:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {order.products.map((p) => (
                    <li key={p.productId}>
                      {p.title} - Qty: {p.quantity} - Price: ${p.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
