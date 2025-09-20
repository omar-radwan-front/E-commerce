"use server"
import getMyToken from "@/app/utitities/getMyToken";
 
export default async function UpdateCart(id:string ,count:string) {
 
const token =  await getMyToken()
if(!token){
     throw new Error("plase login to be able add products")
}

const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    method : "PUT",
    headers :{
    token,
    "Content-Type" : "application/json"

    },
    body :JSON.stringify({
        count:count
    })
  
})
const payload = await res.json() ;
return payload ;

}
