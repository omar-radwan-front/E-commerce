import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';
import AllProductsApi from '@/Api/AllProductsApi';
import { productType } from '@/Types/products.type';
import AddBtn from '../Btn/AddBtn';
import AddBtnWishList from '../Btn/AddWish';

export default async function AllProducts() {
  const data = await AllProductsApi();

  return (
    <div className="container w-[90%] lg:w-[80%] mx-auto my-10">
      <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((prod: productType) => (
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

            <div className="px-4 ">
                                    <AddBtnWishList id={prod.id}/>
              
              <AddBtn id={prod.id} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
