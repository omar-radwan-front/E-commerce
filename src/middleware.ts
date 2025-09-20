import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request :NextRequest){
    const token = await getToken({req : request})


if(token){
      if(request.nextUrl.pathname === '/Login' || request.nextUrl.pathname === '/Register'){
        return NextResponse.redirect(new URL(`/`,request.url))
      }else{


        return NextResponse.next()   //go place you want
    }
}
else{
    if (request.nextUrl.pathname === '/cart') {
        
        return NextResponse.redirect(new URL(`/Login`,request.url))
    } else {
                return NextResponse.next()   //go place you want

    }
}
}
export const config = {
    matcher : [`/cart`,"/Login","/Register"]
}