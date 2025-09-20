import z from "zod";


export const CheckOutValid =z.object({
    details :z.string().nonempty("details field can't be empty"),
    phone :z.string().nonempty("phone field can't be empty").regex(/^01[0125][0-9]{8}$/,"not Valid"),
    city :z.string().nonempty("city field can't be empty")
})

export type CheckOutVSchemaType =z.infer< typeof CheckOutValid>;