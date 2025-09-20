"use client";
import GetUserCart from "@/CartActions/getUserCart";
import { createContext, useEffect, useState, ReactNode } from "react";

// 1- عرف type
interface CartContextType {
  NumberOfCartItem: number;
  setNumberOfCartItem: React.Dispatch<React.SetStateAction<number>>;
}

// 2- اعمل قيمة افتراضية
const defaultValue: CartContextType = {
  NumberOfCartItem: 0,
  setNumberOfCartItem: () => {}, // دالة فاضية كـ placeholder
};

// 3- اعمل الـ context
export const cartContext = createContext<CartContextType>(defaultValue);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [NumberOfCartItem, setNumberOfCartItem] = useState(0);

  async function getUserCartProduct() {
    try {
      const res = await GetUserCart();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setNumberOfCartItem(sum);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserCartProduct();
  }, []);

  return (
    <cartContext.Provider value={{ NumberOfCartItem, setNumberOfCartItem }}>
      {children}
    </cartContext.Provider>
  );
}
