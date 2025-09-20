"use server"
import getMyToken from "@/app/utitities/getMyToken";
 
export default async function GetUserWish() {
 
const token =  await getMyToken()
if(!token){
     throw new Error("plase login to be able add products")
}

const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    method : "GET",
    headers :{
    token,
    "Content-Type" : "application/json"

    },
  
})
const payload = await res.json() ;
return payload ;

}
