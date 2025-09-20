import getMyToken from "@/app/utitities/getMyToken";

 

export default async function AddToCart( id : string) {
 
try {
    const token =  await getMyToken()
if(!token){
     throw new Error("plase login to be able add products")
}

const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
    method : "POST",
    headers :{
    token,
    "Content-Type" : "application/json"

    },
    body : JSON.stringify({
        productId:  id
    })
})
const payload = await res.json() ;
return payload ;
} catch (err) {
    return err ;
}

}
