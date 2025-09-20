import { productType } from '@/Types/products.type'
import Image from 'next/image'
import React from 'react'
import AddBtn from '../Btn/AddBtn'

export default function Details({data}:{data:productType}) {
  return (
    <div className="container w-[90%] md:w-[70%] lg:w-[60%] mx-auto p-6 my-10 rounded-2xl shadow-lg 
                    bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="md:flex gap-8">
        
        {/* Image */}
        <div className="w-full lg:w-1/3 flex justify-center items-start">
          <Image 
            className="rounded-lg object-cover w-full h-auto max-h-[400px] shadow-md" 
            src={data.imageCover} 
            width={400} 
            height={400} 
            alt={data.title} 
          />
        </div>

        {/* Details */}
        <div className="w-full lg:w-2/3 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{data.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{data.description}</p>
          <p className="text-emerald-600 font-medium my-3">{data.category.name}</p>

          <div className="flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            <span>{data.price} EGP</span>
            <span className="flex items-center gap-1">
              {data.ratingsAverage}
              <i className="fas fa-star text-yellow-500"></i>
            </span>
          </div>

          {/* Add to Cart Button */}
          <AddBtn id={data.id} />
        </div>
      </div>
    </div>
  )
}
