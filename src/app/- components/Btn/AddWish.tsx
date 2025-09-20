 "use client"
 import { Button } from '@/components/ui/button'
import AddtoWishList from '@/wishAction/AddtoWishList';
// import { cartContext } from '@/Context/CartContext';
   import React, {   useState } from 'react'
import { toast } from 'sonner';

export default function AddBtnWishList({id}:{id :string}) {
    // const { NumberOfCartItem, setNumberOfCartItem } = useContext(cartContext)
    const [Loading, setLoading] = useState(false);
    const [DisableBtn, setDisableBtn] = useState(false);
       const [heart, setheart] = useState(false)
    async function CheckAddProduct(id:string) {
        setLoading(true)
        setDisableBtn(true)

        const res = await AddtoWishList(id) 
        console.log(res);

        if (res.status === "success") {
            toast.success(res.message +" 🎉", {
                position :'top-center',
                duration :3000,
                
            })
            setheart(true)
         } else {
            toast.error(res.message, {
                position :'top-center',
                duration :3000, 
            })
            setheart(false)
        }

        setLoading(false)
        setDisableBtn(false)
    }

    return (
        <Button 
            disabled={DisableBtn} 
            onClick={() => CheckAddProduct(id)} 
            className={`w-fit rounded-xl font-medium transition-all duration-300
                       ${DisableBtn ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-sky-700 to-sky-500 hover:from-sky-600 hover:to-sky-400"} 
                       text-white shadow-md`}
        >
            {Loading ? (
                <span className="flex items-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                </span>
            ) : (
           <i  className={heart?"fa-solid fa-heart text-red-700 text-2xl":"fa-solid fa-heart text-black text-2xl"}></i>            )}
        </Button>
    )
}
 