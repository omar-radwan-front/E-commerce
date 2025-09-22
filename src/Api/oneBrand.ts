"use server"
export default async function OneBrand(id:string) {
 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
 const {data  }=await res.json();


 return data ;
}
