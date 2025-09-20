import z from "zod";
 
export  const registerValid = z.object({
    name :z.string().nonempty("this field can't be empty").min(1,"min length is 6 chars"),
    email :z.email().nonempty("this field can't be empty"),
    password :z.string().nonempty("this field can't be empty").min(6,"min length is 6 chars"),
    rePassword :z.string().nonempty("this field can't be empty"),
    phone :z.string().nonempty("this field can't be empty").regex(/^01[1205][0-9]{8}$/),
}).refine((object)=>object.password===object.rePassword,{
    path:[`rePassword`],error:"password and rePassword not match"
})

export type registerSchemaType= z.infer<typeof registerValid>              // Iam take copy Type from object 
