import OneBrand from '@/Api/oneBrand';
    import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
 import { productType } from '@/Types/products.type';
import Image from 'next/image';
 import React from 'react';
import { Brand } from './../../../../Types/CartProductType';

export default async function BrandDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await OneBrand(id);
  console.log(data);
  
  if (!data) return <h1 className="text-3xl text-center text-red-600">No Brand</h1>;

 return (
     <div className="container w-[90%] md:w-[70%] lg:w-[60%] mx-auto p-6 my-10 rounded-2xl shadow-lg 
                     bg-white dark:bg-gray-900 transition-all duration-300">
       <div className="md:flex gap-8">
         
         {/* Image */}
         <div className="w-full lg:w-1/3 flex justify-center items-start">
           <Image 
             className="rounded-lg object-cover w-full h-auto max-h-[400px] shadow-md" 
             src={data.image} 
             width={400} 
             height={400} 
             alt={data.name} 
           />
         </div>
 
         {/* Details */}
         <div className="w-full lg:w-2/3 mt-6 md:mt-0">
           <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{data.name}</h1>
           <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{data.slug}</p>
           <div className="flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
<p className="text-gray-500 mt-1">
  Created At: {new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>           </div>
 
           
         </div>
       </div>
     </div>
   )
}
