export default async function OneProduct(id:string) {
 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
 const {data  }=await res.json();


 return data ;
}
