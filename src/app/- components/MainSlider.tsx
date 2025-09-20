"use client"
import React from 'react'
import img1 from "../../../public/images/slider-image-1.jpeg"
import img2 from "../../../public/images/slider-image-2.jpeg"
import img3 from "../../../public/images/slider-image-3.jpeg"
import img4 from "../../../public/images/grocery-banner.png"
import img5 from "../../../public/images/grocery-banner-2.jpeg"

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'
import Image from 'next/image';

export default function MainSlider() {
  return (
    <div className="container w-[90%] md:w-[80%] mx-auto my-6 flex flex-col md:flex-row gap-4">
      
      {/* Main Slider */}
      <div className="md:w-3/4 w-full rounded-xl overflow-hidden shadow-lg">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={0}
          slidesPerView={1}
          loop
        >
          <SwiperSlide>
            <Image src={img1} alt="slide 1" className="w-full h-[250px] md:h-[350px] object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={img2} alt="slide 2" className="w-full h-[250px] md:h-[350px] object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={img3} alt="slide 3" className="w-full h-[250px] md:h-[350px] object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Side Banners */}
      <div className="md:w-1/4 w-full flex md:flex-col gap-4">
        <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
          <Image src={img4} alt="banner 1" className="w-full h-[120px] md:h-[170px] object-cover" />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
          <Image src={img5} alt="banner 2" className="w-full h-[120px] md:h-[170px] object-cover" />
        </div>
      </div>

    </div>
  )
}
