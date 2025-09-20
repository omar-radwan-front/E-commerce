"use client";
import AddBtnWish from '@/app/- components/Btn/AddWish';
import ClearCart from '@/CartActions/ClearCart';
import GetUserCart from '@/CartActions/getUserCart';
import RemoveProduct from '@/CartActions/RemoveProduct';
import UpdateCart from '@/CartActions/UpdateCart';
import { cartContext } from '@/Context/CartContext';
import { CartProductType } from '@/Types/CartProductType';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Cart() {
  const [Products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [RemoveDisable, setRemoveDisable] = useState(false);
  const [UpdateDisable, setUpdateDisable] = useState(false);
  const [UpdateLoading, setUpdateLoading] = useState(false);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [CuruntId, setCuruntId] = useState("");
  const { NumberOfCartItem, setNumberOfCartItem } = useContext(cartContext);
  const [CartId, setCartId] = useState("");

  async function CheckGetUserCart() {
    try {
      const res = await GetUserCart();
      if (res.status == "success") {
        setCartId(res.cartId);
        setProducts(res.data.products);
        setisLoading(false);
        setTotalPrice(res.data.totalCartPrice);
      }
    } catch (err) {
      console.log(err);
      toast.error(" error👼👼", {
        position: 'top-center',
        duration: 3000,
      });
      setisLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    setRemoveDisable(true);
    setUpdateDisable(true);
    const res = await RemoveProduct(id);
    if (res.status === "success") {
      setProducts(res.data.products);
      toast.success("Removed successfully 🎉", {
        position: 'top-center',
        duration: 3000,
      });
      let sum = 0;
      res.data.products.forEach((product: CartProductType) => {
        sum += product.count;
      });
      setNumberOfCartItem(sum);
      CheckGetUserCart();
    } else {
      toast.error("Can't Remove 👼👼", {
        position: 'top-center',
        duration: 3000,
      });
    }
    setRemoveDisable(false);
    setUpdateDisable(false);
  }

  async function UPdateProduct(id: string, count: string, singn: string) {
    setUpdateDisable(true);
    setUpdateLoading(true);
    setRemoveDisable(true);
    setCuruntId(id);
    const res = await UpdateCart(id, count);

    if (res.status === "success") {
      if (singn === "+") {
        setNumberOfCartItem(NumberOfCartItem + 1);
      } else if (singn === "-") {
        setNumberOfCartItem(NumberOfCartItem - 1);
      }
      setProducts(res.data.products);
      toast.success("Updated successfully 🎉", {
        position: 'top-center',
        duration: 3000,
      });
      CheckGetUserCart();
    } else {
      toast.error("Not Updated !", {
        position: 'top-center',
        duration: 3000,
      });
    }
    setUpdateDisable(false);
    setUpdateLoading(false);
    setRemoveDisable(false);
  }

  async function ClearAllProduct() {
    const res = await ClearCart();
    if (res.message === "success") {
      setProducts([]);
      toast.success("Cleared successfully 🎉", {
        position: 'top-center',
        duration: 3000,
      });
    } else {
      toast.error("Not Cleared !", {
        position: 'top-center',
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    CheckGetUserCart();
  }, []);

  if (isLoading) {
    return (
      <h1 className="text-4xl text-center font-bold my-12 text-gray-700 dark:text-gray-200">
        Loading... <i className="fas fa-spinner fa-spin"></i>
      </h1>
    );
  }

  return (
    <>
      <div className="container w-[90%] lg:w-2/3 mx-auto my-12">
        {Products.length > 0 ? (
          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-end p-4">
              <button
                onClick={ClearAllProduct}
                className="bg-red-600 px-4 py-2 rounded-xl text-white font-semibold text-lg 
                hover:bg-red-700 transition disabled:opacity-60"
              >
                Clear Cart
              </button>
            </div>

            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
              Total Cart Price: <span className="text-green-600">{TotalPrice} EGP</span>
            </h2>

            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {Products.map((prod: CartProductType) => (
                  <tr
                    key={prod._id}
                    className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        src={prod.product.imageCover}
                        alt=""
                        width={100}
                        height={100}
                        className="w-20 h-20 object-contain rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                      {prod.product.title}
                      {/* <AddToWishlistBtn productId={prod._id} /> */}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={UpdateDisable}
                          onClick={() =>
                            UPdateProduct(prod.product.id, `${prod.count - 1}`, "-")
                          }
                          className="w-7 h-7 flex items-center justify-center text-gray-600 bg-gray-100 border border-gray-300 rounded-full 
                          hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 
                          disabled:opacity-50"
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <div>
                          {prod.product.id == CuruntId ? (
                            UpdateLoading ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span>{prod.count}</span>
                            )
                          ) : (
                            <span>{prod.count}</span>
                          )}
                        </div>

                        <button
                          disabled={UpdateDisable}
                          onClick={() =>
                            UPdateProduct(prod.product.id, `${prod.count + 1}`, "+")
                          }
                          className="w-7 h-7 flex items-center justify-center text-gray-600 bg-gray-100 border border-gray-300 rounded-full 
                          hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 
                          disabled:opacity-50"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {prod.price * prod.count} EGP
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        disabled={RemoveDisable}
                        onClick={() => deleteProduct(prod.product.id)}
                        className="text-red-600 dark:text-red-400 font-medium hover:underline disabled:opacity-50"
                      >
                        Remove
                      </button>
                      <AddBtnWish id={prod.product.id}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-wrap justify-center gap-4 p-6">
              <Link href={`/CheckOut/${CartId}`}>
                <button className="bg-green-600 px-6 py-2 rounded-xl text-white font-semibold text-lg hover:bg-green-700 transition">
                  Checkout Online
                </button>
              </Link>
              <Link href={`/CashOrder/${CartId}`}>
                <button className="bg-blue-600 px-6 py-2 rounded-xl text-white font-semibold text-lg hover:bg-blue-700 transition">
                  Cash Order Now!
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <h1 className="text-2xl text-center font-bold my-12 text-red-600 dark:text-red-400">
            No Products added yet! 🤦‍♂️
          </h1>
        )}
      </div>
    </>
  );
}
