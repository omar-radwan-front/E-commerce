import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
  import { jwtDecode } from "jwt-decode";
 
export const authOptions : NextAuthOptions = {
    pages :{signIn :"/Login"},
    providers :[
        Credentials({
            name :"Credentials",
            credentials :{
                email:{},
                password :{},

            },
            authorize: async (Credentials) => {
                const res =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,{
                    method :"POST",
                    body : JSON.stringify({
                        email :Credentials?.email,
                        password :Credentials?.password,
                    }),
                    headers: {"content-Type":"application/json"},
                });

                const payload =await res.json();
                console.log(payload);
                if (payload.message === "success" ) {
                    const decoded:{id:string} = jwtDecode(payload.token);          // decrypted token  

                    return {
                        id : decoded?.id,
                        user :payload.user,
                        token :payload.token
                    }
                    
                } else {

                    throw new Error(payload.message || "wrong");
                }
                
              
            },
            
        }),
    ],
    //////////////////////
    callbacks: {
          async jwt({ token, user }) {                  // fun  encryption     place encryption         access of server only 
      if(user){
            token.user =user?.user,
            token.token = user?.token ;
      }
            return token
          },

          async session({ session, token }) {               //access of server or client 
        session.user = token.user ;
            return session;
          },
       
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
},
};