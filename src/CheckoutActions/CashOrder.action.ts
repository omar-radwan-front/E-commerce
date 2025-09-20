"use server"

import getMyToken from "@/app/utitities/getMyToken";
import { CheckOutVSchemaType } from "@/Schema/checkout.valid";

export default async function cashOrder(cartId : string , 
    formValues :CheckOutVSchemaType) {
    

    const token =await getMyToken()
    if(!token) throw new Error("Login first")

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {method : "POST",
            headers :{

                token ,

                "Content-Type":"application/json"
            },
            body :JSON.stringify({
                 shippingAddress: formValues 
        })

        }
    ) 
    const payload =await res.json()
    return payload   
}