"use client";

import AddBtn from "@/app/- components/Btn/AddBtn";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { productType } from "@/Types/products.type";
import GetUserWish from "@/wishAction/getUserWish";
import RemoveProduct from "@/wishAction/RemoveProduct";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// import { useWishlist } from "@/Context/WishlistContext";

export default function WishlistPage() {
  const [Data, setData] = useState([])
  const [Products, setProducts] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [RemoveDisable, setRemoveDisable] = useState(false);
    const [UpdateDisable, setUpdateDisable] = useState(false);
    const [UpdateLoading, setUpdateLoading] = useState(false);
    const [TotalPrice, setTotalPrice] = useState(0);
    const [CuruntId, setCuruntId] = useState("");
     const [CartId, setCartId] = useState("");
  // const { wishlist, removeFromWishlist } = useWishlist();
  async function getUserProductWish() {
    const res = await GetUserWish();
    console.log(res);
    if(res.status === "success"){
      setData(res.data)
    }
            setisLoading(false);

  }


  
    async function deleteProduct(id: string) {
       const res = await RemoveProduct(id);
      if (res.status === "success") {
        // setProducts(res.data.products);
        console.log(res);
        
        toast.success("Removed successfully 🎉", {
          position: 'top-center',
          duration: 3000,
        });
         getUserProductWish()
       } else {
        toast.error("Can't Remove 👼👼", {
          position: 'top-center',
          duration: 3000,
        });
                setisLoading(false);

      }
     }
  

  useEffect(()=>{
    getUserProductWish()
  },[]);
  
  if (isLoading) {
    return (
      <h1 className="text-4xl text-center font-bold my-12 text-gray-700 dark:text-gray-200">
        Loading... <i className="fas fa-spinner fa-spin"></i>
      </h1>
    );
  }
   
 return (
  <>
  {Data.length === 0? <> <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
        💔 Your wishlist is empty
      </div></> : <> <div className="container w-[90%] lg:w-[80%] mx-auto my-10">
      <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Data.map((prod: productType) => (
          <Card
            key={prod.id}
            className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
          >
            <Link href={`/Products/${prod.id}`}>
              <CardHeader className="p-0">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={prod.imageCover}
                    alt={prod.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>
                <p className="px-4 pt-3 text-sm text-emerald-600 font-medium">
                  {prod.category?.name}
                </p>
              </CardHeader>

              <CardContent className="px-4 pb-2">
                <p className="line-clamp-1 font-medium text-gray-900 dark:text-gray-100">
                  {prod.title}
                </p>
              </CardContent>

              <CardFooter className="px-4 flex justify-between items-center text-sm">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {prod.price} EGP
                </span>
                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                  {prod.ratingsAverage}
                  <i className="fas fa-star"></i>
                </span>
              </CardFooter>
            </Link>

            <div className="px-4">
                  <button
                        disabled={RemoveDisable}
                        onClick={() => deleteProduct(prod.id)}
                        className="text-red-600 dark:text-red-400 font-medium hover:underline disabled:opacity-50"
                      >
                        Remove

                      </button>
                                    <AddBtn id={prod.id} />
                      
            </div>
          </Card>
        ))}
      </div>
    </div></>}
    </>
  )
}
