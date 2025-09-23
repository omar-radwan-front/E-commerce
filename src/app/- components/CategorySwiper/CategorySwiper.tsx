"use client"
import React from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'
import Image from 'next/image';
import { categoryType } from '@/Types/category.type';

export default function CategorySwiper({ data }: { data: categoryType[] }) {
  return (
    <div className="container w-[95%] md:w-[85%] mx-auto mt-8">
      <h1 className=" md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Shop Popular Categories
      </h1>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        spaceBetween={25}
        loop
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
      >
        {data.map((prod: categoryType, index: number) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <div className="w-[150px] h-[150px] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-lg text-center text-emerald-700 font-semibold dark:text-emerald-400">
                {prod.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
