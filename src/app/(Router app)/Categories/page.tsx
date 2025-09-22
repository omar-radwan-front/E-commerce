import Category from '@/Api/Category'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { categoryType } from '@/Types/category.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {
  const res = await Category()
  console.log(res);
  
  return (
     <>
      <div className="container w-[90%] lg:w-[80%] mx-auto my-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {res.map((prod: categoryType) => (
            <Card 
            key={prod._id} 
            className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 cursor-pointer border-white hover:border-2 hover:border-green-400"
            >
              <Link href={`/Categories/${prod._id}`}>
              <CardHeader>
                {/* Fixed image container */}
                <div className="w-full h-[200px] overflow-hidden rounded-lg">
                  <Image 
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105" 
                    src={prod.image} 
                    width={250} 
                    height={200} 
                    alt={prod.name}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center text-lg sm:text-xl font-semibold text-emerald-600 mt-2">
                  {prod.name}
                </p>
              </CardContent>
              </Link>
            </Card>
          ))}
        </div>
       
      </div>
    </>
  )
}
