import Category from '@/Api/Category'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper';

export default async function CategorySlider() {
    const data = await Category()
    console.log(data);
    
  return (
  <>
   <CategorySwiper data={data}/>
  </>
  )
}
