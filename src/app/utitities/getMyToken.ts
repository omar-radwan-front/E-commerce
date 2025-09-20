"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers"


export default async function getMyToken(){
try {
    
    const decodeToken = (await cookies()).get(`next-auth.session-token`)?.value || (await cookies()).get(`__Secure-next-auth.session-token`)?.value;              // access and get from cookies
    if(!decodeToken) return null ;
    const token =  await decode ({
        token  : decodeToken, 
        secret : process.env.NEXTAUTH_SECRET!
    })  ;         // decrypted token  of secret key 
   console.log(token);

    return token?.token || null;
} catch (err) {
    console.log(err);
    
    return null
}
}