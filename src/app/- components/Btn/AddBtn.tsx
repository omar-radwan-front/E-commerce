"use client"
import AddToCart from '@/CartActions/AddtoCart'
import { Button } from '@/components/ui/button'
import { cartContext } from '@/Context/CartContext';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

export default function AddBtn({id}:{id :string}) {
    const { NumberOfCartItem, setNumberOfCartItem } = useContext(cartContext)
    const [Loading, setLoading] = useState(false);
    const [DisableBtn, setDisableBtn] = useState(false);

    async function CheckAddProduct(id:string) {
        setLoading(true)
        setDisableBtn(true)

        const res = await AddToCart(id) 
        console.log(res);

        if (res.status === "success") {
            toast.success(res.message +" 🎉", {
                position :'top-center',
                duration :3000,
            })
            setNumberOfCartItem(NumberOfCartItem + 1)
        } else {
            toast.error(res.message, {
                position :'top-center',
                duration :3000, 
            })
        }
        setLoading(false)
        setDisableBtn(false)
    }

    return (
        <Button 
            disabled={DisableBtn} 
            onClick={() => CheckAddProduct(id)} 
            className={`w-full my-2 py-3 rounded-xl font-medium transition-all duration-300
                       ${DisableBtn ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-sky-700 to-sky-500 hover:from-sky-600 hover:to-sky-400"} 
                       text-white shadow-md`}
        >
            {Loading ? (
                <span className="flex items-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    Adding...
                </span>
            ) : (
                "Add to Cart"
            )}
        </Button>
    )
}
