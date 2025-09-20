"use server"
export default async function getRelatedProducts(categoryId: string) {
    
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
   
    const payload =await res.json()
    return payload   
} 

 